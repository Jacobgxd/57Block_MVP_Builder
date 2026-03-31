import React from 'react'
import Logo from '../ui/Logo'

const Footer = () => {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.07)] py-8 px-10 bg-white flex items-center gap-6 flex-wrap">
      <div className="flex items-center gap-2 text-body-sm font-bold text-ink-2">
        <Logo size={18} className="!rounded" />
        Blueprint
      </div>
      <div className="text-caption text-subtle">
        by 57Blocks — AI-powered MVP delivery platform
      </div>
      <div className="ml-auto flex gap-6">
        {['Product', 'Roadmap', 'Contact'].map((item) => (
          <a key={item} href="#" className="text-[13px] text-muted no-underline hover:text-ink-2 transition-colors">
            {item}
          </a>
        ))}
        <a href="https://57blocks.com" target="_blank" rel="noopener noreferrer"
          className="text-[13px] text-muted no-underline hover:text-ink-2 transition-colors">
          57blocks.com
        </a>
      </div>
    </footer>
  )
}

export default Footer
