# Agent Runtime Protocol V1

> 本文档定义 Blueprint 平台多 Agent 体系的统一运行协议。
> 它不替代各专业 Agent 的领域 Prompt，而是作为所有 Agent 共用的"内部执行闭环 + 对外可见协作协议"。
> V1 目标：在提升准确度、可解释性与复杂任务稳定性的同时，控制额外时间与 token 成本。

---

## 1. 协议定位

### 1.1 是什么
`Agent Runtime Protocol V1` 是一套统一的 Agent 运行时协议，用于规范 Agent 在每一轮任务中的行为闭环：

1. `Think`：先判断当前问题本质、任务类型、缺失信息、风险与边界
2. `Plan`：形成本轮最小可执行计划，明确步骤、依赖、确认门与影响范围
3. `Execute`：按计划进行提问、生成、修改、分析或触发协作
4. `Reflect`：检查本轮目标是否达成、是否产生新风险、是否需要继续 / 交接 / 请求确认

### 1.2 不是什么
本协议不是：
- 专业领域知识文档
- 某个单一 Agent 的专属 Prompt
- 原始思维链公开机制
- UI 渲染规范本身
- 资产状态机本身

### 1.3 与现有 Prompt 的关系
现有 `PM Agent / UI Designer Agent / Dev Agent / Mockup Agent / Review Agent / Orchestrator` Prompt 负责：
- 角色定义
- 领域目标
- 输入契约
- 输出格式
- 权限边界
- 专业自检标准

本协议负责：
- 每一轮怎么运行
- 每一轮哪些步骤必须先做
- 哪些信息必须对用户可见
- 哪些行为必须先确认再执行
- 怎么控制复杂任务的稳定性与成本

---

## 2. 设计目标

### 2.1 核心目标
本协议必须同时满足以下目标：

| 优先级 | 目标 | 说明 |
|--------|------|------|
| P0 | 提高复杂任务准确度 | 尤其是多轮澄清、跨文档修改、跨 Agent 协作 |
| P0 | 提升用户可理解性 | 用户能看到 Agent 为什么这样问、这样改、这样建议 |
| P0 | 形成统一闭环 | 所有 Agent 不再依赖"各自自由发挥"的隐式过程 |
| P0 | 防止跳步执行 | 复杂任务必须先思考和计划，不能直接生成或改写 |
| P1 | 控制 token 和耗时 | 小任务不强制进入重型流程 |
| P1 | 强化协作一致性 | 专业 Agent 与 Orchestrator 之间有统一协议面 |
| P2 | 支持未来观测与调试 | 后续可记录 phase、plan、handoff、confirmation 等事件 |

### 2.2 非目标
V1 不追求：
- 完整暴露模型原始推理文本
- 每轮都展示冗长分析
- 对所有小任务都强制进行重计划
- 用协议替代专业判断
- 一步到位解决所有多 Agent 调度问题

---

## 3. 适用范围

### 3.1 适用对象
本协议适用于以下 Agent：

| Agent | 是否适用 | 说明 |
|------|---------|------|
| PM Agent | 是 | 完整适用 |
| UI Designer Agent | 是 | 完整适用 |
| Dev Agent | 是 | 完整适用 |
| Mockup Agent | 是 | 适用，偏执行型 |
| Mockup Review Agent | 是 | 适用，偏检查型 |
| Review Agent | 是 | 适用，偏检查型 |
| Orchestrator | 有条件适用 | 建议采用 Lite Runtime，而不是完整专家式 Runtime |

### 3.2 Orchestrator 的适用策略
`Orchestrator` 不建议使用与专业 Agent 完全相同的重型 Runtime。原因：

1. 它的职责是路由、确认、状态迁移、任务触发，而不是产出领域内容
2. 它需要更稳定、更短、更可预测
3. 若使用过重的 think/plan/reflect，会增加系统延迟和 token 成本
4. 它更适合"决策型、门控型、状态型"的轻量运行协议

因此，V1 采用以下策略：

- 专业 Agent：`Full Runtime`
  - `think -> plan -> execute -> reflect`
- Orchestrator：`Lite Runtime`
  - `analyze -> decide -> act -> verify`

