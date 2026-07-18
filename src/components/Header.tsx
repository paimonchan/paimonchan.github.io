/**
 * Header — sticky top bar: brand mark + wordmark on the left, theme toggle
 * on the right. Glass surface (translucent + blur) with a hairline bottom edge.
 */
import BrandMark from './BrandMark'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="glass sticky top-0 z-30 border-b border-ink-800/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-5">
        <a href="/" className="flex items-center gap-2.5" aria-label="Paimon — home">
          <BrandMark size={28} />
          <div className="leading-none">
            <div className="font-display text-[14px] font-700 text-ink-50">
              Paimon<span className="text-gradient-honey">.io</span>
            </div>
            <div className="mt-0.5 text-[10px] text-ink-500">a hub of io projects</div>
          </div>
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
