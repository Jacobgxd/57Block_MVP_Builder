# Mockup Review Agent Capabilities V1

> 本文档定义 Blueprint 平台 `Mockup Review Agent` 在 V1 中必须具备的可实现能力项、能力落地方式、最小输入依赖、标准输出结果、失败降级策略与禁止项。
> 本文档聚焦“如何在 Mockup 生成或重生成后，对照上游资产执行一致性、完整性、可体验性与漂移检查”。

---

## 1. Agent 目标

`Mockup Review Agent` 是 Blueprint V1 中专用于 `Mockup` 阶段的质量审查 Agent。

它的目标是：

- 对照已确认的 `PRD / UI Spec / 设计稿` 检查当前 `Mockup`
- 识别页面缺漏、流程断点、状态缺失、视觉偏差和交互漂移
- 输出结构化问题清单、严重程度和初步归因
- 为 `Orchestrator` 提供是否允许推进、是否需要重生成、是否需要回到上游资产的依据
- 在重生成后执行回归复查，判断问题是否被真正修复

一句话：

- `Mockup Review Agent` 负责让 Mockup 阶段有专门的质量守门员
- 不负责生成 Mockup，也不负责编辑任何上游正文资产

### Runtime 协议适配

从 `PRD_V1.md` v1.21 起，`Mockup Review Agent` 的能力设计还必须默认适配 `AGENT_RUNTIME_PROTOCOL_V1.md`：

- 默认采用审查型 `Full Runtime`
- 每轮按 `think -> plan -> execute -> reflect` 组织能力
- 对外返回结构化 Runtime 摘要，而不是原始完整思维链

---

## 2. P0 必需能力

### 2.1 多资产对齐读取能力

必须能同时读取并理解当前审查所依赖的多类资产。

V1 至少包括：

- 已确认 `PRD`
- 已确认 `UI Spec`
- 已确认设计稿或设计稿摘要
- 当前 `Mockup` 运行结果
- 当前 `Mockup` 项目文件或可观察结果
- 当前版本信息

落地要求：

- 审查结论必须能回溯到具体规格依据
- 当上游规格自身冲突时，不得继续假设唯一正确答案
- 当 `Mockup` 没有可检查结果时，不得给出伪审查通过

### 2.2 审查基线识别能力

必须能识别本轮审查基于哪组资产版本。

V1 至少识别：

- `PRD` 版本
- `UI Spec` 版本
- 设计稿版本或摘要版本
- `Mockup` 版本

落地要求：

- 输出结果中必须写明 `input_versions`
- 审查时不能混用不同轮的规格摘要和当前 Mockup 结果

### 2.3 页面完整性检查能力

必须检查 Mockup 是否覆盖了应存在的关键页面与页面角色。

V1 至少检查：

- P0 页面是否存在
- 页面入口是否可访问
- 页面之间的关系是否合理
- 核心工作台类页面是否按预期出现

落地要求：

- 关键页面缺失时应直接标为阻断
- 页面存在但不可访问，也应视为关键问题

### 2.4 流程可体验性检查能力

必须检查 Mockup 是否真的能让用户体验关键流程。

V1 至少检查：

- 核心流程主路径是否可走通
- 页面之间是否能跳转
- 关键 CTA 是否可点击
- 表单、导航、关键动作是否有前端反馈

落地要求：

- 核心流程断点必须标记为 `critical`
- 不能把“页面静态存在”误判为“流程可体验”

### 2.5 状态可验证性检查能力

必须检查关键状态是否存在并可被验证。

V1 至少包括：

- Loading
- Empty
- Error
- Success
- Disabled
- 关键反馈状态

落地要求：

- 若 UI Spec 或 PRD 要求的关键状态无法验证，应标记问题
- 状态存在但触发不了，也应视为可体验性问题

### 2.6 规格一致性检查能力

必须对照上游规格检查 Mockup 是否存在明显偏差。

V1 至少覆盖：

- 页面范围与角色对齐
- 关键模块存在性
- 关键布局结构
- 核心组件类型与位置
- 关键交互规则
- 关键文案结构

落地要求：

- 必须给出 `spec_basis`
- 问题描述应尽量具体到页面、组件、行为或视觉区域
- 审查不是像素级对齐，但必须能发现关键结构偏差

### 2.7 设计漂移识别能力

必须识别 Mockup 与设计稿或 UI 规则之间的明显视觉漂移。

V1 至少关注：

