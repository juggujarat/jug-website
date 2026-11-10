# Gujarat JUG website

The official website of **Java User Group Gujarat**: [gujaratjug.org](https://www.gujaratjug.org).

Built with [Astro](https://astro.build) (static pages, file-based content), Tailwind CSS v4 and a sprinkle of React where interactivity needs it. Deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # full production build into dist/
npm run preview    # serve the production build
```

Node 20+ is required (Node 22 recommended).

## Where the content lives

Everything on the site is generated from Markdown files in `src/content/`. Adding content never requires touching page code.

| Folder | One file per… | Becomes |
| --- | --- | --- |
| `src/content/events/` | meetup / workshop / conference | `/events/<file-name>` |
| `src/content/people/` | speaker, core member or volunteer | `/people/<file-name>` |
| `src/content/partners/` | company, university or community | `/partners/<file-name>` |

The allowed fields for each are defined (and validated at build time) in `src/content.config.ts`.

- **Events** reference people and partners by file name, e.g. `speakers: ["vikas-rajput"]` or `partners: [{ partner: "york-ie", role: "venue" }]`. Roles: `venue`, `sponsor`, `food`, `goodies`, `swag`, `community`, `media`, `knowledge`.
- The Markdown body of an event is its article/recap. Set `recapReady: true` once it's written.
- A person becomes a "speaker" automatically once they appear in any event's `talks`.
- The text below the `---` front matter of a person/partner file is their bio.
- Images go in `public/` (e.g. `public/events/2025-06/photo-1.jpg`) and are referenced as `/events/2025-06/photo-1.jpg`.

### Adding a new meetup

1. Add the Luma slug to `data/luma/events.txt` and run the **Sync Luma events** GitHub Action (or `npm run sync:luma` locally). It snapshots the full Luma page (description, hosts, guest count, cover, venue) into `data/luma/<slug>.json`.
2. Create `src/content/events/YYYY-MM-short-name.md` using the snapshot, and add any new speakers to `src/content/people/`.
3. After the event, add photos to `gallery`, YouTube IDs to `videos`, and write the recap.

## Community Day for Java 2025

The original single-page Community Day 2025 site lives in `legacy/` and is still served at `/community-day-for-java-2025`. `npm run build` builds it first (`npm run build:legacy`) and copies it into the final output.

## Contributing

This is an open-source project and contributions are welcome. Open an issue or a pull request.