### 3.3 Full Runtime 与 Lite Runtime 的差别
| 维度 | Full Runtime | Lite Runtime |
|------|--------------|-------------|
| 适用对象 | 专业 Agent | Orchestrator |
| 主要目标 | 生成高质量领域内容 | 稳定完成路由和确认治理 |
| 是否允许展开方案 | 是 | 仅限系统层面 |
| 是否展示计划 | 是 | 仅展示简短系统动作摘要 |
| 是否需要复杂反思 | 是 | 只做门控校验与结果验证 |
| token 开销 | 中 | 低 |

---

## 4. 核心原则

### 4.1 先判断再执行
任何 Agent 在输出问题、生成文档、修改资产、提出 handoff 之前，都必须先完成最小思考判断。

### 4.2 计划不是可选项，但可以分级
并非每一轮都必须产生完整大计划，但每一轮都必须形成至少一个"本轮最小执行计划"。

### 4.3 对用户可见，但不是公开原始思维流
Agent 可以向用户展示：
- 当前理解
- 为什么这样问 / 这样改
- 本轮计划
- 已执行动作
- 本轮反思结论

Agent 不应向用户直接暴露：
- 原始链式推理全文
- 大量低信号自言自语
- 与安全、系统内部实现细节高度耦合的内部推理文本

### 4.4 小任务轻流程，大任务重流程
协议必须按任务复杂度自动缩放，避免所有任务都走重型流程。

### 4.5 Reflection 不只发生在最后
反思不是只有"提交前总检查"。
V1 要求：
- 每轮结束进行一次微反思
- 准备确认基线前进行一次正式自检

### 4.6 相位与业务阶段分离
必须区分两个维度：

1. `Conversation Stage`
   - 用户正在讨论什么
   - 例如：目标探索、功能拆解、页面原型、技术选型

2. `Execution Phase`
   - Agent 当前如何工作
   - 例如：think、plan、execute、reflect

这两个维度不能混为一谈。

---

## 5. Runtime 模型

### 5.1 每轮标准闭环
所有 Full Runtime Agent 每一轮默认遵循：

```text
Think -> Plan -> Execute -> Reflect
```

### 5.2 每轮的最小单位
"每轮"指 Agent 接收到一次新的有效输入后，到返回一次结构化输出为止的完整工作过程。

一次输入可能来自：
- 用户新消息
- 上游资产变化
- 下游反馈回流
- Orchestrator 注入的切换上下文
- 外部检查结果

### 5.3 阶段职责概览
| Phase | 目标 | 产出 |
|------|------|------|
| Think | 明确当前问题和约束 | 任务判断、缺口、风险、建议处理路径 |
| Plan | 形成本轮可执行步骤 | 计划摘要、确认门、影响范围、下一步 |
| Execute | 执行本轮动作 | 提问 / 修改 / 生成 / 对比 / 分析 / 回传 |
| Reflect | 检查结果与下一步 | 完成情况、残留缺口、是否继续/确认/交接 |

---

## 6. Phase 详细定义

## 6.1 Think

### 6.1.1 目标
在任何输出前，先判断：
- 当前问题本质是什么
- 当前轮最应该完成什么
- 当前还缺什么
- 是否有风险或冲突
- 是否应该由当前 Agent 继续处理

### 6.1.2 必须回答的问题
每次 `Think` 至少回答以下问题：

1. 当前输入属于什么任务类型？
2. 当前是否仍在本 Agent 的权限边界内？
3. 当前轮最小目标是什么？
4. 有没有阻断继续执行的关键缺口？
5. 有没有跨资产影响或需要确认的动作？
6. 当前置信度如何？

### 6.1.3 标准输出字段
```json
{
  "phase": "think",
  "task_type": "clarify | generate | revise | analyze_impact | review | handoff_eval",
  "goal_of_this_turn": "string",
  "scope": "single_asset | multi_asset | routing_only",
  "knowns": [],
  "unknowns": [],
  "risk_flags": [],
  "confidence": "high | medium | low",
  "should_continue_in_current_agent": true
}
```

### 6.1.4 用户可见摘要格式
对用户可见的是"思考摘要"，不是原始推理：

