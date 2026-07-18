/**
 * SiteGrid — renders the (filtered) site list, grouped by section.
 *
 * Two render modes to avoid the "1 card in a 3-col grid = 2/3 empty" problem:
 *
 *  - **Live projects**: full bento cards in an auto-fit grid (CSS grid with
 *    minmax). Cards size to fill the row — no fixed 3-col layout that would
 *    leave holes when there are fewer items than columns.
 *  - **Coming next**: a compact horizontal strip. Each item is a small inline
 *    pill linking to its repo — much denser than a card and a better fit for
 *    "this doesn't exist yet" placeholders.
 *
 * Empty sections (wiped out by a filter) are skipped so the page stays dense.
 */
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES, type SiteWithIcon } from '../sites.config'
import SiteCard from './SiteCard'

interface SiteGridProps {
  sites: SiteWithIcon[]
}

const SOON_CATEGORY = 'Coming soon'

export default function SiteGrid({ sites }: SiteGridProps) {
  if (sites.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-5">
        <p className="text-sm text-ink-400">No projects match that filter.</p>
      </div>
    )
  }

  // Split: full-card sections vs. the "soon" inline strip.
  const cardSites = sites.filter((s) => s.category !== SOON_CATEGORY)
  const soonSites = sites.filter((s) => s.category === SOON_CATEGORY)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-5">
      {/* Full-card sections (Tools, Apps, …) grouped by category */}
      {CATEGORIES.filter((c) => c !== SOON_CATEGORY).map((category) => {
        const inCategory = cardSites.filter((s) => s.category === category)
        if (inCategory.length === 0) return null
        return (
          <section key={category} className="mb-6 last:mb-0">
            <SectionHeader label={category} count={inCategory.length} />
            <div
              className="grid gap-3 sm:gap-3.5"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              }}
            >
              {inCategory.map((site, i) => (
                <SiteCard key={site.id} site={site} index={i} />
              ))}
            </div>
          </section>
        )
      })}

      {/* Coming next — compact inline strip, not a card grid */}
      {soonSites.length > 0 && (
        <section className="mb-6 last:mb-0">
          <SectionHeader label={SOON_CATEGORY} count={soonSites.length} />
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {soonSites.map((site, i) => (
              <SoonItem key={site.id} site={site} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-2.5 flex items-center gap-3">
      <h2 className="text-[10px] font-600 uppercase tracking-[0.14em] text-ink-500">{label}</h2>
      <div className="h-px flex-1 bg-ink-800/70" />
      <span className="font-mono text-[10px] text-ink-600">{count}</span>
    </div>
  )
}

function SoonItem({ site, index }: { site: SiteWithIcon; index: number }) {
  const { Icon } = site
  return (
    <a
      href={site.repo}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
      className="group glass flex animate-[slide-up_0.25s_cubic-bezier(0.16,1,0.3,1)_both] items-center gap-2.5 rounded-xl border border-ink-800/70 px-3 py-2.5 transition-colors hover:border-ink-700 hover:bg-ink-900/70 sm:flex-1"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink-800 ring-1 ring-ink-700/60">
        <Icon className="h-3.5 w-3.5 text-ink-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-display text-[13px] font-600 text-ink-200">{site.name}</span>
          <span className="rounded-full border border-ink-700 bg-ink-800/60 px-1.5 py-px text-[8px] font-600 uppercase tracking-wider text-ink-500">
            soon
          </span>
        </div>
        <p className="truncate text-[11px] text-ink-500">{site.tagline}</p>
      </div>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-600 transition-all group-hover:translate-x-0.5 group-hover:text-honey-300" />
    </a>
  )
}
