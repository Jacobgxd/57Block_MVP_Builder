# Blueprint Context Index

> 这是 AI Agent 的入口文件。每次运行任何命令前，先读这个文件确认当前状态。
> 每个 Agent 命令完成后必须更新对应的状态和时间戳。

---

## 当前项目信息

**项目名称**: [项目名称]
**当前活跃大版本**: V1
**PDLC 当前阶段**: Define（定义） / Verify（验证） / Implement（实现） / Iterate（迭代）

---

## 文档状态

| 文档 | 文件路径 | 当前版本 | 状态 | 最后更新 | 负责人 |
|-----|---------|---------|------|---------|------|
| PRD | `.blueprint/PRD_V1.md` | 1.0 | 🟡 进行中 / ✅ 已确认 / 📦 Archived | - | - |
| UI Spec | `.blueprint/UI_Spec.md` | 1.0 | ⚪ 待生成 | - | - |
| Mockup | `.blueprint/mockup/` | - | ⚪ 待生成 | - | - |
| Mockup Review | `reports/mockup-reviews/LATEST.md` | - | ⚪ 待生成 | - | - |
| Tech Spec | `.blueprint/Tech_Spec.md` | 1.0 | ⚪ 待生成 | - | - |
| Test Spec | `.blueprint/Test_Spec.md` | 1.0 | ⚪ 待生成 | - | - |
| Agent Memory | `.blueprint/AGENT_MEMORY_SOLUTION_V1.md` | V1.1 | ✅ 已起草 | 2026-03-26 | 纯 Memory 设计文档，不包含能力与工具设计 |
| Agent Capabilities | `.blueprint/AGENT_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | Agent 能力总索引文档，定义能力框架、落地方式与分文档拆分规划 |
| Global Verify | `reports/verify/LATEST.md` | - | ⚪ 待运行 | - | - |
| Plan | `plans/[feature].md` | - | ⚪ 待生成 | - | - |

**状态说明**：⚪ 待生成 → 🟡 进行中 → 👀 待 Review → ✅ 已确认 → 📦 Archived

---

## Agent Prompt Spec 状态

| Agent | 文件路径 | 当前版本 | 状态 | 最后更新 | 说明 |
|------|---------|---------|------|---------|------|
| PM Agent | `.blueprint/agent-prompts/PM_AGENT_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 前台 PRD 阶段 Agent |
| UI Designer Agent | `.blueprint/agent-prompts/UI_DESIGNER_AGENT_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 前台 UI 设计阶段 Agent |
| Orchestrator | `.blueprint/agent-prompts/ORCHESTRATOR_AGENT_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 系统状态与路由中枢 |
| Mockup Agent | `.blueprint/agent-prompts/MOCKUP_AGENT_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 后台 Mockup 构建执行 Agent |
| Mockup Review Agent | `.blueprint/agent-prompts/MOCKUP_REVIEW_AGENT_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 后台 Mockup 专项审查 Agent |
| Dev Agent | `.blueprint/agent-prompts/DEV_AGENT_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 前台 Tech Spec 阶段 Agent |

**说明**：
- 前台可继续使用 `Blueprint AI` 作为统一展示名，但它不再作为独立 Agent Prompt 存在。
- `Mockup Agent` 与 `Mockup Review Agent` 都是系统内部 Agent，不作为前台人格化共创身份暴露。
- 当前阶段不设通用 `Review Agent` Prompt；`/review` 保留给后续实现阶段的代码审查与漂移检测流程。

---

## Agent Capability Spec 状态

| Agent | 文件路径 | 当前版本 | 状态 | 最后更新 | 说明 |
|------|---------|---------|------|---------|------|
| Orchestrator | `.blueprint/agent-capabilities/ORCHESTRATOR_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 定义系统执行中枢的事件识别、路由、装配、状态迁移、轻确认、任务触发与结果回收能力 |
| PM Agent | `.blueprint/agent-capabilities/PM_AGENT_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 定义需求澄清、结构化 PRD 生成、需求变更吸收、影响分析输入准备、自检与确认前准备能力 |
| UI Designer Agent | `.blueprint/agent-capabilities/UI_DESIGNER_AGENT_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 定义 UI Spec 生成、设计系统定义、Paper/Figma 设计稿生成与读回、同步判断、设计返工与自检能力 |
| Mockup Agent | `.blueprint/agent-capabilities/MOCKUP_AGENT_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 定义 Mockup 的上游资产读取、范围提取、构建运行、预览交付、Review 问题吸收、局部重生成与失败降级能力 |
| Mockup Review Agent | `.blueprint/agent-capabilities/MOCKUP_REVIEW_AGENT_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 定义 Mockup 的多资产对齐审查、问题分级归因、阻断判断、建议路由与回归复查能力 |
| Dev Agent | `.blueprint/agent-capabilities/DEV_AGENT_CAPABILITIES_V1.md` | V1.0 | ✅ 已起草 | 2026-03-26 | 定义多资产收敛、技术选型、系统架构、Mockup 对齐、数据模型、接口契约、风险与未决项管理、Tech Spec 生成与自检能力 |

