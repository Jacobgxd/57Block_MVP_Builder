# Agent Capabilities V1

> 本文档定义 Blueprint 平台 V1 的 Agent Capability 设计框架、6 个核心 Agent 的能力范围、能力落地方式边界，以及后续分 Agent 能力文档的拆分规划。
> 本文档聚焦“Agent 需要具备什么能力，以及这些能力如何落地”，不替代 `Agent Prompt`，也不替代 `Agent Memory` 文档。

---

## 1. 文档目标

本文件回答 4 个核心问题：

1. Blueprint V1 需要哪些核心 Agent Capability
2. Capability 与 Prompt / Memory / Tool 的关系是什么
3. 每个 Agent 的能力应该写到什么粒度
4. 后续应该如何拆分为单 Agent 能力文档

---

## 2. 适用范围

本文件仅覆盖 Blueprint V1 当前主链路中的 6 个核心 Agent：

- `Orchestrator`
- `PM Agent`
- `UI Designer Agent`
- `Mockup Agent`
- `Mockup Review Agent`
- `Dev Agent`

本轮不展开：

- `Test Agent`
- 实现阶段通用 `Review Agent`
- 更后续的自动化执行、测试、部署 Agent

---

## 3. Capability 的定义边界

### 3.1 什么是 Capability

在本项目里，`Capability` 指的是：

- Agent 为完成职责必须具备的可执行能力项
- 能被映射到具体输入、动作、输出、状态更新和异常处理
- 能进一步落地为 `MCP / 文件读写 / 命令执行 / 结构化输出`

本文件中的 Capability 默认偏实现，而不是纯抽象人格描述。

### 3.2 Capability 不是什么

Capability 不是：

- Prompt 的完整人格设定
- Memory 的对象模型
- 某个具体工具本身
- 用户前台看到的话术模板

### 3.3 Capability 与其他设计文档的关系

| 维度 | 回答的问题 | 对应文档 |
|------|------------|----------|
| `Prompt` | 这个 Agent 应该如何思考、如何说话、遵守什么规则 | `agent-prompts/*.md` |
| `Memory` | 系统长期存什么、谁能读写什么 | `AGENT_MEMORY_SOLUTION_V1.md` |
| `Capability` | 这个 Agent 必须会什么、如何完成任务 | 本文档与后续分 Agent Capability 文档 |
| `Tool / MCP / 命令` | 这些能力通过什么手段落地 | 在 Capability 文档中写明 |

---

## 4. 能力设计原则

### 4.1 偏实现，不停留在抽象词

避免只写：

- “理解能力强”
- “协作能力强”
- “分析能力强”

应写成：

- 识别当前入口意图并映射到目标 Agent
- 读取当前基线资产并检查版本完整性
- 生成结构化问题清单并回传 `Orchestrator`

### 4.2 一项能力必须能落地

每项 P0 能力都应尽量能回答：

- 依赖什么输入
- 执行什么动作
- 用什么方式落地
- 产出什么结果
- 失败时如何降级

### 4.3 能力与权限分开写

“能做到”和“允许做”不是一回事。

例如：

- `Dev Agent` 有能力指出 `PRD` 风险
- 但没有权限直接修改 `PRD`

### 4.4 能力与系统状态绑定

所有关键能力都不应停留在自然语言层，还应考虑：

- 是否影响 `asset_registry`
- 是否产生 `confirmation_log`
- 是否产生 `impact_log`
- 是否需要更新 `session_index`

### 4.5 默认服务于 `Orchestrator` 调度

Blueprint V1 是“统一前台 + 后台多 Agent”的模型，所以各 Agent 的能力设计必须默认可被 `Orchestrator` 调用、组合、回收和裁决。

---

## 5. 建议的单 Agent 能力文档结构

后续每个 Agent 的 Capability 文档建议统一使用以下结构：

1. `Agent 目标`
2. `P0 必需能力`
3. `P1 可后补能力`
4. `能力落地方式`
5. `最小输入依赖`
6. `标准输出结果`
7. `失败与降级处理`
8. `禁止项`

说明：

- `P0 必需能力` 聚焦当前 V1 必须实现的能力项
- `能力落地方式` 允许直接出现 `MCP / 文件读写 / 命令执行`
- `标准输出结果` 关注系统可消费的结构化结果，而不是用户话术

---

## 6. 六个核心 Agent 的能力总览

### 6.1 `Orchestrator`

#### 核心定位

系统内部的状态与路由中枢，负责：

- 意图路由
- 上下文装配
- 状态迁移
- 轻确认控制
- 任务触发
- 结果回收

#### P0 能力方向

