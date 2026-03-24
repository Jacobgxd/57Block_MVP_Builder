# Blueprint — AI Agent 命令系统

57Blocks 内部 Context-First Agentic Engineering OS。在写任何代码之前，通过结构化的多 Agent 对话生成统一的上下文包（`.blueprint/`），作为所有下游执行的唯一真相来源。

---

## 🗂️ 文件夹结构

```
.blueprint/                  # 规格文档区（AI 读取的唯一真相来源）
├── CONTEXT.md               # AI 入口文件，指向当前活跃文档
├── PRD_V{N}.md              # 产品需求文档（版本化）
├── UI_Spec.md               # UI 规范文档
├── Tech_Spec.md             # 技术方案文档
├── Test_Spec.md             # 测试方案文档
└── mockup/                  # 可运行静态 Mockup（React + Vite）

reports/                     # 执行记录区（证据、报告）
├── mockup-reviews/          # Mockup Review 报告（版本化，保留历史）
│   ├── MOCKUP_REVIEW_REPORT_v{n}_{timestamp}.md
│   └── LATEST.md
├── test-runs/               # 测试运行报告
│   └── Test_Run_YYYY-MM-DD.md
└── verify/                  # Global Verify 报告
    └── VERIFY_{timestamp}.md

plans/                       # 开发计划（每个 feature 一个文件）
└── [feature-name].md

issues/                      # 问题追踪
└── [issue].md

.cursor/
└── commands/                # 本目录，所有 Agent 命令
```

---

## 🔄 标准流水线

```
Define 阶段（生成规格文档）
  /create-prd
      ↓
  /create-ui-spec
      ↓
  /create-mockup  →  /review-mockup（人工确认，可多轮）
      ↓                   ↑ 不满足则返回修改 PRD/UI Spec
  /create-tech-spec（资深工程师 Review）
      ↓
  /create-test-spec（测试工程师 Review）
      ↓
  /verify（Global Verifier，跨文档一致性）

Implement 阶段（编码）
  /create-plan（资深工程师 Review）
      ↓
  /execute（资深工程师监控）
      ↓
  /review（代码质量 + 漂移检测）
      ↓
  /test（执行 Test Spec）
```

---

## 📋 命令详解

### Define 阶段

#### `/create-prd` — PM Agent
**输出**: `.blueprint/PRD_V{N}.md`
**前置**: 无

把想法转化为结构化、可执行的产品需求文档。支持版本管理：大版本升级创建新文件（PRD_V2.md），小版本迭代在同一文件内追加，始终维护"当前需求全貌"和"迭代历史"两个区域。

---

#### `/create-ui-spec` — UI Design Agent
**输出**: `.blueprint/UI_Spec.md`
**前置**: `.blueprint/PRD_V{N}.md`

将 PRD 转化为结构化 UI 规范，包含设计系统、页面视觉细节、组件规范、交互模式、响应式断点、可访问性（WCAG 2.1 AA）。

---

#### `/create-mockup` — Mockup Agent
**输出**: `.blueprint/mockup/`（React + Vite 可运行项目）
**前置**: `.blueprint/UI_Spec.md`

基于 UI 规范生成可在浏览器中运行的静态页面，供设计师和 PM 验证视觉效果和交互逻辑。

---

#### `/review-mockup` — Mockup Review Agent
**输出**: `reports/mockup-reviews/MOCKUP_REVIEW_REPORT_v{n}_{timestamp}.md`
**前置**: `.blueprint/UI_Spec.md` + `.blueprint/mockup/`

自动对比 Mockup 代码与 UI 规范，生成版本化 Review 报告（不覆盖历史）。评分 ≥ 8.5 且无高优先级问题时，可判定为通过，进入下一步。每次迭代修改 PRD/UI Spec 时需记录变更原因。

---

#### `/create-tech-spec` — Dev Agent
**输出**: `.blueprint/Tech_Spec.md`
**前置**: `.blueprint/PRD_V{N}.md` + `.blueprint/UI_Spec.md` + `.blueprint/mockup/`（经设计师确认）

