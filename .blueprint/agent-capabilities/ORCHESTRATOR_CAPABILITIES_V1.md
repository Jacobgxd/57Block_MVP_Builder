# Orchestrator Capabilities V1

> 本文档定义 Blueprint 平台 `Orchestrator` 在 V1 中必须具备的可实现能力项、能力落地方式、最小输入依赖、标准输出结果、失败降级策略与禁止项。
> 本文档是 `ORCHESTRATOR_AGENT_V1.md` 的能力落地补充，不替代其 System Prompt 规则。

---

## 1. Agent 目标

`Orchestrator` 是 Blueprint V1 的系统执行中枢。

它的目标不是生成业务内容，而是确保系统能够：

- 在正确的资产焦点下调用正确的后台 Agent
- 在会话内维护单一 `active agent` 持续接管
- 在需要时执行 `handoff` 裁决
- 为目标 Agent 装配最小必要上下文
- 统一维护资产状态迁移
- 在确认动作前执行 Gate 检查
- 触发后台任务并回收结果
- 把关键系统结论沉淀到共享 Memory

一句话：

- `Orchestrator` 负责让系统“按正确流程运行”
- 不负责让系统“替专业 Agent 产出业务内容”

---

## 2. P0 必需能力

### 2.1 事件识别能力

必须能识别当前输入或系统回调属于哪一类事件。

V1 至少覆盖：

- `focus_asset`
- `new_chat`
- `submit_feedback`
- `request_requirement_change`
- `request_design_rework`
- `confirm_asset_baseline`
- `confirm_apply_change`
- `confirm_regenerate_asset`
- `review_completed`
- `asset_regenerated`

落地要求：

- 能从前端入口动作、当前资产焦点、用户回复内容中提取事件类型
- 当一次输入同时包含多个动作信号时，能先识别主事件，再标出次事件
- 当事件识别低置信度时，不得直接自动路由，必须进入系统确认

### 2.2 资产焦点判定能力

必须能识别当前对话或操作绑定的是哪个资产焦点。

V1 至少支持：

- `PRD`
- `UI Spec`
- `设计稿`
- `Mockup`
- `Tech Spec`
- `交付摘要`

落地要求：

- 能根据前端当前页面、目录焦点、会话来源、入口按钮识别资产焦点
- 当用户从下游发起“需求变更”或“设计返工”时，能正确识别来源资产与目标资产
- 当当前资产处于 `待同步` 时，能允许查看但阻止继续作为确认基线推进

### 2.3 意图路由能力

必须能把当前事件路由给正确的专业 Agent 或后台任务。

V1 路由范围：

- `PRD` 相关共创或需求变更 -> `PM Agent`
- `UI Spec / 设计稿` 相关共创或设计返工 -> `UI Designer Agent`
- `Tech Spec` 共创 -> `Dev Agent`
- `Mockup` 构建或重生成 -> `Mockup Agent`
- `Mockup` 专项审查 -> `Mockup Review Agent`

落地要求：

- 路由结果必须可追溯到事件类型、资产焦点、来源资产和当前状态
- 路由必须区分“会话首次命中”与“已有 `active agent` 的持续接管”
- 对 `Mockup` 反馈必须先区分是需求问题、设计问题还是执行问题
- 低置信度归因时必须回落到系统确认，而不是伪装成高置信路由

### 2.3.1 `active agent` 持续接管与 `handoff` 能力

必须能维护会话内单一 `active agent`，并在触发条件出现时裁决是否切换。

V1 至少覆盖：

- 会话内默认持续交给当前 `active agent`
- 当前 Agent 返回 `handoff_request`
- 高置信度自动切换
- 低置信度切换先系统确认
- 会话恢复时恢复最近一次有效的 `active agent`

落地要求：

- `Orchestrator` 是 `active agent` 的唯一写入者
- `asset focus` 在已有 `active agent` 的情况下只作为弱信号
- 每次 `handoff` 都必须写入显式系统事件，用于审计和策略优化

