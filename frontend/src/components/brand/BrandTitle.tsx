type BrandTitleProps = {
  as?: 'h1' | 'p'
  className?: string
}

export function BrandTitle({ as: Tag = 'h1', className = '' }: BrandTitleProps) {
  return (
    <Tag
      className={`m-0 font-semibold text-[var(--star)] ${className}`}
      style={{
        fontSize: 'var(--font-size-brand)',
        letterSpacing: 'var(--tracking-brand)',
        animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 120ms both',
      }}
    >
      Last Message
    </Tag>
  )
}
