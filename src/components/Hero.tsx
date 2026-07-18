/**
 * Hero — the page's top section.
 *
 * Compactly delivers three things:
 *   1. A value-prop headline (not a second wordmark — the one in the header is
 *      enough). Tells the visitor what this page *is*, not just whose it is.
 *   2. Context: who built it + a small live/coming stat line, so first-time
 *      visitors immediately know "is this alive? how much is here?"
 *   3. The search filter — but ONLY when there are enough projects to justify
 *      it (see SEARCH_THRESHOLD). Below that count the list is faster to scan
 *      than to type a query, so the input would just add UI weight.
 */
import { Search, X } from 'lucide-react'

interface HeroProps {
  query: string
  onQueryChange: (q: string) => void
  matchCount: number
  liveCount: number
  soonCount: number
  showSearch: boolean
}

export default function Hero({
  query,
  onQueryChange,
  matchCount,
  liveCount,
  soonCount,
  showSearch,
}: HeroProps) {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-8 pb-5 sm:px-5 md:pt-12 md:pb-7">
      {/* Ambient honey glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-44 w-[34rem] max-w-[90vw] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 30%, color-mix(in srgb, var(--color-honey-500) 20%, transparent), transparent 70%)',
        }}
      />

      <div className="text-center">
        <h1 className="font-display text-[28px] font-700 leading-tight tracking-tight text-ink-50 md:text-[34px]">
          One doorway to every <span className="text-gradient-honey">io project</span>.
        </h1>
        <p className="mx-auto mt-2 max-w-md text-pretty text-[13px] leading-relaxed text-ink-400 md:text-sm">
          Privacy-first browser tools, real-time apps, and whatever comes next —
          all built in the open by{' '}
          <a
            href="https://github.com/paimonchan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-honey-300/90 underline decoration-honey-500/30 underline-offset-2 transition-colors hover:decoration-honey-400"
          >
            @paimonchan
          </a>
          .
        </p>

        {/* Stats line: how much is alive here */}
        <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-ink-300">{liveCount}</span> live
          </span>
          {soonCount > 0 && (
            <>
              <span className="text-ink-700">·</span>
              <span>
                <span className="font-mono text-ink-300">{soonCount}</span> coming
              </span>
            </>
          )}
        </div>
      </div>

      {/* Search — only when there's enough to filter */}
      {showSearch && (
        <div className="mx-auto mt-4 max-w-md animate-[fade-in_0.18s_ease-out]">
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
              <span className="font-mono">{liveCount + soonCount}</span> projects
            </div>
          )}
        </div>
      )}
    </section>
  )
}
