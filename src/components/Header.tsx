/**
 * Header — sticky top bar: brand mark + wordmark on the left, theme toggle
 * on the right. Hairline bottom border, no drop shadow (matches the design
 * language of paimon-tools).
 */
import BrandMark from './BrandMark'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-800 bg-ink-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-3">
          <BrandMark size={32} />
          <div className="leading-tight">
            <div className="font-display text-[15px] font-700 text-ink-50">
              Paimon<span className="text-honey-400">.io</span>
            </div>
            <div className="text-[11px] text-ink-400">a hub of io projects</div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