```text
当前理解：
- 这轮主要是在确认 [X]
- 目前已知 [A/B]
- 还缺 [C]
- 这会影响 [D]
```

### 6.1.5 触发升级为重计划的条件
出现以下任一条件时，Think 必须要求进入 `Heavy Plan`：
- 涉及多个文档或多个资产
- 需求变更可能影响下游
- 用户要求"直接生成完整文档"
- 当前输入存在明显歧义或冲突
- 本轮可能触发 handoff
- 本轮可能触发资产状态迁移
- 本轮可能需要执行批量修改

## 6.2 Plan

### 6.2.1 目标
把 Think 得出的判断变成一个"本轮可执行计划"。

### 6.2.2 计划分级
V1 定义两级计划：

#### A. Light Plan
适用：
- 单文档、小范围
- 风险低
- 不涉及跨资产同步
- 不需要正式变更方案确认

示例：
- 补一个 PRD 小节
- 继续追问 1-2 个问题
- 对某个页面的交互状态进行澄清

#### B. Heavy Plan
适用：
- 跨资产影响
- 明显需求变更
- 多章节修改
- 需要正式确认"改哪些、为什么改、影响哪些资产"
- 需要 handoff 或系统执行链路

### 6.2.3 计划必须包含的内容
无论 Light / Heavy，都必须包含：

- 本轮目标
- 本轮步骤
- 每一步依赖什么输入
- 哪些是必须确认的
- 本轮结束的成功标准
- 下一步将进入什么阶段

Heavy Plan 还必须包含：
- 影响资产列表
- 计划变更范围
- 风险说明
- 是否需要用户先确认计划再执行

### 6.2.4 标准输出字段
```json
{
  "phase": "plan",
  "plan_level": "light | heavy",
  "goal": "string",
  "steps": [],
  "blocking_questions": [],
  "confirmation_gates": [],
  "affected_assets": [],
  "success_criteria_for_this_turn": [],
  "next_expected_phase": "execute",
  "needs_confirmation_before_execute": false
}
```

### 6.2.5 用户可见摘要格式
建议统一为：

```text
本轮计划：
1. 先确认 [X]
2. 再处理 [Y]
3. 如果确认成立，我会更新 [Z]
4. 最后检查是否还影响 [A/B]
```

Heavy Plan 可加一段：

```text
本次修改影响面：
- 直接影响：PRD
- 可能影响：UI Spec / Mockup / Tech Spec
- 我会先给出变更方案，再等你确认后执行
```

## 6.3 Execute

### 6.3.1 目标
按 Plan 执行当前轮真正的工作动作。

### 6.3.2 执行动作类型
`Execute` 可以执行但不限于：

- 提问澄清
- 输出推荐选项
- 生成草稿
- 更新文档章节
- 归因分析
- 差异对比
- 风险列举
- 影响评估
- 请求确认
- 发起 handoff_request
- 返回执行结果给 Orchestrator

### 6.3.3 执行约束
- 不得跳过 Plan 中标记为必须确认的门
- 不得在关键缺口未补齐时伪装成已确认事实
- 不得越权修改非本 Agent 资产
- 不得在用户只需要一个简短确认时输出过量结构
- 不得在未声明低置信度时假装结论可靠

### 6.3.4 执行结果必须可检查
本轮执行结束后，必须能回答：
- 做了什么
- 没做什么
- 为什么
- 还有什么待确认
- 是否可进入下一步

### 6.3.5 标准输出字段
```json
{
  "phase": "execute",
  "actions_taken": [],
  "content_updates": [],
  "questions_asked": [],
  "assumptions_made": [],
  "risks_noted": [],
  "handoff_request": null,
  "needs_confirmation": false
}
```

### 6.3.6 用户可见摘要格式
```text
我刚刚完成了：
- [动作1]
- [动作2]

当前待你确认的是：
- [确认项]

如果你确认，我下一步会：
- [下一动作]
```

## 6.4 Reflect

### 6.4.1 目标
执行后检查本轮是否真正达到目标，并决定下一步路径。

### 6.4.2 反思分层
V1 定义两层反思：

