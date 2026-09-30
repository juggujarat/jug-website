import { Helmet } from 'react-helmet-async';
import { site } from '../content';
import { shareImage } from '../lib/images';
import { absoluteUrl } from '../lib/url';

/**
 * Per-page <head> tags: title, description, canonical, Open Graph, Twitter,
 * optional JSON-LD. Render exactly once per page.
 *
 * @param {string}  [title]      page title; rendered as "<title> | Gujarat JUG"
 * @param {string}  [fullTitle]  exact title (overrides `title` + suffix)
 * @param {string}  [description] defaults to site.description
 * @param {string}  [path]       root-relative canonical path, e.g. '/events'
 * @param {string}  [image]      root-relative or absolute image URL
 * @param {string}  [type]       og:type (default 'website')
 * @param {object|object[]} [jsonLd] structured data (one script tag)
 * @param {boolean} [noindex]    add robots noindex (placeholders, 404)
 */
export default function Seo({
  title,
  fullTitle,
  description = site.description,
  path,
  image = site.ogImage,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  const resolvedTitle = fullTitle ?? (title ? `${title} | ${site.name}` : site.name);
  const canonical = path != null ? absoluteUrl(path) : undefined;
  const imageUrl = absoluteUrl(shareImage(image));

  // Builders return null when there's nothing valid to publish.
  // No structured data for pages kept out of search (samples, drafts, 404).
  const list = noindex ? [] : [jsonLd].flat().filter(Boolean);
  const structuredData = list.length > 1 ? list : list[0];
  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.fullName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData ? (
        // Escape `<` so content can never close the script tag early.
        <script type="application/ld+json">{JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>
      ) : null}
    </Helmet>
  );
}
