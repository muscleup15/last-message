type StarDotProps = {
  className?: string
  size?: number
  glow?: boolean
}

export function StarDot({ className = '', size = 6, glow = true }: StarDotProps) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--star)]"
        style={{
          width: size,
          height: size,
          boxShadow: glow ? '0 0 10px rgba(232, 228, 217, 0.45)' : undefined,
        }}
      />
      {glow ? (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 3.2,
            height: size * 3.2,
            background:
              'radial-gradient(circle, rgba(232, 228, 217, 0.18) 0%, rgba(232, 228, 217, 0) 70%)',
          }}
        />
      ) : null}
    </span>
  )
}