### 2.4 上下文装配能力

必须能为目标 Agent 注入最小必要上下文，而不是每轮全量加载整个项目。

V1 至少支持 4 层装配策略：

- 轻量增量装配
- 资产级重装配
- 跨资产重装配
- 全局重装配

落地要求：

- 能从 `Asset Memory` 与 `Shared System Memory` 读取最小输入
- 能优先读取摘要、索引、会话快照，而不是反复读取整份长文
- 能根据事件升级装配级别
- 装配结果必须包含上下文来源，以便追溯

### 2.5 会话快照维护能力

必须维护支持增量装配的会话快照。

V1 最少字段：

- `session_id`
- `entry_asset_focus`
- `current_asset_focus`
- `based_on_versions`
- `active_agent`
- `current_topic`
- `last_summary`
- `last_handoff_reason`
- `last_handoff_confidence`
- `pending_confirmation`
- `pending_task`
- `resume_snapshot`
- `relevant_decision_ids`
- `relevant_issue_ids`
- `relevant_impact_ids`

落地要求：

- 新建聊天时初始化会话快照
- 每轮完成后更新 `last_summary` 与待确认状态
- 当用户切换资产或来源意图时，能够新建或重绑会话上下文
- 会话恢复时能够恢复最近一次有效的 `active_agent`
- 快照内容必须足以支持“继续当前 Agent”而不是被迫每轮重路由

### 2.6 状态迁移控制能力

必须统一维护资产状态的合法迁移。

V1 至少覆盖以下状态：

- `待完善`
- `完善中`
- `已确认`
- `待同步`
- `重生成中`

落地要求：

- 所有状态更新都写回 `asset_registry`
- 任何跨资产变更导致的状态失效必须被显式标记为 `待同步`
- 任何重生成任务开始时应进入 `重生成中`
- 任务完成后应根据结果回到 `完善中`、`已确认` 或阻断状态

### 2.7 轻确认控制能力

必须统一控制所有需要用户明确确认的动作。

V1 至少覆盖：

- 确认当前资产基线
- 确认按方案更新对应文档
- 确认同步影响范围
- 确认重生成设计稿
- 确认重生成 Mockup

落地要求：

- 所有确认前必须先收到专业 Agent 的自检摘要、影响分析或问题摘要
- `Orchestrator` 负责把这些结论转换为系统确认消息
- 用户未明确确认前，不得执行基线确认、文档同步或重生成
- 确认结果必须写入 `confirmation_log`

### 2.8 Gate 检查能力

必须在执行关键动作前做统一 Gate 检查。

V1 至少检查：

- 上游资产是否已达到允许推进的状态
- 当前资产是否存在未处理的 `待同步`
- 当前轮是否已有明确的专业 Agent 自检结果
- 是否存在未处理的高优先级 Review 问题
- 用户是否已经明确确认

落地要求：

- 任一 Gate 失败时，返回系统阻断消息
- 阻断消息必须说明“为什么不能继续”和“下一步该做什么”

### 2.9 任务触发能力

必须能触发后台任务并追踪任务结果。

V1 至少覆盖：

- 触发 `Mockup Agent` 构建或重生成
- 触发 `Mockup Review Agent` 执行专项审查
- 触发设计稿读回链路
- 触发设计稿重生成链路

落地要求：

- 任务触发前记录触发原因、来源资产和关联版本
- 任务返回后根据结果更新状态和会话
- 任务失败时生成系统阻断消息并沉淀失败原因

### 2.10 结果回收能力

必须能把专业 Agent 或后台任务的结果转化为系统可消费结果。

V1 至少包括：

