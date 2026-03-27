# Agent Memory V1

> 本文档定义 Blueprint 平台 V1 的 Agent Memory 设计原则、Memory 分层、共享/私有边界、Memory 对象模型，以及 `Orchestrator` 与各专业 Agent 的 Memory 读写关系。
> 本文档的目标不是替代 `PRD / UI Spec / Tech Spec`，而是为 `Orchestrator` 与各专业 Agent 提供稳定、可追溯、低成本的运行基础。

---

## 1. 文档目标

本文件回答 3 个核心问题：

1. 系统是否需要 Memory
2. Memory 与 `Orchestrator` 的上下文装配有什么区别
3. 哪些 Memory 应该共享，哪些只能局部使用

---

## 2. 核心结论

### 2.1 需要 Memory，但不是“每个 Agent 各自一套大脑”

Blueprint 需要的是：

- **结构化系统 Memory**
- **资产级工作 Memory**
- **短期 Agent 工作记忆**

Blueprint 不需要的是：

- 每个 Agent 各自维护一套长期自由记忆
- 用会话全文或向量库替代资产事实
- 把中间推理过程长期保存并作为事实来源

### 2.2 Memory 与上下文装配不是一回事

- **Memory** 解决“系统长期存什么”
- **上下文装配** 解决“这一轮拿什么给谁看”

一句话：

- Memory 是事实仓库
- 上下文装配是运行时拣货与组包

### 2.3 资产正文始终是第一事实源

在 V1 中，以下资产仍然是系统最权威的长期事实源：

- `PRD`
- `UI Spec`
- `设计稿摘要 / Paper 变更摘要`
- `Mockup` 代码与运行摘要
- `Mockup Review` 结果
- `Tech Spec`

Memory 的作用是：

- 提升读取效率
- 减少重复装配成本
- 记录不能只靠正文高效读取的系统状态与决策

---

## 3. 设计原则

### 3.1 少而准

只保存高价值、稳定、可复用的信息，不把所有对话都塞进长期 Memory。

### 3.2 结构化优先

优先保存：

- 状态
- 版本
- 决策
- 确认
- 影响范围
- 问题清单

而不是大段自由文本。

### 3.3 资产优先

能沉淀进正式资产正文的内容，就不要只放在 Memory 里。

### 3.4 单一真相源

同一类事实只能有一个主来源。

例如：

- 需求事实以 `PRD` 为准
- 设计事实以 `UI Spec` 与设计稿摘要为准
- 技术事实以 `Tech Spec` 为准
- 系统状态以 `asset_registry` 为准

### 3.5 权限最小化

谁负责哪个资产，谁才有对应正文写权限。

### 3.6 面向装配设计

Memory 设计必须服务于 `Orchestrator` 的上下文装配，而不是为“看起来像智能体系统”而设计。

---

## 4. Memory 分层

### 4.1 L1 - Asset Memory

这是最核心的长期记忆层，本质上就是项目交付资产本身。

包括：

- `PRD`
- `UI Spec`
- `设计稿链接 / 设计稿摘要 / Paper 变更摘要`
- `Mockup` 代码、运行摘要、预览链接
- `Mockup Review` 结构化结果
- `Tech Spec`

特点：

- 人和 AI 都能读
- 版本化
- 可确认
- 可导出

### 4.2 L2 - Shared System Memory

这是系统级共享记忆层，主要为 `Orchestrator` 与跨 Agent 协作服务。

包括：

- 项目基础信息
- 资产注册表
- 决策日志
- 确认日志
- 影响分析日志
- 会话索引
- 审查问题日志

特点：

- 多 Agent 可读
- 只有特定角色可写
- 不直接替代正文

### 4.3 L3 - Asset Working Memory

这是围绕某个资产的工作级辅助记忆。

例如：

- PRD 自检摘要
- UI 设计偏好摘要
- Mockup 运行摘要
- Tech Spec 风险摘要

特点：

- 与资产强绑定
- 便于快速装配
- 可由资产 owner Agent 更新

### 4.4 L4 - Session Memory

这是会话级记忆层，用于保持线程连续性。

包括：

- 当前会话属于哪个资产焦点
- 基于哪个资产版本开始
- 当前会话主题
- 当前会话最后结论
- 待确认项

特点：

- 主要服务于连续对话
- 不能替代长期事实源

### 4.5 L5 - Ephemeral Working Memory

这是 Agent 当前轮的临时工作记忆。

包括：

- 中间推理
- 候选方案
- 临时草稿
- 当前轮比对结果

特点：

- 默认不长期保存
- 如确需保留，只能提炼摘要后写入其他层

---

## 5. Memory 对象模型

V1 第一版建议定义以下 7 个核心对象。

### 5.1 `project_profile`

记录项目基础资料。

建议字段：

