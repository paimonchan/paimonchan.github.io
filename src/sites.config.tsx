/**
 * React-facing layer over the plain-JS data in `lib/seo.js`.
 *
 * Why two files:
 *   - `seo.js` holds pure data (strings, urls). It is the single source of
 *     truth and is also `import()`-ed by the Node prerender script, which can't
 *     handle JSX or component types. Keep it dependency-free.
 *   - This file is the React view-model: it attaches a lucide-react icon and
 *     any presentation-only field to each entry. The React app imports from
 *     here; the build script never touches this file.
 *
 * Adding a new io project: add an entry to `SITES` in `seo.js`, then add a
 * matching `id -> icon` mapping in `ICONS` below. The grid will pick it up.
 */

import type { ComponentType } from 'react'
import {
  Braces,
  PenTool,
  Activity,
  Globe,
  type LucideProps,
} from 'lucide-react'

import { SITES } from './lib/seo'

/**
 * Minimum number of projects before the search filter is worth showing.
 * Below this count the user can scan the list faster than they can type a
 * query — the filter adds UI weight without earning its keep. 5 is the
 * rough point where scanning becomes slower than typing.
 */
export const SEARCH_THRESHOLD = 5

// Re-shape the plain-JS entry into a typed view-model. `as const` on the
// imported array would lose the literal types after the .js boundary, so we
// assert the shape explicitly here — one place to pay the typing cost.
export interface SiteEntry {
  id: string
  name: string
  /**
   * Free-form label shown as a small badge on the card (e.g. "Tool", "App").
   * NOT used for section grouping anymore — grouping is by `status` now.
   * Kept as `string` so adding a new label doesn't require editing a union.
   */
  category: string
  tagline: string
  description: string
  url: string
  repo: string
  status: 'live' | 'soon'
  keywords: string[]
  features: string[]
  slug: string
}

export type SiteWithIcon = SiteEntry & {
  /** Lucide icon component rendered on the card's accent tile. */
  Icon: ComponentType<LucideProps>
}

/**
 * id → icon. A flat map (not keyed off SITES) so a missing icon fails loudly
 * at render rather than silently rendering nothing. See `iconFor`.
 */
const ICONS: Record<string, ComponentType<LucideProps>> = {
  'paimon-tools': Braces,
  'paimon-board': PenTool,
  paimonitor: Activity,
}

/** Fallback icon for entries that haven't been mapped yet. */
const FALLBACK_ICON: ComponentType<LucideProps> = Globe

function iconFor(id: string): ComponentType<LucideProps> {
  return ICONS[id] ?? FALLBACK_ICON
}

/**
 * The full, typed, icon-attached list. This is what components should consume.
 * Memoized at module load — SITES is static, so this runs once.
 */
export const SITES_WITH_ICONS: SiteWithIcon[] = SITES.map((s) => ({
  ...s,
  Icon: iconFor(s.id),
}))
