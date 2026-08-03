import type { ReactNode } from 'react'
import { BrandTitle } from '../brand/BrandTitle'
import { ArrivalReveal } from '../motion/ArrivalReveal'
import { SendDeparture } from '../motion/SendDeparture'
import { EarthScene } from './EarthScene'
import { MessageStar } from './MessageStar'

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
    <div className="relative flex min-h-0 flex-1 flex-col items-center">
      <div className="relative z-10 flex w-full max-w-[18rem] flex-1 flex-col items-center justify-center text-center">
        <MessageStar visible={mood === 'idle'} />

        <div className="mt-5">
          <BrandTitle />
        </div>

        <p
          className="mt-4 text-[var(--text-muted)]"
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

        <div className="mt-8 w-full">
          <EarthScene />
        </div>

        <div
          className="mt-8 flex w-full flex-col gap-3"
          style={{
            animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 320ms both',
          }}
        >
          {actions}
        </div>
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
