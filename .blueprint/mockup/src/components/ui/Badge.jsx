import React from 'react'

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    info: 'bg-info-soft text-info',
    warning: 'bg-warning-soft text-warning',
    success: 'bg-success-soft text-success',
    error: 'bg-error-soft text-error',
    neutral: 'bg-[#f3f5fb] text-muted',
    brand: 'bg-[rgba(168,85,247,0.1)] text-primary-solid border border-[rgba(168,85,247,0.2)]',
  }

  return (
    <span className={`inline-flex items-center h-7 px-2.5 rounded-pill text-caption font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
