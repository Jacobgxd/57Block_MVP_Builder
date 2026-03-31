import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../components/ui/Logo'

const ASSETS = {
  prd: { label: 'PRD', file: 'PRD.md', placeholder: 'Describe your product, ask Blueprint AI to refine sections…' },
  uispec: { label: 'UI Spec', file: 'UI_Spec.md', placeholder: 'Describe your design preferences or ask Blueprint AI to update UI Spec…' },
  design: { label: 'Design', file: 'Design.md', placeholder: 'Describe design changes or open in Paper to edit externally…' },
  mockup: { label: 'Mockup', file: 'Mockup.md', placeholder: 'Submit feedback — Blueprint AI will attribute it to the right upstream asset…' },
  techspec: { label: 'Tech Spec', file: 'Tech_Spec.md', placeholder: 'Ask about architecture decisions or expand technical sections…' },
  delivery: { label: 'Delivery', file: 'Delivery.md', placeholder: 'Export the full delivery package or ask for a handoff summary…' },
}

const ASSET_KEYS = ['prd', 'uispec', 'design', 'mockup', 'techspec', 'delivery']

const INITIAL_MESSAGES = [
  {
    role: 'ai', who: 'Blueprint AI · PM Agent',
    text: '👋 I\'ve initialized your delivery package for <strong>"My Project"</strong>.<br><br>All 6 assets are ready — PRD, UI Spec, Design, Mockup, Tech Spec, and Delivery Summary.<br><br>Let\'s start with the <strong>PRD</strong>. Tell me more: what core problem does your product solve, and who is it for?'
  }
]

const PRD_PREVIEW = `<div style="margin-bottom:12px;display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:8px;background:#f8f8fc;border:1px solid #e9edf5">
  <span style="font-family:monospace;font-size:11px;color:#64748b;font-weight:700">v0.1</span>
  <span style="font-size:11px;color:#94a3b8;flex:1">Auto-generated skeleton · not confirmed</span>
  <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:#fff7ed;color:#ea580c;border:1px solid #fed7aa">Draft</span>
</div>
<h3 style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid #f1f5f9">Product Overview</h3>
<p style="color:#94a3b8;font-style:italic;font-size:13px">Awaiting input…</p>
<h3 style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid #f1f5f9">Target Users</h3>
<p style="color:#94a3b8;font-style:italic;font-size:13px">Who is this for?</p>
<h3 style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid #f1f5f9">Core Features (V1)</h3>
<p style="color:#94a3b8;font-style:italic;font-size:13px">Must-have features for V1?</p>
<h3 style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid #f1f5f9">Out of Scope</h3>
<p style="color:#94a3b8;font-style:italic;font-size:13px">What are you not building in V1?</p>
<h3 style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;margin:16px 0 6px;padding-bottom:5px;border-bottom:1px solid #f1f5f9">Success Metrics</h3>
<p style="color:#94a3b8;font-style:italic;font-size:13px">How will you measure success?</p>
<div style="margin-top:14px;padding:12px 14px;border-radius:10px;background:rgba(168,85,247,0.05);border:1.5px solid rgba(168,85,247,0.18)">
  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#8B5CF6;margin-bottom:5px">Blueprint AI</div>
  <div style="font-size:12px;color:#6d28d9;line-height:1.6">PRD skeleton initialized. Describe your product to start filling out the requirements.</div>
</div>`

const PLACEHOLDER_PREVIEWS = {
  uispec: '<div style="text-align:center;padding:60px 0;color:#94a3b8"><p style="font-size:13px">Complete PRD first — UI Spec will be generated from confirmed requirements.</p></div>',
  design: '<div style="text-align:center;padding:60px 0;color:#94a3b8"><div style="font-size:36px;margin-bottom:12px">🎨</div><p style="font-size:13px">Hi-fi design will be generated<br>after UI Spec is confirmed</p></div>',
  mockup: '<div style="text-align:center;padding:60px 0;color:#94a3b8"><div style="font-size:36px;margin-bottom:12px">⚡</div><p style="font-size:13px">Clickable prototype will appear<br>after Design is confirmed</p></div>',
  techspec: '<div style="text-align:center;padding:60px 0;color:#94a3b8"><p style="font-size:13px">Will be generated after Mockup is confirmed.</p></div>',
  delivery: '<div style="text-align:center;padding:60px 0;color:#94a3b8"><div style="font-size:36px;margin-bottom:12px">📦</div><p style="font-size:13px">Delivery summary will be auto-generated<br>when all assets are confirmed</p></div>',
}

