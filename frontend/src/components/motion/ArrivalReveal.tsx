import { useEffect, useRef } from 'react'
import { StarDot } from './StarDot'

type ArrivalRevealProps = {
  variant?: 'preview' | 'full'
  onComplete: () => void
}

const DURATION_MS = {
  preview: 1100,
  full: 1700,
} as const

export function ArrivalReveal({ variant = 'preview', onComplete }: ArrivalRevealProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const duration = DURATION_MS[variant]

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onCompleteRef.current()
    }, duration + 40)

    return () => window.clearTimeout(timer)
  }, [duration])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      <div
        className="absolute left-1/2"
        style={{
          animation: `arrival-reveal ${duration}ms var(--ease-out-soft) both`,
        }}
      >
        <StarDot size={variant === 'full' ? 7 : 6} />
      </div>
    </div>
  )
}
