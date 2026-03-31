import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Invite = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pw, setPw] = useState('')

  const strength = (() => {
    if (!pw) return null
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score <= 1 ? 'weak' : score <= 2 ? 'fair' : 'strong'
  })()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/onboarding') }, 1500)
  }

  return (
    <AuthLayout artContent={<InviteArt />}>
      <h1 className="text-[28px] font-extrabold text-ink-2 tracking-[-0.03em] mb-1.5">Complete registration</h1>
      <p className="text-body-sm text-muted mb-6">You've been invited by 57Blocks. Set your password to continue.</p>

      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm bg-[rgba(34,197,94,0.06)] border-[1.5px] border-[rgba(34,197,94,0.25)] mb-6">
        <span className="w-[7px] h-[7px] rounded-full bg-[#22c55e] flex-shrink-0" style={{ animation: 'glowPulse 2s ease-in-out infinite' }} />
        <span className="text-[13px] font-semibold text-ink-2">jane@acme.com</span>
        <span className="ml-auto text-[10px] font-bold text-[#16a34a] bg-[rgba(22,163,74,0.1)] px-2 py-[2px] rounded-pill">Verified ✓</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-[18px]">
          <label className="block text-caption font-semibold text-ink-2 mb-1.5">New password</label>
          <input
            type="password"
            placeholder="At least 8 characters"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full py-[11px] px-3.5 font-sans text-body-sm border-[1.5px] border-border-strong rounded-sm bg-white text-ink-2 outline-none transition-all focus:border-[rgba(109,103,255,0.45)] focus:shadow-[0_0_0_4px_rgba(109,103,255,0.10)] placeholder:text-disabled"
          />
          {pw && (
            <>
              <div className="flex gap-1 mt-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i}
                    className={`flex-1 h-[3px] rounded-sm transition-colors ${
                      strength === 'weak' && i < 1 ? 'bg-error' :
                      strength === 'fair' && i < 2 ? 'bg-[#f59e0b]' :
                      strength === 'strong' && i < 4 ? 'bg-[#22c55e]' : 'bg-border-strong'
                    }`} />
                ))}
              </div>
              <div className={`text-[11px] mt-1 ${strength === 'weak' ? 'text-error' : strength === 'fair' ? 'text-[#f59e0b]' : 'text-[#22c55e]'}`}>
                {strength === 'weak' ? 'Weak' : strength === 'fair' ? 'Fair' : 'Strong'}
              </div>
            </>
          )}
        </div>
        <Input label="Confirm password" type="password" placeholder="Re-enter your password" className="!mb-7" />
        <Button size="lg" loading={loading} className="!w-full !rounded-pill">
          Complete registration & get started →
        </Button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border-strong" />
        <span className="text-caption text-subtle">or</span>
        <div className="flex-1 h-px bg-border-strong" />
      </div>

      <p className="text-[13px] text-muted text-center">
        Already set up?{' '}
        <Link to="/signin" className="font-semibold text-primary-solid no-underline hover:underline">Sign in →</Link>
      </p>
    </AuthLayout>
  )
}

const InviteArt = () => (
  <>
    <div className="text-[13px] font-bold text-ink-2 uppercase tracking-[0.06em] mb-5">You're almost in</div>
    <p className="text-[13px] text-muted leading-[1.7]">
      Once you complete registration, you'll land in Blueprint and can start building your first delivery package immediately.
    </p>
    <div className="mt-5 flex flex-col gap-2.5">
      {[
        { n: '1', active: true, text: 'Complete registration' },
        { n: '2', active: false, text: 'Quick onboarding walkthrough' },
        { n: '3', active: false, text: 'Create your first project' },
      ].map((s, i) => (
        <div key={i} className={`flex items-center gap-2.5 text-[13px] ${s.active ? 'text-ink-2' : 'text-muted'}`}>
          <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] flex-shrink-0 ${
            s.active ? 'text-white' : 'bg-bg-soft border border-border-strong text-subtle'
          }`} style={s.active ? { background: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(34,211,238,0.15))' } : {}}>
            {s.n}
          </div>
          {s.text}
        </div>
      ))}
    </div>
    <div className="mt-5 pt-3.5 border-t border-[rgba(0,0,0,0.06)] text-caption text-muted">
      Invite-only · by 57Blocks
    </div>
  </>
)

export default Invite
