import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../components/ui/Logo'
import { PROJECT, TURNS, PRD_CONTENT } from '../data/pmAgentScript'

const ASSETS = {
  prd:      { label: 'PRD',       file: 'PRD.md',       placeholder: 'Describe InsightFlow and what you want to build…' },
  uispec:   { label: 'UI Spec',   file: 'UI_Spec.md',   placeholder: 'Describe your design preferences…' },
  design:   { label: 'Design',    file: 'Design.md',    placeholder: 'Describe design changes…' },
  mockup:   { label: 'Mockup',    file: 'Mockup.md',    placeholder: 'Submit feedback…' },
  techspec: { label: 'Tech Spec', file: 'Tech_Spec.md', placeholder: 'Ask about architecture…' },
  delivery: { label: 'Delivery',  file: 'Delivery.md',  placeholder: 'Export the delivery package…' },
}
const ASSET_KEYS = ['prd', 'uispec', 'design', 'mockup', 'techspec', 'delivery']

// ─────────────────────────── Markdown helpers ───────────────────────────
function processInline(text) {
  if (!text) return ''
  let safe = text
  if ((safe.match(/\*\*/g) || []).length % 2 !== 0) safe += '**'
  return safe
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
}

function renderMarkdown(text) {
  if (!text) return ''
  const lines = text.split('\n')
  const parts = []
  let inList = false
  for (const line of lines) {
    if (/^- /.test(line)) {
      if (!inList) { parts.push('<ul class="md-list">'); inList = true }
      parts.push(`<li>${processInline(line.slice(2))}</li>`)
    } else {
      if (inList) { parts.push('</ul>'); inList = false }
      if (!line.trim()) parts.push('<div class="md-gap"></div>')
      else parts.push(`<div class="md-block">${processInline(line)}</div>`)
    }
  }
  if (inList) parts.push('</ul>')
  return parts.join('')
}

function renderDocMarkdown(text) {
  if (!text) return ''
  const lines = text.split('\n')
  const parts = []
  let inList = false
  for (const line of lines) {
    const t = line.trim()
    if (t.startsWith('# ')) {
      if (inList) { parts.push('</ul>'); inList = false }
      parts.push(`<h1 class="doc-h1">${processInline(t.slice(2))}</h1>`)
    } else if (t.startsWith('## ')) {
      if (inList) { parts.push('</ul>'); inList = false }
      parts.push(`<h2 class="doc-h2">${processInline(t.slice(3))}</h2>`)
    } else if (t.startsWith('### ')) {
      if (inList) { parts.push('</ul>'); inList = false }
      parts.push(`<h3 class="doc-h3">${processInline(t.slice(4))}</h3>`)
    } else if (t === '---') {
      if (inList) { parts.push('</ul>'); inList = false }
      parts.push('<hr class="doc-hr" />')
    } else if (/^- /.test(t) || /^\d+\. /.test(t)) {
      if (!inList) { parts.push('<ul class="md-list">'); inList = true }
      const content = t.replace(/^- /, '').replace(/^\d+\. /, '')
      parts.push(`<li>${processInline(content)}</li>`)
    } else if (!t) {
      if (inList) { parts.push('</ul>'); inList = false }
      parts.push('<div class="doc-gap"></div>')
    } else {
      if (inList) { parts.push('</ul>'); inList = false }
      parts.push(`<p class="doc-p">${processInline(t)}</p>`)
    }
  }
  if (inList) parts.push('</ul>')
  return parts.join('')
}

function sectionsToMarkdown(sections, version, status) {
  const statusLabel = { draft: 'Draft', in_progress: 'In Progress', confirmed: 'Confirmed' }[status] || 'Draft'
  const lines = [
    `# InsightFlow PRD`,
    ``,
    `**Version:** ${version}  ·  **Status:** ${statusLabel}`,
    ``,
    `---`,
    ``,
  ]
  for (const section of sections) {
    lines.push(`## ${section.title}`, ``)
    lines.push(section.content ? section.content : '*Awaiting input…*', ``)
  }
  return lines.join('\n')
}

