/**
 * ThemeToggle — small dark/light switch button.
 * Reads from the theme store; the actual DOM class flip happens in <ThemeEffect/>.
 */
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../stores/theme-store'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-800/50 px-2.5 py-1.5 text-xs font-500 text-ink-200 transition-colors hover:border-honey-500/50 hover:text-honey-200"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
