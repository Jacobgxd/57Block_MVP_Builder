import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const useReveal = () => {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => els?.forEach((el) => observer.unobserve(el))
  }, [])
  return ref
}

const Home = () => {
  const navigate = useNavigate()
  const pageRef = useReveal()

  return (
    <div ref={pageRef}>
      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
        .reveal.in { opacity: 1; transform: none; }
        .d1 { transition-delay: 0.10s; }
        .d2 { transition-delay: 0.20s; }
        .d3 { transition-delay: 0.30s; }
        .d4 { transition-delay: 0.40s; }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex items-center justify-center px-10 pt-[100px] pb-[60px] relative overflow-hidden text-center">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[900px] h-[700px] rounded-full top-[-200px] right-[-200px]"
            style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.10) 0%, transparent 65%)' }} />
          <div className="absolute w-[700px] h-[600px] rounded-full bottom-[-100px] left-[-100px]"
            style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.09) 0%, transparent 65%)' }} />
          <div className="absolute w-[500px] h-[400px] rounded-full top-[30%] left-[20%]"
            style={{ background: 'radial-gradient(ellipse, rgba(238,83,255,0.07) 0%, transparent 65%)' }} />
        </div>

        <div className="relative z-[1] max-w-[860px] mx-auto">
          {/* Eyebrow */}
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border-[1.5px] border-[rgba(168,85,247,0.25)] bg-[rgba(168,85,247,0.06)] mb-7">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--grad)', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span className="gradient-text text-[11px] font-bold tracking-[0.08em] uppercase">
              AI-powered MVP delivery — Phase 1 now open
            </span>
          </div>

          {/* H1 */}
          <h1 className="reveal d1 font-sans font-extrabold leading-[1.0] tracking-[-0.035em] text-ink-2 mb-3"
            style={{ fontSize: 'clamp(56px, 7vw, 96px)' }}>
            Idea&nbsp;
            <span className="gradient-text">MVP</span>&nbsp;
            <span className="font-serif italic font-normal">Deliver</span>
          </h1>

          {/* Sub */}
          <p className="reveal d2 text-[17px] text-muted leading-[1.75] max-w-[600px] mx-auto mb-9">
            We help <strong className="text-ink-2 font-semibold">Visionary Founders</strong> and{' '}
            <strong className="text-ink-2 font-semibold">Product Teams</strong> turn vague ideas into
            structured, deliverable assets — PRD, design, prototype, and tech spec —
            that engineering can actually build from.
          </p>

          {/* CTA */}
          <div className="reveal d3 flex gap-3.5 justify-center items-center flex-wrap">
            <Button size="lg" onClick={() => navigate('/request-access')}
              className="!px-8 !shadow-brand hover:!shadow-[0_10px_32px_rgba(168,85,247,0.38)]">
              Request Access »
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/signin')}
              className="!border-[1.5px] !border-[rgba(25,47,63,0.18)] hover:!border-[rgba(168,85,247,0.4)] hover:!text-primary-3">
              Already invited? Sign in →
            </Button>
          </div>

          <p className="reveal d4 mt-5 text-caption text-subtle tracking-[0.04em]">
            Invite-only · No self-registration · Phase 1 open
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 cursor-pointer"
          style={{ animation: 'float 2.5s ease-in-out infinite', transform: 'translateX(-50%)' }}
          onClick={() => document.querySelector('#capabilities')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-[10px] text-subtle tracking-[0.1em] uppercase">Explore</span>
          <div className="w-8 h-8 rounded-full border-[1.5px] border-[rgba(0,0,0,0.1)] flex items-center justify-center">
            <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="#adb5bd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2v10M3 8l4 4 4-4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section id="capabilities" className="py-[100px] px-10 bg-bg-soft">
        <div className="max-w-marketing mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-start">
            <div className="reveal pt-2">
              <div className="w-12 h-[3px] rounded-sm mb-5" style={{ background: 'var(--grad-purple)' }} />
              <div className="gradient-text text-[11px] font-bold tracking-[0.1em] uppercase mb-3">Current Phase</div>
              <h2 className="font-sans font-extrabold text-ink-2 tracking-[-0.025em] leading-[1.15] mb-4"
                style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
                Services Offerings —<br /><em className="font-serif italic font-normal">AI-Driven Delivery</em>
              </h2>
              <p className="text-[15px] text-muted leading-[1.8] max-w-[520px]">
                Blueprint builds the full structured delivery chain for your MVP —
                from requirements to interactive prototype to engineering spec.
                Our goal: give your dev team a package they can build from, not just look at.
              </p>
              <div className="mt-5 p-[18px_22px] rounded-md border border-[rgba(0,0,0,0.06)] bg-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-2.5">Coming next</div>
                <div className="flex items-center gap-2.5 py-[5px] text-[13px] text-muted">
                  <span className="text-[10px] font-bold text-disabled">06</span>
                  Code repository generation from the delivery package
                </div>
                <div className="flex items-center gap-2.5 py-[5px] text-[13px] text-muted">
                  <span className="text-[10px] font-bold text-disabled">07</span>
                  Automated deployment & live MVP handoff
                </div>
              </div>
            </div>
            <div className="reveal d1">
              <AssetList />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how" className="py-[100px] px-10">
        <div className="max-w-marketing mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="reveal w-12 h-[3px] rounded-sm mb-5" style={{ background: 'var(--grad-purple)' }} />
              <div className="reveal gradient-text text-[11px] font-bold tracking-[0.1em] uppercase mb-3">How It Works</div>
              <h2 className="reveal d1 font-sans font-extrabold text-ink-2 tracking-[-0.025em] leading-[1.15] mb-4"
                style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
                Each step feeds<br /><em className="font-serif italic font-normal">the next</em>
              </h2>
              <p className="reveal d2 text-[15px] text-muted leading-[1.8] max-w-[520px]">
                Every asset Blueprint generates becomes the input for the next.
                Requirements drive design. Design drives prototype. Prototype drives the tech spec.
                Nothing lives in isolation.
              </p>
              <div className="reveal d3 mt-10">
                {[
                  { n: '00', title: 'Idea clarification', desc: 'Describe your product idea — Blueprint AI handles the rest' },
                  { n: '01', title: 'PRD — confirm requirements baseline', desc: 'Structured requirements doc, versioned and confirmed by you' },
                  { n: '02', title: 'UI Spec + Design — visual direction locked', desc: 'Interface spec drives hi-fi design; edit in Paper, sync back' },
                  { n: '03', title: 'Mockup — validate the experience', desc: 'Clickable prototype; feedback gets attributed back to PRD or design' },
                  { n: '04', title: 'Tech Spec — engineering-ready handoff', desc: 'Architecture, APIs, risk flags — your dev team can start building' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 py-[22px] border-b border-[rgba(0,0,0,0.06)] last:border-b-0 group cursor-default">
                    <span className="text-caption font-bold text-disabled w-7 flex-shrink-0 pt-0.5 tabular-nums group-hover:gradient-text">
                      {item.n}
                    </span>
                    <div>
                      <div className="text-[15px] font-bold text-ink-2 mb-1">{item.title}</div>
                      <div className="text-[13px] text-muted leading-[1.55]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal d2">
              <ChatMock />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section id="roadmap" className="py-[100px] px-10 bg-bg-soft">
        <div className="max-w-marketing mx-auto">
          <div className="text-center reveal">
            <div className="w-12 h-[3px] rounded-sm mx-auto mb-5" style={{ background: 'var(--grad-purple)' }} />
            <div className="gradient-text text-[11px] font-bold tracking-[0.1em] uppercase mb-3">Blueprint Roadmap</div>
            <h2 className="font-sans font-extrabold text-ink-2 tracking-[-0.025em] leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
              Idea → MVP → Scale
            </h2>
            <p className="text-[15px] text-muted leading-[1.8] max-w-[520px] mx-auto">
              Blueprint accelerates every stage of the product delivery life cycle — from structured assets to shipped code.
            </p>
          </div>
          <div className="reveal d1 grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            <RoadmapCard current
              phase="Phase 01" status="Open now" title="Structured Product Assets"
              body="From vague idea to a reviewed, versioned delivery package your team can build from."
              items={['PRD / UI Spec / Design', 'Mockup / Tech Spec', 'Version snapshots & baselines', 'Impact analysis & safe rollback']}
            />
            <RoadmapCard
              phase="Phase 02" status="Planned" title="Deliverable Code Repo"
              body="Generate a runnable codebase from your confirmed delivery package. Self-deploy and validate."
              items={['Code repository generation', 'Local run & deploy guide', 'Linked to Phase 1 assets']}
            />
            <RoadmapCard
              phase="Phase 03" status="Planned" title="Deploy & Scale"
              body="Blueprint deploys your MVP. Accept the live product, receive the full repo and documentation."
              items={['One-click cloud deployment', 'Live MVP acceptance testing', 'Full repo + package handoff']}
            />
          </div>
        </div>
      </section>

      {/* ═══ DIFFERENTIATION ═══ */}
      <section className="py-[100px] px-10">
        <div className="max-w-marketing mx-auto">
          <div className="text-center reveal">
            <div className="w-12 h-[3px] rounded-sm mx-auto mb-5" style={{ background: 'var(--grad-purple)' }} />
            <div className="gradient-text text-[11px] font-bold tracking-[0.1em] uppercase mb-3">Why Blueprint</div>
            <h2 className="font-sans font-extrabold text-ink-2 tracking-[-0.025em] leading-[1.15]"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
              Not a demo tool.<br /><em className="font-serif italic font-normal">A delivery chain.</em>
            </h2>
          </div>
          <div className="reveal d1 grid grid-cols-1 md:grid-cols-2 gap-0 mt-14 rounded-lg overflow-hidden border border-[rgba(0,0,0,0.07)]">
            <div className="p-10 bg-bg-soft border-r border-[rgba(0,0,0,0.07)]">
              <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-subtle mb-7">
                <div className="w-6 h-6 rounded-full bg-[rgba(0,0,0,0.06)] flex items-center justify-center text-[11px] font-bold text-subtle">✕</div>
                Typical AI / prototyping tools
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "Produces demos that look like a product but can't be handed off",
                  'Requirements, design, and tech exist in isolation',
                  'No versioning — every change is a full regeneration',
                  'Dev team still needs to re-derive requirements from scratch',
                  'Downstream bugs have no traceable upstream source',
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-body-sm text-muted leading-[1.55] items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(0,0,0,0.05)] flex items-center justify-center text-[10px] font-bold text-subtle mt-px">✕</div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 bg-white relative">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'var(--grad-purple)' }} />
              <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.1em] mb-7 gradient-text">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: 'var(--grad)' }}>✓</div>
                Blueprint
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  'Every asset structured for real delivery, not just presentation',
                  'Requirements → design → prototype → tech spec form a closed loop',
                  'Every asset has a version snapshot and confirmed baseline',
                  'Delivery package handed directly to engineering — no re-derivation',
                  'Downstream feedback attributed and safely rolled back upstream',
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 text-body-sm text-ink-2 leading-[1.55] items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-px" style={{ background: 'var(--grad)' }}>✓</div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUOTE ═══ */}
      <div className="reveal py-20 px-10 border-t border-b border-[rgba(0,0,0,0.05)]"
        style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.04) 0%, rgba(34,211,238,0.04) 100%)' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <div className="font-serif text-[80px] leading-none mb-[-10px]" style={{ color: 'rgba(168,85,247,0.15)' }}>"</div>
          <p className="font-sans font-medium text-ink-2 leading-[1.55] tracking-[-0.01em] mb-5"
            style={{ fontSize: 'clamp(18px, 2.2vw, 26px)' }}>
            Blueprint solves the core problem: how do you turn a one-off AI conversation
            into a <em className="font-serif italic font-normal gradient-text">reviewable, iterable, and deliverable</em> product package
            that your whole team can actually build from?
          </p>
          <div className="text-caption text-subtle font-semibold uppercase tracking-[0.08em]">
            — Blueprint product thesis · 57Blocks
          </div>
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="py-[120px] px-10 text-center relative overflow-hidden">
        <div className="absolute w-[700px] h-[500px] rounded-full top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 65%)' }} />
        <div className="absolute w-[500px] h-[400px] rounded-full top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 65%)' }} />
        <div className="relative z-[1] max-w-[680px] mx-auto reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(168,85,247,0.07)] border-[1.5px] border-[rgba(168,85,247,0.2)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--grad)', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span className="gradient-text text-[11px] font-bold uppercase tracking-[0.08em]">Phase 1 · Invite-Only Access Now Open</span>
          </div>
          <h2 className="font-sans font-extrabold text-ink-2 tracking-[-0.035em] leading-[1.05] mb-[18px]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            Start building with<br /><em className="font-serif italic font-normal">Blueprint</em>
          </h2>
          <p className="text-body text-muted max-w-[460px] mx-auto mb-11 leading-[1.75]">
            Turn your next product idea into a structured, deliverable asset package — ready for your engineering team to build from.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate('/request-access')}
              className="!px-9 !shadow-brand">
              Request Access »
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/signin')}
              className="!border-[1.5px] !border-[rgba(25,47,63,0.18)] hover:!border-[rgba(168,85,247,0.4)] hover:!text-primary-3 hover:!bg-[rgba(168,85,247,0.04)]">
              Already invited? Sign in
            </Button>
            <Button variant="secondary" size="lg"
              className="!border-[1.5px] !border-[rgba(25,47,63,0.18)] hover:!border-[rgba(168,85,247,0.4)] hover:!text-primary-3 hover:!bg-[rgba(168,85,247,0.04)]">
              Contact 57Blocks
            </Button>
          </div>
          <p className="mt-[22px] text-caption text-subtle tracking-[0.04em]">
            Invite-only · No self-registration · Phase 1 open now
          </p>
        </div>
      </section>
    </div>
  )
}

