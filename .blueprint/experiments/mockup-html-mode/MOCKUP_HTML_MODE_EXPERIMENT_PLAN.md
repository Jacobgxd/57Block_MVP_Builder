# Mockup HTML Mode Experiment Plan

**Overall Progress:** `75%`

## TLDR
在实验分支中验证 `Mockup Agent` 是否可以从“生成可运行前端项目”切换为“生成单文件可交互 HTML Mockup”，以降低 Agent 工具链、环境依赖和运行复杂度，同时保留足够的预览性、可体验性和可审查性。

## Critical Decisions
- Decision 1: 本实验不直接覆盖现有 `V1` 主线规范，只新增实验文档。
  理由：当前方案尚未验证，不应污染 `PRD_V1.md`、主 Prompt 和主 Capability 基线。
- Decision 2: 本实验优先验证 `single interactive HTML`，不同时设计双模式正式切换机制。
  理由：先验证最小新方向是否成立，再讨论是否需要 `single_html + project_mockup` 双模式。
- Decision 3: 本实验只重设计 `Mockup Agent` 和 `Mockup Review Agent` 的实验方案，不立即改 `Orchestrator`、`PRD`、命令系统。
  理由：先把影响面收缩到最小，避免体系过早联动。
- Decision 4: 新方案的目标不是“生成生产代码”，而是“以最低环境复杂度交付可预览、可交互、可审查的原型资产”。
  理由：这与当前项目早期的产品目标和约束更一致。

## Scope
本实验覆盖：
- `Mockup Agent` 单 HTML 模式的角色定义、输入契约、输出契约、运行流程
- `Mockup Review Agent` 对单 HTML Mockup 的审查适配
- 单 HTML Mockup 的最低交付标准
- 进入主线前的决策门标准

本实验不覆盖：
- 主线 `PRD_V1.md` 改写
- 现有 `agent-prompts/*` 和 `agent-capabilities/*` 的正式替换
- `.cursor/commands/*` 的命令改写
- 真实代码实现、浏览器自动化、构建脚本接入
- 双模式正式治理方案

## Proposed Deliverables
- `MOCKUP_HTML_MODE_EXPERIMENT_PLAN.md`
- `MOCKUP_AGENT_HTML_MODE_V1.md`
- `MOCKUP_REVIEW_HTML_MODE_V1.md`

## Merge Gate
只有当以下条件多数成立时，才建议把新方案推进到主线讨论：
- 单 HTML Mockup 可以显著减少工具和环境复杂度
- 用户仍然可以直接预览和体验 P0 核心流程
- `Mockup Review Agent` 仍然可以稳定执行结构化检查
- 输出资产路径、版本信息和反馈闭环仍然清晰
- 不会让后续演进到真实前端项目的迁移成本失控

## Tasks
- [x] 🟩 **Step 1: 定义实验边界**
  - [x] 🟩 说明这是实验分支方案，不替换主线
  - [x] 🟩 明确目标、约束、非目标和决策门

- [x] 🟩 **Step 2: 重写 Mockup Agent 方案**
  - [x] 🟩 将产物从“项目工程”改为“单 HTML 资产”
  - [x] 🟩 重写输入、输出、执行流程和失败策略
  - [x] 🟩 明确何时允许 fallback，何时必须阻断

- [x] 🟩 **Step 3: 适配 Mockup Review Agent**
  - [x] 🟩 重新定义可检查对象
  - [x] 🟩 重新定义检查证据和问题分类
  - [x] 🟩 保持与 `Orchestrator` 的协作契约不失真

- [ ] 🟥 **Step 4: 评估是否值得主线化**
  - [ ] 🟥 总结新方案优势、风险和迁移成本
  - [ ] 🟥 给出“继续实验 / 纳入主线 / 放弃该方向”的判断标准
