/**
 * SiteCard — one io project rendered as a directory card.
 *
 * Modern bento-style: gradient icon tile with a soft honey glow, glass surface,
 * hover lift + border glow. Density dialed up with a category label and
 * feature badges so each card carries real information, not air.
 *
 * The whole card is a link to the live site; the source link is a separate,
 * stop-propagation anchor so clicking it doesn't navigate away.
 *
 * "soon" projects render muted and link to their repo (no live site).
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
      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
      className={[
        'group relative flex animate-[slide-up_0.25s_cubic-bezier(0.16,1,0.3,1)_both]',
        'flex-col rounded-2xl border p-4 transition-all duration-200',
        'glass',
        isLive
          ? 'border-ink-700/60 hover:-translate-y-1 hover:border-honey-500/40 hover:shadow-lift'
          : 'border-ink-800/60 hover:border-ink-700',
      ].join(' ')}
    >
      {/* Honey glow that fades in on hover — only for live projects. */}
      {isLive && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--color-honey-400) 14%, transparent), transparent 70%)',
          }}
        />
      )}

      {/* Header row: icon tile + category label + status pill */}
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={[
              'flex h-10 w-10 items-center justify-center rounded-xl shadow-inner transition-transform duration-200',
              isLive
                ? 'accent-gradient group-hover:scale-110'
                : 'bg-ink-800 ring-1 ring-ink-700/60',
            ].join(' ')}
          >
            <Icon className={['h-[18px] w-[18px]', isLive ? 'text-ink-950' : 'text-ink-500'].join(' ')} />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-ink-500">
            {site.category}
          </span>
        </div>
        <StatusPill status={site.status} />
      </div>

      {/* Name + tagline */}
      <h3 className="relative mt-3 font-display text-[15px] font-600 leading-tight text-ink-50">
        {site.name}
      </h3>
      <p
        className={[
          'relative mt-0.5 text-[11px] font-500',
          isLive ? 'text-honey-300/85' : 'text-ink-500',
        ].join(' ')}
      >
        {site.tagline}
      </p>

      {/* Description — clamped so cards stay aligned. */}
      <p className="relative mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink-400">
        {site.description}
      </p>

      {/* Feature badges */}
      {site.features.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1">
          {site.features.map((f) => (
            <span
              key={f}
              className={[
                'rounded-md border px-1.5 py-0.5 font-mono text-[9.5px] tracking-tight',
                isLive
                  ? 'border-ink-700/60 bg-ink-800/50 text-ink-300'
                  : 'border-ink-800 bg-ink-900/60 text-ink-500',
              ].join(' ')}
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Footer row: source link + open affordance */}
      <div className="relative mt-auto flex items-center justify-between border-t border-ink-800/70 pt-2.5"
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
            'flex items-center gap-0.5 text-[11px] font-500 transition-all',
            isLive
              ? 'text-ink-300 group-hover:translate-x-0.5 group-hover:text-honey-200'
              : 'text-ink-500',
          ].join(' ')}
        >
          {isLive ? 'Open' : 'Repo'}
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </a>
  )
}

function StatusPill({ status }: { status: 'live' | 'soon' }) {
  if (status === 'live') {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-600 uppercase tracking-wider text-emerald-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
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