- 关键视觉层级
- 主要区域结构
- 关键组件视觉表达
- 重要信息层级
- 明显违背设计主线的风格偏移

落地要求：

- 只关注影响判断和验收的漂移
- 不追求像素级完美一致
- 发现视觉偏差时应优先判断是设计稿未落地还是 Mockup 实现偏差

### 2.8 问题分级能力

必须对每个问题标记严重程度。

V1 至少支持：

- `critical`
- `major`
- `minor`
- `note`

落地要求：

- `critical` 问题应直接影响阻断判断
- `major` 问题通常应阻断，除非后续策略另有例外
- `minor / note` 不应阻断，但必须被记录

### 2.9 初步归因能力

必须为问题给出初步归因方向。

V1 至少支持：

- `requirement_gap`
- `ui_spec_gap`
- `design_drift`
- `mockup_implementation_issue`
- `upstream_conflict`

落地要求：

- 归因是“初步判断”，不是最终系统裁决
- 当证据不足时，应显式标记低置信度而不是硬判
- 当问题涉及上游规格冲突时，应优先标记为 `upstream_conflict`

### 2.10 阻断判断能力

必须能判断本轮审查结论属于哪种状态。

V1 至少支持：

- `pass`
- `pass_with_risks`
- `blocked`

落地要求：

- 核心流程不可用、关键页面缺失、关键状态不可验证时，必须 `blocked`
- 非关键问题可 `pass_with_risks`
- 不得因为问题数量少就忽略关键阻断项

### 2.11 建议路由能力

必须能根据问题类型给出建议处理方向。

V1 至少支持建议路由到：

- `PM Agent`
- `UI Designer Agent`
- `Mockup Agent`
- `Orchestrator`

落地要求：

- 需求定义不清或需求变化倾向 -> `PM Agent`
- UI 规则或设计稿问题 -> `UI Designer Agent`
- Mockup 实现偏差 -> `Mockup Agent`
- 上游冲突或需系统裁决 -> `Orchestrator`

### 2.12 回归复查能力

必须能在 Mockup 重生成后判断既有问题是否被修复。

V1 至少包括：

- 读取历史 Review 问题
- 比对本轮结果与历史问题范围
- 标记已解决 / 未解决 / 新增问题

落地要求：

- 回归复查不能只输出“看起来好了”
- 应区分本轮修复覆盖范围与残余风险

### 2.13 结构化审查结果回传能力

必须把审查结论以结构化方式回传给 `Orchestrator`。

V1 至少包括：

- `status`
- `input_versions`
- `review_scope`
- `coverage_summary`
- `issues`
- `risk_summary`
- `blocking_issue_count`
- `non_blocking_issue_count`
- `recommended_routes`
- `can_proceed`

落地要求：

- 不得只返回一段自然语言
- 结果必须可支撑 Gate 判断、重生成和后续审计

---

## 3. P1 可后补能力

以下能力适合作为 V1 后续增强：

- 更细粒度的视觉对比能力
- 更自动化的页面巡检路径
- 更精细的问题聚类与去重
- 更细粒度的回归复查报告
- 对 `pass_with_risks` 的标准化接受策略

---

## 4. 能力落地方式

### 4.1 文件读取

`Mockup Review Agent` 需要直接或间接读取：

- `.blueprint/PRD_V1.md`
- 当前 `UI Spec`
- 当前设计稿摘要或设计稿上下文结果
- 当前 Mockup 工程文件
- 当前 Mockup 运行摘要
- 历史 Review 结果

用途：

- 建立规格基线
- 观察当前被检查对象
- 执行回归复查

### 4.2 审查结果写入

`Mockup Review Agent` 至少需要写入：

- `Mockup Review` 结果
- `review_issue_log`

用途：

- 沉淀结构化问题
- 支撑下轮重生成与回归复查

### 4.3 与 Orchestrator 协作

`Mockup Review Agent` 不负责系统裁决，但必须与 `Orchestrator` 协作。

至少包括：

- 接收当前审查范围和版本信息
- 回传结构化审查结论
- 回传建议路由
- 回传是否允许推进
- 必要时回传结构化 `handoff_request`

### 4.4 与 Mockup Agent 协作

`Mockup Review Agent` 与 `Mockup Agent` 构成检查闭环。

至少包括：

- 读取 Mockup 执行结果
- 将问题映射成可修复范围
- 在修复后执行回归复查

说明：

- `Mockup Review Agent` 不直接改 Mockup
- 只负责提出结构化问题和修复后的复查结论

---

## 5. 最小输入依赖