#### A. 微反思（每轮必做）
每轮结束必须做一次，检查：
- 本轮目标是否完成
- 是否引入了新的缺口
- 是否需要回退
- 是否应该继续当前 Agent

#### B. 正式反思 / 自检（确认前必做）
在准备确认当前基线或提交文档前，运行正式自检：
- 是否满足资产自身质量清单
- 是否存在关键未确认项
- 是否允许进入确认门

### 6.4.3 标准输出字段
```json
{
  "phase": "reflect",
  "goal_completed": true,
  "new_gaps_found": [],
  "new_risks_found": [],
  "can_continue": true,
  "can_request_confirmation": false,
  "should_handoff": false,
  "recommended_next_step": "string"
}
```

### 6.4.4 用户可见摘要格式
```text
本轮检查结果：
- 已完成：[X]
- 仍待确认：[Y]
- 风险/影响：[Z]

建议下一步：
- [下一动作]
```

---

## 7. 用户可见协议

## 7.1 可见，但必须是摘要化、结构化
用户在对话界面中应能看到以下 4 类内容：

- `思考摘要`
- `本轮计划`
- `执行结果`
- `本轮检查 / 反思`

### 7.2 不展示原始推理流
为了避免噪音、泄露系统细节、增加误解，V1 规定：

可展示：
- 理由摘要
- 决策依据摘要
- 风险摘要
- 计划摘要
- 自检结果摘要

不展示：
- 冗长链式内部推理逐字稿
- 大量候选方案的无过滤草稿
- 与系统内部调度机制耦合过深的内部信号原文

### 7.3 推荐 UI 呈现
建议在对话中使用稳定的折叠式结构：

```text
[思考]
[计划]
[执行]
[检查]
```

默认行为：
- 展示简短摘要
- 详情可展开
- 小任务可自动压缩
- 大任务可完整显示

### 7.4 小任务压缩显示
对于低复杂度任务，可压缩为：

```text
当前理解：...
本轮计划：...
我已处理：...
下一步：...
```

### 7.5 大任务完整显示
对于高复杂度任务，应完整展示四段：
- 思考摘要
- 计划
- 执行
- 反思 / 检查

---

## 8. 复杂度分级与成本控制

## 8.1 任务复杂度级别
V1 定义三档复杂度：

| 级别 | 特征 | Runtime 策略 |
|------|------|--------------|
| L1 | 单问题、低风险、无跨资产影响 | 压缩版 Think + Light Plan |
| L2 | 单资产多步骤、存在少量歧义 | 标准 Full Runtime |
| L3 | 跨资产、变更影响大、需确认和交接 | Full Runtime + Heavy Plan |

## 8.2 复杂度判断信号
出现以下信号时复杂度升高：
- 用户提到"修改""同步""返工""影响""多个文档"
- 当前资产已确认，且本轮会改变基线
- 变更可能影响下游资产
- 需要生成完整正式文档
- 需要从设计/需求/技术之间归因
- 需要 Review 或 handoff

## 8.3 Token 与时间优化原则
### A. Think 压缩
Think 只输出结构化结论，不输出长篇推理。

### B. Plan 按需升级
默认先走 `Light Plan`，只有出现复杂信号才升级 `Heavy Plan`。

### C. Reflect 分层
每轮微反思必须有，但要短；正式自检仅在关键节点执行。

### D. Orchestrator 走 Lite Runtime
避免在系统层重复做专家式重分析。

---

## 9. 确认门（Confirmation Gates）

## 9.1 为什么需要确认门
某些动作一旦执行，会：
- 修改正式资产
- 影响已确认基线
- 触发下游待同步
- 影响用户认知和工作流

因此必须有确认门。

## 9.2 四类确认门
| Gate | 含义 | 典型场景 |
|------|------|---------|
| `scope_confirmation` | 确认修改范围 | 复杂变更前 |
| `apply_change_confirmation` | 确认执行变更 | 准备修改正式文档 |
| `baseline_confirmation` | 确认当前资产基线 | 自检通过后 |
| `regenerate_confirmation` | 确认重生成下游资产 | Mockup / 设计稿重生成 |

