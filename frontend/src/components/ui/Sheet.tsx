import type { ReactNode } from 'react'

type SheetProps = {
  children: ReactNode
  onClose: () => void
  ariaLabel: string
}

export function Sheet({ children, onClose, ariaLabel }: SheetProps) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-start"
      style={{
        paddingTop: 'max(1rem, calc(var(--safe-top) + 0.75rem))',
        paddingInline: 'clamp(0.75rem, 3.5vw, 1.25rem)',
        paddingBottom: 'max(1rem, var(--safe-bottom))',
      }}
    >
      <button
        type="button"
        className="absolute inset-0 border-0 bg-[rgba(5,6,10,0.22)]"
        aria-label="시트 닫기"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className="relative z-10 flex w-full flex-col overflow-hidden rounded-[1rem] border border-[var(--border)]"
        style={{
          maxWidth: 'min(100%, 24.5rem)',
          maxHeight: 'min(78svh, 38rem)',
          background: 'rgba(14, 18, 27, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 18px 48px rgba(0, 0, 0, 0.35)',
          animation: 'sheet-rise 420ms var(--ease-out-soft) both',
        }}
      >
        <div className="flex shrink-0 items-center justify-end px-3 pt-3 pb-1">
          <button
            type="button"
            onClick={onClose}
            className="touch-target border-0 bg-transparent px-2 text-[var(--text-muted)]"
            style={{ fontSize: 'var(--font-size-caption)' }}
          >
            닫기
          </button>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[var(--space-page)] pb-5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
