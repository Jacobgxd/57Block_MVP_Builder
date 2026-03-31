import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const SignIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/onboarding')
    }, 1200)
  }

  return (
    <AuthLayout artContent={<DeliveryPackageArt />}>
      <h1 className="text-[28px] font-extrabold text-ink-2 tracking-[-0.03em] mb-1.5">Welcome back</h1>
      <p className="text-body-sm text-muted mb-9">Sign in with your invited email and password</p>

      <form onSubmit={handleSubmit}>
        <Input label="Email address" type="email" placeholder="you@company.com" />
        <Input label="Password" type="password" placeholder="Enter your password" />
        <div className="flex justify-end -mt-2.5 mb-[18px]">
          <Link to="/forgot-password" className="text-[13px] font-semibold text-primary-solid no-underline hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button size="lg" loading={loading} className="!w-full !rounded-pill">
          Sign in
        </Button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border-strong" />
        <span className="text-caption text-subtle">or</span>
        <div className="flex-1 h-px bg-border-strong" />
      </div>

      <p className="text-[13px] text-muted text-center">
        Don't have an account?{' '}
        <Link to="/request-access" className="font-semibold text-primary-solid no-underline hover:underline">
          Request access →
        </Link>
      </p>
    </AuthLayout>
  )
}

const DeliveryPackageArt = () => (
  <>
    <div className="text-[13px] font-bold text-ink-2 uppercase tracking-[0.06em] mb-5">
      Your delivery package
    </div>
    {[
      { icon: '📋', bg: 'bg-gradient-to-br from-[#f3e8ff] to-[#e8d5ff]', name: 'PRD', desc: 'Requirements baseline · v1.2', status: '✓ Confirmed' },
      { icon: '🎨', bg: 'bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd]', name: 'UI Spec + Design', desc: '10 screens · Paper linked', status: '✓ Confirmed' },
      { icon: '⚡', bg: 'bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0]', name: 'Mockup', desc: 'Clickable prototype · 2 rounds', status: '✓ Confirmed' },
      { icon: '⚙️', bg: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a]', name: 'Tech Spec', desc: 'LangGraph architecture', status: 'In progress' },
    ].map((item, i) => (
      <div key={i} className="flex items-center gap-3.5 py-3 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
        <div className={`w-9 h-9 rounded-sm flex items-center justify-center text-base flex-shrink-0 ${item.bg}`}>
          {item.icon}
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-ink-2">{item.name}</div>
          <div className="text-[11px] text-muted mt-px">{item.desc}</div>
        </div>
        <span className="text-[10px] font-bold px-2 py-[3px] rounded-pill bg-[rgba(168,85,247,0.1)] text-primary-solid border border-[rgba(168,85,247,0.2)] whitespace-nowrap">
          {item.status}
        </span>
      </div>
    ))}
    <div className="mt-4 pt-3.5 border-t border-[rgba(0,0,0,0.06)] text-caption text-muted">
      Blueprint MVP Platform · Phase 1
    </div>
  </>
)

export default SignIn
