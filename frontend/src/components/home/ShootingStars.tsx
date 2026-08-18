const METEORS = [
  { top: '8%', left: '72%', delay: '0s', duration: '6.5s', length: 72, angle: 128 },
  { top: '14%', left: '58%', delay: '1.8s', duration: '7.2s', length: 58, angle: 122 },
  { top: '6%', left: '84%', delay: '3.4s', duration: '6.8s', length: 64, angle: 132 },
  { top: '20%', left: '66%', delay: '5.1s', duration: '7.6s', length: 50, angle: 125 },
  { top: '11%', left: '48%', delay: '6.8s', duration: '7s', length: 54, angle: 118 },
] as const

export function ShootingStars() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 z-[1] h-full w-full overflow-hidden"
      aria-hidden
    >
      {METEORS.map((meteor, index) => (
        <div
          key={index}
          className="shooting-star"
          style={{
            top: meteor.top,
            left: meteor.left,
            width: meteor.length,
            rotate: `${meteor.angle}deg`,
            animation: `shooting-star-fall ${meteor.duration} linear ${meteor.delay} infinite`,
            WebkitAnimation: `shooting-star-fall ${meteor.duration} linear ${meteor.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}
