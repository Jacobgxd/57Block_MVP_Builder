import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Input, { Textarea } from '../components/ui/Input'
import Button from '../components/ui/Button'

const RequestAccess = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState([])

  const roles = ['PM / Product', 'Designer', 'Founder', 'Engineer', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1400)
  }

  return (
    <AuthLayout artContent={<WhatYouGetArt />}>
      {success ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>✓</div>
          <h2 className="text-h4 font-extrabold text-ink-2 mb-2">Request received!</h2>
          <p className="text-body-sm text-muted leading-relaxed">
            Thanks for your interest in Blueprint. We'll review your request and send you an invite link within 2–3 business days.
          </p>
          <div className="mt-7">
            <Button size="md" onClick={() => navigate('/')}>Back to homepage</Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-[28px] font-extrabold text-ink-2 tracking-[-0.03em] mb-1.5">Request access</h1>
          <p className="text-body-sm text-muted mb-9">Blueprint is invite-only. Tell us about yourself and we'll be in touch.</p>

          <form onSubmit={handleSubmit}>
            <Input label="Full name" placeholder="Jane Smith" />
            <Input label="Work email" type="email" placeholder="jane@company.com" />
            <Input label="Company / Team" placeholder="Acme Corp" />
            <Textarea label="What are you building?" placeholder="Briefly describe your product idea or use case…" />
            <div className="mb-[18px]">
              <label className="block text-caption font-semibold text-ink-2 mb-1.5">Role</label>
              <div className="flex gap-1.5 flex-wrap mt-2">
                {roles.map((role) => (
                  <span key={role}
                    onClick={() => setSelectedRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role])}
                    className={`text-[11px] px-2.5 py-[3px] rounded-pill font-semibold cursor-pointer transition-all border
                      ${selectedRoles.includes(role) ? 'bg-[rgba(168,85,247,0.15)] border-[rgba(168,85,247,0.4)] text-[#7c3aed]' : 'bg-[rgba(168,85,247,0.08)] border-[rgba(168,85,247,0.2)] text-[#7c3aed] hover:bg-[rgba(168,85,247,0.15)]'}`}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <Button size="lg" loading={loading} className="!w-full !rounded-pill !mt-2">
              Submit request »
            </Button>
          </form>
          <p className="text-caption text-subtle text-center mt-3">
            Already have an invite?{' '}
            <Link to="/invite" className="font-semibold text-primary-solid no-underline hover:underline">
              Set up your account →
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  )
}

const WhatYouGetArt = () => (
  <>
    <div className="text-[13px] font-bold text-ink-2 uppercase tracking-[0.06em] mb-5">
      What you'll get in Phase 1
    </div>
    {[
      { icon: '📋', bg: 'bg-gradient-to-br from-[#f3e8ff] to-[#e8d5ff]', name: 'Structured PRD', desc: 'Versioned requirements baseline' },
      { icon: '🎨', bg: 'bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd]', name: 'UI Spec + Hi-fi Design', desc: 'Interface spec drives the visuals' },
      { icon: '⚡', bg: 'bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0]', name: 'Clickable Mockup', desc: 'Validate UX before you build' },
      { icon: '⚙️', bg: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a]', name: 'Tech Spec', desc: 'Ready-to-hand-off to engineering' },
    ].map((item, i) => (
      <div key={i} className="flex items-center gap-3.5 py-3 border-b border-[rgba(0,0,0,0.05)] last:border-b-0">
        <div className={`w-9 h-9 rounded-sm flex items-center justify-center text-base flex-shrink-0 ${item.bg}`}>{item.icon}</div>
        <div>
          <div className="text-[13px] font-semibold text-ink-2">{item.name}</div>
          <div className="text-[11px] text-muted mt-px">{item.desc}</div>
        </div>
      </div>
    ))}
    <div className="mt-4 pt-3.5 border-t border-[rgba(0,0,0,0.06)] text-caption text-muted">
      Invite-only · by 57Blocks
    </div>
  </>
)

export default RequestAccess