- 识别当前输入属于继续共创、需求变更、设计返工、反馈归因、基线确认还是重生成请求
- 按会话与资产范围装配最小必要上下文，而不是每轮全量重装
- 维护 `asset_registry` 中的状态迁移
- 在 AI 自检或影响分析后发出系统确认消息
- 触发 `Mockup Agent`、`Mockup Review Agent`、设计稿读回等后台动作
- 把关键结论写回 `confirmation_log / impact_log / session_index`

#### 典型落地方式

- 读取：资产摘要、会话快照、共享 Memory、当前入口动作
- 写入：`asset_registry`、`confirmation_log`、`impact_log`、`session_index`
- 调用：目标专业 Agent、设计集成链路、Mockup 构建与审查链路

#### 禁止项

- 不直接修改 `PRD / UI Spec / Mockup / Tech Spec` 正文
- 不替专业 Agent 做领域性结论
- 不以独立人格和用户长期对话

### 6.2 `PM Agent`

#### 核心定位

负责需求澄清、PRD 生成、PRD 更新和需求变更吸收。

#### P0 能力方向

- 把模糊输入追问成可执行需求
- 结构化生成与更新 `PRD`
- 识别需求缺项、冲突、边界遗漏
- 对需求变更做影响分析输入准备
- 在请求确认前输出自检摘要与剩余风险

#### 典型落地方式

- 读取：项目基础信息、当前 `PRD`、历史会话摘要、变更入口意图
- 写入：`PRD`
- 回传：需求澄清结果、PRD 更新、缺项清单、自检摘要、确认建议

#### 禁止项

- 不直接修改 `UI Spec / Mockup / Tech Spec`
- 不负责设计风格和技术实现裁决

### 6.3 `UI Designer Agent`

#### 核心定位

负责把 `PRD` 转成 `UI Spec`，并通过设计工具链生成和维护原型稿/设计稿。

#### P0 能力方向

- 读取 `PRD` 并生成结构化 `UI Spec`
- 提炼设计偏好、品牌约束、参考输入
- 基于 `UI Spec` 生成原型稿或设计稿
- 支持通过 `Paper` 或 `Figma` MCP 读取设计上下文
- 在支持写入的平台中把设计结果回写到设计工具
- 读取设计稿变更摘要，并判断是否建议同步回 `UI Spec`
- 在设计返工场景下输出返工范围与影响说明

#### 典型落地方式

- 读取：`PRD`、设计偏好、参考链接/截图、设计工具上下文、设计稿变更摘要
- 写入：`UI Spec`、设计摘要
- 调用：`Paper MCP`、`Figma MCP`
- 回传：`UI Spec` 更新、原型稿生成结果、设计同步建议、自检摘要

#### 说明

- V1 将 `Paper` 与 `Figma` 作为并列支持的设计集成对象
- 具体“是否支持写回”受对应 MCP 实际能力约束
- 当某平台仅支持读取时，系统应退化为“读取设计上下文 / 读取变更摘要”模式

#### 禁止项

- 不直接修改 `PRD`
- 不直接产出最终可运行 `Mockup`

### 6.4 `Mockup Agent`

#### 核心定位

负责把上游确认资产转成可运行、可预览、可重生成的 Web Mockup。

#### P0 能力方向

- 读取 `PRD / UI Spec / 设计稿摘要` 并识别当前基线
- 把上游资产翻译为可点击浏览的前端原型
- 为核心页面和流程组织 mock 数据、空状态、异常状态
- 构建本地 Mockup 工程或页面代码
- 运行本地 Mockup 并产出预览链接
- 接收 `Mockup Review Agent` 的问题清单后执行定向重生成
- 输出运行摘要、构建结果和失败原因

#### 典型落地方式

- 读取：`PRD`、`UI Spec`、设计稿摘要、Review 问题清单
- 写入：`mockup/` 代码、运行摘要、预览链接记录
- 调用：文件读写、命令执行、本地运行链路
- 回传：预览链接、重生成结果、阻断原因、受影响页面/流程

#### 说明

- `Mockup Agent` 是当前 6 个 Agent 中最接近执行链路的一个
- 后续需要单独拆出更细的 Capability 文档，覆盖运行、重生成、失败诊断、与 Review 协作的细节

#### 禁止项

- 不负责需求归因的最终裁决
- 不直接与用户长期共创需求或设计

### 6.5 `Mockup Review Agent`

#### 核心定位

负责检查 `Mockup` 与 `PRD / UI Spec / 设计稿` 之间的一致性、完整性和漂移问题。

#### P0 能力方向

