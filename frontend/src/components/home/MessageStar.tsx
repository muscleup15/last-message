import { StarDot } from '../motion/StarDot'

type MessageStarProps = {
  className?: string
  visible?: boolean
}

export function MessageStar({ className = '', visible = true }: MessageStarProps) {
  if (!visible) return null

  return (
    <div
      className={`flex justify-center ${className}`}
      style={{
        minHeight: '1.25rem',
        animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 40ms both',
      }}
      aria-hidden
    >
      <span
        className="inline-flex"
        style={{
          animation: 'message-star-breathe 5.5s ease-in-out 1s infinite',
        }}
      >
        <StarDot size={6} />
      </span>
    </div>
  )
}
