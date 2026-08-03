type EarthHorizonProps = {
  className?: string
}

export function EarthHorizon({ className = '' }: EarthHorizonProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}
      style={{
        height: '100%',
        animation: 'earth-rise var(--duration-enter) var(--ease-out-soft) 80ms both',
      }}
      aria-hidden
    >
      <svg
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '-78%',
          width: 'min(150%, 28rem)',
          height: 'auto',
        }}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="earth-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#1a2233" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#0c1018" stopOpacity="1" />
            <stop offset="100%" stopColor="#07090f" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="earth-limb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(168, 180, 200, 0.22)" />
            <stop offset="18%" stopColor="rgba(168, 180, 200, 0.06)" />
            <stop offset="100%" stopColor="rgba(168, 180, 200, 0)" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="198" fill="url(#earth-glow)" />
        <circle
          cx="200"
          cy="200"
          r="198"
          stroke="url(#earth-limb)"
          strokeWidth="1.25"
          fill="none"
        />
      </svg>
    </div>
  )
}
