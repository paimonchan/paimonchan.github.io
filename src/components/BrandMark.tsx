/**
 * BrandMark - the gateway's custom glyph.
 *
 * A ring with an outward arrow: "this site is a doorway to the others".
 * Same honey gradient tile and stroke weight as paimon-tools' { } mark - one
 * visual family, distinct identity. Flat, no drop glow.
 */
export default function BrandMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`accent-gradient flex items-center justify-center rounded-md ${className}`}
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
