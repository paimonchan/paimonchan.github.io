/**
 * Footer — slim, hairline-topped. GitHub link on the left, a small "no
 * tracking" ethos note on the right. Static year via the browser clock —
 * fine for a client-rendered SPA.
 */
import { Code, ShieldCheck } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-6 text-[12px] text-ink-500 sm:flex-row">
        <div className="flex items-center gap-4">
          <span>© {year} paimonchan</span>
          <a
            href="https://github.com/paimonchan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-ink-200"
          >
            <Code className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/70" />
          <span>Static · no tracking · no cookies</span>
        </div>
      </div>
    </footer>
  )
}
