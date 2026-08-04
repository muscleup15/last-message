const METEORS = [
  { top: '7%', left: '92%', delay: '0s', duration: '6.5s', length: 72, angle: 128 },
  { top: '12%', left: '78%', delay: '1.8s', duration: '7.2s', length: 58, angle: 122 },
  { top: '5%', left: '98%', delay: '3.4s', duration: '6.8s', length: 64, angle: 132 },
  { top: '18%', left: '85%', delay: '5.1s', duration: '7.6s', length: 50, angle: 125 },
  { top: '10%', left: '70%', delay: '6.8s', duration: '7s', length: 54, angle: 118 },
] as const

export function ShootingStars() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {METEORS.map((meteor, index) => (
        <span
          key={index}
          className="shooting-star absolute"
          style={{
            top: meteor.top,
            left: meteor.left,
            width: meteor.length,
            ['--meteor-angle' as string]: `${meteor.angle}deg`,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  )
}
