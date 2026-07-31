const STARS = [
  { x: 8, y: 12, size: 1.2, opacity: 0.55, delay: 0 },
  { x: 22, y: 8, size: 1, opacity: 0.35, delay: 1.2 },
  { x: 41, y: 18, size: 1.4, opacity: 0.7, delay: 0.4 },
  { x: 63, y: 6, size: 1, opacity: 0.4, delay: 2.1 },
  { x: 78, y: 15, size: 1.1, opacity: 0.5, delay: 0.8 },
  { x: 91, y: 11, size: 1.3, opacity: 0.65, delay: 1.6 },
  { x: 14, y: 32, size: 1, opacity: 0.3, delay: 2.8 },
  { x: 33, y: 28, size: 1.2, opacity: 0.55, delay: 0.2 },
  { x: 52, y: 36, size: 1, opacity: 0.35, delay: 1.9 },
  { x: 71, y: 30, size: 1.5, opacity: 0.75, delay: 0.6 },
  { x: 88, y: 40, size: 1, opacity: 0.4, delay: 2.4 },
  { x: 5, y: 52, size: 1.1, opacity: 0.45, delay: 1.1 },
  { x: 27, y: 58, size: 1, opacity: 0.3, delay: 3.2 },
  { x: 46, y: 48, size: 1.3, opacity: 0.6, delay: 0.9 },
  { x: 68, y: 55, size: 1, opacity: 0.35, delay: 2.0 },
  { x: 84, y: 62, size: 1.2, opacity: 0.5, delay: 1.4 },
  { x: 12, y: 72, size: 1, opacity: 0.28, delay: 2.6 },
  { x: 38, y: 78, size: 1.4, opacity: 0.55, delay: 0.3 },
  { x: 57, y: 70, size: 1, opacity: 0.32, delay: 1.7 },
  { x: 76, y: 82, size: 1.1, opacity: 0.48, delay: 2.9 },
  { x: 95, y: 74, size: 1, opacity: 0.38, delay: 0.5 },
  { x: 19, y: 88, size: 1.2, opacity: 0.42, delay: 1.3 },
  { x: 49, y: 92, size: 1, opacity: 0.3, delay: 2.2 },
  { x: 82, y: 90, size: 1.3, opacity: 0.58, delay: 0.7 },
] as const

export function StarField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {STARS.map((star, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-[var(--star)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            ['--star-opacity' as string]: star.opacity,
            opacity: star.opacity,
            animation: `star-twinkle ${4.5 + (index % 5) * 0.7}s ease-in-out ${star.delay}s infinite`,
            boxShadow:
              star.opacity > 0.6
                ? `0 0 ${star.size * 3}px rgba(232, 228, 217, 0.25)`
                : undefined,
          }}
        />
      ))}
    </div>
  )
}