`Mockup Review Agent` 要稳定工作，最少必须拿到以下输入：

### 5.1 规格输入

- 已确认 `PRD`
- 已确认 `UI Spec`
- 已确认设计稿或设计稿摘要

### 5.2 被审查对象输入

- 当前 Mockup 运行结果
- 当前 Mockup 项目路径或可观察结果
- 当前 Mockup 版本

### 5.3 审查上下文输入

- 当前审查范围
- 当前版本信息
- 当前触发原因
- 当前 `active_agent`

### 5.4 可选增强输入

- 历史 Review 问题
- 历史 Mockup 变更摘要
- 上一次修复范围

---

## 6. 标准输出结果

每轮执行后，`Mockup Review Agent` 至少应输出以下结构化结果中的一部分：

### 6.1 审查总结果

- `status`
- `can_proceed`
- `input_versions`
- `review_scope`
- `coverage_summary`

### 6.2 问题结果

- `issues`
- `blocking_issue_count`
- `non_blocking_issue_count`
- `risk_summary`

### 6.3 路由建议结果

- `recommended_routes`
- `requires_regenerate`
- `requires_upstream_change`

### 6.4 回归结果

- `resolved_issue_ids`
- `unresolved_issue_ids`
- `new_issue_ids`

### 6.5 协作结果

- `runtime`
- `handoff_request`
- `needs_confirmation`
- `affected_assets`

规则：

- 默认情况下，`handoff_request` 可为空
- `runtime` 至少应包含 `phase_trace / task_complexity / plan_level / goal_of_this_turn / goal_completed`
- 若审查结果已足以明确指出建议处理方，必须返回结构化 `handoff_request`
- `Mockup Review Agent` 只能建议切换，不得直接写入 `active_agent` 或执行资产状态迁移

---

## 7. 失败与降级处理

### 7.1 规格输入缺失

处理方式：

- 若 `PRD / UI Spec / 设计稿` 任一关键输入缺失，直接返回阻断
- 明确说明缺少哪个规格输入，不能继续审查

### 7.2 Mockup 无可检查结果

处理方式：

- 若无运行结果、无可访问预览、无项目文件可观察，直接返回阻断
- 不得输出“暂时通过”之类的假结论

### 7.3 上游规格冲突

处理方式：

- 标记为 `upstream_conflict`
- 返回阻断
- 建议由 `Orchestrator` 决定回到哪个上游资产处理

### 7.4 证据不足

处理方式：

- 可以输出低置信度问题，但必须标明证据不足
- 若不足以支撑阻断结论，不应强行阻断
- 若不足以支撑通过结论，也不应直接 `pass`

### 7.5 回归复查信息不足

处理方式：

- 若无法拿到历史问题或修复范围，仍可做当前轮审查
- 但必须明确回归复查覆盖不完整

---

## 8. 禁止项

`Mockup Review Agent` 在 V1 中明确禁止：

- 直接修改 `Mockup`、`PRD`、`UI Spec` 或设计稿正文
- 把自己扩展成通用 Review Agent
- 审查 Tech Spec、生产代码质量或真实后端联调
- 在上游规格冲突时自行选择一个答案继续审查
- 用自然语言泛泛而谈替代结构化问题清单
- 在没有足够证据时伪装成高置信判断
- 直接决定系统状态迁移或资产确认

---

## 9. 与其他文档的关系

- `PRD_V1.md`：定义 Mockup 审查在产品流程中的位置、阻断与确认关系
- `agent-prompts/MOCKUP_REVIEW_AGENT_V1.md`：定义 Mockup Review Agent 的 System Prompt、审查流程和输出约束
- `AGENT_MEMORY_SOLUTION_V1.md`：定义 Review 问题日志和相关状态记录边界
- `AGENT_CAPABILITIES_V1.md`：定义 6 个核心 Agent 的能力总框架

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V1.2 | 2026-03-30 | 对齐 `PRD_V1.md` v1.21，补充审查型 `Full Runtime` 适配要求与结构化 `runtime` 输出字段 |
| V1.1 | 2026-03-27 | 对齐 `PRD_V1.md` v1.19，补充 `active_agent` 输入、统一协作外壳与结构化 `handoff_request` / `needs_confirmation` 结果 |
| V1.0 | 2026-03-26 | 初始版本，定义 Mockup Review Agent 的多资产对齐、页面完整性检查、流程可体验性检查、问题分级归因、阻断判断、建议路由、回归复查与结构化回传能力 |
