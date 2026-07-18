/**
 * Header - sticky top bar: brand mark + wordmark on the left, theme toggle
 * on the right. Solid surface with a hairline bottom border.
 */
import BrandMark from './BrandMark'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-5">
        <a href="/" className="flex items-center gap-2.5" aria-label="paimonchan.io home">
          <BrandMark size={26} />
          <div className="leading-none">
            <div className="font-display text-[14px] font-700 text-ink-50">
              paimonchan<span className="text-honey-400">.io</span>
            </div>
            <div className="mt-0.5 text-[10px] text-ink-500">a hub of io projects</div>
          </div>
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
