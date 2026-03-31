import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import Button from '../components/ui/Button'

const STEPS = [
  {
    tag: 'Step 01 — Overview',
    title: <>What is Blueprint, and <em className="font-serif italic font-normal">what does it solve?</em></>,
    body: (
      <>
        <p>You have a product idea. But turning that into something your engineering team can actually build requires structured requirements, design specs, a prototype, and a technical blueprint — all connected and versioned.</p>
        <p className="mt-4"><strong className="text-ink-2 font-semibold">Blueprint does that for you.</strong> One AI assistant. One unified workspace. A complete delivery package at the end — not a one-off demo.</p>
        <ul className="pl-5 mt-3 flex flex-col gap-2">
          <li>PRD — structured requirements doc</li>
          <li>UI Spec + Design — interface specification & hi-fi visuals</li>
          <li>Mockup — clickable prototype to validate UX</li>
          <li>Tech Spec — architecture & API design ready for engineering</li>
        </ul>
      </>
    ),
  },
  {
    tag: 'Step 02 — The Workflow',
    title: <>Six steps. <em className="font-serif italic font-normal">Each feeds the next.</em></>,
    body: (
      <>
        <p>Blueprint guides you through a structured delivery chain where every asset becomes the input for the next:</p>
        <ul className="pl-5 mt-3 flex flex-col gap-2">
          <li><strong className="text-ink-2 font-semibold">Idea clarification</strong> — describe what you're building in plain language</li>
          <li><strong className="text-ink-2 font-semibold">PRD</strong> — AI generates structured requirements; you review, iterate, confirm</li>
          <li><strong className="text-ink-2 font-semibold">UI Spec + Design</strong> — interface spec drives hi-fi design; edit in Paper, sync back</li>
          <li><strong className="text-ink-2 font-semibold">Mockup</strong> — clickable prototype to validate the core experience</li>
          <li><strong className="text-ink-2 font-semibold">Tech Spec</strong> — architecture, APIs, risk flags — ready for engineering handoff</li>
        </ul>
        <p className="mt-4">You only talk to <strong className="text-ink-2 font-semibold">Blueprint AI</strong>. Multiple specialist agents run in the background automatically.</p>
      </>
    ),
  },
  {
    tag: 'Step 03 — Your Input',
    title: <>What you need <em className="font-serif italic font-normal">to provide</em></>,
    body: (
      <>
        <p>Blueprint handles all the generation. Here's what you bring:</p>
        <ul className="pl-5 mt-3 flex flex-col gap-2">
          <li><strong className="text-ink-2 font-semibold">Your idea</strong> — describe it in plain language, no structure needed</li>
          <li><strong className="text-ink-2 font-semibold">Feedback & review</strong> — tell Blueprint AI what to change or confirm</li>
          <li><strong className="text-ink-2 font-semibold">Optional design inputs</strong> — reference screenshots, brand colors, or style preferences</li>
          <li><strong className="text-ink-2 font-semibold">Baseline confirmations</strong> — explicitly confirm each asset version before moving on</li>
        </ul>
        <p className="mt-4">Estimated time to a full delivery package: <strong className="text-ink-2 font-semibold">2–4 hours of active collaboration</strong>.</p>
      </>
    ),
  },
  {
    tag: 'Step 04 — Confirm & Iterate',
    title: <>Baselines, <em className="font-serif italic font-normal">rollback, and safe iteration</em></>,
    body: (
      <>
        <p>Every asset in Blueprint has a version snapshot system:</p>
        <ul className="pl-5 mt-3 flex flex-col gap-2">
          <li>When you're happy with an asset, <strong className="text-ink-2 font-semibold">confirm it as the baseline</strong></li>
          <li>If downstream feedback reveals an issue, the system <strong className="text-ink-2 font-semibold">traces it back</strong> to the right upstream asset</li>
          <li>Blueprint always shows you <strong className="text-ink-2 font-semibold">impact analysis</strong> before making changes across assets</li>
          <li>Nothing changes without your explicit confirmation</li>
        </ul>
        <p className="mt-4">You can always re-visit this workflow guide from inside the workspace.</p>
      </>
    ),
  },
]

const STEP_NAV = [
  { title: 'What is Blueprint?', desc: 'Platform overview' },
  { title: 'The delivery chain', desc: '6-step workflow' },
  { title: 'What you provide', desc: 'Inputs & timing' },
  { title: 'Confirm & iterate', desc: 'Baselines & rollback' },
]

const Onboarding = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const goNext = () => {
    if (step === 3) {
      navigate('/projects/new')
    } else {
      setStep(step + 1)
    }
  }

  const goBack = () => { if (step > 0) setStep(step - 1) }

  return (
    <div className="min-h-screen grid grid-cols-[300px_1fr]">
      {/* Sidebar */}
      <div className="flex flex-col p-7 border-r border-border"
        style={{ background: 'linear-gradient(180deg, #f8f0ff 0%, #eef4ff 100%)' }}>
        <div className="flex items-center gap-[9px] text-base font-bold text-ink-2 mb-12">
          <Logo size={28} />
          Blueprint
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {STEP_NAV.map((s, i) => (
            <div key={i}
              onClick={() => i <= step && setStep(i)}
              className={`flex items-start gap-3.5 px-3.5 py-3 rounded-md cursor-pointer transition-colors
                ${i === step ? 'bg-[rgba(168,85,247,0.1)]' : i < step ? '' : ''} hover:bg-[rgba(168,85,247,0.06)]`}>
              <div className={`w-7 h-7 rounded-full flex-shrink-0 mt-px flex items-center justify-center text-caption font-bold transition-all
                ${i === step ? 'text-white shadow-[0_2px_10px_rgba(168,85,247,0.3)]' :
                  i < step ? 'bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] border-[#86efac] text-[#16a34a]' :
                  'bg-white border-[1.5px] border-[#ddd6fe] text-[#c4b5fd]'}`}
                style={i === step ? { background: 'var(--grad)' } : {}}>
                {i < step ? '✓' : i + 1}
              </div>
              <div>
                <div className={`text-[13px] font-semibold ${i === step || i < step ? 'text-ink-2' : 'text-muted'}`}>{s.title}</div>
                <div className="text-[11px] text-subtle mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-6 text-caption text-subtle">
          You can always re-read this from inside the workspace.
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col px-16 py-12">
        <div className="flex-1 flex flex-col">
          <div className="gradient-text text-[11px] font-bold uppercase tracking-[0.1em] mb-3.5">
            {STEPS[step].tag}
          </div>
          <h2 className="text-h2 font-extrabold text-ink-2 tracking-[-0.03em] leading-[1.15] mb-3">
            {STEPS[step].title}
          </h2>
          <div className="text-[15px] text-muted leading-[1.8] max-w-[560px] flex-1">
            {STEPS[step].body}
          </div>
        </div>
        <div className="flex items-center justify-between mt-12">
          <div className="flex gap-1.5 items-center">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-1 rounded-sm transition-all ${i === step ? 'w-11' : 'w-[30px]'} ${i < step ? 'bg-[#86efac]' : i === step ? '' : 'bg-border-strong'}`}
                style={i === step ? { background: 'var(--grad-purple)' } : {}} />
            ))}
          </div>
          <div className="flex gap-2.5">
            {step > 0 && (
              <Button variant="secondary" onClick={goBack} className="!rounded-pill">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1.5"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Back
              </Button>
            )}
            <Button onClick={goNext} className="!rounded-pill">
              {step === 3 ? 'Create my first project →' : 'Next →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