const Workspace = () => {
  const { asset: routeAsset } = useParams()
  const navigate = useNavigate()
  const currentAsset = routeAsset || 'prd'
  const [previewDoc, setPreviewDoc] = useState(currentAsset)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputVal, setInputVal] = useState('')
  const [typing, setTyping] = useState(false)
  const [statuses, setStatuses] = useState({ prd: 'inprog', uispec: 'todo', design: 'todo', mockup: 'todo', techspec: 'todo', delivery: 'todo' })
  const [chatWidth, setChatWidth] = useState(440)
  const messagesRef = useRef(null)
  const resizerRef = useRef(null)

  useEffect(() => {
    setPreviewDoc(currentAsset)
  }, [currentAsset])

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  const handleSend = () => {
    if (!inputVal.trim() || typing) return
    setMessages(prev => [...prev, { role: 'user', who: 'You', text: inputVal.replace(/</g, '&lt;') }])
    setInputVal('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, {
        role: 'ai', who: 'Blueprint AI · PM Agent',
        text: 'Great. I\'ve updated the PRD based on your input — check the preview on the right.<br><br>A few follow-up questions:<br>1. <strong>V1 scope boundary</strong> — what are you explicitly <em>not</em> building?<br>2. <strong>Primary buyer/user</strong> — who makes the adoption decision?<br>3. Any <strong>technical constraints</strong> I should know about?'
      }])
    }, 1200 + Math.random() * 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const meta = ASSETS[currentAsset]
  const previewMeta = ASSETS[previewDoc]
  const previewHtml = previewDoc === 'prd' ? PRD_PREVIEW : PLACEHOLDER_PREVIEWS[previewDoc] || ''

  // Resizer logic
  const handleMouseDown = (e) => {
    e.preventDefault()
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    const startX = e.clientX
    const startW = chatWidth
    const onMove = (e) => setChatWidth(Math.max(320, Math.min(700, startW + e.clientX - startX)))
    const onUp = () => {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div className="h-screen flex flex-col font-sans bg-[#f4f5f9]">
      {/* Top bar */}
      <div className="h-[52px] flex-shrink-0 bg-white border-b border-border flex items-center px-4 relative z-20">
        <div className="flex items-center gap-2 text-[15px] font-bold text-ink-2 cursor-pointer pr-3.5 border-r border-border mr-3 h-full"
          onClick={() => navigate('/')}>
          <Logo size={26} />
          Blueprint
        </div>
        <span className="text-[13px] font-semibold text-ink-2 mr-1 max-w-[160px] truncate">My Project</span>

        {/* Delivery chain */}
        <div className="flex items-center ml-3">
          {ASSET_KEYS.map((key, idx) => (
            <React.Fragment key={key}>
              <button
                onClick={() => navigate(`/workspace/${key}`)}
                className={`flex items-center gap-1.5 px-3 py-[5px] rounded-pill text-caption font-semibold cursor-pointer border-[1.5px] transition-all whitespace-nowrap font-sans
                  ${key === currentAsset ? 'text-ink-2 bg-white border-border-strong shadow-[0_1px_4px_rgba(0,0,0,0.07)]' :
                    statuses[key] === 'done' ? 'text-[#16a34a] bg-transparent border-transparent' :
                    'text-subtle bg-transparent border-transparent hover:text-ink-2 hover:bg-bg-soft hover:border-border-strong'}`}>
                <span className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${
                  statuses[key] === 'done' ? 'bg-[#22c55e]' :
                  statuses[key] === 'inprog' ? 'bg-[#f59e0b] shadow-[0_0_0_3px_rgba(245,158,11,0.18)]' :
                  'bg-[#cbd5e1]'}`} />
                <span className={key === currentAsset ? 'gradient-text' : ''}>
                  {ASSETS[key].label}
                </span>
              </button>
              {idx < ASSET_KEYS.length - 1 && (
                <div className={`w-4 h-[1.5px] flex-shrink-0 ${
                  statuses[key] === 'done' ? 'bg-[#22c55e]' :
                  statuses[key] === 'inprog' ? 'bg-gradient-to-r from-[#f59e0b] to-[#e2e8f0]' :
                  'bg-[#e2e8f0]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="ml-auto flex items-center">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white cursor-pointer"
            style={{ background: 'var(--grad)' }}>J</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-[220px] bg-white border-r border-border flex flex-col overflow-hidden">
          <div className="p-2.5 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-1 px-1.5 py-[5px] rounded-[6px] cursor-pointer text-[13px] font-semibold text-ink-2">
              <svg className="text-subtle" width="10" height="10" viewBox="0 0 10 10"><path d="M3 2l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <svg width="14" height="14" viewBox="0 0 16 16"><path d="M1.5 3.5A1 1 0 012.5 2.5h3.172a1 1 0 01.707.293L7.5 3.914a1 1 0 00.707.293H13.5a1 1 0 011 1v7.293a1 1 0 01-1 1h-12a1 1 0 01-1-1V3.5z" fill="#f59e0b" opacity="0.85" /></svg>
              <span className="flex-1 truncate">My Project</span>
            </div>
            <div className="pl-3">
              {ASSET_KEYS.map((key) => (
                <div key={key}
                  onClick={() => setPreviewDoc(key)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-[6px] cursor-pointer text-caption transition-all border border-transparent
                    ${key === previewDoc ? 'bg-[#f5f0ff] text-[#6d28d9] font-semibold border-[rgba(168,85,247,0.15)]' : 'text-[#64748b] hover:bg-bg-soft hover:text-ink-2'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statuses[key] === 'done' ? 'bg-[#22c55e]' : statuses[key] === 'inprog' ? 'bg-[#f59e0b] shadow-[0_0_0_2px_rgba(245,158,11,0.2)]' : 'bg-border-strong'}`} />
                  <svg className={key === previewDoc ? 'text-primary-solid' : 'text-subtle'} width="13" height="13" viewBox="0 0 16 16"><path d="M4 1.5h5.586a1 1 0 01.707.293l2.914 2.914a1 1 0 01.293.707V13.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-11a1 1 0 011-1z" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
                  <span className="flex-1 truncate">{ASSETS[key].file}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 pt-3 pb-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-1.5 px-1">Chat History</div>
          </div>
          <div className="flex-1 overflow-y-auto px-3">
            <div className="flex items-center gap-2 px-2.5 py-[7px] rounded-[7px] cursor-pointer text-caption bg-[#f5f0ff] text-[#6d28d9] border border-[rgba(168,85,247,0.15)]">
              <span className="w-[5px] h-[5px] rounded-full bg-primary-solid" />
              PRD kickoff · now
            </div>
          </div>
          <div className="px-3 pb-3">
            <button className="w-full py-[7px] px-2.5 text-caption font-semibold text-primary-solid bg-[rgba(168,85,247,0.06)] border-[1.5px] border-dashed border-[rgba(168,85,247,0.3)] rounded-xs cursor-pointer transition-all hover:bg-[rgba(168,85,247,0.1)] flex items-center justify-center gap-[5px]">
              + New chat
            </button>
          </div>
        </div>

        {/* Chat pane */}
        <div className="flex flex-col bg-[#f9fafb] min-h-0 overflow-hidden" style={{ width: chatWidth, flexShrink: 0 }}>
          <div className="px-4 py-[11px] bg-white border-b border-border flex items-center gap-2 flex-shrink-0 min-h-[40px]">
            {typing ? (
              <div className="flex items-center gap-1.5 text-[11px] text-subtle">
                <span className="flex gap-[3px]">
                  {[0, 1, 2].map(i => <span key={i} className="w-[5px] h-[5px] rounded-full bg-subtle" style={{ animation: `typingBounce 1.2s ease-in-out infinite ${i * 0.2}s` }} />)}
                </span>
                Thinking…
              </div>
            ) : (
              <span className="text-[11px] text-subtle">Ready</span>
            )}
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3.5">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[86%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
                style={{ animation: 'slideUpFadeIn 0.2s ease' }}>
                <div className={`text-[10px] font-bold uppercase tracking-[0.08em] mb-[5px] ${msg.role === 'user' ? 'text-right text-primary-solid' : 'text-subtle'}`}>
                  {msg.who}
                </div>
                <div className={`text-[13px] leading-[1.65] px-[15px] py-[11px] rounded-md ${
                  msg.role === 'user' ? 'text-white rounded-br-[4px]' : 'bg-white text-ink border border-border rounded-bl-[4px] shadow-xs'}`}
                  style={msg.role === 'user' ? { background: 'var(--grad)' } : {}}
                  dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-3.5 py-3 bg-white border-t border-border flex-shrink-0">
            {statuses[currentAsset] === 'inprog' && (
              <div className="flex gap-1.5 mb-2 flex-wrap">
                <button className="font-sans text-[11px] font-semibold px-3 py-[5px] rounded-pill cursor-pointer border-[1.5px] bg-[rgba(168,85,247,0.06)] border-[rgba(168,85,247,0.3)] text-primary-solid transition-all hover:bg-[rgba(168,85,247,0.1)]">
                  ✓ Confirm baseline
                </button>
              </div>
            )}
            <div className="flex gap-2 items-end">
              <textarea
                className="flex-1 py-2.5 px-3.5 font-sans text-[13px] border-[1.5px] border-border-strong rounded-md bg-bg-soft text-ink resize-none outline-none min-h-[40px] max-h-[120px] transition-colors leading-[1.5] focus:border-[#c4b5fd] focus:bg-white placeholder:text-disabled"
                placeholder={meta.placeholder}
                rows="1"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handleSend}
                disabled={typing || !inputVal.trim()}
                className="w-[38px] h-[38px] rounded-sm border-none text-white cursor-pointer flex items-center justify-center transition-all flex-shrink-0 shadow-[0_2px_10px_rgba(168,85,247,0.25)] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                style={{ background: 'var(--grad)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7L1 2l3 5-3 5 12-5z" fill="white" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Resizer */}
        <div
          ref={resizerRef}
          className="flex-shrink-0 w-[5px] bg-border cursor-col-resize flex items-center justify-center z-10 hover:bg-gradient-to-b hover:from-[#EE53FF] hover:to-[#31E1F8] transition-colors"
          onMouseDown={handleMouseDown}>
          <div className="w-[3px] h-8 rounded-sm bg-[rgba(0,0,0,0.12)]" />
        </div>

        {/* Preview pane */}
        <div className="flex-1 bg-white flex flex-col min-h-0 overflow-hidden min-w-[260px]">
          <div className="px-4 py-[11px] border-b border-border flex items-center justify-between flex-shrink-0">
            <span className="text-caption font-semibold text-ink-2">{previewMeta.file}</span>
            <div className="flex gap-1 bg-[#f1f5f9] rounded-xs p-0.5">
              <button className="font-sans text-[11px] font-semibold px-3.5 py-1 rounded-[6px] cursor-pointer border-none bg-transparent text-subtle transition-all hover:text-ink-2">Edit</button>
              <button className="font-sans text-[11px] font-semibold px-3.5 py-1 rounded-[6px] cursor-pointer border-none bg-white text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">Preview</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-[13px] leading-[1.75] text-ink" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace
