# Blueprint Agent 框架选型分析

> 本文档基于 Blueprint V1 的 PRD、Agent Capabilities、Agent Memory、Agent Mutation Guardrails 等设计文档，提取核心技术需求，并对市面上主流开源 Agent 框架 / 平台进行逐项匹配分析。

---

## 1. Blueprint V1 核心 Agent 需求提取

基于对全部设计文档的阅读，Blueprint V1 的 Agent 系统有以下关键技术需求：

### 1.1 多 Agent 中央调度架构

- 6 个核心 Agent：`Orchestrator`、`PM Agent`、`UI Designer Agent`、`Mockup Agent`、`Mockup Review Agent`、`Dev Agent`
- `Orchestrator` 作为中央调度中枢，负责意图路由、上下文装配、状态迁移、轻确认控制、任务触发、结果回收
- 各专业 Agent 各自控制生成/更新，Orchestrator 不接管具体落地执行
- 支持 Agent 间结构化结果传递（不是自由对话传递）

### 1.2 结构化状态管理

- 需要维护 `asset_registry`（资产状态）、`decision_log`、`confirmation_log`、`impact_log`、`session_index`、`review_issue_log` 等 7 个核心状态对象
- 资产状态机：`待完善 → 完善中 → 已确认 → 待同步 → 重生成中`
- 状态迁移由 Orchestrator 统一控制，专业 Agent 不能越权

### 1.3 Human-in-the-Loop 确认门

- 所有关键资产变更、基线确认、影响同步、重生成都必须经用户明确确认
- 确认机制是对话内确认（不是独立按钮），需要 Agent 先自检、输出确认摘要、等待用户回复
- 低置信度时需要显式提示用户选择处理方向

### 1.4 分层 Memory 架构

- L1 Asset Memory（资产正文本身）
- L2 Shared System Memory（跨 Agent 共享的系统状态）
- L3 Asset Working Memory（资产级辅助摘要）
- L4 Session Memory（会话连续性）
- L5 Ephemeral Working Memory（当前轮临时推理）
- 资产正文是第一事实源，Memory 是辅助

### 1.5 Agent 权限与读写控制

- 每个资产有唯一 owner Agent，只有 owner 可写正文
- 所有 Agent 可读共享 Memory，但 `Mockup Agent` 和 `Mockup Review Agent` 对 `decision_log`、`confirmation_log` 只有 Limited 读权限
- Orchestrator 是唯一可写系统状态的角色

### 1.6 MCP 工具集成

- 需要通过 MCP 调用 Paper / Figma 设计工具
- 读取设计稿变更摘要、生成设计稿
- MCP 是 V1 设计集成的核心手段

### 1.7 结构化输出与回传

- 每个 Agent 必须回传：readiness、action_type、confidence_level、updated_asset、blocking_gaps、risk_items、requires_confirmation 等结构化字段
- 不是自由文本输出，是可被系统消费的结构化结果

### 1.8 Mutation Guardrails

- 统一的 readiness 判断（insufficient / draftable / updatable / confirmable / blocked）
- 统一的 action type（continue_clarify / generate_draft / update_asset / propose_regenerate / prepare_confirmation / block_and_explain）
- 统一的 gap 分级（blocking_gap / non_blocking_gap）
- 文档型资产与执行型资产区分处理

### 1.9 上下文装配策略

- 不全量喂上下文，按场景分层：轻量增量装配 / 资产级重装配 / 跨资产重装配 / 全局重装配
- 需要会话快照支持增量装配

---

## 2. 框架逐项对比

### 2.1 LangGraph（LangChain 生态）

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | Graph 架构天然支持中央路由模式，可建模 Orchestrator → 专业 Agent 的调度图 |
| 结构化状态管理 | ✅ 强 | 支持自定义 State Schema（Pydantic），可定义 asset_registry 等对象；Checkpoint 机制支持状态持久化 |
| Human-in-the-Loop | ✅ 强 | 核心设计原则，支持中断点、状态检查、人工修改后恢复 |
| 分层 Memory | 🟡 需自建 | 支持 Working Memory 和 Persistent Memory 两层区分，但 5 层分层需要自行在 State Schema 上设计 |
| 权限与读写控制 | ❌ 无内置 | 无 RBAC，权限控制需要完全自行实现 |
| MCP 集成 | 🟡 间接 | LangGraph 自身不原生支持 MCP，需要通过 LangChain 层封装 MCP Tool |
| 结构化输出 | ✅ 强 | 支持 Pydantic 输出解析，可定义 readiness/action_type 等结构化返回 |
| Mutation Guardrails | 🟡 需自建 | 框架不内置 readiness/gap 分级，但 Graph 节点可以实现这些判断逻辑 |
| 上下文装配策略 | 🟡 需自建 | Checkpoint 支持状态恢复，但分层装配策略需要自行在 Orchestrator 节点中实现 |

**总结**：LangGraph 是当前最成熟的多 Agent 编排框架，Graph + State + Checkpoint + HITL 四大核心能力与 Blueprint 架构天然匹配。但它本质是一个**工作流引擎**，权限控制、分层 Memory、Mutation Guardrails、上下文装配策略都需要在其之上自行构建。适合作为底层编排引擎，上面再封装 Blueprint 自己的 Agent Runtime。

**生态成熟度**：★★★★★（最新版本 1.1.3，2026年3月更新，社区活跃，LangSmith 提供可观测性）

---

### 2.2 DeerFlow（字节跳动）

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | Lead Agent 模式，可动态派生子 Agent，支持并行执行与结果汇聚 |
| 结构化状态管理 | 🟡 部分 | 有隔离的子 Agent 上下文和文件系统缓存，但没有类似 asset_registry 的结构化对象模型 |
| Human-in-the-Loop | ❌ 弱 | 文档中未发现内置的人工确认门/审批机制，偏自主执行 |
| 分层 Memory | 🟡 部分 | 有长期记忆（用户画像/偏好）和上下文压缩，但不支持 5 层分层 |
| 权限与读写控制 | ❌ 弱 | 只有 Sandbox 隔离，无 Agent 级 RBAC |
| MCP 集成 | ✅ 强 | 原生支持可配置 MCP Server，支持 OAuth 认证 |
| 结构化输出 | 🟡 部分 | 子 Agent 向 Lead Agent 回传结构化结果，但不如 Pydantic 级别严格 |
| Mutation Guardrails | ❌ 无 | 无内置的 readiness/gap 分级机制 |
| 上下文装配策略 | 🟡 部分 | 有上下文压缩和摘要机制，但不支持按场景分层装配 |

**总结**：DeerFlow 更偏向于**自主深度研究场景**（Deep Research），其 Lead Agent + Sub Agent 架构适合任务分解与并行执行，但**不太适合 Blueprint 这种需要严格确认门、状态机、权限控制和人工审批的产品交付场景**。MCP 原生支持是亮点，但整体架构设计目标与 Blueprint 的差距较大。

**生态成熟度**：★★☆☆☆（10 stars，1 核心贡献者，MIT 许可，活跃更新但社区极早期）

---

### 2.3 CrewAI

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | 支持 Sequential 和 Hierarchical 模式，Manager Agent 可作为中央协调者 |
| 结构化状态管理 | ✅ 强 | Pydantic 状态管理，分层 Memory 隔离（root_scope），YAML 配置 |
| Human-in-the-Loop | ✅ 强 | 原生 `@human_feedback` 装饰器，可配置任务审批 |
| 分层 Memory | ✅ 较好 | 自动分层 Memory 隔离，Qdrant Edge 后端，共享/私有 scope |
| 权限与读写控制 | 🟡 开发中 | RBAC 在 v1.13.0a 预发布中，尚未稳定 |
| MCP 集成 | ✅ 有 | MCPToolResolver 原生集成，安全加固中 |
| 结构化输出 | ✅ 强 | 支持 Pydantic 输出模型 |
| Mutation Guardrails | 🟡 需自建 | 无内置 readiness/gap 机制 |
| 上下文装配策略 | 🟡 部分 | 有 Memory 管理但不支持按场景分层装配 |

