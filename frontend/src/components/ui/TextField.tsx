import type { InputHTMLAttributes } from 'react'

type TextFieldProps = {
  label: string
  hint?: string
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export function TextField({
  id,
  label,
  hint,
  className = '',
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name

  return (
    <label className={`flex w-full flex-col gap-2 text-left ${className}`} htmlFor={fieldId}>
      <span
        className="text-[var(--text-muted)]"
        style={{ fontSize: 'var(--font-size-caption)' }}
      >
        {label}
      </span>
      <input
        id={fieldId}
        className={[
          'w-full min-h-[var(--touch-min)] bg-transparent px-0 py-2',
          'border-0 border-b border-[var(--border)] rounded-none',
          'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50',
          'outline-none transition-colors duration-200',
          'focus:border-[var(--accent)]',
          'disabled:opacity-40',
        ].join(' ')}
        style={{ fontSize: 'var(--font-size-body)', lineHeight: 'var(--line-height-body)' }}
        {...props}
      />
      {hint ? (
        <span
          className="text-[var(--text-muted)]"
          style={{ fontSize: '0.8125rem' }}
        >
          {hint}
        </span>
      ) : null}
    </label>
  )
}
