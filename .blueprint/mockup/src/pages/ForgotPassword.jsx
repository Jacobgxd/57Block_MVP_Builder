import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1200)
  }

  return (
    <AuthLayout artContent={<ForgotArt />}>
      {success ? (
        <div className="text-center py-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
            style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>✉️</div>
          <h2 className="text-h4 font-extrabold text-ink-2 mb-2">Check your inbox</h2>
          <p className="text-body-sm text-muted leading-relaxed">
            We've sent a password reset link to your email. It expires in 30 minutes.
          </p>
          <div className="mt-7">
            <Button size="md" onClick={() => navigate('/signin')}>Back to sign in</Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-[28px] font-extrabold text-ink-2 tracking-[-0.03em] mb-1.5">Reset your password</h1>
          <p className="text-body-sm text-muted mb-9">Enter your registered email and we'll send a reset link.</p>

          <form onSubmit={handleSubmit}>
            <Input label="Registered email" type="email" placeholder="you@company.com" className="!mb-7" />
            <Button size="lg" loading={loading} className="!w-full !rounded-pill">
              Send reset link
            </Button>
          </form>
          <div className="text-center mt-4">
            <Link to="/signin" className="text-[13px] font-semibold text-muted no-underline hover:text-ink-2 transition-colors">
              ← Back to sign in
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  )
}

const ForgotArt = () => (
  <div className="text-center px-4 py-6">
    <div className="text-5xl mb-4">🔐</div>
    <div className="text-body font-bold text-ink-2 mb-2">Secure & invite-only</div>
    <p className="text-[13px] text-muted leading-[1.65]">
      Blueprint uses invite-only access. If you don't have an account yet, request access from the homepage.
    </p>
  </div>
)

export default ForgotPassword
