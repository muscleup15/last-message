import type { ReactNode } from 'react'
import { BrandTitle } from '../brand/BrandTitle'

type HomeStageProps = {
  actions: ReactNode
}

export function HomeStage({ actions }: HomeStageProps) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        className="relative z-10 flex flex-1 flex-col items-center px-[var(--space-page)]"
        style={{ paddingTop: 'max(1.75rem, 7svh)' }}
      >
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

        <div className="min-h-[min(34svh,12rem)] flex-1" aria-hidden />
      </div>
    </div>
  )
}
