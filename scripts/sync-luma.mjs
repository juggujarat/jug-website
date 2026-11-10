#!/usr/bin/env node
/**
 * Snapshot public Luma event pages into data/luma/<slug>.json.
 *
 * Luma pages are Next.js apps that embed their data in a __NEXT_DATA__ script tag,
 * so we read that instead of scraping HTML. The snapshot keeps the full description,
 * hosts, guest count, cover and venue so event Markdown files can be written from it.
 *
 * Usage: npm run sync:luma            (slugs from data/luma/events.txt)
 *        npm run sync:luma -- abc123   (specific slugs/URLs)
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const OUT = new URL('../data/luma/', import.meta.url);
const UA = 'GujaratJUG-website-sync/1.0 (+https://www.gujaratjug.org)';

const toSlug = (s) => s.trim().replace(/^https?:\/\/(lu\.ma|luma\.com)\//, '').replace(/[?#].*$/, '');

async function slugsFromArgsOrFile() {
  const args = process.argv.slice(2);
  if (args.length) return args.map(toSlug);
  const txt = await readFile(new URL('events.txt', OUT), 'utf8');
  return txt.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')).map(toSlug);
}

/** ProseMirror JSON (Luma's description_mirror) -> Markdown, covering the node types Luma uses. */
function mirrorToMarkdown(node, listDepth = 0) {
  if (!node) return '';
  const kids = (n, d = listDepth) => (n.content ?? []).map((c) => mirrorToMarkdown(c, d)).join('');
  switch (node.type) {
    case 'doc': return (node.content ?? []).map((c) => mirrorToMarkdown(c)).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
    case 'paragraph': return kids(node);
    case 'heading': return `${'#'.repeat(Math.min(6, (node.attrs?.level ?? 2) + 1))} ${kids(node)}`;
    case 'bullet_list': case 'bulletList':
      return (node.content ?? []).map((li) => `${'  '.repeat(listDepth)}- ${kids(li, listDepth + 1).trim()}`).join('\n');
    case 'ordered_list': case 'orderedList':
      return (node.content ?? []).map((li, i) => `${'  '.repeat(listDepth)}${i + 1}. ${kids(li, listDepth + 1).trim()}`).join('\n');
    case 'list_item': case 'listItem': return (node.content ?? []).map((c) => mirrorToMarkdown(c, listDepth)).join('\n');
    case 'blockquote': return kids(node).split('\n').map((l) => `> ${l}`).join('\n');
    case 'hard_break': case 'hardBreak': return '  \n';
    case 'horizontal_rule': return '---';
    case 'image': return node.attrs?.src ? `![](${node.attrs.src})` : '';
    case 'text': {
      let t = node.text ?? '';
      for (const m of node.marks ?? []) {
        if (m.type === 'bold' || m.type === 'strong') t = `**${t}**`;
        else if (m.type === 'italic' || m.type === 'em') t = `_${t}_`;
        else if (m.type === 'code') t = `\`${t}\``;
        else if (m.type === 'link' && m.attrs?.href) t = `[${t}](${m.attrs.href})`;
      }
      return t;
    }
    default: return kids(node);
  }
}

async function fetchEvent(slug) {
  const res = await fetch(`https://luma.com/${slug}`, { headers: { 'user-agent': UA, accept: 'text/html' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error('no __NEXT_DATA__ found (page format changed?)');
  const next = JSON.parse(m[1]);
  const data = next?.props?.pageProps?.initialData?.data ?? next?.props?.pageProps?.initialData ?? {};
  const ev = data.event ?? {};
  const geo = ev.geo_address_info ?? {};
  return {
    slug,
    url: `https://luma.com/${slug}`,
    syncedAt: new Date().toISOString(),
    title: ev.name ?? null,
    startAt: ev.start_at ?? null,
    endAt: ev.end_at ?? null,
    timezone: ev.timezone ?? null,
    online: ev.location_type === 'online' || Boolean(ev.zoom_meeting_url),
    venue: { name: geo.address ?? null, address: geo.full_address ?? null, city: geo.city ?? null, mapUrl: geo.place_id ? `https://www.google.com/maps/place/?q=place_id:${geo.place_id}` : null },
    cover: ev.cover_url ?? data.cover_url ?? null,
    guestCount: data.guest_count ?? ev.guest_count ?? null,
    hosts: (data.hosts ?? []).map((h) => ({ name: h.name, username: h.username ?? null, avatar: h.avatar_url ?? null, linkedin: h.linkedin_handle ?? null, x: h.twitter_handle ?? null })),
    descriptionMarkdown: data.description_mirror ? mirrorToMarkdown(data.description_mirror) : null,
    calendar: data.calendar ? { name: data.calendar.name, slug: data.calendar.slug ?? null } : null,
    raw: data, // full payload, in case we need fields not mapped above
  };
}

const slugs = await slugsFromArgsOrFile();
await mkdir(OUT, { recursive: true });
let failed = 0;
for (const slug of slugs) {
  try {
    const snap = await fetchEvent(slug);
    await writeFile(new URL(`${slug}.json`, OUT), JSON.stringify(snap, null, 2) + '\n');
    console.log(`✓ ${slug}  ${snap.title}  (${snap.guestCount ?? '?'} guests)`);
  } catch (e) {
    failed++;
    console.error(`✗ ${slug}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 750)); // be polite
}
if (failed) process.exitCode = 1;