**总结**：CrewAI 在多 Agent 协作、HITL、Memory 分层方面相对完善，是**最接近 Blueprint 需求的高层框架**。但它的抽象层级较高，对 Agent 内部行为控制（readiness 判断、Mutation Guardrails）的细粒度控制不如 LangGraph 灵活。RBAC 尚在开发中是一个风险点。

**生态成熟度**：★★★★☆（10万+ 认证开发者，活跃社区，v1.12.2，2026年3月更新）

---

### 2.4 AutoGen / AG2（Microsoft）

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | GroupChat + Manager 模式，9 种编排模式，支持嵌套对话 |
| 结构化状态管理 | ✅ 较好 | Actor 模型，事件驱动，GraphFlow 支持并发 |
| Human-in-the-Loop | ✅ 强 | UserProxyAgent 原生支持人工反馈 |
| 分层 Memory | ✅ 较好 | Redis 缓存，跨会话记忆，JSON/Markdown 存储 |
| 权限与读写控制 | ❌ 无 | 无 RBAC，按函数注册控制 |
| MCP 集成 | ❌ 无 | 未发现 MCP 集成 |
| 结构化输出 | ✅ 有 | 支持结构化消息 |
| Mutation Guardrails | ❌ 无 | 无内置机制 |
| 上下文装配策略 | 🟡 部分 | 有上下文管理但不支持分层装配 |

**总结**：AutoGen 的多 Agent 对话模式成熟，但它更偏向**对话驱动**的 Agent 协作，而 Blueprint 需要的是**状态驱动 + 资产驱动**的协作模式。缺少 MCP 支持和 RBAC 是硬伤。存在已知的沙箱执行安全漏洞。

**生态成熟度**：★★★★☆（56.3k stars，正向 v1.0 过渡）

---

### 2.5 Mastra

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | 图工作流引擎，支持 sequential/branching/parallel |
| 结构化状态管理 | ✅ 强 | 文件系统持久化（Turso/SQLite），MongoDB 版本管理 |
| Human-in-the-Loop | ✅ 强 | 原生支持执行暂停、等待用户输入、从保存状态恢复 |
| 分层 Memory | ✅ 强 | 对话历史 + Working Memory + 语义召回，三层结构 |
| 权限与读写控制 | ✅ 有 | OKTA SSO + RBAC（2026年3月发布） |
| MCP 集成 | ✅ 原生 | 原生支持 MCP Server 编写和集成 |
| 结构化输出 | ✅ 有 | TypeScript 类型系统 |
| Mutation Guardrails | 🟡 需自建 | 无内置机制 |
| 上下文装配策略 | 🟡 部分 | Token 阈值模型路由，但不支持按场景分层 |

**总结**：Mastra 是**功能覆盖最全面**的框架——MCP 原生支持、RBAC、HITL、Memory 分层、图工作流一应俱全。但它是 **TypeScript 生态**，如果 Blueprint 后端选择 Python，则存在技术栈不匹配。整体是一个值得重点关注的选项。

**生态成熟度**：★★★★☆（22.4k stars，Gatsby 团队出品，活跃迭代）

---

### 2.6 Semantic Kernel（Microsoft）

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | Agent 委派模式，Orchestration Handoffs |
| 结构化状态管理 | ✅ 强 | 内置 Memory 系统，Chat History 管理 |
| Human-in-the-Loop | ✅ 有 | Callback 机制 |
| 分层 Memory | ✅ 较好 | 向量数据库集成，语义召回 + 对话历史 |
| 权限与读写控制 | 🟡 有限 | 安全优先但无显式 RBAC |
| MCP 集成 | 🟡 计划中 | 插件生态可扩展 |
| 结构化输出 | ✅ 有 | 多语言类型系统 |
| Mutation Guardrails | ❌ 无 | 无内置机制 |
| 上下文装配策略 | 🟡 部分 | Orchestrator 状态讨论活跃但尚未成熟 |