---

## AI 实现代码时，必读文件（按顺序）

1. **`.blueprint/PRD_V1.md`** — 读"📌 当前需求全貌"部分
2. **`.blueprint/Tech_Spec.md`** — 架构、数据模型、API 设计、src 结构
3. **`.blueprint/UI_Spec.md`** — UI 规范
4. **`.blueprint/mockup/`** — 视觉基准（读 src/ 下的代码，忽略 node_modules/）
5. **`.blueprint/Test_Spec.md`** — 验收标准（编码时的完成边界）

---

## 流水线执行记录

| 步骤 | 命令 | 状态 | 完成时间 | 备注 |
|-----|-----|------|---------|------|
| 1. PM Agent | `/create-prd` | ⚪ | - | - |
| 2. UI Design Agent | `/create-ui-spec` | ⚪ | - | - |
| 3. Mockup Agent | `/create-mockup` | ⚪ | - | - |
| 3a. Mockup Review + 人工确认 | `/review-mockup` | ⚪ | - | 迭代次数：0 |
| 4. Dev Agent | `/create-tech-spec` | ⚪ | - | - |
| 5. QA Agent | `/create-test-spec` | ⚪ | - | - |
| 6. Global Verifier | `/verify` | ⚪ | - | 评分：- |
| 7. Plan Agent | `/create-plan` | ⚪ | - | - |
| 8. Exe Agent | `/execute` | ⚪ | - | 进度：0% |
| 9. Implementation Review | `/review` | ⚪ | - | 漂移项：- |
| 10. Test Exe | `/test` | ⚪ | - | Release Gate：- |

---

## 最近更新日志

```
YYYY-MM-DD  [步骤] [命令] — [做了什么，为什么]
2026-03-26  [Agent Prompt Spec] [manual] — 新增 Mockup Agent、Mockup Review Agent、Dev Agent Prompt 索引，并统一澄清 /review 的语义不是当前阶段的通用 Review Agent
2026-03-26  [Agent Prompt Spec] [manual] — 移除 Blueprint AI 独立 Prompt 索引，收口为前台统一展示名，不再作为独立 Agent 存在
2026-03-26  [Architecture Spec] [manual] — 新增 Agent Memory & Capabilities 文档，定义 Memory 分层、共享/私有边界、核心对象模型、读写权限和首版能力矩阵
2026-03-26  [Architecture Spec] [manual] — 将 Agent Memory & Capabilities 文档收口为纯 Memory 设计文档，移除能力矩阵、工具与 MCP 分层
2026-03-26  [Architecture Spec] [manual] — 新增 Agent Capabilities 总索引文档，明确 6 个核心 Agent 的能力框架、MCP/文件读写/命令执行三类落地方式，以及后续分 Agent 文档拆分路径
2026-03-26  [Architecture Spec] [manual] — 新增 Orchestrator Capability 分文档，细化事件识别、路由、装配、状态迁移、轻确认控制、任务触发、结果回收与失败降级规则
2026-03-26  [Architecture Spec] [manual] — 新增 PM Agent Capability 分文档，细化需求澄清、结构化 PRD 生成、需求变更吸收、影响分析输入准备、自检与确认前准备能力
2026-03-26  [Architecture Spec] [manual] — 新增 UI Designer Agent Capability 分文档，细化 UI Spec 生成、Paper/Figma 设计稿生成与读回、同步判断、设计返工、自检与降级处理能力
2026-03-26  [Architecture Spec] [manual] — 新增 Mockup Agent Capability 分文档，细化 Mockup 构建运行、预览链接、Review 问题吸收、局部重生成、结构化回传与失败降级能力
2026-03-26  [Architecture Spec] [manual] — 新增 Mockup Review Agent Capability 分文档，细化多资产对齐审查、问题分级归因、阻断判断、建议路由、回归复查与结构化回传能力
2026-03-26  [Architecture Spec] [manual] — 新增 Dev Agent Capability 分文档，细化多资产收敛、技术选型、系统架构、Mockup 对齐、数据模型、接口契约、风险与未决项管理、Tech Spec 生成与自检能力
```

---

## 历史版本

| 版本 | PRD | 状态 | 归档时间 |
|-----|-----|------|---------|
| V1 | `.blueprint/PRD_V1.md` | 🟡 Active | - |
