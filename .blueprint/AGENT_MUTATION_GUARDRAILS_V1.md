# Agent Mutation Guardrails V1

> 本文档定义 Blueprint 平台 V1 中各专业 Agent 在执行“生成 / 更新 / 重生成 / 确认前准备”时必须遵守的统一底线规则。
> 本文档不强制统一各类资产的具体写入机制，而是统一判断边界、确认门、阻断规则和结构化结果回传要求。

---

## 1. 文档目标

本文件回答 5 个核心问题：

1. 各 Agent 什么时候可以生成或更新自己的资产
2. 哪些情况必须继续澄清，不能贸然写入
3. 哪些情况必须先请求用户确认
4. 各 Agent 自主执行时，需要统一遵守哪些底线
5. `Orchestrator` 在这种模式下仍负责什么

---

## 2. 核心结论

### 2.1 当前版本采用“各 Agent 各自控制生成 / 更新”

Blueprint V1 不为了统一而统一，不强制所有资产都走同一种写入执行机制。

当前原则是：

- 各专业 Agent 对各自资产拥有生成 / 更新控制权
- `Orchestrator` 负责路由、装配、确认门、状态迁移、任务触发与结果回收
- 不由 `Orchestrator` 统一接管所有正文或代码落地执行

### 2.2 统一的是控制底线，不是执行方式

虽然各 Agent 各自控制，但以下内容必须统一：

- readiness 判断口径
- action type 口径
- blocking / non-blocking gap 规则
- 用户确认门规则
- 写后结构化回传规则

### 2.4 新增统一会话协作底线

从 `PRD_V1.md` v1.19 起，所有 Agent 的生成 / 更新 / 重生成 / 审查动作还必须同时适配：

- 会话级单一 `active agent` 持续接管
- 条件触发式 `handoff`
- `Orchestrator` 作为会话状态唯一真相源
- 统一协作外壳的结构化回传

### 2.3 文档型资产与执行型资产可以采用不同落地方式

V1 中至少区分两类：

- **文档型资产**：`PRD / UI Spec / Tech Spec / Mockup Review`
- **执行型资产**：`Mockup`

文档型资产更接近结构化正文更新；执行型资产更接近代码生成、命令执行与运行验证。

---

## 3. 适用范围

本文件覆盖以下 6 个核心 Agent：

- `PM Agent`
- `UI Designer Agent`
- `Mockup Agent`
- `Mockup Review Agent`
- `Dev Agent`
- `Orchestrator`

说明：

- `Orchestrator` 不直接代替专业 Agent 执行正文生成
- 但所有专业 Agent 的生成 / 更新动作都必须处于 `Orchestrator` 的流程控制之下

---

## 4. 总体原则

### 4.1 资产 owner 原则

每个正式资产都应由对应 owner Agent 负责生成或更新：

| 资产 | Owner Agent |
|------|-------------|
| `PRD` | `PM Agent` |
| `UI Spec` | `UI Designer Agent` |
| `设计稿相关摘要 / 同步建议` | `UI Designer Agent` |
| `Mockup` | `Mockup Agent` |
| `Mockup Review` | `Mockup Review Agent` |
| `Tech Spec` | `Dev Agent` |

### 4.2 Orchestrator 是流程控制 owner

`Orchestrator` 负责：

- 意图路由
- 上下文装配
- 轻确认控制
- 状态迁移
- 任务触发
- 结果回收
- `active agent` 持续接管治理
- `handoff` 裁决与审计记录

`Orchestrator` 不负责：

- 代替专业 Agent 生成业务正文
- 统一接管所有复杂执行型资产的具体落地

### 4.3 `active agent` 真相源原则

- 同一会话在任一时刻只允许一个 `active agent`
- `Orchestrator` 是唯一允许写入 `active agent`、待确认事项和 `handoff` 事件的系统角色
- 专业 Agent 可以提出 `handoff_request`，但不能自行完成切换
- 若 Agent 自述与系统会话状态冲突，必须以 `Orchestrator` 持久状态为准

### 4.4 统一协作外壳原则

所有可持续对话或可回传系统结果的 Agent，默认都必须支持以下结构化字段中的一部分：

- `user_visible_reply`
- `confidence_level` 或 `confidence`
- `handoff_request`
- `requires_confirmation` 或 `needs_confirmation`
- `affected_assets`

说明：

- 对话型 Agent 通常完整返回该外壳
- 执行型 / 审查型 Agent 可在执行回执中返回其适用子集
- 不允许只在自然语言里隐式表达切换建议，而不输出结构化字段

### 4.5 用户确认仍是正式变更的前置门

无论生成还是更新，只要涉及正式资产变更、基线变更、影响同步或重生成，都必须在对话中经过用户明确确认。

### 4.6 可以持续完善工作草稿，但不能伪装成已确认基线

工作草稿可以在多轮共创中持续生成和更新，但：

- 草稿 != 当前确认基线
- 待确认内容不能伪装成已确认内容
- 对下游产生正式影响时必须显式进入确认门

