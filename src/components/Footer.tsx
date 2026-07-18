/**
 * Footer - slim, hairline-topped. Author + source link on the left, the
 * "no tracking" ethos line on the right.
 */
import { Code, ShieldCheck } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t border-ink-800 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 text-[11px] text-ink-500 sm:px-5">
        <div className="flex items-center gap-3">
          <span>© {year} paimonchan</span>
          <a
            href="https://github.com/paimonchan/paimonchan.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors hover:text-ink-200"
          >
            <Code className="h-3 w-3" />
            <span className="font-mono">source</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-emerald-500/70" />
          <span>Static. No tracking, no cookies.</span>
        </div>
      </div>
    </footer>
  )
}
