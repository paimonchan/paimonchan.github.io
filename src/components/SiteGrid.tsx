/**
 * SiteGrid - renders all sites in ONE grid, live and coming-soon together.
 *
 * Previous version split "Live" (cards) and "Coming next" (a different inline
 * strip) into two visually unrelated sections, which read as an awkward bolt-on.
 * Now everything is the same card component. The live/soon status pill on each
 * card is enough to tell them apart; there is no need for a separate layout.
 *
 * Live sites sort first so the working stuff leads. Auto-fill minmax keeps the
 * grid hole-free regardless of how many cards are in it.
 */
import type { SiteWithIcon } from '../sites.config'
import SiteCard from './SiteCard'

interface SiteGridProps {
  sites: SiteWithIcon[]
}

export default function SiteGrid({ sites }: SiteGridProps) {
  if (sites.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-5">
        <p className="text-sm text-ink-400">No projects match that filter.</p>
      </div>
    )
  }

  // Live first, then soon - stable, predictable ordering.
  const ordered = [...sites].sort((a, b) => {
    if (a.status === b.status) return 0
    return a.status === 'live' ? -1 : 1
  })

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-5">
      <div
        className="grid gap-3 sm:gap-3.5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
      >
        {ordered.map((site, i) => (
          <SiteCard key={site.id} site={site} index={i} />
        ))}
      </div>
    </div>
  )
}
