/**
 * useFilter — lightweight client-side filter for the site directory.
 *
 * Matches a free-text query against each entry's name, tagline, description
 * and keyword list (case-insensitive). Returns the full list when the query
 * is empty. No external dep — just useMemo over the input.
 */
import { useMemo } from 'react'
import type { SiteWithIcon } from '../sites.config'

export function useFilter(sites: SiteWithIcon[], query: string): SiteWithIcon[] {
  const q = query.trim().toLowerCase()
  return useMemo(() => {
    if (!q) return sites
    return sites.filter((s) => {
      const haystack = [s.name, s.tagline, s.description, ...s.keywords]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [sites, q])
}
