type EarthFigureProps = {
  className?: string
}

export function EarthFigure({ className = '' }: EarthFigureProps) {
  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-[1] -translate-x-1/2 ${className}`}
      style={{ bottom: '42%' }}
      aria-hidden
    >
      <div
        style={{
          animation: 'earth-rise var(--duration-enter) var(--ease-out-soft) 180ms both',
        }}
      >
        <svg
          width="20"
          height="30"
          viewBox="0 0 18 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="9" cy="4" r="2.4" fill="var(--star)" fillOpacity="0.72" />
          <path
            d="M9 7.2V16.5"
            stroke="var(--star)"
            strokeOpacity="0.62"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* hands raised — fingertip = star origin/destination */}
          <path
            d="M9 10.2L3.5 6.2M9 10.2L14.5 6.2"
            stroke="var(--star)"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M9 16.5L5.2 24.5M9 16.5L12.8 24.5"
            stroke="var(--star)"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
