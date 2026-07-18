# paimon-io

The gateway landing page for paimonchan's io projects — a single-page directory
of links to each site (paimon-tools, paimon-board, …). Lives at the GitHub
Pages **user site** root: `https://paimonchan.github.io/`.

This is the doorway. Each io project is its own repo and deploys to its own
subpath (`/paimon-tools/`, `/paimon-board/`, …); this page just collects them.

## Stack

- **Vite 8** + **React 19** + **TypeScript 7** (strict)
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (CSS-first `@theme`,
  no `tailwind.config.js`)
- **Zustand** for theme state, **lucide-react** for icons
- Deployed via **GitHub Actions** → GitHub Pages (official actions only)

Shares its design language (the warm `ink`/`honey` palette) with `paimon-tools`
so the family reads as one product line.

## Architecture

The data is the interesting part. There are two layers:

- **`src/lib/seo.js`** — the single source of truth. Plain JavaScript (no JSX,
  no imports) so it can be `import()`-ed by **both** the React app **and** the
  Node prerender script. Holds the canonical `SITE_URL`, home-page meta, the
  `SITES` array, and the JSON-LD / `<noscript>` generators.
- **`src/sites.config.tsx`** — the React view-model. Imports `SITES` and
  attaches a lucide icon per entry, producing the typed list the UI consumes.

This split means **adding a new io project is a two-line change**:

1. Append an entry to `SITES` in `src/lib/seo.js`.
2. Add its `id → icon` mapping in `src/sites.config.tsx`.

The card grid, the search filter, the crawlable `<noscript>` body, the sitemap
and the JSON-LD `ItemList` all update automatically.

### SEO / prerendering

`index.html` ships with `%%TOKEN%%` placeholders. `vite build` leaves them
alone; `scripts/prerender.mjs` (run as a post-build step) fills them in and
writes `dist/sitemap.xml`. The result is a static HTML file with real
`<title>`, meta description, canonical URL, Open Graph tags, JSON-LD and a
keyword-rich `<noscript>` body — indexable by search engines without executing
the SPA.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run type-check # tsc --noEmit (strict)
npm run build      # vite build && node scripts/prerender.mjs  → dist/
npm run preview    # serve the built dist/
```

## Deployment

This repo is intended to become the `paimonchan.github.io` user-site repo.

**One-time setup** (do this once, on GitHub):

1. Create an **empty** repo named `paimonchan.github.io` (must match the
   username exactly — no other name will publish to the bare domain).
2. Push this project to `main`.
3. In the repo: **Settings → Pages → Build and deployment → Source:
   GitHub Actions**. (Not "Deploy from a branch" — the workflow handles it.)
4. The `Deploy to GitHub Pages` workflow runs on every push to `main` and
   publishes to `https://paimonchan.github.io/`.

> Existing project sites (`/paimon-tools/`, `/paimon-board/`) keep working —
> the user-site repo only owns the root path, not the subpaths.

## Project layout

```
paimon-io/
├── .github/workflows/deploy.yml   # build + deploy pipeline
├── index.html                     # %%TOKEN%%-based template
├── scripts/prerender.mjs          # post-build: fill SEO tokens + sitemap
├── public/
│   ├── favicon.svg                # portal glyph
│   ├── og-image.svg               # social share image
│   └── robots.txt
└── src/
    ├── lib/seo.js                 # ← single source of truth (data)
    ├── sites.config.tsx           # ← React view-model (data + icons)
    ├── stores/theme-store.ts      # Zustand dark/light
    ├── hooks/useFilter.ts         # client-side search filter
    ├── components/
    │   ├── BrandMark.tsx          # portal glyph tile
    │   ├── Header.tsx
    │   ├── Hero.tsx               # wordmark + search input
    │   ├── SiteCard.tsx           # one io project card
    │   ├── SiteGrid.tsx           # groups cards by category
    │   ├── Footer.tsx
    │   ├── ThemeToggle.tsx
    │   └── ErrorBoundary.tsx
    ├── App.tsx
    ├── main.tsx
    └── index.css                  # theme tokens (mirrors paimon-tools)
```

## License

Personal project — all rights reserved. Source visible for portfolio purposes.
