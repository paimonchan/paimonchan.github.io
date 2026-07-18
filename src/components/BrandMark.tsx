/**
 * BrandMark — the gateway's custom glyph.
 *
 * Portal: a ring with an outward arrow, signalling "this site is a doorway to
 * the others". Same honey gradient tile, same stroke weight as paimon-tools'
 * mark — same visual family, distinct identity. A subtle drop glow on the tile
 * edges gives it depth against the dark background.
 */
export default function BrandMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`accent-gradient relative flex items-center justify-center rounded-lg shadow-[0_4px_16px_-4px_color-mix(in_srgb,var(--color-honey-400)_60%,transparent)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 24 24"
        fill="none"
        className="text-ink-950"
      >
        {/* Ring (the doorway) */}
        <circle cx="10.5" cy="12" r="5.5" stroke="currentColor" strokeWidth="2.1" />
        {/* Arrow pointing out and up-right (through the doorway) */}
        <path
          d="M15 8.5 L19 4.5 M19 4.5 L15 4.5 M19 4.5 L19 8.5"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