/* ─── Sub-components ─── */

const AssetList = () => {
  const assets = [
    { num: '01', name: 'PRD', desc: 'Product requirements doc', live: true },
    { num: '02', name: 'UI Spec', desc: 'Interface specification', live: true },
    { num: '03', name: 'Design', desc: 'Hi-fi visuals + Paper edit', live: true },
    { num: '04', name: 'Mockup', desc: 'Clickable web prototype', live: true },
    { num: '05', name: 'Tech Spec', desc: 'Engineering specification', live: true },
    { num: '06', name: 'Code', desc: 'Repository generation', soon: 'Phase 2' },
    { num: '07', name: 'Deploy', desc: 'Auto deploy & handoff', soon: 'Phase 3' },
  ]

  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-[rgba(0,0,0,0.06)] shadow-sm">
      {assets.map((a, i) => (
        <div key={i}
          className={`grid grid-cols-[44px_120px_1fr_auto] items-center px-5 h-[62px] bg-white border-b border-[rgba(0,0,0,0.05)] last:border-b-0 relative transition-colors hover:bg-[#fafbff] ${a.soon ? 'opacity-45' : ''}`}>
          {a.live && <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: 'var(--grad-purple)' }} />}
          <span className={`text-[11px] font-semibold tabular-nums ${a.live ? 'gradient-text' : 'text-disabled'}`}>{a.num}</span>
          <span className={`text-[13px] font-bold ${a.live ? 'text-ink-2' : 'text-muted font-semibold'}`}>{a.name}</span>
          <span className="text-[13px] text-muted">{a.desc}</span>
          {a.live ? (
            <span className="text-[10px] font-bold px-2.5 py-[3px] rounded-pill uppercase tracking-[0.05em] text-primary-solid border border-[rgba(168,85,247,0.2)]"
              style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(34,211,238,0.12))' }}>
              Live
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2.5 py-[3px] rounded-pill uppercase tracking-[0.05em] text-subtle bg-bg-soft border border-[rgba(0,0,0,0.08)]">
              {a.soon}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

const ChatMock = () => (
  <div className="bg-white rounded-lg border border-[rgba(0,0,0,0.08)] shadow-md overflow-hidden mt-2">
    <div className="px-[18px] py-3.5 border-b border-[rgba(0,0,0,0.05)] flex items-center gap-2.5 bg-bg-soft">
      <div className="w-2 h-2 rounded-full" style={{ background: 'var(--grad)' }} />
      <span className="text-caption font-bold text-ink-2">Blueprint AI</span>
      <span className="text-[11px] text-muted ml-auto">Unified workspace · PRD</span>
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="max-w-[88%] self-start">
        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-1">Blueprint AI · PM Agent</div>
        <div className="text-caption leading-[1.55] px-3.5 py-2.5 rounded-md bg-bg-soft text-ink border border-[rgba(0,0,0,0.06)] rounded-bl-[4px]">
          PRD looks solid — I've structured the requirements across 12 sections and flagged 2 edge cases for your review. Ready to set this as the confirmed baseline?
        </div>
      </div>
      <div className="max-w-[88%] self-end">
        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8B5CF6] mb-1 text-right">You</div>
        <div className="text-caption leading-[1.55] px-3.5 py-2.5 rounded-md text-white rounded-br-[4px]" style={{ background: 'var(--grad)' }}>
          Yes — confirm v1.2 as the current requirements baseline.
        </div>
      </div>
      <div className="flex items-center gap-2 px-3.5 py-[9px] rounded-sm bg-[rgba(168,85,247,0.06)] border border-[rgba(168,85,247,0.2)] text-caption font-semibold text-primary-solid mt-1">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        PRD v1.2 confirmed as baseline
      </div>
      <div className="max-w-[88%] self-start">
        <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-1">Blueprint AI · UI Designer Agent</div>
        <div className="text-caption leading-[1.55] px-3.5 py-2.5 rounded-md bg-bg-soft text-ink border border-[rgba(0,0,0,0.06)] rounded-bl-[4px]">
          UI Spec and Design are flagged for update based on the confirmed PRD. Shall we start the design phase?
        </div>
      </div>
    </div>
    <div className="mt-3 mx-4 mb-4 px-3.5 py-[9px] bg-bg-soft border border-[rgba(0,0,0,0.06)] rounded-md flex items-center gap-3">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#adb5bd" strokeWidth="1.5" /><path d="M8 5v4M8 11v.5" stroke="#adb5bd" strokeWidth="1.5" strokeLinecap="round" /></svg>
      <span className="text-caption text-muted">One AI assistant. Multiple specialist agents behind the scenes. You only interact with Blueprint AI.</span>
    </div>
  </div>
)

const RoadmapCard = ({ current, phase, status, title, body, items }) => (
  <div className={`bg-white rounded-lg p-8 relative overflow-hidden transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] ${current ? 'border border-[rgba(168,85,247,0.25)] shadow-[0_4px_24px_rgba(168,85,247,0.12)]' : 'border border-[rgba(0,0,0,0.06)] shadow-xs'}`}>
    {current && <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'var(--grad-purple)' }} />}
    <div className="flex items-center justify-between mb-5">
      <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${current ? 'gradient-text' : 'text-subtle'}`}>
        {phase}
      </span>
      <span className={`text-[10px] font-bold px-2.5 py-[3px] rounded-pill uppercase tracking-[0.06em] ${current ? 'bg-[rgba(168,85,247,0.1)] text-primary-solid border border-[rgba(168,85,247,0.2)]' : 'bg-bg-soft text-subtle border border-[rgba(0,0,0,0.07)]'}`}>
        {status}
      </span>
    </div>
    <div className="text-[18px] font-extrabold text-ink-2 mb-2.5 tracking-[-0.02em]">{title}</div>
    <div className="text-[13px] text-muted leading-[1.65]">{body}</div>
    <ul className="mt-[18px] flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className={`flex items-center gap-[9px] text-caption ${current ? 'text-muted' : 'text-subtle'}`}>
          <span className={`text-[11px] ${current ? 'gradient-text' : 'text-disabled'}`}>→</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export default Home
