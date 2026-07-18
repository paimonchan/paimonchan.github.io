/**
 * Theme store — Zustand + persist. Single source of truth for dark/light.
 *
 * Mirrors paimon-tools' pattern but under a gateway-specific localStorage key
 * so the two sites don't fight over the same slot.
 */
import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'paimon.gateway.theme' }
  )
)

/**
 * Mount-once effect that mirrors the store's theme onto <html>'s class list.
 * The Tailwind dark variant + the seeded `class="dark"` in index.html both key
 * off this class, so toggling it here is enough — no flash on load.
 */
export function ThemeEffect() {
  const theme = useThemeStore((s) => s.theme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  return null
}

/** Convenience selector hook. */
export const useTheme = () => useThemeStore()