生成可执行的技术方案，包含技术选型、系统架构、数据模型、API 设计、src 目录结构、前端页面/组件/数据三张对照表。需资深工程师 Review 后进入下一步。

---

#### `/create-test-spec` — QA Agent
**输出**: `.blueprint/Test_Spec.md`
**前置**: `.blueprint/PRD_V{N}.md` + `.blueprint/UI_Spec.md` + `.blueprint/Tech_Spec.md`

⚠️ **在开发之前运行**，不是开发之后。将需求与技术方案转化为可执行测试用例（功能/UI/API/性能/安全/A11y），生成 Release Gate 通过标准，作为 Exe Agent 编码时的验收边界。需测试工程师 Review 后进入下一步。

---

#### `/verify` — Global Verifier ⭐ 新增
**输出**: `reports/verify/VERIFY_{timestamp}.md`
**前置**: 以上5份文档全部存在且经人工确认

跨文档一致性检查。验证功能覆盖完整性、数据模型与UI字段一致性、API与前端交互一致性、非功能需求覆盖、验收标准与测试用例映射。输出综合完整性评分，有阻塞项时禁止进入 `/create-plan`。

---

### Implement 阶段

#### `/create-plan` — Plan Agent
**输出**: `plans/[feature-name].md`
**前置**: 以上所有文档 + `/verify` 无阻塞项

读取所有 Blueprint 文档后生成开发计划。同时包含开发步骤和测试任务，每个步骤列出具体文件路径（来自 Tech Spec）。需资深工程师 Review 后开始执行。

---

#### `/execute` — Exe Agent
**前置**: `plans/[feature-name].md`（已 Review）

**必须先执行 Mission Briefing**：读取 Tech Spec（架构约束）、mockup（视觉基准）、Test Spec（验收边界），再按 Plan 逐步编码。每步完成前做四项对齐确认（数据模型/UI/API/测试用例）。发现与文档不一致时立即暂停讨论。

---

#### `/review` — Review Agent
**前置**: `.blueprint/Tech_Spec.md` + `.blueprint/UI_Spec.md` + `.blueprint/PRD_V{N}.md`

**双维度审查**：
1. **漂移检测**：对照 Tech Spec/UI Spec/PRD 检查实现是否偏离规格，输出三张对照表
2. **代码质量**：TypeScript、错误处理、性能、安全、架构规范

两个维度都有阻塞项时不允许进入 `/test`。

---

#### `/test` — Test Exe Agent
**前置**: `.blueprint/Test_Spec.md`
**输出**: `reports/test-runs/Test_Run_YYYY-MM-DD.md`

按 Test Spec 严格执行（P0→P1→P2），每条用例必须有可核验证据。输出 Release Gate 结论（PASS/FAIL/BLOCKED）和缺陷清单。

---

### 工具命令

| 命令 | 用途 |
|-----|-----|
| `/explore` | 编码前分析影响面，理解现有代码结构 |
| `/document` | 代码变更后更新文档 |
| `/peer-review` | 跨模型代码审查（Codex/Gemini） |
| `/issue` | 快速捕获 bug 或功能需求，保存到 `issues/` |
| `/learn` | 遇到不熟悉概念时切换到教学模式 |

---

## 💡 最佳实践

**关键原则：所有"定义"在代码动之前必须完成并一致。**

- `.blueprint/CONTEXT.md` 是 AI 的入口，每次运行命令前先读它，完成后更新状态
- 每次修改 PRD 时必须在迭代历史里记录原因，防止 AI 走回头路
- `/verify` 是最便宜的发现问题时机，不要跳过
- `/execute` 的 Mission Briefing 不可跳过，这是防止代码漂移的核心机制
- Test Spec 在 Tech Spec 之后、开发之前生成，让验收标准成为编码边界而不是事后检验

---

## 🔧 自定义

修改 `.cursor/commands/` 下的命令文件即可调整 Agent 行为。每个文件包含完整的 System Prompt，可针对具体项目类型或技术栈进行调整。