- 接收 `PM / UI Designer / Dev` 的自检摘要与确认建议
- 接收 `PM / UI Designer / Dev / Mockup` 的 `handoff_request`
- 接收 `Mockup Agent` 的运行结果、预览链接、失败摘要
- 接收 `Mockup Review Agent` 的问题清单、严重级别和归因建议
- 更新 `session_index / confirmation_log / impact_log / review_issue_log`

落地要求：

- 回收结果要结构化，不只保存自然语言
- 回收结果要能支持下一轮装配和后续审计
- 若结果包含 `handoff_request`、`needs_confirmation` 或 `affected_assets`，必须写入统一结果对象

### 2.11 系统透明化输出能力

必须将后台行为转换成用户可理解的系统消息。

只允许三类输出：

- 系统状态消息
- 系统确认消息
- 系统错误 / 阻断消息

落地要求：

- 状态消息说明“系统正在做什么”
- 确认消息说明“动作会影响什么、需要确认什么”
- 阻断消息说明“卡在哪里、应该先处理什么”

---

## 3. P1 可后补能力

以下能力不要求在当前轮立即细化到实现，但适合作为 V1 后续增强：

- 更细粒度的事件组合识别
- 自动维护跨会话意图簇
- 更细粒度的上下文装配缓存
- 更标准化的任务执行日志对象
- 更细粒度的状态机与迁移审计
- 对低置信度归因的解释性摘要

---

## 4. 能力落地方式

### 4.1 文件读取

`Orchestrator` 需要直接或间接读取：

- `.blueprint/CONTEXT.md`
- 当前资产摘要文件或由系统生成的资产摘要
- `Mockup Review` 结果文件
- 相关会话摘要或索引文件

用途：

- 判定当前项目状态
- 判定当前资产焦点与版本
- 组装上下文
- 接收任务结果

### 4.2 Memory 读取与写入

`Orchestrator` 是共享系统状态的主写者。

至少涉及：

- 读取 `project_profile`
- 读取并写入 `asset_registry`
- 读取 `decision_log`
- 写入 `confirmation_log`
- 写入 `impact_log`
- 读取并写入 `session_index`
- 写入 `handoff_log`
- 读取 `review_issue_log`

用途：

- 维护系统状态
- 记录确认结论
- 记录跨资产影响
- 维持会话连续性

### 4.3 专业 Agent 调用

`Orchestrator` 必须能调用以下后台专业 Agent：

- `PM Agent`
- `UI Designer Agent`
- `Dev Agent`
- `Mockup Agent`
- `Mockup Review Agent`

调用要求：

- 传入目标 Agent 所需的最小上下文包
- 回收结构化输出结果
- 根据结果判断是否更新状态、是否触发确认、是否继续下一步任务

### 4.4 设计集成链路触发

`Orchestrator` 不负责直接设计生成，但需要能触发设计集成链路。

V1 相关对象：

- `Paper MCP`
- `Figma MCP`

用途：

- 请求读取设计稿变更摘要
- 请求设计稿生成或更新任务
- 接收设计工具链返回结果

说明：

- `Orchestrator` 负责触发与回收
- 具体设计内容生成与判断由 `UI Designer Agent` 负责

### 4.5 命令执行触发

`Orchestrator` 本身不负责写业务代码或直接运行复杂构建逻辑，但需要能触发执行链路。

V1 主要场景：

- 触发 Mockup 构建
- 触发 Mockup 重生成
- 接收本地运行结果

说明：

- 命令执行的业务主体是 `Mockup Agent`
- `Orchestrator` 负责任务触发、状态维护和结果回收

---

## 5. 最小输入依赖

`Orchestrator` 要稳定工作，最少必须拿到以下输入：

### 5.1 项目与资产状态

- 当前项目标识
- 当前活跃大版本
- 当前资产状态表
- 当前资产焦点
- 当前版本信息

### 5.2 当前事件信息

- 入口动作类型
- 当前用户输入
- 来源页面或来源资产
- 是否是新建聊天、变更、返工、反馈或确认回复
- 当前会话是否已有 `active_agent`