- 同时读取多个上游资产和当前 `Mockup`
- 识别功能缺失、页面缺漏、流程断点、状态缺失、视觉/交互漂移
- 输出结构化问题列表与严重级别
- 判断问题更可能来自需求、UI 规则、设计稿还是 Mockup 执行偏差
- 在重生成后执行回归复查

#### 典型落地方式

- 读取：`Mockup`、`PRD`、`UI Spec`、设计稿摘要、历史审查问题
- 写入：`Mockup Review` 结果、`review_issue_log`
- 回传：问题列表、分级结果、归因建议、是否允许继续进入人工验收

#### 禁止项

- 不直接编辑任何资产正文
- 不承担通用 PRD / UI / Tech 自检职责

### 6.6 `Dev Agent`

#### 核心定位

负责将上游资产收敛为结构化 `Tech Spec`。

#### P0 能力方向

- 读取 `PRD / UI Spec / 设计稿 / Mockup`
- 抽象系统模块、接口、数据模型、关键实现路径
- 识别实现风险、边界、假设与后续依赖缺口
- 输出结构化 `Tech Spec`
- 在确认前给出技术自检摘要和未决问题

#### 典型落地方式

- 读取：上游全部已确认资产、资产状态、必要会话摘要
- 写入：`Tech Spec`
- 回传：技术方案正文、风险清单、假设清单、待补信息清单

#### 禁止项

- V1 不直接改代码
- 不直接修改 `PRD / UI Spec`

---

## 7. 跨 Agent 共通能力项

以下能力虽然由不同 Agent 以不同方式实现，但属于共通能力：

- **版本识别能力**：识别当前资产基线和当前轮依赖版本
- **结构化输出能力**：输出可被系统继续消费的结构化结果
- **自检能力**：在请求确认前先输出自检摘要
- **低置信度显式化能力**：在不确定时显式标出风险或待确认点
- **边界遵守能力**：发现跨资产问题时只给建议，不越权改正文
- **失败回传能力**：遇到 MCP、文件、命令执行失败时回传阻断原因

---

## 8. Capability 与落地方式的映射

V1 中允许的主要落地方式包括：

### 8.1 文件读写

用于：

- 读取和更新正式资产
- 生成结构化摘要
- 写入审查结果

### 8.2 MCP 调用

用于：

- 读取 `Paper / Figma` 设计上下文
- 在支持写入的平台中生成或更新原型稿
- 读取设计工具中的修改结果

### 8.3 命令执行

用于：

- 构建和运行 Mockup
- 产出本地预览链接
- 执行与生成过程有关的运行时任务

### 8.4 Memory 更新

用于：

- 记录系统状态
- 沉淀确认结果
- 沉淀影响分析
- 维持会话连续性

---

## 9. 分文档拆分规划

后续应按下列路径逐步补齐单 Agent 能力文档：

- `.blueprint/agent-capabilities/ORCHESTRATOR_CAPABILITIES_V1.md` `已起草`
- `.blueprint/agent-capabilities/PM_AGENT_CAPABILITIES_V1.md` `已起草`
- `.blueprint/agent-capabilities/UI_DESIGNER_AGENT_CAPABILITIES_V1.md` `已起草`
- `.blueprint/agent-capabilities/MOCKUP_AGENT_CAPABILITIES_V1.md` `已起草`
- `.blueprint/agent-capabilities/MOCKUP_REVIEW_AGENT_CAPABILITIES_V1.md` `已起草`
- `.blueprint/agent-capabilities/DEV_AGENT_CAPABILITIES_V1.md` `已起草`

建议顺序：

1. `Orchestrator`
2. `UI Designer Agent`
3. `Mockup Agent`
4. `PM Agent`
5. `Mockup Review Agent`
6. `Dev Agent`

说明：

- `UI Designer Agent` 需要尽快补上 `Paper / Figma MCP` 生成与读回链路
- `Mockup Agent` 需要最细粒度拆解，因为它最接近执行与运行链路

---

## 10. 当前结论

Blueprint V1 的 Agent Capability 设计应遵守以下结论：

- 先定义能力，再定义能力如何通过 `MCP / 文件读写 / 命令执行` 落地
- 能力文档必须偏实现，不只写抽象人格特征
- 总索引文档负责统一术语、范围和拆分规划
- 单 Agent 文档负责展开 P0 / P1、输入依赖、输出结果、失败降级与禁止项
- `Mockup Agent` 与 `UI Designer Agent` 是当前最需要优先细化的两个 Agent

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V1.0 | 2026-03-26 | 初始版本，建立 6 个核心 Agent 的 Capability 总框架，定义 Capability 与 Prompt / Memory / Tool 的关系，并给出分 Agent 文档拆分规划 |
