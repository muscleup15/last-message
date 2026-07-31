import type { ReactNode } from 'react'
import { StarField } from './StarField'

type NightSkyProps = {
  children?: ReactNode
  className?: string
}

export function NightSky({ children, className = '' }: NightSkyProps) {
  return (
    <div
      className={`relative min-h-svh overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--bg-deep)',
        backgroundImage:
          'radial-gradient(ellipse 90% 70% at 50% 18%, #141a28 0%, var(--bg-deep) 62%)',
        animation: 'sky-fade-in var(--duration-enter) var(--ease-out-soft) both',
      }}
    >
      <StarField />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