// ─────────────────────────── System Message ───────────────────────────
function SystemMessage({ text }) {
  return (
    <div className="flex justify-center my-2" style={{ animation: 'slideUpFadeIn 0.25s ease' }}>
      <div className="text-[11px] text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded-full px-4 py-1.5 max-w-[80%] text-center">
        {text}
      </div>
    </div>
  )
}

// ─────────────────────────── Streaming Cursor ───────────────────────────
function Cursor() {
  return (
    <span className="inline-block w-[2px] h-[13px] bg-[#64748b] ml-[2px] align-middle rounded-[1px]"
      style={{ animation: 'cursorBlink 0.8s step-end infinite' }} />
  )
}

// ─────────────────────────── Assistant Bubble (conversation) ─────────────
function AssistantBubble({ msg, animate, onDone }) {
  const words = (msg.content || '').split(' ')
  const [wordCount, setWordCount] = useState(animate ? 0 : words.length)
  const [thoughtOpen, setThoughtOpen] = useState(false)
  const doneCalled = useRef(false)

  useEffect(() => {
    if (!animate) return
    if (wordCount >= words.length) {
      if (!doneCalled.current) { doneCalled.current = true; onDone?.() }
      return
    }
    const t = setTimeout(() => setWordCount(n => n + 1), 28)
    return () => clearTimeout(t)
  }, [animate, wordCount, words.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const streamedText = words.slice(0, wordCount).join(' ')
  const isTyping = animate && wordCount < words.length

  return (
    <div className="self-start max-w-[94%]" style={{ animation: 'slideUpFadeIn 0.3s ease' }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-[5px] text-subtle">Blueprint AI</div>
      <div className="bg-white text-ink border border-border rounded-md rounded-bl-[4px] shadow-xs overflow-hidden">
        <button
          onClick={() => setThoughtOpen(o => !o)}
          className="w-full flex items-center gap-1.5 px-4 py-2.5 border-b border-[#f4f5f9] text-left hover:bg-[#fafbfc] transition-colors group cursor-pointer">
          <span className="text-[10px] text-[#94a3b8] transition-transform duration-200"
            style={{ display: 'inline-block', transform: thoughtOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>▶</span>
          <span className="text-[11px] text-[#94a3b8] font-mono">Thought for {msg.thinkSeconds}s</span>
          <span className="ml-auto text-[10px] text-[#c4cdd8] group-hover:text-[#94a3b8] transition-colors">
            {thoughtOpen ? 'collapse' : 'expand'}
          </span>
        </button>
        {thoughtOpen && (
          <div className="px-4 py-2.5 border-b border-[#f4f5f9] bg-[#fafbfc]"
            style={{ animation: 'slideUpFadeIn 0.2s ease' }}>
            {(msg.runtimeLines || []).map((line, i) => (
              <div key={i} className="text-[11px] text-[#94a3b8] font-mono leading-[1.8]">{line}</div>
            ))}
          </div>
        )}
        <div className="px-4 py-3.5">
          <div className="text-[13px] text-[#334155] leading-[1.75] md-prose">
            <span dangerouslySetInnerHTML={{ __html: renderMarkdown(streamedText) }} />
            {isTyping && <Cursor />}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────── Draft Block ─────────────────────────────────
// Appears in chat after conversation message, streams the actual PRD content.
function DraftBlock({ msg, animate, onDone }) {
  const { draft } = msg
  const fullText = draft.sections
    .map(s => `## ${s.title}\n\n${s.content}`)
    .join('\n\n')
  const words = fullText.split(' ')
  const [wordCount, setWordCount] = useState(animate ? 0 : words.length)
  const doneCalled = useRef(false)

  useEffect(() => {
    if (!animate) return
    if (wordCount >= words.length) {
      if (!doneCalled.current) { doneCalled.current = true; onDone?.() }
      return
    }
    const t = setTimeout(() => setWordCount(n => n + 1), 22)
    return () => clearTimeout(t)
  }, [animate, wordCount, words.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const text = words.slice(0, wordCount).join(' ')
  const isTyping = animate && wordCount < words.length

  return (
    <div className="self-start max-w-[94%]" style={{ animation: 'slideUpFadeIn 0.3s ease' }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-[5px] text-[#16a34a]">
        Blueprint AI · Writing
      </div>
      <div className="bg-[#f0fdf4] border border-[#86efac] rounded-md rounded-bl-[4px] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#bbf7d0]">
          <svg width="12" height="12" viewBox="0 0 16 16">
            <path d="M4 1.5h5.586a1 1 0 01.707.293l2.914 2.914a1 1 0 01.293.707V13.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-11a1 1 0 011-1z"
              fill="none" stroke="#16a34a" strokeWidth="1.2" />
          </svg>
          <span className="text-[11px] font-semibold text-[#15803d]">{draft.summary}</span>
          {isTyping
            ? <span className="ml-auto text-[10px] text-[#4ade80]" style={{ animation: 'typingBounce 1s ease-in-out infinite' }}>writing…</span>
            : <span className="ml-auto text-[10px] font-semibold text-[#16a34a]">✓ Ready to review →</span>
          }
        </div>
        {/* Raw markdown streaming content */}
        <div className="px-4 py-3.5 font-mono text-[12px] text-[#166534] leading-[1.85] whitespace-pre-wrap max-h-[300px] overflow-y-auto">
          {text}{isTyping && <Cursor />}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────── Pending Review Pane ────────────────────────
// Replaces the normal Edit/Preview when there are unreviewed AI-drafted sections.
function PendingReviewPane({ pendingDraft, rawMarkdown, onAcceptAll, onRejectAll }) {
  return (
    <div>
      {/* Action banner */}
      <div className="flex items-center justify-between mb-4 px-3.5 py-2.5 rounded-lg bg-[#f0fdf4] border-[1.5px] border-[#86efac] sticky top-0 z-10"
        style={{ animation: 'slideUpFadeIn 0.3s ease' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]" style={{ animation: 'typingBounce 1.2s ease-in-out infinite' }} />
          <span className="text-[12px] font-semibold text-[#15803d]">
            {pendingDraft.sections.length} section{pendingDraft.sections.length > 1 ? 's' : ''} pending review
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRejectAll}
            className="font-sans text-[11px] font-semibold px-3 py-1.5 rounded-md cursor-pointer border border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#f8fafc] transition-colors">
            Reject
          </button>
          <button
            onClick={onAcceptAll}
            className="font-sans text-[11px] font-semibold px-3.5 py-1.5 rounded-md cursor-pointer border-none bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors shadow-[0_2px_8px_rgba(22,163,74,0.3)]">
            Accept All
          </button>
        </div>
      </div>

      {/* Pending sections — green dashed boxes */}
      {pendingDraft.sections.map((section, idx) => (
        <div key={section.id} className="mb-3 rounded-md border-2 border-dashed border-[#86efac] overflow-hidden"
          style={{ animation: `slideUpFadeIn 0.3s ease ${idx * 60}ms both`, background: 'rgba(240,253,244,0.6)' }}>
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#bbf7d0] bg-[rgba(240,253,244,0.9)]">
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-white bg-[#22c55e] px-1.5 py-0.5 rounded">
              NEW
            </span>
            <span className="text-[11px] font-semibold text-[#15803d]">{section.title}</span>
          </div>
          <div className="px-3 py-2.5 font-mono text-[12px] text-[#166534] leading-[1.85] whitespace-pre-wrap">
            {section.content}
          </div>
        </div>
      ))}

      {/* Existing accepted content — dimmed */}
      {rawMarkdown && rawMarkdown.trim() !== sectionsToMarkdownEmpty() && (
        <div className="mt-5">
          <div className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#94a3b8] mb-2 px-1">
            Accepted content
          </div>
          <div className="font-mono text-[12px] text-[#94a3b8] leading-[1.85] whitespace-pre-wrap opacity-70">
            {rawMarkdown}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper: check if rawMarkdown only has empty skeleton (no real content yet)
function sectionsToMarkdownEmpty() {
  return ''
}

// ─────────────────────────── PRD Edit mode ────────────────────────────────
function PrdRawEditor({ value, onChange }) {
  return (
    <div className="h-full flex flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 w-full font-mono text-[12.5px] leading-[1.85] text-[#334155] bg-transparent outline-none resize-none placeholder:text-[#c4cdd8]"
        style={{ minHeight: '100%' }}
      />
    </div>
  )
}

// ─────────────────────────── PRD Preview mode ─────────────────────────────
function PrdRendered({ value }) {
  return (
    <div className="doc-prose"
      dangerouslySetInnerHTML={{ __html: renderDocMarkdown(value) }} />
  )
}

// ─────────────────────────── Empty State ─────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 pb-12"
      style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
        style={{ background: 'var(--grad)' }}>AI</div>
      <div className="text-center">
        <div className="text-[14px] font-semibold text-ink-2 mb-1.5">PM Agent</div>
        <p className="text-[13px] text-[#64748b] max-w-[260px] leading-[1.65]">
          Describe your product idea to start building the PRD together.
        </p>
      </div>
    </div>
  )
}

// ═══════════════════════════════ Workspace ════════════════════════════════
const Workspace = () => {
  const { asset: routeAsset } = useParams()
  const navigate = useNavigate()
  const currentAsset = routeAsset || 'prd'
  const [previewDoc, setPreviewDoc] = useState(currentAsset)

  const [messages, setMessages]           = useState([])
  const [inputValue, setInputValue]       = useState('')
  const [currentRound, setCurrentRound]   = useState(0)
  const [isPlaying, setIsPlaying]         = useState(false)
  const [animatingMsgId, setAnimatingMsgId] = useState(null)

  const [statuses, setStatuses] = useState({
    prd: 'inprog', uispec: 'todo', design: 'todo', mockup: 'todo', techspec: 'todo', delivery: 'todo',
  })
  const initialSections = PRD_CONTENT.skeleton.map(s => ({ ...s }))
  const [prdSections, setPrdSections]           = useState(initialSections)
  const [prdVersion, setPrdVersion]             = useState('v0.1')
  const [prdStatus, setPrdStatus]               = useState('draft')
  const [rawMarkdown, setRawMarkdown]           = useState(() => sectionsToMarkdown(initialSections, 'v0.1', 'draft'))
  const [pendingDraft, setPendingDraft]         = useState(null)  // { sections, prdAfter }
  const [previewMode, setPreviewMode]           = useState('edit')
  const [chatWidth, setChatWidth]               = useState(460)

  const messagesRef = useRef(null)
  const inputRef    = useRef(null)

  useEffect(() => { setPreviewDoc(currentAsset) }, [currentAsset])
  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  const handleSend = useCallback(() => {
    const text = inputValue.trim()
    if (!text || isPlaying) return
    if (currentRound >= TURNS.length) return

    const turn = TURNS[currentRound]
    setInputValue('')
    setIsPlaying(true)
    setMessages(prev => [...prev, { role: 'user', text }])

    const msgId = `msg-${Date.now()}`
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', ...turn, id: msgId, scriptId: turn.id }])
      setAnimatingMsgId(msgId)
    }, (turn.thinkSeconds || 3) * 1000)
  }, [inputValue, isPlaying, currentRound])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  // Called when assistant conversation bubble finishes streaming
  const handleMessageDone = useCallback((msg) => {
    if (msg.draft) {
      // Push the draft block as a follow-on message in the chat
      const draftId = `draft-${Date.now()}`
      setMessages(prev => [...prev, {
        role: 'draft',
        id: draftId,
        draft: msg.draft,
        prdAfter: msg.prdAfter,
      }])
      setAnimatingMsgId(draftId)
      // isPlaying stays true — the draft is still animating
    } else {
      // Turn with no draft — just finish
      if (msg.prdAfter?.status === 'confirmed') {
        setStatuses(prev => ({ ...prev, prd: 'done', uispec: 'inprog' }))
        setPrdVersion(msg.prdAfter.version)
        setPrdStatus(msg.prdAfter.status)
      }
      setCurrentRound(r => r + 1)
      setIsPlaying(false)
      setAnimatingMsgId(null)
      inputRef.current?.focus()
    }
  }, [])

  // Called when draft block finishes streaming → content goes to pending review
  const handleDraftDone = useCallback((msg) => {
    setPendingDraft({ sections: msg.draft.sections, prdAfter: msg.prdAfter })
    setCurrentRound(r => r + 1)
    setIsPlaying(false)
    setAnimatingMsgId(null)
    inputRef.current?.focus()
  }, [])

  // User accepts all pending sections → write to document
  const handleAcceptAll = useCallback(() => {
    if (!pendingDraft) return
    const newSections = prdSections.map(s => {
      const update = pendingDraft.sections.find(ps => ps.id === s.id)
      return update ? { ...s, content: update.content } : s
    })
    const version = pendingDraft.prdAfter?.version || prdVersion
    const status  = pendingDraft.prdAfter?.status  || prdStatus
    setPrdSections(newSections)
    setPrdVersion(version)
    setPrdStatus(status)
    setRawMarkdown(sectionsToMarkdown(newSections, version, status))
    if (status === 'confirmed') {
      setStatuses(prev => ({ ...prev, prd: 'done', uispec: 'inprog' }))
    }
    setPendingDraft(null)
  }, [pendingDraft, prdSections, prdVersion, prdStatus])

  // User rejects → discard pending without writing
  const handleRejectAll = useCallback(() => {
    setPendingDraft(null)
  }, [])

  // Resizer
  const handleMouseDown = (e) => {
    e.preventDefault()
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
    const startX = e.clientX, startW = chatWidth
    const onMove = (ev) => setChatWidth(Math.max(340, Math.min(700, startW + ev.clientX - startX)))
    const onUp = () => {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const meta        = ASSETS[currentAsset]
  const previewMeta = ASSETS[previewDoc]
  const hasMessages = messages.length > 0

  // Determine current phase for chat header
  const animatingMsg  = messages.find(m => m.id === animatingMsgId)
  const isDrafting    = animatingMsg?.role === 'draft'
  const hasPending    = Boolean(pendingDraft)

  return (
    <div className="h-screen flex flex-col font-sans bg-[#f4f5f9]">
      {/* ── Top bar ── */}
      <div className="h-[52px] flex-shrink-0 bg-white border-b border-border flex items-center px-4 relative z-20">
        <div className="flex items-center gap-2 text-[15px] font-bold text-ink-2 cursor-pointer pr-3.5 border-r border-border mr-3 h-full"
          onClick={() => navigate('/')}>
          <Logo size={26} />
          Blueprint
        </div>
        <span className="text-[13px] font-semibold text-ink-2 mr-1 max-w-[160px] truncate">{PROJECT.name}</span>

        <div className="flex items-center ml-3">
          {ASSET_KEYS.map((key, idx) => (
            <React.Fragment key={key}>
              <button onClick={() => navigate(`/workspace/${key}`)}
                className={`flex items-center gap-1.5 px-3 py-[5px] rounded-pill text-caption font-semibold cursor-pointer border-[1.5px] transition-all whitespace-nowrap font-sans
                  ${key === currentAsset
                    ? 'text-ink-2 bg-white border-border-strong shadow-[0_1px_4px_rgba(0,0,0,0.07)]'
                    : statuses[key] === 'done'   ? 'text-[#16a34a] bg-transparent border-transparent'
                    : 'text-subtle bg-transparent border-transparent hover:text-ink-2 hover:bg-bg-soft hover:border-border-strong'}`}>
                <span className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${
                  statuses[key] === 'done'   ? 'bg-[#22c55e]' :
                  statuses[key] === 'inprog' ? 'bg-[#f59e0b] shadow-[0_0_0_3px_rgba(245,158,11,0.18)]' :
                  'bg-[#cbd5e1]'}`} />
                <span className={key === currentAsset ? 'gradient-text' : ''}>{ASSETS[key].label}</span>
              </button>
              {idx < ASSET_KEYS.length - 1 && (
                <div className={`w-4 h-[1.5px] flex-shrink-0 ${
                  statuses[key] === 'done'   ? 'bg-[#22c55e]' :
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

      {/* ── Body ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-[220px] bg-white border-r border-border flex flex-col overflow-hidden">
          <div className="p-2.5 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-1 px-1.5 py-[5px] rounded-[6px] cursor-pointer text-[13px] font-semibold text-ink-2">
              <svg className="text-subtle" width="10" height="10" viewBox="0 0 10 10">
                <path d="M3 2l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 16 16">
                <path d="M1.5 3.5A1 1 0 012.5 2.5h3.172a1 1 0 01.707.293L7.5 3.914a1 1 0 00.707.293H13.5a1 1 0 011 1v7.293a1 1 0 01-1 1h-12a1 1 0 01-1-1V3.5z" fill="#f59e0b" opacity="0.85" />
              </svg>
              <span className="flex-1 truncate">{PROJECT.name}</span>
            </div>
            <div className="pl-3">
              {ASSET_KEYS.map((key) => (
                <div key={key} onClick={() => setPreviewDoc(key)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-[6px] cursor-pointer text-caption transition-all border border-transparent
                    ${key === previewDoc
                      ? 'bg-[#f5f0ff] text-[#6d28d9] font-semibold border-[rgba(168,85,247,0.15)]'
                      : 'text-[#64748b] hover:bg-bg-soft hover:text-ink-2'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    statuses[key] === 'done'   ? 'bg-[#22c55e]' :
                    statuses[key] === 'inprog' ? 'bg-[#f59e0b] shadow-[0_0_0_2px_rgba(245,158,11,0.2)]' :
                    'bg-border-strong'}`} />
                  <svg className={key === previewDoc ? 'text-primary-solid' : 'text-subtle'} width="13" height="13" viewBox="0 0 16 16">
                    <path d="M4 1.5h5.586a1 1 0 01.707.293l2.914 2.914a1 1 0 01.293.707V13.5a1 1 0 01-1 1H4a1 1 0 01-1-1v-11a1 1 0 011-1z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <span className="flex-1 truncate">{ASSETS[key].file}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-3 pt-3 pb-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-subtle mb-1.5 px-1">Chat History</div>
          </div>
          <div className="flex-1 overflow-y-auto px-3">
            {hasMessages && (
              <div className="flex items-center gap-2 px-2.5 py-[7px] rounded-[7px] cursor-pointer text-caption bg-[#f5f0ff] text-[#6d28d9] border border-[rgba(168,85,247,0.15)]">
                <span className="w-[5px] h-[5px] rounded-full bg-primary-solid" />
                PRD kickoff · now
              </div>
            )}
          </div>
          <div className="px-3 pb-3">
            <button className="w-full py-[7px] px-2.5 text-caption font-semibold text-primary-solid bg-[rgba(168,85,247,0.06)] border-[1.5px] border-dashed border-[rgba(168,85,247,0.3)] rounded-xs cursor-pointer transition-all hover:bg-[rgba(168,85,247,0.1)] flex items-center justify-center gap-[5px]">
              + New chat
            </button>
          </div>
        </div>

        {/* ── Chat pane ── */}
        <div className="flex flex-col bg-[#f9fafb] min-h-0 overflow-hidden" style={{ width: chatWidth, flexShrink: 0 }}>
          {/* Chat header */}
          <div className="px-4 py-[11px] bg-white border-b border-border flex items-center gap-2 flex-shrink-0 h-[42px]">
            {isPlaying ? (
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="flex gap-[3px]">
                  {[0, 1, 2].map(i => (
                    <span key={i}
                      className={`w-[4px] h-[4px] rounded-full ${isDrafting ? 'bg-[#86efac]' : 'bg-[#c4b5fd]'}`}
                      style={{ animation: `typingBounce 1.2s ease-in-out infinite ${i * 0.2}s` }} />
                  ))}
                </span>
                <span className={isDrafting ? 'text-[#16a34a]' : 'text-subtle'}>
                  {isDrafting ? 'Writing to document…' : 'Thinking…'}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-subtle">
                {!hasMessages ? 'PM Agent' : hasPending ? '✓ Draft ready — review in document' : 'Ready'}
              </span>
            )}
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {!hasMessages
              ? <EmptyState />
              : messages.map((msg, i) => {
                  if (msg.role === 'system') return <SystemMessage key={i} text={msg.text} />

                  if (msg.role === 'user') return (
                    <div key={i} className="self-end max-w-[82%]" style={{ animation: 'slideUpFadeIn 0.2s ease' }}>
                      <div className="text-[10px] font-bold uppercase tracking-[0.08em] mb-[5px] text-right text-primary-solid">You</div>
                      <div className="text-[13px] leading-[1.65] px-[15px] py-[11px] rounded-xl text-white rounded-br-[4px]"
                        style={{ background: 'var(--grad)' }}>{msg.text}</div>
                    </div>
                  )

                  if (msg.role === 'assistant') return (
                    <AssistantBubble key={i} msg={msg}
                      animate={msg.id === animatingMsgId}
                      onDone={() => handleMessageDone(msg)} />
                  )

                  if (msg.role === 'draft') return (
                    <DraftBlock key={i} msg={msg}
                      animate={msg.id === animatingMsgId}
                      onDone={() => handleDraftDone(msg)} />
                  )

                  return null
                })
            }
          </div>

          {/* Input area */}
          <div className="px-3.5 py-3 bg-white border-t border-border flex-shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 py-2.5 px-3.5 font-sans text-[13px] border-[1.5px] border-border-strong rounded-md bg-bg-soft text-ink resize-none outline-none min-h-[40px] max-h-[120px] transition-colors leading-[1.5] focus:border-[#c4b5fd] focus:bg-white placeholder:text-disabled"
                placeholder={hasMessages ? 'Reply…' : meta.placeholder}
                rows="1"
                disabled={isPlaying}
              />
              <button
                onClick={handleSend}
                disabled={isPlaying || !inputValue.trim()}
                className="w-[38px] h-[38px] rounded-sm border-none text-white cursor-pointer flex items-center justify-center transition-all flex-shrink-0 shadow-[0_2px_10px_rgba(168,85,247,0.25)] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
                style={{ background: 'var(--grad)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 7L1 2l3 5-3 5 12-5z" fill="white" />
                </svg>
              </button>
            </div>
            <div className="text-[10px] text-[#c4cdd8] mt-1.5 text-center">
              Enter to send · Shift+Enter for new line
            </div>
          </div>
        </div>

        {/* Resizer */}
        <div className="flex-shrink-0 w-[5px] bg-border cursor-col-resize flex items-center justify-center z-10 hover:bg-gradient-to-b hover:from-[#EE53FF] hover:to-[#31E1F8] transition-colors"
          onMouseDown={handleMouseDown}>
          <div className="w-[3px] h-8 rounded-sm bg-[rgba(0,0,0,0.12)]" />
        </div>

        {/* ── Preview pane ── */}
        <div className="flex-1 bg-white flex flex-col min-h-0 overflow-hidden min-w-[260px]">
          <div className="px-4 py-[11px] border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-caption font-semibold text-ink-2">{previewMeta.file}</span>
              {hasPending && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a] border border-[#86efac]"
                  style={{ animation: 'fadeIn 0.3s ease' }}>
                  {pendingDraft.sections.length} pending
                </span>
              )}
            </div>
            {/* Hide Edit/Preview toggle when in pending review mode */}
            {!hasPending && (
              <div className="flex gap-1 bg-[#f1f5f9] rounded-xs p-0.5">
                {['edit', 'preview'].map(mode => (
                  <button key={mode}
                    onClick={() => setPreviewMode(mode)}
                    className={`font-sans text-[11px] font-semibold px-3.5 py-1 rounded-[6px] cursor-pointer border-none transition-all capitalize
                      ${previewMode === mode
                        ? 'bg-white text-ink-2 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                        : 'bg-transparent text-subtle hover:text-ink-2'}`}>
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={`flex-1 overflow-y-auto ${hasPending ? 'p-4' : previewMode === 'edit' ? 'p-5' : 'p-6'}`}>
            {previewDoc === 'prd' ? (
              hasPending ? (
                <PendingReviewPane
                  pendingDraft={pendingDraft}
                  rawMarkdown={rawMarkdown}
                  onAcceptAll={handleAcceptAll}
                  onRejectAll={handleRejectAll}
                />
              ) : previewMode === 'edit'
                ? <PrdRawEditor value={rawMarkdown} onChange={setRawMarkdown} />
                : <PrdRendered value={rawMarkdown} />
            ) : (
              <div className="text-center py-16 text-[#94a3b8]">
                <div className="text-[36px] mb-3">📄</div>
                <p className="text-[13px]">
                  Complete PRD first —<br />
                  {previewMeta.label} will be generated from confirmed requirements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workspace
