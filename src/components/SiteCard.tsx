/**
 * SiteCard - one io project rendered as a directory card.
 *
 * Uses the **stretched-link** pattern: an absolutely-positioned <a> covers
 * the entire card for native link behavior (right-click, Ctrl+click,
 * middle-click all work without JS). Internal links (like "src") stack above
 * it via z-index.
 *
 * Schema.org itemscope/itemprop are applied so search engines can extract
 * SoftwareApplication data from the HTML itself, not just the JSON-LD.
 *
 * Layered and confident rather than flat-timid. Depth comes from contrast and
 * stacking, not from piled-up effects:
 *   - Card surface sits one tone lighter than the page (bg-ink-900 on ink-950)
 *     with a visible hairline border, so each card reads as its own object.
 *   - Three contrast tiers inside: ink-50 name -> honey tagline -> ink-400 body.
 *   - Icon tile is larger and casts a small layered shadow, so it floats.
 *   - Hover swaps the border to honey and adds a soft cast shadow. No lift,
 *     no scale, no glow - just a deliberate state change.
 *
 * The honey accent appears in exactly two places per card: the icon tile and
 * the hover border. Everything else is the ink ramp.
 *
 * Navigation policy:
 *   - Main click -> SAME TAB for live sites (same-domain sibling).
 *   - Source link -> NEW TAB (external github.com reference).
 *
 * "soon" cards render muted and link to their repo (no live site yet).
 */
import { ArrowRight, Code, ExternalLink } from 'lucide-react'
import type { SiteWithIcon } from '../sites.config'

interface SiteCardProps {
  site: SiteWithIcon
  index: number
  total: number
}

export default function SiteCard({ site, index, total }: SiteCardProps) {
  const { Icon } = site
  const isLive = site.status === 'live'
  const href = isLive ? site.url : site.repo
  // Zero-padded editorial index (01, 02, ...) — position out of total.
  const number = `${index + 1}/${total}`

  return (
    <article
      itemScope
      itemType="https://schema.org/SoftwareApplication"
      aria-label={site.name}
      style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
      className={[
        'group relative flex animate-[slide-up_0.2s_ease-out_both] flex-col overflow-hidden rounded-lg border p-4',
        'shadow-[var(--shadow-card)] transition-all duration-150',
        isLive
          ? 'border-ink-700 bg-ink-900 hover:border-honey-500/60 hover:shadow-[var(--shadow-card-hover)]'
          : 'border-ink-800 bg-ink-900/60 hover:border-ink-600',
      ].join(' ')}
    >
      {/* Stretched link — native <a>, no JS needed for navigation */}
      <a
        href={href}
        target={isLive ? undefined : '_blank'}
        rel={isLive ? undefined : 'noopener noreferrer'}
        className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-[-3px]"
        aria-label={`Open ${site.name}`}
        itemProp="url"
      />

      {/* Accent bar - lights up on hover. Hommage to paimon-tools. */}
      <span
        aria-hidden
        className={[
          'absolute inset-y-0 left-0 w-[2px] bg-honey-400 transition-opacity duration-150',
          isLive ? 'opacity-60 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-60',
        ].join(' ')}
      />

      {/* Header: icon tile (larger, drop shadow) + number + slug badge */}
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={[
              'flex h-11 w-11 items-center justify-center rounded-lg',
              'shadow-[var(--shadow-tile)]',
              isLive ? 'accent-gradient' : 'bg-ink-800 ring-1 ring-ink-700',
            ].join(' ')}
          >
            <Icon className={['h-5 w-5', isLive ? 'text-ink-950' : 'text-ink-400'].join(' ')} />
          </div>
          <span className="font-mono text-[10px] text-ink-500">{number}</span>
        </div>
        <SlugBadge slug={site.slug} isLive={isLive} />
      </div>

      {/* Name + tagline */}
      <h3
        itemProp="name"
        className="relative mt-3.5 font-display text-[17px] font-700 leading-tight tracking-tight text-ink-50"
      >
        {site.name}
      </h3>
      <p className={['relative mt-1 text-[12px] font-500', isLive ? 'text-honey-400' : 'text-ink-500'].join(' ')}>
        {site.tagline}
      </p>

      {/* Description */}
      <p
        itemProp="description"
        className="relative mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink-400"
      >
        {site.description}
      </p>

      {/* Hidden schema fields — not rendered visually but available to crawlers */}
      <meta itemProp="applicationCategory" content={site.category === 'Tools' ? 'DeveloperApplication' : 'WebApplication'} />
      <meta itemProp="operatingSystem" content="Any (web browser)" />
      <meta itemProp="offers" content='{"@type":"Offer","price":"0","priceCurrency":"USD"}' />

      {/* Feature chips */}
      {site.features.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1">
          {site.features.map((f) => (
            <span
              key={f}
              className="rounded border border-ink-700 bg-ink-700/50 px-1.5 py-0.5 font-mono text-[9.5px] text-ink-300 transition-colors group-hover:border-ink-600"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Footer: source link + open affordance. mt-auto pins to bottom. */}
      <div
        className="relative mt-auto flex items-center justify-between border-t border-ink-800 pt-2.5"
        style={{ marginTop: '0.875rem' }}
      >
        <a
          href={site.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 -m-1 flex items-center gap-1 rounded p-1 text-[10px] text-ink-500 outline-none transition-colors hover:text-ink-200 focus-visible:ring-2 focus-visible:ring-honey-400"
          aria-label={`View ${site.name} source on GitHub`}
          onClick={(e) => e.stopPropagation()}
        >
          <Code className="h-3 w-3" />
          <span className="font-mono">src</span>
        </a>
        <span
          className={[
            'flex items-center gap-1 text-[11px] font-600 transition-colors',
            isLive
              ? 'text-ink-200 group-hover:text-honey-300'
              : 'text-ink-500 group-hover:text-ink-300',
          ].join(' ')}
        >
          {isLive ? 'Open' : 'Repo'}
          {isLive ? (
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </div>
    </article>
  )
}

/**
 * SlugBadge — the URL path segment, in mono.
 *
 * Replaces the old "live/soon" pill. The honey dot pulses for live
 * sites; "soon" projects show a static ink dot. Cleaner than the old
 * '*' suffix — the dot signals status at a glance.
 */
function SlugBadge({ slug, isLive }: { slug: string; isLive: boolean }) {
  return (
    <span
      className={[
        'shrink-0 inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 font-mono text-[9.5px]',
        isLive
          ? 'border-ink-700 bg-ink-800 text-ink-300'
          : 'border-ink-800 bg-ink-900 text-ink-500',
      ].join(' ')}
    >
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          isLive
            ? 'bg-honey-400 animate-[pulse-dot_2s_ease-in-out_infinite]'
            : 'bg-ink-500',
        ].join(' ')}
      />
      /{slug}
    </span>
  )
}
