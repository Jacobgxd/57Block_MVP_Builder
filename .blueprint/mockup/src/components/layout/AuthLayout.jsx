import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../ui/Logo'

const AuthLayout = ({ children, artContent }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left: Form */}
      <div className="flex flex-col py-10 px-14">
        <div
          className="flex items-center gap-[9px] text-[17px] font-bold text-ink-2 tracking-[-0.02em] cursor-pointer no-underline mb-12"
          onClick={() => navigate('/')}
        >
          <Logo size={30} />
          Blueprint
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-[400px]">
          {children}
        </div>
        <div className="mt-auto pt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted bg-transparent border-none cursor-pointer p-0 font-sans hover:text-ink-2 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to homepage
          </button>
        </div>
      </div>

      {/* Right: Art panel */}
      <div className="hidden md:flex items-center justify-center relative overflow-hidden p-10"
        style={{ background: 'linear-gradient(145deg, #f0e8ff 0%, #e8f0ff 50%, #e0f8ff 100%)' }}>
        <div className="absolute w-[500px] h-[500px] rounded-full top-[-100px] right-[-100px]"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.18) 0%, transparent 65%)' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-80px] left-[-80px]"
          style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.15) 0%, transparent 65%)' }} />
        <div className="relative z-[1] w-full max-w-[360px] p-8 rounded-xl border border-white/90 shadow-lg"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 24px 64px rgba(168,85,247,0.12)' }}>
          {artContent}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
