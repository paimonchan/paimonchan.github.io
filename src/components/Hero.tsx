/**
 * Hero — the page's top section: wordmark, tagline, and a search/filter input.
 *
 * Padding dialed way down from the first pass so the card grid is visible
 * without scrolling. Heading uses gradient text; the search input is a glass
 * pill with a honey focus ring. A single ambient honey glow sits behind the
 * wordmark to give the page a focal point without adding clutter.
 *
 * The search input is controlled state lifted to App (via props) so the grid
 * re-renders without prop drilling through extra layers.
 */
import { Search, X } from 'lucide-react'

interface HeroProps {
  query: string
  onQueryChange: (q: string) => void
  matchCount: number
  total: number
}

export default function Hero({ query, onQueryChange, matchCount, total }: HeroProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-6 sm:px-5 md:pt-14 md:pb-8">
      {/* Ambient honey glow behind the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-48 w-[36rem] max-w-[90vw] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--color-honey-500) 22%, transparent), transparent 70%)',
        }}
      />

      <div className="text-center">
        <h1 className="font-display text-4xl font-700 tracking-tight text-ink-50 md:text-5xl">
          Paimon<span className="text-gradient-honey">.io</span>
        </h1>
        <p className="mx-auto mt-2.5 max-w-lg text-pretty text-sm leading-relaxed text-ink-400 md:text-[15px]">
          A doorway to my io projects — privacy-first browser tools, real-time
          apps, and whatever comes next.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mt-5 max-w-md">
        <div className="group relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink-500 transition-colors group-focus-within:text-honey-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Filter projects by name or keyword…"
            aria-label="Filter projects"
            className="glass w-full rounded-xl border border-ink-700/70 py-2.5 pl-11 pr-16 text-sm text-ink-100 placeholder:text-ink-500 transition-all focus:border-honey-500/50 focus-visible:outline-none focus-visible:ring-0"
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
          <div className="mt-1.5 text-center text-[11px] text-ink-500">
            <span className="font-mono text-ink-300">{matchCount}</span> of{' '}
            <span className="font-mono">{total}</span> projects
          </div>
        )}
      </div>
    </section>
  )
}