**总结**：企业级定位，模型无关，多语言支持（Python + .NET）。适合企业级项目，但对 Blueprint 这种需要精细 Agent 行为控制的场景，灵活性不如 LangGraph。

**生态成熟度**：★★★★☆（27.6k stars，Microsoft 支持，生产就绪）

---

### 2.7 Dify

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | ✅ 强 | 可视化工作流引擎 |
| 结构化状态管理 | ✅ 强 | 数据库持久化，工作流状态 |
| Human-in-the-Loop | ✅ 强 | 可视化审批/确认节点 |
| 分层 Memory | ✅ 有 | RAG + 对话记忆 |
| 权限与读写控制 | ✅ 有 | 企业版角色管理 |
| MCP 集成 | 🟡 不明确 | 通过 API/Webhook 扩展 |
| 结构化输出 | 🟡 部分 | 工作流节点输出 |
| Mutation Guardrails | ❌ 无 | 无内置机制 |
| 上下文装配策略 | 🟡 部分 | RAG 检索但不支持分层装配 |

**总结**：Dify 更适合作为**快速搭建 AI 应用的平台**，其可视化工作流和开箱即用的能力很强。但 Blueprint 需要的是**深度可控的 Agent 行为逻辑**（readiness 判断、gap 分级、确认门、跨资产影响分析），Dify 的抽象层级太高，不适合作为 Blueprint Agent Runtime 的底层。可以考虑作为内部管理工具或原型验证平台。

**生态成熟度**：★★★★★（135k stars，社区最活跃的 LLM 应用平台之一）

---

### 2.8 n8n

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | 🟡 有限 | 工作流编排，非原生多 Agent |
| Human-in-the-Loop | ✅ 有 | Pause 节点和审批流 |
| 其他 Agent 需求 | ❌ 大部分不满足 | 本质是工作流自动化工具，非 Agent 框架 |

**总结**：n8n 不适合作为 Agent 框架使用。适合做外围集成和自动化触发，但不能承载 Blueprint 的核心 Agent 逻辑。

---

### 2.9 OpenAI Agents SDK（原 Swarm）

| 需求维度 | 匹配度 | 说明 |
|---------|--------|------|
| 多 Agent 中央调度 | 🟡 轻量 | Agent Handoff 模式，无状态设计 |
| 结构化状态管理 | ❌ 无 | 无状态，完全依赖外部 |
| Human-in-the-Loop | ❌ 无 | 无内置支持 |
| 其他 | ❌ | 教学级框架，不适合生产 |

**总结**：过于轻量，不适合 Blueprint 的需求。

---

## 3. 综合对比矩阵

| 需求维度 | LangGraph | DeerFlow | CrewAI | AutoGen | Mastra | Sem.Kernel | Dify |
|---------|-----------|----------|--------|---------|--------|-----------|------|
| **多 Agent 中央调度** | ✅✅ | ✅ | ✅✅ | ✅✅ | ✅✅ | ✅✅ | ✅ |
| **结构化状态管理** | ✅✅ | 🟡 | ✅ | ✅ | ✅✅ | ✅ | ✅ |
| **Human-in-the-Loop** | ✅✅ | ❌ | ✅✅ | ✅✅ | ✅✅ | ✅ | ✅✅ |
| **分层 Memory** | 🟡 | 🟡 | ✅ | ✅ | ✅✅ | ✅ | 🟡 |
| **权限控制** | ❌ | ❌ | 🟡 | ❌ | ✅ | 🟡 | ✅ |
| **MCP 原生支持** | 🟡 | ✅ | ✅ | ❌ | ✅✅ | 🟡 | 🟡 |
| **结构化输出** | ✅✅ | 🟡 | ✅✅ | ✅ | ✅ | ✅ | 🟡 |
| **Guardrails 可实现性** | ✅✅ | ❌ | 🟡 | 🟡 | 🟡 | 🟡 | ❌ |
| **上下文装配可控性** | ✅✅ | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | ❌ |
| **生态成熟度** | ★★★★★ | ★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★ | ★★★★★ |

