import type { TextareaHTMLAttributes } from 'react'

type TextAreaProps = {
  label: string
  hint?: string
  className?: string
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>

export function TextArea({
  id,
  label,
  hint,
  className = '',
  ...props
}: TextAreaProps) {
  const fieldId = id ?? props.name

  return (
    <label className={`flex w-full flex-col gap-2 text-left ${className}`} htmlFor={fieldId}>
      <span
        className="text-[var(--text-muted)]"
        style={{ fontSize: 'var(--font-size-caption)' }}
      >
        {label}
      </span>
      <textarea
        id={fieldId}
        className={[
          'w-full min-h-[8.5rem] resize-none bg-transparent px-0 py-2',
          'border-0 border-b border-[var(--border)] rounded-none',
          'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50',
          'outline-none transition-colors duration-200',
          'focus:border-[var(--accent)]',
          'disabled:opacity-40',
        ].join(' ')}
        style={{
          fontSize: 'var(--font-size-message)',
          lineHeight: 'var(--line-height-message)',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
        }}
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
