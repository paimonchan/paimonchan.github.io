/**
 * SiteCard - one io project rendered as a directory card.
 *
 * Flat by design: solid surface, hairline border, a quiet hover that just
 * shifts the border and arrow. No glow, lift, or scale - those piled-up
 * effects are exactly what makes a page read as auto-generated. The card's
 * only accent is the gradient icon tile.
 *
 * Navigation policy:
 *   - Main click -> SAME TAB for live sites (same-domain sibling, feels like
 *     internal navigation; cmd/ctrl-click still opens new tab).
 *   - Source link -> NEW TAB (external github.com reference).
 *
 * "soon" cards render muted and link to their repo (no live site yet).
 */
import { ArrowRight, ExternalLink, Code } from 'lucide-react'
import type { SiteWithIcon } from '../sites.config'

export default function SiteCard({ site, index }: { site: SiteWithIcon; index: number }) {
  const { Icon } = site
  const isLive = site.status === 'live'
  const href = isLive ? site.url : site.repo

  return (
    <a
      href={href}
      {...(!isLive ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
      className={[
        'group relative flex animate-[slide-up_0.2s_ease-out_both] flex-col rounded-lg border p-4',
        'transition-colors duration-150',
        isLive
          ? 'border-ink-800 bg-ink-900 hover:border-ink-700 hover:bg-ink-900/80'
          : 'border-ink-900 bg-ink-950 hover:border-ink-800',
      ].join(' ')}
    >
      {/* Header: icon tile + status pill */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={[
              'flex h-9 w-9 items-center justify-center rounded-md',
              isLive ? 'accent-gradient' : 'bg-ink-800 ring-1 ring-ink-700/50',
            ].join(' ')}
          >
            <Icon className={['h-[17px] w-[17px]', isLive ? 'text-ink-950' : 'text-ink-500'].join(' ')} />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-600">
            {site.category}
          </span>
        </div>
        <StatusPill status={site.status} />
      </div>

      {/* Name + tagline */}
      <h3 className="mt-3 font-display text-[15px] font-600 leading-tight text-ink-50">
        {site.name}
      </h3>
      <p className={['mt-0.5 text-[11px] font-500', isLive ? 'text-honey-400' : 'text-ink-500'].join(' ')}>
        {site.tagline}
      </p>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink-400">
        {site.description}
      </p>

      {/* Feature chips */}
      {site.features.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {site.features.map((f) => (
            <span
              key={f}
              className="rounded border border-ink-800 bg-ink-900 px-1.5 py-0.5 font-mono text-[9.5px] text-ink-400"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Footer: source link + open affordance. mt-auto pins it to bottom. */}
      <div className="mt-auto flex items-center justify-between border-t border-ink-800/80 pt-2.5"
           style={{ marginTop: '0.75rem' }}>
        <a
          href={site.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[10px] text-ink-500 transition-colors hover:text-ink-200"
          aria-label={`View ${site.name} source on GitHub`}
        >
          <Code className="h-3 w-3" />
          <span className="font-mono">src</span>
        </a>
        <span
          className={[
            'flex items-center gap-1 text-[11px] font-500 transition-colors',
            isLive
              ? 'text-ink-300 group-hover:text-honey-300'
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
    </a>
  )
}

function StatusPill({ status }: { status: 'live' | 'soon' }) {
  if (status === 'live') {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-600 uppercase tracking-wider text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        live
      </span>
    )
  }
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink-700 bg-ink-800/60 px-1.5 py-0.5 text-[9px] font-600 uppercase tracking-wider text-ink-500">
      <span className="h-1 w-1 rounded-full bg-ink-500" />
      soon
    </span>
  )
}