## 9.3 规则
- 没过确认门，不得执行对应动作
- 确认前，必须先展示摘要
- 摘要必须足以让用户理解影响
- 用户确认必须明确，不得靠模糊语气推断

---

## 10. Handoff 协议

## 10.1 触发条件
以下情况可触发 handoff 判断：
- 当前问题越过本 Agent 权限边界
- 当前问题本质属于其他专业域
- 当前任务进入执行链路而非继续对话
- 当前轮需要系统层裁决
- 当前输入低置信度无法稳妥归属

## 10.2 Handoff 前必须先完成什么
Agent 不得一遇到复杂问题就直接 handoff。
在提出 handoff_request 前，至少应完成：
1. 基本归因
2. 当前问题摘要
3. 为什么不应由当前 Agent 继续处理
4. 可能受影响的资产

## 10.3 结构化输出
```json
{
  "handoff_request": {
    "target_agent": "PM Agent | UI Designer Agent | Dev Agent | Mockup Agent | Orchestrator",
    "reason": "string",
    "confidence": "high | medium | low",
    "context_summary": "string",
    "affected_assets": []
  }
}
```

---

## 11. 资产影响协议

## 11.1 直接影响与间接影响
Agent 在 Think 或 Plan 阶段必须区分：

- `directly_affected_assets`
- `potentially_affected_assets`

例如：
- 修改 PRD 功能范围
  - 直接影响：PRD
  - 可能影响：UI Spec / Mockup / Tech Spec

## 11.2 规则
- 专业 Agent 可以评估影响，但不能自行迁移资产状态
- 状态迁移只由 Orchestrator 执行
- Agent 必须把影响范围显式返回给 Orchestrator

---

## 12. Full Runtime 结构化协作契约

## 12.1 每轮标准返回外壳
所有 Full Runtime Agent 每轮至少返回：

```json
{
  "user_visible_reply": "string",
  "runtime": {
    "phase_trace": ["think", "plan", "execute", "reflect"],
    "task_complexity": "L1 | L2 | L3",
    "plan_level": "light | heavy",
    "goal_of_this_turn": "string",
    "goal_completed": true
  },
  "confidence": "high | medium | low",
  "needs_confirmation": false,
  "confirmation_type": null,
  "handoff_request": null,
  "affected_assets": [],
  "open_questions": [],
  "risk_flags": []
}
```

## 12.2 相位 trace 的作用
`phase_trace` 用于：
- UI 展示本轮闭环
- 系统调试
- 观测 Agent 是否跳步
- 未来分析不同 Agent 的稳定性

---

## 13. Orchestrator Lite Runtime Protocol

> Orchestrator 不使用完整 `think -> plan -> execute -> reflect`，而采用更短的 Lite Runtime。

## 13.1 Lite Runtime 闭环
```text
Analyze -> Decide -> Act -> Verify
```

## 13.2 Analyze
识别：
- 当前事件类型
- 当前 active agent
- 是否存在待确认项
- 是否存在阻断项
- 是否需要切换 Agent
- 是否需要触发任务

## 13.3 Decide
决定：
- 继续当前 Agent
- 发起系统确认
- 执行状态迁移
- 执行 handoff
- 触发后台任务
- 返回阻断消息

## 13.4 Act
执行系统层动作：
- 注入上下文
- 路由到对应 Agent
- 触发检查 / 生成 / 重生成
- 更新状态

## 13.5 Verify
校验：
- 动作是否符合 Gate 规则
- 状态迁移是否合法
- 是否需要向用户展示系统说明
- 是否需要等待下一步确认

## 13.6 Orchestrator 可见摘要
Orchestrator 对用户只展示系统层摘要，例如：
- 正在分析当前变更影响范围
- 当前变更将影响 PRD 和 UI Spec，是否确认同步？
- 正在切换到需求处理流程
- 当前资产未通过检查，请先处理以下问题

Orchestrator 不应展示专家式"思考过程"。

---

## 14. 状态机定义

## 14.1 Agent Runtime State
```json
{
  "conversation_stage": "string",
  "execution_phase": "think | plan | execute | reflect",
  "task_complexity": "L1 | L2 | L3",
  "plan_level": "light | heavy",
  "pending_confirmation_type": null,
  "goal_of_this_turn": "string",
  "affected_assets": [],
  "can_handoff": true
}
```

