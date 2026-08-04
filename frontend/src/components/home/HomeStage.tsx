import type { ReactNode } from 'react'
import { BrandTitle } from '../brand/BrandTitle'
import { ArrivalReveal } from '../motion/ArrivalReveal'
import { SendDeparture } from '../motion/SendDeparture'
import { HomeBackdrop } from './HomeBackdrop'
import { ShootingStars } from './ShootingStars'

export type HomeMood = 'idle' | 'sending' | 'receiving'

type HomeStageProps = {
  mood: HomeMood
  onSendComplete: () => void
  onReceiveComplete: () => void
  actions: ReactNode
}

export function HomeStage({
  mood,
  onSendComplete,
  onReceiveComplete,
  actions,
}: HomeStageProps) {
  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col"
      style={{
        marginInline: 'calc(var(--space-page) * -1)',
        marginBlock: 'calc(var(--space-page) * -1)',
        width: 'calc(100% + (var(--space-page) * 2))',
        minHeight: 'calc(100% + (var(--space-page) * 2))',
      }}
    >
      <HomeBackdrop />
      <ShootingStars />

      <div
        className="relative z-10 flex flex-1 flex-col items-center px-[var(--space-page)]"
        style={{ paddingTop: 'max(1.75rem, 7svh)' }}
      >
        {/* Sky band: brand + CTAs stay in upper ~55% */}
        <div className="flex w-full max-w-[18rem] flex-col items-center text-center">
          <BrandTitle />
          <p
            className="mt-3 text-[var(--text-muted)]"
            style={{
              maxWidth: '12.5rem',
              fontSize: 'var(--font-size-caption)',
              lineHeight: 1.7,
              animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 220ms both',
            }}
          >
            시간이 지나도
            <br />
            닿는 마음
          </p>

          <div
            className="mt-8 flex w-full flex-col gap-3"
            style={{
              animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 320ms both',
            }}
          >
            {actions}
          </div>
        </div>

        {/* Leaves lower third for the star + astronaut in the artwork */}
        <div className="min-h-[min(34svh,12rem)] flex-1" aria-hidden />
      </div>

      {mood === 'sending' ? (
        <SendDeparture variant="preview" onComplete={onSendComplete} />
      ) : null}
      {mood === 'receiving' ? (
        <ArrivalReveal variant="preview" onComplete={onReceiveComplete} />
      ) : null}
    </div>
  )
}