> ✅✅ = 强匹配 / 原生支持  ✅ = 可用  🟡 = 部分/需自建  ❌ = 不满足/无

---

## 4. 推荐方案

### 4.1 首选方案：LangGraph 作为底层编排引擎 + 自建 Blueprint Agent Runtime

**理由**：

Blueprint V1 的 Agent 系统有三个**其他框架很难开箱即用满足**的核心特征：

1. **资产驱动的状态机**：不是简单的对话链，而是围绕 `PRD → UI Spec → 设计稿 → Mockup → Tech Spec` 的资产生命周期管理
2. **精细的 Mutation Guardrails**：readiness 判断、gap 分级、确认门、结构化回传，这些是 Blueprint 独有的业务逻辑
3. **分层上下文装配**：不全量喂上下文，而是按场景动态组装最小必要上下文

这三个特征决定了**不可能有任何现成框架能开箱满足**——它们不是通用 Agent 框架的设计目标。

LangGraph 的优势在于它是一个**足够底层、足够灵活**的编排引擎：
- Graph 节点可以精确映射 Blueprint 的状态判断、路由、确认门逻辑
- Checkpoint 支持复杂的状态持久化和恢复
- HITL 是核心设计原则
- Pydantic State Schema 可以直接建模 asset_registry 等对象
- LangSmith 提供生产级可观测性

**需要自建的部分**：
- Agent 权限矩阵（读写控制）
- 分层 Memory 管理器（5 层 → LangGraph State 映射）
- Mutation Guardrails 引擎（readiness / gap / action_type 判断）
- 上下文装配器（按场景分层装配策略）
- MCP 工具封装层

### 4.2 备选方案：Mastra（如果技术栈可以接受 TypeScript）

如果 Blueprint 后端选择 TypeScript/Node.js 技术栈，Mastra 值得重点考虑：
- MCP 原生支持
- RBAC 内置
- HITL 原生支持
- Memory 分层相对完善
- 图工作流引擎灵活

但仍然需要自建 Mutation Guardrails 和上下文装配策略。

### 4.3 不推荐的方案

| 方案 | 不推荐原因 |
|------|-----------|
| DeerFlow | 偏自主研究场景，无 HITL，无权限控制，社区极早期 |
| Dify | 抽象层级太高，无法实现精细的 Agent 行为控制 |
| n8n | 工作流自动化工具，非 Agent 框架 |
| OpenAI Agents SDK | 教学级别，不适合生产 |
| AutoGen/AG2 | 偏对话驱动，缺 MCP，缺权限控制，安全漏洞 |

---

## 5. 结论

**没有任何一个现成的开源框架或平台能完整满足 Blueprint V1 的 Agent 需求。**

这不是因为市面上的框架不好，而是因为 Blueprint 的 Agent 系统有大量**领域特定的业务逻辑**——资产状态机、Mutation Guardrails、分层确认门、跨资产影响分析、精细的权限矩阵——这些是产品级设计，不是通用 Agent 框架的目标。

**推荐策略是**：选择一个足够灵活的底层编排引擎（LangGraph 或 Mastra），在其之上构建 Blueprint 自己的 Agent Runtime 层，将 Blueprint 独有的状态管理、权限控制、Guardrails、上下文装配策略封装为可复用的中间层。

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V1.0 | 2026-03-27 | 初始版本，完成 Blueprint V1 核心需求提取与 9 个主流框架的逐项匹配分析 |
