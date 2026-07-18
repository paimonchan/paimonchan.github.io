/**
 * SiteGrid — renders the (filtered) site list, grouped by category.
 *
 * Tighter than the first pass: section spacing dialed down, category headers
 * sit closer to the grid, and the grid itself uses smaller gaps on mobile.
 * Empty categories (wiped out by a filter) are skipped so the page stays dense.
 */
import { CATEGORIES, type SiteWithIcon } from '../sites.config'
import SiteCard from './SiteCard'

interface SiteGridProps {
  sites: SiteWithIcon[]
}

export default function SiteGrid({ sites }: SiteGridProps) {
  if (sites.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12 text-center">
        <p className="text-sm text-ink-400">No projects match that filter.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-5">
      {CATEGORIES.map((category) => {
        const inCategory = sites.filter((s) => s.category === category)
        if (inCategory.length === 0) return null
        return (
          <section key={category} className="mb-6 last:mb-0">
            <div className="mb-2.5 flex items-center gap-3">
              <h2 className="text-[10px] font-600 uppercase tracking-[0.14em] text-ink-500">
                {category}
              </h2>
              <div className="h-px flex-1 bg-ink-800/70" />
              <span className="font-mono text-[10px] text-ink-600">{inCategory.length}</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3">
              {inCategory.map((site, i) => (
                <SiteCard key={site.id} site={site} index={i} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
