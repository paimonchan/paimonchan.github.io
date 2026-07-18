/**
 * SiteCard — one io project rendered as a directory card.
 *
 * Visual language adapted from paimon-tools' Sidebar list item, scaled up for
 * a directory: hairline border, accent-gradient icon tile, status pill, and an
 * "Open ↗" affordance. The whole card is a link to the live site; the source
 * link is a separate, stop-propagation anchor so clicking it doesn't navigate.
 *
 * "soon" projects render muted and link to their repo (there's no live site).
 */
import { ArrowUpRight, Code } from 'lucide-react'
import type { SiteWithIcon } from '../sites.config'

export default function SiteCard({ site, index }: { site: SiteWithIcon; index: number }) {
  const { Icon } = site
  const isLive = site.status === 'live'
  const href = isLive ? site.url : site.repo

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${Math.min(index * 60, 360)}ms` }}
      className={[
        'group relative flex animate-[slide-up_0.25s_cubic-bezier(0.16,1,0.3,1)_both]',
        'flex-col rounded-xl border bg-ink-900/60 p-5 transition-colors duration-150',
        isLive
          ? 'border-ink-800 hover:border-honey-500/50 hover:bg-ink-800/50'
          : 'border-ink-800/60 hover:border-ink-700 hover:bg-ink-900',
      ].join(' ')}
    >
      {/* Header row: icon tile + status pill */}
      <div className="flex items-start justify-between">
        <div
          className={[
            'flex h-11 w-11 items-center justify-center rounded-lg shadow-inner',
            isLive ? 'accent-gradient' : 'bg-ink-800',
          ].join(' ')}
        >
          <Icon className={['h-5 w-5', isLive ? 'text-ink-950' : 'text-ink-500'].join(' ')} />
        </div>

        <StatusPill status={site.status} />
      </div>

      {/* Name + tagline */}
      <h3 className="mt-4 font-display text-[17px] font-600 leading-snug text-ink-50">
        {site.name}
      </h3>
      <p className="mt-0.5 text-[12px] font-500 text-honey-300/80">{site.tagline}</p>

      {/* Description */}
      <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-ink-400">{site.description}</p>

      {/* Footer row: source link + open affordance */}
      <div className="mt-4 flex items-center justify-between border-t border-ink-800/80 pt-3">
        <a
          href={site.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 text-[11px] text-ink-500 transition-colors hover:text-ink-200"
          aria-label={`View ${site.name} source on GitHub`}
        >
          <Code className="h-3.5 w-3.5" />
          <span>source</span>
        </a>

        <span
          className={[
            'flex items-center gap-1 text-[12px] font-500 transition-all',
            isLive
              ? 'text-ink-300 group-hover:translate-x-0.5 group-hover:text-honey-200'
              : 'text-ink-500',
          ].join(' ')}
        >
          {isLive ? 'Open' : 'Repo'}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  )
}

function StatusPill({ status }: { status: 'live' | 'soon' }) {
  if (status === 'live') {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-600 uppercase tracking-wider text-emerald-300">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        live
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-800/60 px-2 py-0.5 text-[10px] font-600 uppercase tracking-wider text-ink-500">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-500" />
      soon
    </span>
  )
}
