const HOME_BACKDROP_SRC = '/images/home-star-astronaut-cartoon.png'

type HomeBackdropProps = {
  className?: string
}

export function HomeBackdrop({ className = '' }: HomeBackdropProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <img
        src={HOME_BACKDROP_SRC}
        alt=""
        className="h-full w-full object-cover object-center"
        style={{
          animation: 'sky-fade-in var(--duration-enter) var(--ease-out-soft) both',
        }}
        draggable={false}
      />
      {/* Soft top veil so brand/CTA stay readable */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '48%',
          background:
            'linear-gradient(to bottom, rgba(7, 9, 15, 0.42) 0%, rgba(7, 9, 15, 0.12) 55%, rgba(7, 9, 15, 0) 100%)',
        }}
      />
    </div>
  )
}
