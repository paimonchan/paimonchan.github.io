/**
 * prerender.mjs — post-build step that fills the SEO tokens in dist/index.html
 * and generates dist/sitemap.xml.
 *
 * Why: GitHub Pages serves static files. Even though this gateway is a single
 * page, we still want the raw HTML to carry real <title>, meta description,
 * canonical URL, JSON-LD and a crawlable <noscript> body — so search engines
 * (and JS-disabled visitors) get meaningful content instead of an empty SPA
 * shell with placeholder tokens.
 *
 * Flow:
 *   1. `vite build` writes dist/index.html with %%TOKEN%% placeholders intact
 *      (Vite resolves asset references but leaves our custom tokens alone).
 *   2. This script reads that file, fills the home-page SEO, writes it back.
 *   3. It also writes dist/sitemap.xml.
 *
 * Run via: `npm run build` (already wired in package.json).
 *
 * NOTE: simpler than paimon-tools' prerender because there's only one page —
 * no per-route output, no depth-aware asset path rewriting.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

// Plain-JS source of truth — Node can import it directly (no bundler).
const seoModule = await import('../src/lib/seo.js')
const { HOME_SEO, SITE_URL, jsonLdFor, breadcrumbLdFor, noscriptBodyFor } = seoModule

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

async function main() {
  const templatePath = join(DIST, 'index.html')
  if (!existsSync(templatePath)) {
    console.error('[prerender] dist/index.html not found. Run vite build first.')
    process.exit(1)
  }
  const template = await readFile(templatePath, 'utf8')

  const homeHtml = fillSeo(template, {
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    keywords: HOME_SEO.keywords,
    canonical: `${SITE_URL}/`,
    ogImage: HOME_SEO.ogImage,
    ogImageAlt: HOME_SEO.ogImageAlt,
    jsonLd: JSON.stringify(jsonLdFor()),
    breadcrumbLd: JSON.stringify(breadcrumbLdFor()),
    noscript: noscriptBodyFor(),
    bodyHtml: HOME_SEO.bodyHtml,
  })
  await writeFile(templatePath, homeHtml, 'utf8')
  console.log('[prerender] ✓ home (index.html)')

  await writeSitemap()
  console.log('[prerender] ✓ sitemap.xml')
}

/**
 * Token replacement. Text/meta values are HTML-escaped (so quotes / angle
 * brackets don't break attributes); JSON-LD and the pre-rendered body HTML are
 * trusted and passed through raw. `&` is intentionally left literal — browsers
 * render it correctly and escaping it mangles readable copy.
 */
function fillSeo(tpl, values) {
  return tpl
    .replace(/%%TITLE%%/g, escapeHtml(values.title))
    .replace(/%%DESCRIPTION%%/g, escapeHtml(values.description))
    .replace(/%%KEYWORDS%%/g, escapeHtml(values.keywords))
    .replace(/%%CANONICAL%%/g, escapeHtml(values.canonical))
    .replace(/%%OG_IMAGE%%/g, values.ogImage)
    .replace(/%%OG_IMAGE_ALT%%/g, escapeHtml(values.ogImageAlt))
    .replace(/%%JSONLD%%/g, values.jsonLd)
    .replace(/%%BREADCRUMBLD%%/g, values.breadcrumbLd)
    .replace(/%%NOSCRIPT%%/g, values.noscript)
    .replace(/%%PRERENDER_BODY%%/g, values.bodyHtml || '')
}

function escapeHtml(s) {
  return String(s)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Single-URL sitemap. The gateway is one page; the io projects themselves are
 * external sites and belong in their own sitemaps, not here.
 */
async function writeSitemap() {
  const today = new Date().toISOString().split('T')[0]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
  await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
