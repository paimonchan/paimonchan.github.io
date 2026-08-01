/**
 * useFilter — lightweight client-side filter for the site directory.
 *
 * Matches a free-text query against each entry's name, tagline, description
 * and keyword list (case-insensitive). Optionally narrows by status
 * ('live' | 'ongoing' | 'soon'), e.g. "show me only live projects".
 * Returns the full list when the query is empty and no status filter is set.
 * No external dep — just useMemo over the inputs.
 */
import { useMemo } from 'react'
import type { SiteWithIcon } from '../sites.config'

export type StatusFilter = 'all' | 'live' | 'ongoing' | 'soon'

export function useFilter(
  sites: SiteWithIcon[],
  query: string,
  status: StatusFilter = 'all'
): SiteWithIcon[] {
  const q = query.trim().toLowerCase()
  return useMemo(() => {
    let list = sites
    if (status !== 'all') {
      list = list.filter((s) => s.status === status)
    }
    if (!q) return list
    return list.filter((s) => {
      const haystack = [s.name, s.tagline, s.description, ...s.keywords]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [sites, q, status])
}