| 字段 | 说明 |
|------|------|
| `project_id` | 项目标识 |
| `name` | 项目名称 |
| `description` | 项目描述 |
| `product_type` | 产品类型 |
| `industry` | 行业 |
| `target_users` | 目标用户 |
| `target_platform` | 目标平台 |
| `active_major_version` | 当前活跃大版本 |
| `created_at` | 创建时间 |

### 5.2 `asset_registry`

记录每个资产当前状态与版本。

建议字段：

| 字段 | 说明 |
|------|------|
| `asset_type` | `prd / ui_spec / design / mockup / mockup_review / tech_spec` |
| `current_version` | 当前版本号 |
| `baseline_version` | 当前确认基线版本 |
| `status` | `待完善 / 完善中 / 已确认 / 待同步 / 重生成中` |
| `last_updated_at` | 最近更新时间 |
| `last_confirmed_at` | 最近确认时间 |
| `source_of_truth` | 对应文件或目录路径 |
| `pending_reason` | 待同步或阻断原因 |

### 5.3 `decision_log`

记录关键决策。

建议字段：

| 字段 | 说明 |
|------|------|
| `decision_id` | 决策 ID |
| `topic` | 决策主题 |
| `decision` | 决策内容 |
| `reason` | 决策原因 |
| `source_session_id` | 来源会话 |
| `affected_assets` | 影响资产列表 |
| `confirmed_by_owner` | 是否已确认 |
| `confirmed_at` | 确认时间 |

### 5.4 `confirmation_log`

记录每次正式确认。

建议字段：

| 字段 | 说明 |
|------|------|
| `confirmation_id` | 确认 ID |
| `target_type` | `asset_baseline / apply_change / regenerate` |
| `target_asset` | 确认对象 |
| `summary` | 确认摘要 |
| `owner_reply` | 用户原始确认回复 |
| `risk_items` | 风险项 |
| `owner_skipped_items` | 用户确认跳过项 |
| `confirmed_at` | 确认时间 |

### 5.5 `impact_log`

记录影响分析。

建议字段：

| 字段 | 说明 |
|------|------|
| `impact_id` | 影响分析 ID |
| `trigger_asset` | 触发来源资产 |
| `trigger_reason` | 触发原因 |
| `affected_assets` | 受影响资产 |
| `recommended_action` | 建议动作 |
| `confirmed_to_apply` | 是否确认执行 |
| `executed_at` | 实际执行时间 |

### 5.6 `session_index`

记录会话索引。

建议字段：

| 字段 | 说明 |
|------|------|
| `session_id` | 会话 ID |
| `asset_focus` | 当前资产焦点 |
| `based_on_version` | 基于哪个版本开始 |
| `source_intent` | 新建 / 变更 / 返工 / 回流 |
| `current_topic` | 当前会话主题 |
| `last_summary` | 最近一轮摘要 |
| `created_at` | 创建时间 |
| `last_active_at` | 最近活跃时间 |

### 5.7 `review_issue_log`

记录 Review 问题。

建议字段：

| 字段 | 说明 |
|------|------|
| `issue_id` | 问题 ID |
| `source_review` | 来源审查 |
| `severity` | 严重级别 |
| `category` | 问题类别 |
| `attribution` | 初步归因 |
| `related_assets` | 关联资产 |
| `status` | `open / accepted / resolved / ignored` |
| `resolved_in_version` | 在哪个版本中解决 |

---

## 6. 共享与私有规则

### 6.1 可全局共享的 Memory

以下对象可被多个 Agent 读取：

- `project_profile`
- `asset_registry`
- `decision_log`
- `confirmation_log`
- `impact_log`
- `session_index`
- `review_issue_log`

### 6.2 仅资产 owner 可写的资产事实

| 资产 | 唯一正文写入者 |
|------|---------------|
| `PRD` | `PM Agent` |
| `UI Spec` | `UI Designer Agent` |
| `设计稿摘要` | `UI Designer Agent` 或设计集成层 |
| `Mockup` 代码与运行结果 | `Mockup Agent` |
| `Mockup Review` | `Mockup Review Agent` |
| `Tech Spec` | `Dev Agent` |

### 6.3 仅 Orchestrator 可写的系统状态

以下对象由 `Orchestrator` 主写：

- `asset_registry.status`
- `confirmation_log`
- `impact_log.executed`
- 会话入口意图
- 当前待同步状态

### 6.4 Agent 私有短期记忆

Agent 私有短期记忆允许存在，但默认不落长期存储。

仅在以下情况下允许提炼后沉淀：

- 当前轮形成正式决策
- 当前轮形成确认摘要
- 当前轮形成影响分析
- 当前轮形成 Review 问题

---

## 7. Orchestrator 上下文装配与 Memory 的关系

### 7.1 基本定义

- Memory 负责长期保存事实
- `Orchestrator` 负责按场景组装最小必要上下文

### 7.2 标准装配流程

