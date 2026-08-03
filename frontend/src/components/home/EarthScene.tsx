import { EarthFigure } from './EarthFigure'
import { EarthHorizon } from './EarthHorizon'

type EarthSceneProps = {
  className?: string
}

export function EarthScene({ className = '' }: EarthSceneProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: 'clamp(7.5rem, 22svh, 10rem)' }}
      aria-hidden
    >
      <EarthHorizon />
      <EarthFigure />
    </div>
  )
}
