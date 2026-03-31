import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import Logo from '../ui/Logo'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] h-[68px] flex items-center px-10 transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.07)]' : ''}`}
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <Link to="/" className="flex items-center gap-[9px] text-[17px] font-bold text-ink-2 no-underline tracking-[-0.02em]">
        <Logo size={32} />
        Blueprint
      </Link>

      <div className="hidden md:flex gap-1 items-center absolute left-1/2 -translate-x-1/2">
        <NavItem href="#capabilities">Capabilities</NavItem>
        <NavItem href="#roadmap">Roadmap</NavItem>
        <NavItem href="#how">How It Works</NavItem>
        <NavItem href="https://57blocks.com" external>57Blocks</NavItem>
      </div>

      <div className="ml-auto flex gap-2.5 items-center">
        <Button variant="ghost" size="sm" onClick={() => navigate('/signin')}
          className="!border-[1.5px] !border-[rgba(25,47,63,0.2)] !rounded-xs !text-ink-2 !font-medium hover:!border-[rgba(25,47,63,0.4)]">
          Sign in
        </Button>
        <Button size="sm" onClick={() => navigate('/request-access')}>
          Contact Us »
        </Button>
      </div>
    </nav>
  )
}

const NavItem = ({ children, href, external }) => {
  const handleClick = () => {
    if (external) {
      window.open(href, '_blank')
    } else if (href?.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <span
      onClick={handleClick}
      className="text-body-sm font-medium text-ink px-3.5 py-[7px] rounded-[6px] cursor-pointer border border-transparent transition-all duration-150 hover:text-ink-2 hover:bg-[rgba(0,0,0,0.03)]"
    >
      {children}
    </span>
  )
}

export default Navbar
