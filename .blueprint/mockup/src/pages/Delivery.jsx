import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Delivery = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg-soft font-sans">
      {/* Top bar */}
      <div className="h-[72px] bg-white/80 backdrop-blur-lg border-b border-border flex items-center px-6 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-[15px] font-bold text-ink-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo size={26} />
          Blueprint
        </div>
        <span className="text-disabled mx-2">/</span>
        <span className="text-[13px] text-muted">My Project</span>
        <span className="text-disabled mx-2">/</span>
        <span className="text-[13px] font-semibold text-ink-2">Delivery Summary</span>
        <div className="ml-auto">
          <Button size="md" className="!rounded-pill">
            Export All ↓
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-6 p-6 max-w-product mx-auto">
        {/* Left sidebar */}
        <div>
          <Card className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-3">Delivery Assets</div>
            {[
              { name: 'PRD', status: 'Confirmed', version: 'v1.0' },
              { name: 'UI Spec', status: 'Confirmed', version: 'v1.0' },
              { name: 'Design', status: 'Confirmed', version: 'v1.0' },
              { name: 'Mockup', status: 'Confirmed', version: 'v1.0' },
              { name: 'Tech Spec', status: 'Confirmed', version: 'v1.0' },
            ].map((asset, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-[6px] cursor-pointer hover:bg-bg-soft transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                <span className="text-[13px] font-medium text-ink-2 flex-1">{asset.name}</span>
                <span className="text-[10px] font-bold text-subtle">{asset.version}</span>
              </div>
            ))}
          </Card>
          <Card className="p-4 mt-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-2">Project Info</div>
            <div className="text-caption text-muted">
              <p>Created: Mar 28, 2026</p>
              <p>Last updated: Mar 31, 2026</p>
              <p>Assets confirmed: 5/5</p>
            </div>
          </Card>
        </div>

        {/* Right content */}
        <div className="space-y-4">
          {/* Header summary */}
          <Card className="px-6 py-5">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-h3 font-extrabold text-ink-2">My Project — Delivery Summary</h1>
            </div>
            <div className="flex items-center gap-4 text-caption text-muted">
              <span>Last updated: Mar 31, 2026</span>
              <span>·</span>
              <span>All assets confirmed</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                Phase 1 complete
              </span>
            </div>
          </Card>

          {/* Summary blocks */}
          <Card className="px-6 py-5">
            <h3 className="text-body-sm font-bold text-ink-2 mb-3">Project Background</h3>
            <p className="text-[13px] text-muted leading-[1.7]">
              An AI-powered platform that transforms product ideas into structured, deliverable asset packages.
              Blueprint guides teams through PRD, UI Spec, Design, Mockup, and Tech Spec creation using
              a connected delivery chain where each asset feeds the next.
            </p>
          </Card>

          <Card className="px-6 py-5">
            <h3 className="text-body-sm font-bold text-ink-2 mb-3">Current Scope</h3>
            <ul className="text-[13px] text-muted leading-[1.7] pl-4 space-y-1.5 list-disc">
              <li>Structured PRD with version snapshots and baseline confirmation</li>
              <li>UI Spec covering 8 core screens with component inventory</li>
              <li>Hi-fi design linked via Paper with bi-directional sync</li>
              <li>Clickable Mockup with feedback attribution system</li>
              <li>Tech Spec covering architecture, APIs, and risk assessment</li>
            </ul>
          </Card>

          <Card className="px-6 py-5">
            <h3 className="text-body-sm font-bold text-ink-2 mb-3">Next Steps</h3>
            <div className="text-[13px] text-muted leading-[1.7] space-y-2">
              <p>1. Hand off the complete delivery package to the engineering team</p>
              <p>2. Engineering reviews Tech Spec and raises any questions</p>
              <p>3. Phase 2: Code repository generation from confirmed assets</p>
              <p>4. Phase 3: Automated deployment and live MVP acceptance</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Delivery