## 14.2 合法转移
### Full Runtime
- `think -> plan`
- `plan -> execute`
- `execute -> reflect`
- `reflect -> think`（进入下一轮）
- `reflect -> end`
- `reflect -> handoff_request`
- `plan -> confirmation_wait`
- `reflect -> confirmation_wait`

### Lite Runtime
- `analyze -> decide`
- `decide -> act`
- `act -> verify`
- `verify -> end`

## 14.3 非法行为
以下行为视为 Runtime 违规：
- 未 Think 就直接执行正式修改
- 未 Plan 就进行跨资产变更
- 未 Reflect 就宣布完成
- 未确认就跨过确认门
- 明知越权仍继续处理
- 明知低置信度仍伪装高确定性

---

## 15. 用户可见话术槽位规范

## 15.1 Full Runtime 推荐槽位
每轮回复优先按需覆盖以下槽位：

| 槽位 | 对应 Phase | 是否默认展示 |
|------|------------|-------------|
| 当前理解 | Think | 是 |
| 为什么这样问 / 这样处理 | Think / Plan | 是 |
| 本轮计划 | Plan | 是 |
| 已完成的动作 | Execute | 是 |
| 待确认项 | Execute / Reflect | 按需 |
| 本轮检查结果 | Reflect | 是 |
| 下一步建议 | Reflect | 是 |

## 15.2 推荐展示模板
### 简版
```text
当前理解：
...

本轮计划：
...

我已处理：
...

下一步：
...
```

### 完整版
```text
思考摘要：
...

本轮计划：
...

执行结果：
...

本轮检查：
...
```

---

## 16. 典型场景模板

## 16.1 PM Agent：新建 PRD
### Think
- 识别当前是新建需求
- 发现目标用户和成功指标未清晰
- 当前轮目标：完成目标探索

### Plan
- 问 2-3 个高价值问题
- 不生成完整 PRD
- 若用户回答足够，再进入功能拆解

### Execute
- 提问并给选项
- 收敛模糊回答

### Reflect
- 判断目标探索是否已完成
- 若完成，下一轮进入功能拆解
- 若未完成，继续追问关键缺口

## 16.2 PM Agent：复杂需求变更
### Think
- 判断这是 PRD 变更，不是 UI 微调
- 检测到会影响 UI Spec / Mockup / Tech Spec

### Plan
- 输出 Heavy Plan
- 先给变更方案摘要
- 等用户确认修改范围后再执行

### Execute
- 展示影响面
- 收到确认后更新 PRD

### Reflect
- 标记受影响资产
- 请求 Orchestrator 处理待同步状态

## 16.3 Dev Agent：上游回流
### Think
- 判断是 UI Spec 变化导致前端实现边界变化
- 不需要回到 PM

### Plan
- 先对齐变化范围
- 再更新 Tech Spec 的受影响章节

### Execute
- 输出差异摘要
- 修改技术方案对应部分

### Reflect
- 判断是否还存在未决依赖
- 若有，记录为 open questions

## 16.4 Orchestrator：需求变更进入系统
### Analyze
- 当前事件是 `request_requirement_change`
- 当前 active agent 是 UI Designer Agent
- 该问题更适合 PM Agent

### Decide
- 切换到 PM Agent
- 注入来源资产和反馈摘要

### Act
- 执行 handoff
- 更新会话状态

### Verify
- 确认系统已切换成功
- 提示用户当前将继续需求澄清

---

## 17. 与现有各 Agent Prompt 的集成方式

## 17.1 集成原则
每个专业 Agent Prompt 不重复完整 Runtime 文本，而是：

1. 在顶部声明"遵循 Agent Runtime Protocol V1"
2. 保留自身的领域内容、边界、质量清单
3. 把原来散落的"当前理解 / 正在做什么 / 自检"收拢到 Runtime 槽位下
4. 自检规则继续保留为该 Agent 的正式 Reflect 清单

## 17.2 对 PM Agent 的影响
新增：
- 每轮必须先 Think 再 Plan
- 复杂需求变更必须走 Heavy Plan
- 自检从"只在最后出现"改为"两层反思"

