type EmptyStateProps = {
  message: string
  className?: string
}

export function EmptyState({ message, className = '' }: EmptyStateProps) {
  return (
    <p
      className={`m-0 text-center text-[var(--text-muted)] ${className}`}
      style={{
        fontSize: 'var(--font-size-caption)',
        lineHeight: 'var(--line-height-body)',
      }}
    >
      {message}
    </p>
  )
}
