/**
 * SiteGrid — renders the (filtered) site list, grouped by category.
 *
 * Iterates CATEGORIES in canonical order and renders a section per category
 * that has at least one match. This keeps empty categories from showing up
 * when a search filter wipes them out, and preserves a stable visual order.
 */
import { SITES_WITH_ICONS, CATEGORIES, type SiteWithIcon } from '../sites.config'
import SiteCard from './SiteCard'

interface SiteGridProps {
  sites: SiteWithIcon[]
}

export default function SiteGrid({ sites }: SiteGridProps) {
  if (sites.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-20 text-center">
        <p className="text-sm text-ink-400">No projects match that filter.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20">
      {CATEGORIES.map((category) => {
        const inCategory = sites.filter((s) => s.category === category)
        if (inCategory.length === 0) return null
        return (
          <section key={category} className="mb-10 last:mb-0">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-[10px] font-600 uppercase tracking-[0.14em] text-ink-500">
                {category}
              </h2>
              <div className="h-px flex-1 bg-ink-800/80" />
              <span className="text-[10px] text-ink-600">{inCategory.length}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

// Re-export for App so it doesn't need to import the config module separately.
export { SITES_WITH_ICONS }
