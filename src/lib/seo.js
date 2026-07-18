/**
 * SEO + content source of truth for the Paimon gateway.
 *
 * This file is deliberately plain JavaScript (no JSX, no imports from anywhere
 * except this same module) so it can be imported both by the React app and by
 * the prerender build script (which runs in plain Node, no bundler).
 *
 * It is the single source of truth for:
 *   - the canonical site URL
 *   - home page meta (title, description, keywords, OG, JSON-LD)
 *   - the list of "io" projects rendered as cards (SITES)
 *
 * To add a new io project: append an entry to `SITES`. The card grid, the
 * prerendered crawlable HTML, the <noscript> fallback, the sitemap-adjacent
 * JSON-LD and the search filter all read from this array automatically.
 *
 * Convention (mirrors paimon-tools): registry `id`s are stable slugs used as
 * React keys, category labels and anchor hashes. Don't reuse ids.
 */

export const SITE_URL = 'https://paimonchan.github.io'

/**
 * Canonical category order used when grouping cards. New categories must be
 * added here — the grid iterates this array, not the raw SITES list, so an
 * unknown category would silently never render.
 */
export const CATEGORIES = ['Tools', 'Apps', 'Coming soon']

/**
 * One io project. Keep field names short and self-describing.
 *
 * @typedef {Object} SiteEntry
 * @property {string} id           Stable slug, unique. Used as React key + JSON-LD key.
 * @property {string} name         Display name, e.g. "Paimon Tools".
 * @property {string} category     One of CATEGORIES.
 * @property {string} tagline      One-line pitch shown under the name.
 * @property {string} description  Longer copy for the card body.
 * @property {string} url          Absolute URL of the live site.
 * @property {string} repo         Absolute URL of the source repo.
 * @property {'live'|'soon'} status  'live' = has a working site; 'soon' = placeholder.
 * @property {string[]} keywords   Lowercase search tokens for the filter box.
 * @property {string[]} features   Short capability badges shown on the card
 *                                  (2-4 items). Keep them scannable — noun-ish.
 */

/** @type {SiteEntry[]} */
export const SITES = [
  {
    id: 'paimon-tools',
    name: 'Paimon Tools',
    category: 'Tools',
    tagline: 'Private, in-browser data conversion',
    description:
      'Convert JSON, CSV and Excel against each other, plus a JS/Python/HTML playground. Everything runs locally; no uploads, no sign-up.',
    url: 'https://paimonchan.github.io/paimon-tools/',
    repo: 'https://github.com/paimonchan/paimon-tools',
    status: 'live',
    keywords: ['json', 'csv', 'excel', 'xlsx', 'convert', 'converter', 'data', 'playground', 'code'],
    features: ['JSON/CSV/XLSX', 'Code playground', '100% client-side'],
  },
  {
    id: 'paimon-board',
    name: 'Paimon Board',
    category: 'Apps',
    tagline: 'Real-time collaborative whiteboard',
    description:
      'A boardmix-style whiteboard with peer-to-peer realtime sync. Draw, sketch and brainstorm together. Sessions are shared over WebRTC, no server.',
    url: 'https://paimonchan.github.io/paimon-board/',
    repo: 'https://github.com/paimonchan/paimon-board',
    status: 'live',
    keywords: ['whiteboard', 'board', 'collab', 'draw', 'sketch', 'realtime', 'webrtc', 'yjs'],
    features: ['P2P realtime', 'No server', 'Excalidraw engine'],
  },
  {
    id: 'paimonitor',
    name: 'Paimonitor',
    category: 'Coming soon',
    tagline: 'Regional service monitoring dashboard',
    description:
      'Real-time monitoring of services across global regions. A full-stack app (Next.js + Go), landing here as a placeholder until it ships.',
    url: 'https://github.com/paimonchan/paimonitor',
    repo: 'https://github.com/paimonchan/paimonitor',
    status: 'soon',
    keywords: ['monitor', 'monitoring', 'dashboard', 'uptime', 'region', 'status'],
    features: ['Next.js + Go', 'Multi-region', 'Realtime status'],
  },
]

/* ── Home page meta ────────────────────────────────── */

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`
const DEFAULT_OG_ALT = 'Paimon - a hub of io projects by paimonchan'

export const HOME_SEO = {
  title: 'Paimon - a hub of io projects',
  description:
    'A directory of paimonchan\'s io projects: private in-browser data tools, real-time collaborative whiteboards, and more. One landing page, every site.',
  keywords:
    'paimon, paimonchan, paimon tools, paimon board, io projects, github pages, web tools, browser tools, json csv excel, whiteboard',
  ogImage: DEFAULT_OG_IMAGE,
  ogImageAlt: DEFAULT_OG_ALT,
  // Keyword-rich, crawlable HTML for the <noscript> / prerendered body.
  // Relative-friendly: this is the user-site root, so links are absolute.
  bodyHtml: buildHomeBodyHtml(),
}

function buildHomeBodyHtml() {
  const items = SITES.map(
    (s) =>
      `      <li><a href="${s.url}"><strong>${s.name}</strong> - ${s.tagline}. ${s.description}</a></li>`
  ).join('\n')
  return `<h1>Paimon - a hub of io projects</h1>
  <p>A directory of paimonchan's io projects. Every site runs in your browser. Privacy-first, no tracking, no sign-up.</p>
  <h2>Projects</h2>
  <ul>
${items}
  </ul>`
}

/* ── JSON-LD structured data ───────────────────────── */

/**
 * Builds the structured data for the home page: a WebSite node plus an
 * ItemList enumerating every io project. Search engines use ItemList for
 * rich "site links"-style results.
 */
export function jsonLdFor() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Paimon',
    url: `${SITE_URL}/`,
    description: HOME_SEO.description,
    inLanguage: 'en',
    author: { '@type': 'Person', name: 'paimonchan' },
    publisher: { '@type': 'Person', name: 'paimonchan' },
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Paimon io projects',
    itemListElement: SITES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: s.url,
      description: s.description,
    })),
  }

  return [website, itemList]
}

/**
 * Breadcrumb for the gateway itself — just a single root node, since this is
 * the top of the hierarchy. Kept as a separate JSON-LD block to match the
 * paimon-tools token layout and to give crawlers an explicit root breadcrumb.
 */
export function breadcrumbLdFor() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Paimon',
        item: `${SITE_URL}/`,
      },
    ],
  }
}

/**
 * HTML string for the <noscript> block — a plain, crawlable list of every
 * live io site so search engines (and JS-disabled visitors) get real content
 * instead of an empty SPA shell.
 */
export function noscriptBodyFor() {
  const live = SITES.filter((s) => s.status === 'live')
  const items = live
    .map(
      (s) =>
        `      <li><a href="${s.url}">${s.name}</a> - ${s.tagline}</li>`
    )
    .join('\n')
  return `<h1>Paimon - a hub of io projects</h1>
    <p>${HOME_SEO.description}</p>
    <p>This page normally shows an interactive directory of sites. Without
      JavaScript you can still reach them directly:</p>
    <ul>
${items}
    </ul>`
}