1. 识别当前事件类型
2. 识别当前资产焦点
3. 识别目标 Agent
4. 从 Asset Memory 与 Shared Memory 中读取最小必要输入
5. 组装上下文包
6. 交给目标 Agent
7. 回收结果并决定是否更新 Memory

### 7.3 最小上下文原则

`Orchestrator` 不应将整库信息塞给 Agent，而应只装配：

- 当前资产
- 必要上游资产
- 必要状态
- 必要会话摘要
- 必要确认 / 影响 / 问题记录

### 7.4 装配策略分层

`Orchestrator` 的上下文装配不应是“每轮都全量重装”，而应按场景分层：

- **轻量增量装配**：同一会话、同一资产、同一主题内继续推进时使用
- **资产级重装配**：切换资产焦点、新建聊天、当前资产版本变化时使用
- **跨资产重装配**：需求变更、设计返工、影响分析、反馈归因时使用
- **全局重装配**：首次进入项目、版本切换、异常恢复、上下文漂移时使用

### 7.5 为什么需要装配策略

之所以需要装配策略，是因为 Memory 的价值不只是“保存事实”，还在于支持低成本、稳定的上下文取用。

若每轮都全量装配，会产生以下问题：

- token 开销过高
- 响应时延增加
- 当前轮注意力被无关信息稀释
- 容易在重复装配中丢失重点

### 7.6 会话快照与增量装配

为了让增量装配成立，系统应维护会话快照，而不是每轮从零读取全项目。

建议会话快照至少包括：

- `session_id`
- `asset_focus`
- `based_on_versions`
- `current_topic`
- `last_summary`
- `pending_confirmation`
- `relevant_decision_ids`
- `relevant_issue_ids`
- `relevant_impact_ids`

---

## 8. Agent 读写权限矩阵

### 8.1 Memory 读写权限

| Agent | 读 `project_profile` | 读 `asset_registry` | 读 `decision_log` | 读 `confirmation_log` | 读 `impact_log` | 读 `session_index` | 读 `review_issue_log` | 写资产正文 | 写系统状态 |
|------|----------------------|---------------------|-------------------|-----------------------|-----------------|--------------------|-----------------------|-----------|-----------|
| `Orchestrator` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes |
| `PM Agent` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | `PRD` | No |
| `UI Designer Agent` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | `UI Spec` / 设计摘要 | No |
| `Dev Agent` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | `Tech Spec` | No |
| `Mockup Agent` | Yes | Yes | Limited | Limited | Yes | Yes | Yes | `Mockup` | No |
| `Mockup Review Agent` | Yes | Yes | Limited | Limited | Yes | Yes | Yes | `Mockup Review` | No |

### 8.2 解释

- `Limited` 表示只能读取与当前轮直接相关的最小子集
- 所有 Agent 都可跨资产阅读，但不能跨资产写正文

---

## 9. 效率控制规则

为了保证整体效率，V1 必须遵守以下规则。

### 9.1 不全量喂上下文

每轮只装配最小必要上下文。

### 9.2 不重复存正文

资产正文只在资产文件中保留，Memory 中只保留索引、状态、摘要、结论。

### 9.3 摘要优先

若某信息会被高频读取，应优先沉淀摘要对象，而不是让 Agent 每次重读长文。

### 9.4 私有记忆默认短期

Agent 中间推理不进入共享层。

### 9.5 所有跨资产结论都要可追溯

任何“这个修改会影响 UI Spec / Mockup / Tech Spec”的判断，都应在 `impact_log` 中留痕。

---

## 10. V1 建议落地顺序

### 第一阶段：最小可用 Memory

先实现：

- `project_profile`
- `asset_registry`
- `decision_log`
- `confirmation_log`
- `impact_log`
- `session_index`

### 第二阶段：执行与审查相关 Memory

再补：

- `review_issue_log`
- Mockup 运行摘要
- 生成 manifest

### 第三阶段：更细粒度 Memory

后续再扩：

- 更细粒度设计变更对象
- 更细粒度技术依赖对象
- 自动化测试运行摘要

---

## 11. 明确不做

V1 不做以下方案：

- 每个 Agent 一套独立长期人格记忆
- 让会话全文成为系统事实源
- 仅靠向量检索替代结构化状态
- 让 `Orchestrator` 直接写业务正文
- 让 Agent 跨资产直接写正文

---

## 12. 后续可扩展方向

- 引入更细粒度的 `asset_diff_log`
- 引入 `tool_execution_log`
- 引入 `memory_retention_policy`

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V1.1 | 2026-03-26 | 收口为纯 Memory 设计文档，移除能力矩阵、工具与 MCP 分层，仅保留 Memory 分层、对象模型、共享/私有规则、读写权限与装配关系 |
| V1.0 | 2026-03-26 | 初始版本，定义 Agent Memory 分层、共享/私有边界、核心 Memory 对象模型、Agent 读写权限和首版能力矩阵 |
