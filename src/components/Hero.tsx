/**
 * Hero - the page's top section.
 *
 * Plain and direct: a value-prop headline (not a second wordmark - the header
 * already has one), one line of context with the author, and a small live/soon
 * stat. Solid colors only - no gradient text, no ambient glow blob.
 *
 * The search filter only renders when there are enough projects to justify it
 * (see SEARCH_THRESHOLD). Below that the list is faster to scan than to query.
 */
import { Search, X } from 'lucide-react'
import type { StatusFilter } from '../hooks/useFilter'

interface HeroProps {
  query: string
  onQueryChange: (q: string) => void
  matchCount: number
  liveCount: number
  ongoingCount: number
  soonCount: number
  statusFilter: StatusFilter
  onStatusFilterChange: (s: StatusFilter) => void
  showSearch: boolean
}

export default function Hero({
  query,
  onQueryChange,
  matchCount,
  liveCount,
  ongoingCount,
  soonCount,
  statusFilter,
  onStatusFilterChange,
  showSearch,
}: HeroProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-8 pb-5 animate-[fade-in_0.4s_ease-out_0.1s_both] sm:px-5 md:pt-12 md:pb-7">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-honey-400">
          paimonchan.io
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-[32px] font-700 leading-[1.05] tracking-tight text-ink-50 text-balance md:text-[44px]">
          Every project, one doorway.
        </h1>
        <p className="mx-auto mt-3.5 max-w-md text-pretty text-[13.5px] leading-relaxed text-ink-400 md:text-[14.5px]">
          Privacy-first browser tools, real-time apps, and whatever comes next.
          Built in the open by{' '}
          <a
            href="https://github.com/paimonchan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-500 text-honey-400 underline decoration-honey-500/40 underline-offset-2 transition-colors hover:decoration-honey-400"
          >
            @paimonchan
          </a>
          .
        </p>

        {/* Stats line — segmented control that filters the grid */}
        <div
          role="group"
          aria-label="Filter projects by status"
          className="mt-4 inline-flex items-center gap-0.5 rounded-full border border-ink-600 bg-ink-800/70 p-0.5"
        >
          <StatusPill
            active={statusFilter === 'all'}
            onClick={() => onStatusFilterChange('all')}
            label="all"
            count={liveCount + ongoingCount + soonCount}
            dotClass="bg-ink-400"
          />
          <StatusPill
            active={statusFilter === 'live'}
            onClick={() => onStatusFilterChange('live')}
            label="live"
            count={liveCount}
            dotClass="bg-honey-400"
          />
          {ongoingCount > 0 && (
            <StatusPill
              active={statusFilter === 'ongoing'}
              onClick={() => onStatusFilterChange('ongoing')}
              label="ongoing"
              count={ongoingCount}
              dotClass="bg-honey-600/80"
            />
          )}
          {soonCount > 0 && (
            <StatusPill
              active={statusFilter === 'soon'}
              onClick={() => onStatusFilterChange('soon')}
              label="coming"
              count={soonCount}
              dotClass="bg-ink-400"
            />
          )}
        </div>
      </div>

      {/* Search - only when there's enough to filter */}
      {showSearch && (
        <div className="mx-auto mt-4 max-w-md">
          <div className="group relative flex items-center">
            <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink-400 transition-colors group-focus-within:text-honey-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Filter projects by name or keyword"
              aria-label="Filter projects"
              className="w-full rounded-lg border border-ink-600 bg-ink-900 py-2.5 pl-11 pr-16 text-sm text-ink-100 placeholder:text-ink-400 transition-colors focus:border-honey-500/70 focus:shadow-[0_0_0_3px_rgba(231,172,52,0.10)] focus-visible:outline-none"
            />
            {query ? (
              <button
                onClick={() => onQueryChange('')}
                aria-label="Clear filter"
                className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-md text-ink-500 transition-colors hover:bg-ink-800 hover:text-ink-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <span className="absolute right-3 flex items-center gap-1 text-[11px] text-ink-500">
                <span className="kbd">/</span>
              </span>
            )}
          </div>
          {(query || statusFilter !== 'all') && (
            <div className="mt-1.5 text-center text-[11px] text-ink-500">
              <span className="font-mono text-ink-300">{matchCount}</span> of{' '}
              <span className="font-mono">
                {statusFilter === 'all'
                  ? liveCount + ongoingCount + soonCount
                  : statusFilter === 'live'
                    ? liveCount
                    : statusFilter === 'ongoing'
                      ? ongoingCount
                      : soonCount}
              </span>{' '}
              projects
            </div>
          )}
        </div>
      )}
    </section>
  )
}

/** One clickable status pill in the hero segmented control. */
function StatusPill({
  active,
  onClick,
  label,
  count,
  dotClass,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  dotClass: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-colors',
        active
          ? 'bg-ink-900 text-ink-100 ring-1 ring-inset ring-ink-600'
          : 'text-ink-300 hover:text-ink-100 hover:bg-ink-900/50',
      ].join(' ')}
    >
      <span className={['h-1.5 w-1.5 rounded-full', dotClass].join(' ')} />
      <span className="font-mono">{count}</span>
      <span>{label}</span>
    </button>
  )
}