### 5.3 当前上下文摘要

- 当前资产摘要
- 必要上游资产摘要
- 当前会话快照
- 当前待确认项
- 当前阻断项

### 5.4 可选增强输入

- 最近一次专业 Agent 自检摘要
- 最近一次影响分析结果
- 最近一次 Review 结果
- 最近一次任务执行结果

---

## 6. 标准输出结果

每轮执行后，`Orchestrator` 至少应输出以下结构化结果中的一部分：

### 6.1 路由结果

- `event_type`
- `asset_focus`
- `target_agent_or_task`
- `routing_confidence`
- `reason`
- `routing_mode` (`initial_route` / `continue_active_agent` / `handoff`)

### 6.2 上下文包结果

- `assembly_level`
- `included_context_sources`
- `based_on_versions`
- `active_agent`
- `pending_confirmation`
- `blocking_items`

### 6.3 状态更新结果

- `asset_status_updates`
- `session_updates`
- `active_agent_update`
- `impact_updates`
- `confirmation_updates`

### 6.4 用户可见系统消息

- `message_type`
- `message_text`
- `next_expected_action`

### 6.5 任务结果回收

- `task_name`
- `task_status`
- `task_output_summary`
- `task_failure_reason`

### 6.6 `handoff` 审计结果

- `from_agent`
- `to_agent`
- `trigger_reason`
- `handoff_confidence`
- `user_confirmed`

---

## 7. 失败与降级处理

### 7.1 事件识别低置信度

处理方式：

- 不自动执行高风险路由
- 输出系统确认消息，请用户选择方向

### 7.2 上下文缺失

处理方式：

- 标记缺失字段
- 阻止执行依赖完整上下文的动作
- 返回“缺少什么上下文、需要先补什么”

### 7.3 上游资产未确认或待同步

处理方式：

- 阻止继续基线确认或下游推进
- 明确提示应先更新哪个上游资产

### 7.4 专业 Agent 未返回有效结构化结果

处理方式：

- 不直接推进状态
- 保持当前资产状态不变
- 返回系统错误 / 阻断消息

### 7.5 Review 阻断

处理方式：

- 若存在高严重级别未处理问题，不允许进入人工验收或继续确认当前基线

### 7.6 任务执行失败

处理方式：

- 将目标资产标记为阻断或保留在 `完善中`
- 输出失败摘要和建议下一步
- 记录失败原因，供下一轮装配使用

---

## 8. 禁止项

`Orchestrator` 在 V1 中明确禁止：

- 直接编写或修改 `PRD / UI Spec / Mockup / Tech Spec` 正文
- 直接替 `PM Agent / UI Designer Agent / Dev Agent` 做领域性内容判断
- 跳过用户确认直接执行基线确认、同步更新或重生成
- 在低置信度时伪装成高置信度自动路由
- 输出长篇人格化专家对话
- 把整项目全文无差别塞给目标 Agent
- 在没有结构化结果回收的情况下推进系统状态

---

## 9. 与其他文档的关系

- `PRD_V1.md`：定义 `Orchestrator` 的产品角色与系统边界
- `agent-prompts/ORCHESTRATOR_AGENT_V1.md`：定义 `Orchestrator` 的 System Prompt 与行为规则
- `AGENT_MEMORY_SOLUTION_V1.md`：定义 `Orchestrator` 可读写的 Memory 层与装配原则
- `AGENT_CAPABILITIES_V1.md`：定义 6 个核心 Agent 的能力总框架

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V1.1 | 2026-03-27 | 对齐 `PRD_V1.md` v1.19，新增 `active agent` 持续接管、`handoff` 裁决、会话恢复字段与审计输出 |
| V1.0 | 2026-03-26 | 初始版本，定义 Orchestrator 在 Blueprint V1 中的可实现能力项、落地方式、最小输入依赖、标准输出结果、失败降级处理与禁止项 |
