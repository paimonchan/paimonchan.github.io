/**
 * App — root component for the gateway.
 *
 * Single-page directory: Header, Hero (with conditional search filter), the
 * status-grouped SiteGrid, and a Footer. The theme effect syncs the dark
 * class on <html>.
 *
 * The search query is the only piece of top-level state — it flows down to the
 * Hero (controlled input) and the grid (filtered list). The filter UI itself
 * only appears once the project count crosses SEARCH_THRESHOLD; below that the
 * raw list is faster to scan than to query.
 */
import { useEffect, useState } from 'react'

import { ThemeEffect } from './stores/theme-store'
import { useFilter } from './hooks/useFilter'
import { SITES_WITH_ICONS, SEARCH_THRESHOLD } from './sites.config'
import Header from './components/Header'
import Hero from './components/Hero'
import SiteGrid from './components/SiteGrid'
import Footer from './components/Footer'

function Gateway() {
  const [query, setQuery] = useState('')

  const liveCount = SITES_WITH_ICONS.filter((s) => s.status === 'live').length
  const soonCount = SITES_WITH_ICONS.filter((s) => s.status === 'soon').length

  // Only render the search box when filtering would actually pay off.
  const showSearch = SITES_WITH_ICONS.length >= SEARCH_THRESHOLD

  const filtered = useFilter(SITES_WITH_ICONS, query)

  // "/" focuses the search box; Escape clears it. Skip when there's no box.
  useEffect(() => {
    if (!showSearch) return
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'
      if (e.key === '/' && !typing) {
        e.preventDefault()
        ;(document.querySelector('input[aria-label="Filter projects"]') as HTMLInputElement | null)?.focus()
      }
      if (e.key === 'Escape' && query) {
        setQuery('')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query, showSearch])

  return (
    <div className="flex min-h-screen flex-col bg-ink-950 text-ink-100">
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <Hero
          query={query}
          onQueryChange={setQuery}
          matchCount={filtered.length}
          liveCount={liveCount}
          soonCount={soonCount}
          showSearch={showSearch}
        />
        <SiteGrid sites={filtered} />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ThemeEffect />
      <Gateway />
    </>
  )
}
