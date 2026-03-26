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
- `Mockup Agent` 与 `Mockup Review Agent` 都是系统内部 Agent，不作为前台人格化共创身份暴露。
- 当前阶段不设通用 `Review Agent` Prompt；`/review` 保留给后续实现阶段的代码审查与漂移检测流程。

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
```

---

## 历史版本

| 版本 | PRD | 状态 | 归档时间 |
|-----|-----|------|---------|
| V1 | `.blueprint/PRD_V1.md` | 🟡 Active | - |