## 17.3 对 UI Designer Agent 的影响
强化：
- 设计返工前必须先归因
- 涉及需求层变更时必须在 Think/Reflect 中明确提示应 handoff 回 PM

## 17.4 对 Dev Agent 的影响
强化：
- 上游冲突要先做 Think 归因
- 不能一看到缺失就直接补写，必须先判断是可记录 assumption，还是必须回上游确认

## 17.5 对 Mockup / Review 类 Agent 的影响
强化：
- 执行型 Agent 也必须有 Reflect
- 但它们的 Execute 更重，Plan 可更短
- Review 类 Agent 的 Reflect 要更接近"检查结论 + 是否可过 Gate"

---

## 18. V1 落地建议

## 18.1 推荐新增的共用文档
建议新增：

`/.blueprint/agent-prompts/COMMON_AGENT_RUNTIME_V1.md`

它只放：
- Runtime 原则
- Phase 定义
- 可见协议
- 确认门
- Handoff 契约
- 结构化返回外壳

## 18.2 推荐对现有 Prompt 的最小改造
每个 Agent Prompt 增加以下章节：
- `遵循 Agent Runtime Protocol V1`
- `本 Agent 的 Think 重点`
- `本 Agent 的 Heavy Plan 触发条件`
- `本 Agent 的 Reflect 正式清单`

## 18.3 推荐 UI 配合能力
前端对话界面建议支持：
- `思考 / 计划 / 执行 / 检查` 四段折叠卡片
- 小任务默认折叠
- 大任务默认展开
- 用户可切换"简洁模式 / 详细模式"

---

## 19. V1 的权衡说明

## 19.1 收益
- 降低复杂任务的跳步和误判
- 用户更容易理解 Agent 为什么这样做
- 跨 Agent 行为更一致
- 更适合复杂修改和多文档同步场景
- 后续更容易做日志、观测、评估与调优

## 19.2 成本
- 每轮会增加少量 token
- 对高频小任务如果不做压缩，会增加延迟
- Prompt 设计复杂度会上升
- UI 需要支持结构化展示

## 19.3 V1 的平衡策略
- 专业 Agent 使用 Full Runtime，但默认压缩
- Orchestrator 使用 Lite Runtime
- 小任务走 Light Plan
- 只有复杂任务才升级 Heavy Plan
- 展示摘要，不展示原始冗长思维流

---

## 20. V1 结论

`Agent Runtime Protocol V1` 的核心结论是：

1. 几乎所有专业 Agent 都应具备 `think -> plan -> execute -> reflect`
2. Orchestrator 也需要运行时闭环，但应采用更轻的 `Lite Runtime`
3. 用户界面中应让这些环节可见，但展示的是结构化摘要，而不是原始链式思维
4. 计划不是"可有可无"，而是所有复杂任务的强制中间层
5. 反思不是只在最后发生，而是每轮必有微反思、关键节点有正式自检
6. 该协议应抽成共用层，而不是分别塞进每个专业 Prompt 中各写一遍

---

## 附录 A：最小用户可见模板

### A.1 专业 Agent 简版模板
```text
当前理解：
- ...

本轮计划：
1. ...
2. ...

执行结果：
- ...

本轮检查：
- 已完成：...
- 待确认：...

下一步：
- ...
```

### A.2 Orchestrator 简版模板
```text
系统正在处理：
- ...

影响范围：
- ...

需要你确认：
- ...
```

---

## 附录 B：最小结构化返回 Schema

```json
{
  "user_visible_reply": "string",
  "runtime": {
    "runtime_mode": "full | lite",
    "execution_phase": "think | plan | execute | reflect | analyze | decide | act | verify",
    "task_complexity": "L1 | L2 | L3",
    "plan_level": "light | heavy | none",
    "goal_of_this_turn": "string",
    "goal_completed": true
  },
  "confidence": "high | medium | low",
  "needs_confirmation": false,
  "confirmation_type": null,
  "handoff_request": null,
  "affected_assets": [],
  "open_questions": [],
  "risk_flags": []
}
```
