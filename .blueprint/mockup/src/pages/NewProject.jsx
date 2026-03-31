import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import Input, { Textarea, Select } from '../components/ui/Input'
import Button from '../components/ui/Button'

const NewProject = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/workspace/prd')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-bg-soft flex flex-col">
      {/* Top bar */}
      <div className="h-16 bg-white border-b border-border flex items-center px-10 gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-[9px] text-base font-bold text-ink-2">
          <Logo size={28} />
          Blueprint
        </div>
        <div className="flex items-center gap-2 text-[13px] text-muted">
          <span className="text-disabled">/</span>
          <span>Projects</span>
          <span className="text-disabled">/</span>
          <span className="text-ink-2 font-semibold">New project</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: 'var(--grad)' }}>J</div>
          <span className="text-[13px] font-semibold text-ink-2">Jane Smith</span>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex justify-center px-10 py-12">
        <div className="w-full max-w-[640px]">
          <h1 className="text-[26px] font-extrabold text-ink-2 tracking-[-0.03em] mb-1">
            Create a new Blueprint project
          </h1>
          <p className="text-body-sm text-muted mb-8">
            Fill in the basics — Blueprint will initialize your full delivery package automatically
          </p>

          <div className="bg-white border border-border rounded-[18px] p-8 shadow-sm">
            <form onSubmit={handleSubmit}>
              <Input label="Project name *" placeholder="e.g. Blueprint MVP Platform" />
              <Textarea label="Product description *" placeholder="Briefly describe what your product does and the core problem it solves…" />

              <div className="grid grid-cols-3 gap-3.5">
                <Select
                  label="Industry / Type *"
                  options={[
                    { value: '', label: 'Select…' },
                    'SaaS / Tools',
                    'Education / Learning',
                    'HR / Recruiting',
                    'Fintech',
                    'Healthcare',
                    'E-commerce',
                    'Consumer App',
                    'Enterprise',
                    'Other',
                  ]}
                />
                <Input label="Target users *" placeholder="e.g. Small team PMs" />
                <Select
                  label="Target platform"
                  options={['Web (default)']}
                  disabled
                />
              </div>

              <div className="h-px bg-border my-[22px]" />

              <Button size="lg" loading={loading} className="!w-full !rounded-pill">
                Create project and go to PRD →
              </Button>
              <p className="text-[11px] text-subtle text-center mt-3.5">
                Blueprint will auto-initialize 6 delivery assets: PRD · UI Spec · Design · Mockup · Tech Spec · Delivery Summary
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProject
