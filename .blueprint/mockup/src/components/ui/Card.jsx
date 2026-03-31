import React from 'react'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white border border-border rounded-[18px] shadow-xs ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
