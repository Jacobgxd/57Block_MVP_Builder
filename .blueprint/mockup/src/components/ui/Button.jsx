import React from 'react'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-45'

  const variants = {
    primary: 'text-white border-none rounded-pill shadow-brand hover:-translate-y-px hover:opacity-90 active:translate-y-0',
    secondary: 'bg-white border border-border rounded-pill hover:border-[rgba(25,47,63,0.18)] hover:bg-bg-soft',
    ghost: 'bg-transparent border-none rounded-md text-muted hover:bg-[rgba(0,0,0,0.03)] hover:text-ink-2',
  }

  const sizes = {
    sm: 'h-9 px-[18px] text-body-sm',
    md: 'h-11 px-[18px] text-body-sm',
    lg: 'h-[52px] px-8 text-[15px]',
  }

  const gradientStyle = variant === 'primary' ? {
    background: 'var(--grad)',
    color: 'white',
  } : {}

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={gradientStyle}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