---

## 5. 通用判断状态

每个 Agent 在准备对自己的资产做动作前，至少要先完成以下状态判断。

### 5.1 `insufficient`

含义：

- 当前信息不足以形成可靠草稿或更新

要求：

- 继续澄清
- 输出缺失项
- 不执行正式生成 / 更新

### 5.2 `draftable`

含义：

- 当前信息足够形成一版工作草稿，但仍存在非阻断性缺口

要求：

- 可以建议生成工作草稿
- 明确列出非阻断缺口
- 不将草稿直接当作确认基线

### 5.3 `updatable`

含义：

- 当前信息足够对现有资产做明确更新

要求：

- 输出更新范围
- 输出影响说明
- 在需要时请求用户确认再执行更新

### 5.4 `confirmable`

含义：

- 当前资产已达到建议确认当前基线的条件

要求：

- 先完成自检
- 输出确认摘要
- 等待用户在对话中明确确认

### 5.5 `blocked`

含义：

- 存在阻断性缺口、冲突或执行失败，当前动作不能继续

要求：

- 明确阻断原因
- 给出下一步建议
- 不得伪装成可继续推进

---

## 6. 通用动作类型

各 Agent 的动作可以不同，但建议统一映射到以下动作类型。

### 6.1 `continue_clarify`

适用：

- 信息不足
- 关键问题未决

### 6.2 `generate_draft`

适用：

- 首次生成工作草稿
- 当前信息已达到 `draftable`

### 6.3 `update_asset`

适用：

- 对已有资产做局部或整体更新
- 当前信息已达到 `updatable`

### 6.4 `propose_regenerate`

适用：

- 对执行型资产或依赖型产物提出重生成建议
- 例如 `Mockup` 或设计稿更新

### 6.5 `prepare_confirmation`

适用：

- 当前资产已达到 `confirmable`
- 需要输出自检摘要、确认摘要和剩余风险

### 6.6 `block_and_explain`

适用：

- 当前存在阻断性缺口、冲突或执行失败

---

## 7. Gap 分级规则

### 7.1 `blocking_gap`

定义：

- 若不解决，当前资产无法可靠生成、更新或确认

示例：

- `PM Agent`：核心功能边界不清
- `UI Designer Agent`：PRD 页面范围不足以支撑 UI Spec
- `Mockup Agent`：缺少关键页面或关键流程定义
- `Mockup Review Agent`：无可检查的 Mockup 结果
- `Dev Agent`：上游核心资产缺失或冲突

要求：

- 进入 `blocked`
- 不得假装可以继续推进

### 7.2 `non_blocking_gap`

定义：

- 不影响当前主动作成立，但需要显式记录

示例：

- 部分次要文案未定
- 个别视觉微调未确定
- 部分部署依赖暂未补齐

要求：

- 可继续生成草稿或更新
- 必须显式记录为待确认项、开放问题或风险项

---

## 8. 用户确认门规则

以下场景默认必须先请求用户确认：

### 8.1 首次形成正式资产草稿

例如：

- 首次生成 `PRD`
- 首次生成 `UI Spec`
- 首次生成 `Tech Spec`

### 8.2 更新已存在的正式资产

例如：

- 新增需求
- 修改交互规则
- 更新技术边界

### 8.3 会影响其他资产

例如：

- `PRD` 更新会影响 `UI Spec / Mockup / Tech Spec`
- `UI Spec` 更新会影响 `设计稿 / Mockup / Tech Spec`

### 8.4 会触发重生成

例如：

- 需要重生成设计稿
- 需要重生成 Mockup

### 8.5 会改变当前基线

例如：

- 当前资产准备从 `完善中` 进入 `已确认`

### 8.6 会触发或确认 `handoff`

例如：

- 当前 Agent 明确判断问题超出自身职责边界
- 当前问题存在低置信度归因，需要用户选择处理方向
- 审查 / 执行结果已足以明确建议切换处理方

---

## 9. 各 Agent 的自主执行边界

### 9.1 `PM Agent`

自主控制：

- 是否继续追问
- 是否生成 PRD 草稿
- 是否更新 PRD
- 是否建议确认当前 PRD 基线

必须回传：

- 缺失项
- 更新范围
- 影响资产建议
- 自检摘要
- 是否建议确认
- 必要时 `handoff_request`

### 9.2 `UI Designer Agent`

自主控制：

- 是否继续收集设计偏好
- 是否生成 / 更新 UI Spec
- 是否生成设计稿或建议同步设计稿变更
- 是否建议确认当前 UI 基线

必须回传：

- 设计变更摘要
- 同步建议
- 影响资产建议
- 自检摘要
- 必要时 `handoff_request`

### 9.3 `Mockup Agent`

自主控制：

- 是否具备足够上游基线可以生成
- 是首次生成、局部更新还是重生成
- 是否允许带非关键 fallback 继续执行

必须回传：

