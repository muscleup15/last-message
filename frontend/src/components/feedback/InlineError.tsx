type InlineErrorProps = {
  message: string
  className?: string
}

export function InlineError({ message, className = '' }: InlineErrorProps) {
  return (
    <p
      role="alert"
      className={`m-0 text-[var(--danger)] ${className}`}
      style={{
        fontSize: 'var(--font-size-caption)',
        lineHeight: 'var(--line-height-body)',
      }}
    >
      {message}
    </p>
  )
}
