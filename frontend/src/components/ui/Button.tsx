import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'ghost'

type SharedProps = {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    to?: undefined
  }

type ButtonAsLink = SharedProps & {
  to: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

function variantClass(variant: ButtonVariant): string {
  if (variant === 'ghost') {
    return 'border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)]'
  }

  return 'border border-transparent bg-[var(--accent)] text-[var(--bg-deep)] hover:brightness-110 active:brightness-95'
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'touch-target inline-flex w-full items-center justify-center px-5',
    'rounded-[0.625rem] text-[0.9375rem] font-medium tracking-[-0.01em]',
    'transition-[background-color,filter,opacity] duration-200 ease-out',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    'disabled:pointer-events-none disabled:opacity-40',
    variantClass(variant),
    className,
  ].join(' ')

  if ('to' in props && props.to) {
    const { to } = props
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
