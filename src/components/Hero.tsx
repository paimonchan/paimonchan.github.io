/**
 * Hero — the page's top section: wordmark, tagline, and a search/filter input
 * that drives the card grid below.
 *
 * The search input is plain controlled state lifted to App (via props) so the
 * grid re-renders without prop drilling through extra layers.
 */
import { Search, X } from 'lucide-react'

interface HeroProps {
  query: string
  onQueryChange: (q: string) => void
  matchCount: number
}

export default function Hero({ query, onQueryChange, matchCount }: HeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-16 pb-10 text-center md:pt-24 md:pb-14">
      <h1 className="font-display text-5xl font-700 tracking-tight text-ink-50 md:text-6xl">
        Paimon<span className="text-honey-400">.io</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-300 md:text-lg">
        A doorway to my io projects — privacy-first browser tools, real-time
        apps, and whatever comes next. Pick one and head through.
      </p>

      {/* Search */}
      <div className="mx-auto mt-8 max-w-md">
        <div className="group relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Filter projects…"
            aria-label="Filter projects"
            className="w-full rounded-xl border border-ink-700 bg-ink-900/70 py-2.5 pl-11 pr-20 text-sm text-ink-100 placeholder:text-ink-500 transition-colors focus:border-honey-500/60 focus-visible:outline-none focus-visible:ring-0"
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
        {query && (
          <div className="mt-2 text-[11px] text-ink-500">
            {matchCount} {matchCount === 1 ? 'match' : 'matches'}
          </div>
        )}
      </div>
    </section>
  )
}
