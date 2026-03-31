import React from 'react'

const Logo = ({ size = 32, className = '' }) => {
  return (
    <div
      className={`rounded-[7px] flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: 'var(--grad)',
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" width={size * 0.5} height={size * 0.5}>
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" fill="white" />
        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" fill="white" opacity="0.5" />
        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" fill="white" opacity="0.5" />
        <rect x="9" y="9" width="5.5" height="5.5" rx="1" fill="white" />
      </svg>
    </div>
  )
}

export default Logo
