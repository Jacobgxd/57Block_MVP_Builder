export const PROJECT = {
  name: 'InsightFlow',
  description: 'AI-powered user interview synthesis tool for startup teams',
}

export const PRD_CONTENT = {
  skeleton: [
    { id: 'overview',   title: 'Product Overview',        content: null },
    { id: 'users',      title: 'Target Users',            content: null },
    { id: 'metrics',    title: 'Success Metrics',         content: null },
    { id: 'features',   title: 'Core Features (V1)',      content: null },
    { id: 'outofscope', title: 'Out of Scope',            content: null },
    { id: 'flow',       title: 'Core Flow',               content: null },
    { id: 'pages',      title: 'Pages in Scope',          content: null },
    { id: 'acceptance', title: 'Acceptance Criteria',     content: null },
    { id: 'exceptions', title: 'Exceptions / Edge Cases', content: null },
  ],
}

// Each turn:
//   runtimeLines    — collapsed "Thought for Xs" detail
//   thinkSeconds    — thinking delay before message appears
//   content         — conversation prose (questions, analysis)
//   draft           — optional: { summary, sections: [{id, title, content}] }
//                     appears as a streaming draft block after conversation content
//   prdAfter        — version/status metadata written after draft is accepted

export const TURNS = [
  // ─── Turn 0: First AI response — exploration / questions ─────────
  {
    id: 'r0',
    thinkSeconds: 4,
    runtimeLines: [
      '🔍 Explore: Reading project description and context',
      '💭 Think: Identify gaps — problem definition, users, scope, success',
      '📋 Plan: Open 4 clarifying questions before drafting any section',
      '⚡ Execute: Generating structured questions',
    ],
    content: `Got it. Based on what you've shared, **InsightFlow** is a tool that helps startup teams turn scattered user interview notes into structured, actionable insights.

**Progress:** ○ Overview | ○ Metrics | ○ Features | ○ Flow | ○ Criteria

Before I start drafting, I need to clarify 4 things:

**1. What is the core problem InsightFlow solves?**
My current read: *it's hard to quickly surface common insights across multiple interviews.* Is the friction more about:
- Organizing raw notes from individual sessions
- Finding patterns and themes across multiple interviews
- Turning insights into something structured and requirements-ready

**2. Who are the primary V1 users?**
- Startup founders / PMs doing their own research (no dedicated researcher on the team)
- User researchers in small product teams
- Product consultants managing client interviews

**3. What should V1 prove?**
- That it can meaningfully reduce synthesis time
- That the output is trustworthy enough to act on
- That it connects interview findings to downstream PRD work

**4. What is V1 explicitly NOT?**
- A full research project management platform
- A real-time collaboration tool for multiple users
- An analytics or reporting system`,
    draft: null,
    prdAfter: null,
  },

  // ─── Turn 1: After clarifying questions → draft Overview + Users ──
  {
    id: 'r1',
    thinkSeconds: 5,
    runtimeLines: [
      '🔍 Explore: Re-reading your answers, cross-referencing context',
      '💭 Think: Core problem and user positioning are clear',
      '📋 Plan: Write Product Overview + Target Users sections',
      '⚡ Execute: Drafting first two sections',
      '✓ Reflect: Need to confirm success metrics before moving on',
    ],
    content: `Clear picture. I have enough context to draft the first two sections.

**Progress:** ✍ Overview & Users | ○ Metrics | ○ Features | ○ Flow | ○ Criteria

After you review the draft, I'll move on to success metrics. Two things to confirm while I write:

**1. How will you measure V1 success?**
- Time reduction: cut synthesis time by X% — what's your target? (e.g., >50%, >60%)
- Output quality: insights are used directly in downstream PRD work without heavy rework
- Completion rate: user completes a full analysis session without dropping off

**2. What's the minimum output InsightFlow must produce per session?**
- A concise summary of key insights from the interview batch
- A list of frequently mentioned pain points, clustered by theme
- Structured content exportable and ready for PRD use`,
    draft: {
      summary: 'Product Overview · Target Users',
      sections: [
        {
          id: 'overview',
          title: 'Product Overview',
          content: `InsightFlow helps early-stage product teams turn messy user interview notes into structured, actionable insights. The core V1 value proposition: auto-generate structured insight summaries from raw interview content — not a full research platform.

**Core problem solved:** It's hard to quickly surface common insights across multiple interviews. InsightFlow reduces synthesis time and produces output trustworthy enough to feed directly into PRD drafting.`,
        },
        {
          id: 'users',
          title: 'Target Users',
          content: `**Primary V1 user:** Startup founders and PMs at early-stage companies who conduct user interviews themselves, without a dedicated researcher on the team.

Key characteristics:
- Conducts 5–20 interviews per research cycle
- Needs to move from raw notes to team-shareable insights within hours, not days
- Currently using unstructured tools (Google Docs, Notion) or no formal synthesis process
- Wants output that connects directly to product decisions, not academic research reports`,
        },
      ],
    },
    prdAfter: { version: 'v0.2', status: 'in_progress' },
  },

  // ─── Turn 2: After metrics answers → draft Metrics + Features + OOS ─
  {
    id: 'r2',
    thinkSeconds: 5,
    runtimeLines: [
      '🔍 Explore: Reading metrics decisions and output format preference',
      '💭 Think: Metrics are clear, output model defined — entering feature scope',
      '📋 Plan: Draft Metrics, Core Features, Out of Scope',
      '⚡ Execute: Writing three sections',
    ],
    content: `Got it on metrics. Drafting **Success Metrics**, **Core Features**, and **Out of Scope** now.

**Progress:** ✅ Overview & Users | ✍ Metrics + Features | ○ Flow | ○ Criteria

One more question while I write — this will help me define the core flow:

**Where does the user journey start?**
- Directly from uploading or pasting content (lightweight, no setup step)
- From creating an analysis session / project first (more structured)

**After AI generates insights, what does the user do?**
- Review and edit results → confirm → export
- Re-run the analysis with adjusted parameters
- Manually add their own insights alongside AI output`,
    draft: {
      summary: 'Success Metrics · Core Features (V1) · Out of Scope',
      sections: [
        {
          id: 'metrics',
          title: 'Success Metrics',
          content: `- **Primary:** Reduce manual interview synthesis time by >60%
- **Secondary:** Every session produces exportable, structured insights
- **Tertiary:** AI output is used directly in downstream PRD drafting without heavy rework

Success is validated when: a user inputs raw interview content and receives a confirmed, exportable insight summary within a single working session.`,
        },
        {
          id: 'features',
          title: 'Core Features (V1)',
          content: `1. Upload or paste raw interview content (text and documents)
2. AI auto-generates structured insight summaries
3. Cluster repeated pain points across multiple interviews
4. Edit, delete, and confirm generated insights
5. Export confirmed insights as PRD-ready structured output`,
        },
        {
          id: 'outofscope',
          title: 'Out of Scope',
          content: `- Multi-user real-time collaboration
- Full research project management
- Advanced analytics dashboard
- Complex tagging and taxonomy systems
- Multi-project management
- Interview scheduling or recording`,
        },
      ],
    },
    prdAfter: { version: 'v0.5', status: 'in_progress' },
  },

  // ─── Turn 3: After flow answers → draft Flow + Pages + Criteria + Exceptions ─
  {
    id: 'r3',
    thinkSeconds: 5,
    runtimeLines: [
      '🔍 Explore: Reading flow and pages decisions',
      '💭 Think: Flow is clean, pages are defined — ready for acceptance criteria',
      '📋 Plan: Draft Core Flow, Pages, Acceptance Criteria, Exceptions',
      '⚡ Execute: Writing final four sections',
    ],
    content: `Flow confirmed. Drafting the remaining four sections now.

**Progress:** ✅ Overview & Users | ✅ Metrics + Features | ✍ Flow + Criteria

This should complete the full PRD draft. After you review, I'll do a readiness check before we confirm the baseline.`,
    draft: {
      summary: 'Core Flow · Pages in Scope · Acceptance Criteria · Exceptions',
      sections: [
        {
          id: 'flow',
          title: 'Core Flow',
          content: `1. User uploads or pastes raw interview content
2. System processes content and generates structured insights (auto-clustered by theme)
3. User reviews the results: edits inaccurate insights, deletes irrelevant ones, confirms the rest
4. User exports confirmed insights as a structured summary ready for PRD use`,
        },
        {
          id: 'pages',
          title: 'Pages in Scope',
          content: `- **Project Home** — list of past analysis sessions with status and timestamps
- **Interview Input** — paste text or upload documents (drag and drop supported)
- **Insight Results Workspace** — card-based interface for reviewing, editing, and confirming AI-generated insights
- **Export Summary** — PRD-ready structured output with download options`,
        },
        {
          id: 'acceptance',
          title: 'Acceptance Criteria',
          content: `- Given interview input, when synthesis runs, structured insights appear within 30 seconds
- Given insights are confirmed, the PRD-ready export is available and downloadable
- Given both text paste and document upload, both work without errors
- Given export fails, the system shows an error message and retry option while preserving confirmed state`,
        },
        {
          id: 'exceptions',
          title: 'Exceptions / Edge Cases',
          content: `- **Insufficient input:** Block generation, prompt user to add more content before proceeding
- **Failed synthesis:** Allow manual editing and re-confirmation without requiring re-upload
- **Empty results:** Show a clear explanation and suggest re-uploading with more complete notes
- **Export failure:** Show error message and retry option; confirmed insight state is always preserved`,
        },
      ],
    },
    prdAfter: { version: 'v0.8', status: 'in_progress' },
  },

  // ─── Turn 4: Readiness check ──────────────────────────────────────
  {
    id: 'r4',
    thinkSeconds: 6,
    runtimeLines: [
      '🔍 Explore: Re-reading the full PRD from top to bottom',
      '💭 Think: Checking internal consistency and coverage gaps',
      '📋 Plan: Present readiness summary and ask for baseline confirmation',
      '⚡ Execute: Running self-check',
      '✓ Reflect: PRD is ready for confirmation',
    ],
    content: `All sections drafted. Here's the readiness summary:

**Completed**
- ✅ Product Overview
- ✅ Target Users
- ✅ Success Metrics
- ✅ Core Features (V1)
- ✅ Out of Scope
- ✅ Core Flow
- ✅ Pages in Scope
- ✅ Acceptance Criteria
- ✅ Exceptions / Edge Cases

**Could improve in V1.1**
- Success metric quantitative targets (e.g., reduce time by exactly 60%)
- Edge case: handling very long interview transcripts (>10,000 words)
- Non-functional requirements (performance, security, scalability)

**Recommendation:** This PRD is ready to confirm as baseline **v1.0**. Reply *"confirm"* to lock it and move to UI Spec, or tell me what to adjust.`,
    draft: null,
    prdAfter: { version: 'v1.0', status: 'confirmed' },
  },
]