- 执行状态
- 预览链接
- 生成范围
- fallback_items
- risk_items
- failure_summary
- 必要时 `handoff_request`

### 9.4 `Mockup Review Agent`

自主控制：

- 是否具备足够证据执行审查
- 输出 `pass / pass_with_risks / blocked`
- 输出问题清单、分级、归因和建议路由

必须回传：

- 结构化问题结果
- 阻断判断
- 是否允许继续推进
- 必要时 `handoff_request`

### 9.5 `Dev Agent`

自主控制：

- 是否具备足够上游资产可以生成 / 更新 Tech Spec
- 是否需要先记录开放问题
- 是否建议确认当前 Tech Spec 基线

必须回传：

- 风险项
- 假设项
- 开放问题
- 依赖缺口
- 自检摘要
- 必要时 `handoff_request`

---

## 10. 文档型资产与执行型资产的差异

### 10.1 文档型资产

包括：

- `PRD`
- `UI Spec`
- `Tech Spec`
- `Mockup Review`

特点：

- 以结构化文本为主
- 更适合多轮草稿更新
- 更适合 section 级更新

Guardrails 要点：

- 严格区分草稿与基线
- 严格记录变更范围
- 确认前必须先自检

### 10.2 执行型资产

包括：

- `Mockup`

特点：

- 涉及多文件代码生成
- 涉及命令执行与运行验证
- 涉及预览地址和局部重生成

Guardrails 要点：

- 不强制用文档型资产的更新机制套它
- 重点控制“是否允许执行、执行范围、执行结果、失败回传”
- 更强调 `partial_success / failed / blocked` 的区分

---

## 11. Orchestrator 在这套模式中的职责

虽然各 Agent 各自控制生成 / 更新，但 `Orchestrator` 仍然必须统一负责：

### 11.1 入口控制

- 判断当前由哪个 Agent 处理
- 在已有 `active agent` 的会话中默认保持持续接管，而不是逐轮重路由
- 为目标 Agent 注入最小必要上下文

### 11.2 确认控制

- 在专业 Agent 输出确认建议后，负责展示系统确认
- 等待用户明确确认

### 11.3 状态控制

- 维护 `asset_registry`
- 写入 `confirmation_log`
- 写入 `impact_log`
- 更新 `session_index`

### 11.4 任务控制

- 触发设计稿生成 / 读回
- 触发 Mockup 生成 / 重生成
- 触发 Mockup Review

### 11.5 结果回收

- 回收各 Agent 的结构化结果
- 决定是否推进、阻断、标记待同步或待重生成
- 回收并审计 `handoff_request`、`needs_confirmation` 与相关会话状态变化

---

## 12. 通用结构化回传要求

无论各 Agent 如何实现自己的生成 / 更新，都必须至少回传以下几类信息中的一部分：

### 12.1 当前判断

- `readiness`
- `action_type`
- `confidence_level`

### 12.2 本轮结果

- `updated_asset`
- `updated_sections` 或 `generated_scope`
- `change_summary`

### 12.3 风险与缺口

- `blocking_gaps`
- `non_blocking_gaps`
- `risk_items`
- `open_questions`

### 12.4 确认建议

- `requires_confirmation`
- `ready_for_confirmation`
- `affected_assets`

### 12.5 协作状态

- `handoff_request`
- `active_agent`
- `handoff_reason`
- `handoff_confidence`

### 12.5 执行结果

- `status`
- `preview_url`（如适用）
- `error_summary`

---

## 13. 明确不做

V1 当前不做以下事情：

- 不强制所有 Agent 共用同一种写入执行器
- 不要求 `Orchestrator` 统一接管所有业务正文或代码落地
- 不为了统一抽象而压平文档型资产与执行型资产的差异
- 不让各 Agent 在无结构化回传的情况下自由修改正式资产
- 不让各 Agent 绕过 `Orchestrator` 直接改写 `active agent` 或系统确认状态

---

## 14. 与其他文档的关系

- `PRD_V1.md`：定义产品层面的 Agent 架构、职责边界与确认机制
- `AGENT_MEMORY_SOLUTION_V1.md`：定义共享状态、资产 Memory 与上下文装配原则
- `AGENT_CAPABILITIES_V1.md`：定义 6 个核心 Agent 的能力总框架
- `agent-prompts/*.md`：定义各 Agent 的行为规则与交互约束
- `agent-capabilities/*.md`：定义各 Agent 的可实现能力、输入输出与失败处理

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V1.1 | 2026-03-27 | 对齐 `PRD_V1.md` v1.19，补充 `active agent` 真相源原则、统一协作外壳、`handoff_request` 底线和 Orchestrator 的会话持续接管职责 |
| V1.0 | 2026-03-26 | 初始版本，定义“各 Agent 各自控制生成/更新，系统统一控制底线”的 Mutation Guardrails，覆盖 readiness、action type、gap 分级、确认门、结构化回传和 Orchestrator 职责边界 |
