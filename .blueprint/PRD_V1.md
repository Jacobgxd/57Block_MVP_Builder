# PRD: Blueprint V1

## 📊 概述
**大版本**: V1（覆盖迭代 1.0 -> 当前）  
**当前迭代**: 1.13  
**状态**: Active  
**创建日期**: 2026-03-24  
**负责人**: TBD

---

## 📌 当前需求全貌（AI 实现代码时读这里）
> 本区域始终反映最新状态，包含所有累积至今的功能需求

### 产品定位
`Blueprint` 是一套 AI 驱动的 MVP 结构化交付平台。它面向小团队 PM、设计师、创业团队，以及对该模式感兴趣的 `57Blocks` 现有客户，目标是覆盖从模糊想法到结构化产品资产、再到代码仓库生成与最终部署交付的完整 MVP 交付链路。

当前的 `V1` 只是整个产品路线中的第一阶段。V1 的核心目标不是直接交付代码或部署后的产品，而是交付一套完整、可审阅、可迭代、可继续用于后续研发的产品文档包。平台将用户从想法输入一路带到 `PRD -> UI Spec -> 设计稿 -> Mockup -> Tech Spec -> 交付摘要` 的阶段化流程中，并要求每个阶段经过人工确认后才能进入下一阶段。

### 当前阶段定位
`V1` 的定位是帮助用户把模糊的产品想法逐步沉淀为可以继续落地的结构化产品资产，确保后续研发、测试、部署与验收可以建立在稳定、可追踪、可迭代的文档基础之上。

### 路线图定位
- `Phase 1`：生成并确认结构化产品资产，包括 `PRD / UI Spec / 设计稿 / Mockup / Tech Spec`
- `Phase 2`：基于已确认资产生成可交付的代码仓库，由用户自行部署
- `Phase 3`：平台直接完成部署，用户验收 MVP，并获取代码仓库

### 官网表达策略
- 官网必须呈现 `Blueprint` 的最终目标，即一套 AI 驱动的 MVP 结构化交付平台，而不是只呈现为单一文档工具
- 官网首屏与价值表达应讲完整愿景：从想法到结构化资产，再到代码仓库与部署交付
- 官网中段必须清楚区分 `当前第一阶段已支持能力` 与 `后续阶段规划`
- 官网需要同时存在三层信息：`最终愿景`、`当前能力`、`路线图`
- 官网 CTA 仍以当前阶段能力为准，不夸大尚未交付的第二、第三阶段能力

### V1 核心原则
- 采用真实线上流程：`登录 -> Onboarding -> 创建项目 -> 与 Agent 对话完成各阶段`
- 系统内只有一个核心角色：`Owner`
- 账号体系为邀请制，非受邀用户不可自由注册
- 每个阶段都采用 `stage-gate` 机制，必须经 `Owner` 人工确认后才能进入下一阶段
- `UI Spec` 是主线资产，设计稿是可视化产物；若设计稿被人工修改，系统需识别变更摘要并提示是否同步回 `UI Spec`
- `Mockup` 定义为接近真实网页体验的可交互前端原型，使用 mock 数据还原核心流程
- Agent 需向用户展示动作状态与简要步骤日志，但不暴露完整思维链
- 官网首页主 CTA 为 `申请试用`
- `Onboarding` 首次登录强制展示，之后不再强制弹出，但项目工作台需始终保留“查看工作流说明”入口
- 项目创建页除项目名称和项目描述外，还需采集 `产品类型/行业`、`目标用户`、`目标平台(Web)`
- `PRD / UI Spec / Tech Spec / 设计稿 / Mockup` 采用统一项目工作台框架：顶部为阶段状态与确认操作，左侧为阶段导航，中间为对话或反馈区，右侧为文档或预览区
- 工作台主确认按钮统一为 `确认并进入下一阶段`
- Agent 身份由当前阶段自动绑定，用户无需手动切换 Agent
- 历史会话按阶段独立管理，不做项目全局混合会话列表
- 新建会话默认继承当前阶段最新文档版本作为上下文继续对话
- 用户可在下游阶段发起需求变更；点击入口后应先新建一条与 `PM Agent` 的会话，由 Agent 感知当前用户意图并通过多轮对话澄清变更内容
- 所有工作台页面都必须保留 Agent 对话输入框；右侧区域仅根据阶段不同切换为文档预览或视觉/原型预览
- 左侧阶段导航可点击，作为一级切换；会话区块永远跟随当前选中阶段刷新，作为该阶段内的二级切换
- 从下游阶段回退分为两类：`需求变更` 与 `设计返工`；前者始终拉起 `PM Agent` 会话并在确认后重开 `PRD` 或更上游阶段，后者始终拉起 `UI Designer Agent` 会话并在确认后重开 `UI Spec`
- 前台呈现为阶段 Agent，后台由 `Orchestrator` 统一调度，但 `Orchestrator` 不以独立人格暴露给用户
- `Orchestrator` 可读取所有阶段状态和资产，但在 `V1` 中只承担 `阶段绑定 / 路由分发 / 状态迁移 / Gate 控制 / 任务触发` 这五类最小职责，不能直接修改用户资产正文，也不能直接生成文档
- 当前阶段不设通用 `Review Agent`；`PRD / UI Spec / Tech Spec` 的质量检查由各自阶段 Agent 通过自检完成
- `Mockup Agent` 作为后台执行者存在，负责构建、运行和重生成 Mockup，但不作为前台可见 Agent 暴露
- `Mockup Review Agent` 是当前阶段唯一保留的专用 Review 角色，只负责检查 `Mockup` 与 `PRD / UI Spec / 设计稿` 之间的一致性、完整性与漂移
- `Orchestrator` 允许发出系统确认消息，例如提示阶段重开影响和确认是否继续，但不以人格化 Agent 方式与用户进行多轮对话
- `Orchestrator` 的路由策略以 AI 自动判断优先；只有在归因低置信度时，才要求用户显式选择处理方向
- Agent 必须遵守质量约束：不乱编需求、不跨阶段越权修改、输出结构化、每次修改有原因、不确定时主动追问、进入下一阶段前先自检、低置信度结果必须显式提醒

### V1 交付范围
V1 必须支持以下主链路：
1. 用户通过邮件邀请链接进入系统并完成首次注册/密码设置
2. 用户登录后进入 Onboarding，理解平台工作流、所需输入和预期输出
3. 用户创建项目并填写项目基础信息
4. 用户与 `PM Agent` 对话生成 `PRD`，可实时预览 Markdown，并支持编辑、导出、手动保存版本、填写更新说明
5. Agent 在 `PRD` 提交前执行自动 review，指出缺项后由用户确认
6. 用户与 `UI Designer Agent` 对话生成 `UI Spec`
7. 用户可上传参考截图、输入参考网站链接、选择偏好品牌/字体/风格选项，以辅助 `UI Spec` 和设计稿生成
8. 系统基于 `UI Spec` 生成高保真设计稿，平台内提供预览，并支持跳转到 `Paper` 进行外部编辑
9. 平台通过 MCP 读取设计稿修改结果，生成变更摘要，并提示用户是否同步更新 `UI Spec`
10. 后端基于 `PRD + UI Spec + 设计稿` 生成 `Mockup`
11. 用户在平台内或通过链接预览 `Mockup`，并通过对话反馈问题
12. Agent 对反馈问题执行自动归因，判断应更新 `PRD` 还是 `UI Spec`，经用户确认后回写并重新生成设计稿/Mockup
13. 用户与 `Dev Agent` 对话生成 `Tech Spec`
14. 用户可在 `UI Spec / 设计稿 / Mockup / Tech Spec / 交付摘要` 阶段发起需求变更，系统需先拉起与 `PM Agent` 的新会话，由 Agent 结合当前上下文澄清变更内容
15. 用户可在 `Mockup / Tech Spec / 交付摘要` 等下游阶段发起 `设计返工`，系统需先拉起与 `UI Designer Agent` 的新会话，由 Agent 结合当前设计资产澄清重设计方向
16. 只有在 Agent 与用户达成明确方案，且用户点击确认执行后，系统才真正执行阶段重开与状态迁移
17. 若上游阶段被重开，受影响的下游阶段需自动标记为 `Outdated`，待重新生成与确认
18. 用户完成 `PRD / UI Spec / 设计稿 / Mockup / Tech Spec` 的确认后，系统生成交付摘要页，形成完整文档包

### V1 交付结果
一个项目在 V1 中完成，意味着系统可稳定产出并保存以下资产：
- `PRD`
- `UI Spec`
- `视觉设计稿链接`
- `Mockup 链接`
- `Tech Spec`
- `交付摘要页`

### V1 明确不做
- 不做公开注册与自由获客
- 不做 Google 快捷登录
- 不做站内多人实时协同编辑
- 不做站内评论系统
- 不做完整 Figma 级设计编辑器
- 不做自动代码生成与部署闭环
- 不做复杂计费/订阅系统
- 不做移动端 App
- 不做企业级工作区隔离与复杂权限体系
- 不做项目分享链接、只读协作者查看、精细版本 diff、多套设计方向对比、Mockup 历史版本回看、统一审批流

### Agent System Architecture

#### Agent 分层

**用户可见 Agent**
- `PM Agent`
- `UI Designer Agent`
- `Dev Agent`

**系统内部 Agent**
- `Mockup Agent`
- `Mockup Review Agent`
- `Test Agent`
- `Orchestrator / Workflow Agent`

#### 总体架构原则
- 用户前台始终看到当前阶段对应的主 Agent，而不是看到内部调度系统
- 系统后台由 `Orchestrator` 负责读取上下文、判断意图、选择调用哪个内部或阶段 Agent
- `Mockup 工作台` 是前台页面，但 `Mockup Agent` 是后台执行者
- `Mockup Review Agent` 不参与前台共创，只承担 `Mockup` 一致性与漂移检查职责
- `Test Agent` 在 `V1` 作为后台保留能力存在，不前台暴露，也不进入当前交付包

#### Agent 架构图

##### 图 1：分层与调度架构
```mermaid
flowchart TB
    U[用户 Owner]

    subgraph FE[前台交互层]
        PRDUI[PRD 工作台<br/>PM Agent]
        UISUI[UI Spec / 设计工作台<br/>UI Designer Agent]
        MOCKUI[Mockup 工作台<br/>预览与反馈界面]
        DEVUI[Tech Spec 工作台<br/>Dev Agent]
    end

    subgraph ORCH[系统调度层]
        ORC[Orchestrator / State & Routing Engine]
    end

    subgraph AGENTS[系统内部 Agent 层]
        MKA[Mockup Agent]
        MRA[Mockup Review Agent]
        TSA[Test Agent]
    end

    subgraph ASSETS[项目资产层]
        PRD[PRD]
        UIS[UI Spec]
        DSG[设计稿]
        MCK[Mockup]
        TEC[Tech Spec]
        ST[阶段状态 / 会话 / 版本]
    end

    U --> PRDUI
    U --> UISUI
    U --> MOCKUI
    U --> DEVUI

    PRDUI <--> ORC
    UISUI <--> ORC
    MOCKUI <--> ORC
    DEVUI <--> ORC

    ORC --> MKA
    ORC --> MRA
    ORC --> TSA

    PRDUI --> PRD
    UISUI --> UIS
    UISUI --> DSG
    DEVUI --> TEC

    MKA --> MCK
    MRA --> ORC
    ORC <--> ST

    PRD --> ORC
    UIS --> ORC
    DSG --> ORC
    MCK --> ORC
    TEC --> ORC
```

##### 图 2：Mockup 反馈与路由架构
```mermaid
flowchart LR
    U[用户在 Mockup 工作台反馈]
    UI[Mockup 工作台]
    ORC[Orchestrator]
    DECIDE{归因是否高置信度?}
    SYS[系统确认<br/>选择处理方向]
    PM[PM Agent]
    UID[UI Designer Agent]
    MKA[Mockup Agent]
    PRD[PRD]
    UIS[UI Spec]
    MCK[Mockup]

    U --> UI
    UI --> ORC
    ORC --> DECIDE

    DECIDE -->|高置信度| PM
    DECIDE -->|高置信度| UID
    DECIDE -->|高置信度| MKA
    DECIDE -->|低置信度| SYS

    SYS -->|交给 PM Agent| PM
    SYS -->|交给 UI Designer Agent| UID

    PM --> PRD
    UID --> UIS
    MKA --> MCK

    PRD -.影响重生成.-> MKA
    UIS -.影响重生成.-> MKA
```

#### 各 Agent 职责边界

| Agent | 可见性 | 主要职责 | 明确不负责 |
|------|------|---------|---------|
| `PM Agent` | 用户可见 | 需求澄清、PRD 生成与更新、需求变更会话、PRD 范围内解释与追问 | 不直接修改 `UI Spec / 设计稿 / Mockup / Tech Spec` |
| `UI Designer Agent` | 用户可见 | 基于 `PRD` 生成 `UI Spec`、理解设计偏好与参考输入、处理设计返工会话、基于设计稿变更回写 `UI Spec` 建议 | 不修改 `PRD` 需求本身 |
| `Dev Agent` | 用户可见 | 读取 `PRD / UI Spec / 设计稿 / Mockup`，生成结构化 `Tech Spec`，解释技术方案、边界、风险、假设 | 不在 `V1` 改代码，不直接修改 `PRD / UI Spec` |
| `Mockup Agent` | 系统内部 | 基于上游资产执行 Mockup 构建、运行、重生成与交付预览链接 | 不作为前台对话 Agent，不负责需求归因 |
| `Mockup Review Agent` | 系统内部 | 只检查 `Mockup` 与 `PRD / UI Spec / 设计稿` 的一致性、完整性和漂移问题，并输出结构化检查结果 | 不直接编辑资产，不负责 `PRD / UI Spec / Tech Spec` 阶段内自检，不与用户长期共创 |
| `Test Agent` | 系统内部 | 保留测试规格与后续自动化测试能力，为后续阶段做准备 | `V1` 不生成正式前台产物 |
| `Orchestrator` | 系统内部 | 读取阶段状态与资产，执行 `阶段绑定 / 路由分发 / 状态迁移 / Gate 控制 / 任务触发`，并协调内部 Agent | 不直接生成文档，不直接修改用户资产正文，不以独立人格长期与用户对话 |

#### Orchestrator V1 最小职责
- `阶段绑定`：用户进入某一工作台时，为前台绑定正确的阶段 Agent，并注入该阶段所需上下文
- `路由分发`：接收用户入口动作、反馈和系统事件，决定交给哪个阶段 Agent 或内部任务处理
- `状态迁移`：统一维护 `Draft / In Review / Confirmed / Reopened / Outdated / Regenerating / Reconfirmed` 的合法迁移
- `Gate 控制`：所有 `确认并进入下一阶段` 的动作都先经过 `Orchestrator` 检查，只有满足条件时才允许推进
- `任务触发`：负责触发 `Mockup Review Agent`、`Mockup Agent`、设计稿读回、重生成等后台任务

#### 触发与路由规则
- 用户进入 `PRD` 阶段时，前台默认绑定 `PM Agent`
- 用户进入 `UI Spec` 或设计返工会话时，前台默认绑定 `UI Designer Agent`
- 用户进入 `Tech Spec` 阶段时，前台默认绑定 `Dev Agent`
- 用户在 `Mockup` 页提交反馈时，先由 `Orchestrator` 判断：
  - 若属于需求问题，拉起 `PM Agent`
  - 若属于 UI / 设计问题，拉起 `UI Designer Agent`
  - 若仅需重生成 Mockup，则调用 `Mockup Agent`
- 若 `Orchestrator` 对问题归因的置信度不足，不直接自动路由，而是先弹出系统确认，让用户选择交给 `PM Agent` 或 `UI Designer Agent`
- 用户点击 `发起需求变更` 时，始终新建与 `PM Agent` 的会话
- 用户点击 `返回 UI 阶段重设计` 时，始终新建与 `UI Designer Agent` 的会话

#### Gate 控制规则
- 所有 `确认并进入下一阶段` 的动作都由页面先发起，再由 `Orchestrator` 执行最终裁决
- `Orchestrator` 在执行阶段推进前，必须统一完成以下检查：
  - 当前阶段是否已满足必填输入和前置条件
  - 是否需要触发该阶段对应的 `Review` 或自检
  - 是否存在未处理反馈、未处理设计变更或未确认的低置信度项
- 只有在检查通过且 `Owner` 明确确认后，`Orchestrator` 才能执行状态迁移和下一阶段解锁
- 若检查不通过，页面只展示失败原因和下一步引导，不允许自行跳过 `Gate`

#### 输入上下文与输出资产

| Agent | 读取上下文 | 输出结果 |
|------|---------|---------|
| `PM Agent` | 项目基础信息、当前 PRD 版本、历史会话、需求变更入口意图 | `PRD` 草稿/更新、需求澄清问题、需求变更方案 |
| `UI Designer Agent` | 已确认 `PRD`、设计偏好、参考截图/链接、设计返工入口意图、设计稿变更摘要 | `UI Spec` 草稿/更新、设计返工方案、回写建议 |
| `Dev Agent` | `PRD / UI Spec / 设计稿 / Mockup`、阶段状态 | `Tech Spec`、实现风险、假设与边界说明 |
| `Mockup Agent` | `PRD / UI Spec / 设计稿`、生成参数 | 可运行 `Mockup`、预览链接、重生成结果 |
| `Mockup Review Agent` | `Mockup`、已确认 `PRD / UI Spec / 设计稿` | `Mockup` 一致性检查结果、漂移项、遗漏清单 |
| `Orchestrator` | 所有阶段状态、当前资产摘要、用户入口动作与反馈 | 路由决定、系统状态变化、触发任务记录 |

#### 质量与权限约束
- Agent 不得凭空补写未经用户确认的业务需求
- Agent 不得跨阶段直接修改不属于本阶段的资产正文
- 所有阶段产物必须保持结构化输出，便于后续 Agent 消费
- Agent 每次建议修改时，必须说明修改原因或触发依据
- 当上下文不充分或低置信度时，Agent 必须先追问或显式提示风险
- 在进入下一阶段前，必须经过对应 Review 或自检流程
- `Dev Agent` 可以指出需求或设计存在实现风险，但只能建议用户返回 `PM/UI` 阶段修正，不能越权修改

#### 前台可见方式
- 用户只看到当前阶段主 Agent 的身份与职责说明
- `Orchestrator` 不以 Agent 名称出现，只以系统动作文案呈现，例如：
  - `正在分析反馈归因`
  - `正在路由到 PM Agent`
  - `正在触发 Mockup Review`
- `Orchestrator` 可以发出系统确认消息，例如：
  - `该操作将重开 PRD，并把 UI Spec / 设计稿 / Mockup / Tech Spec 标记为 Outdated，是否确认？`
  - `系统无法高置信判断该问题属于需求还是设计，请选择处理方向`
- 当结果低置信度时：
  - Agent 在内容里明确表达不确定性
  - 系统层同时展示低置信度状态提示

---

## 📋 迭代历史（AI 理解上下文时读这里）

### v1.13 — Review 角色收口为 Mockup Review Agent（2026-03-26）
**变更内容**：移除当前阶段中的通用 `Review Agent` 定义，改为仅保留 `Mockup Review Agent` 作为专用审查角色，并明确 `PRD / UI Spec / Tech Spec` 的质量检查由各自阶段 Agent 自检完成  
**变更原因**：对照现有 `review.md` 和 `create-mockup.md` 的实际验证路径后，确认当前阶段真正需要的是 `Mockup` 一致性检查，而不是一个覆盖所有阶段的通用 `Review Agent`。继续保留泛化命名会与各阶段 Agent 自检机制重复，并混淆后续实现阶段的 Review 语义  

**本次新增要点**
- 删除当前阶段中的通用 `Review Agent` 定义
- 明确当前阶段只保留 `Mockup Review Agent`
- 明确 `PRD / UI Spec / Tech Spec` 的质量检查继续由各自阶段 Agent 自检完成
- 将架构分层、职责边界、输入输出和流程角色中的 `Review Agent` 收口为 `Mockup Review Agent`

### v1.12 — 架构图与最新 Orchestrator 规则对齐（2026-03-24）
**变更内容**：更新 `Agent 架构图` 与 `Mockup 反馈与路由架构图`，让图示与最新确认的 `Orchestrator` 最小职责、状态归属和低置信度路由规则保持一致  
**变更原因**：在补强 `Orchestrator` 的文字规则后，发现两张 Mermaid 图仍保留旧的表达方式，继续保留会让后续实现时优先相信图还是文字产生歧义  

**本次新增要点**
- 将 `Orchestrator` 在图 1 中明确为 `State & Routing Engine`
- 将 `Review Agent` 对状态的直接影响改为先回到 `Orchestrator`，由 `Orchestrator` 统一维护状态
- 将图 2 从默认 `Orchestrator -> Review Agent -> 路由` 调整为 `自动归因 -> 低置信度时系统确认 -> 再路由`
- 在图 2 中补上用户在低置信度情况下选择 `PM Agent / UI Designer Agent` 的分支

### v1.11 — Orchestrator 职责收口与 Gate 补强（2026-03-24）
**变更内容**：收敛 `Orchestrator` 在 `V1` 中的最小职责，补充全局 `Gate` 规则、低置信度路由回退逻辑，并修正 `Mockup` 页前台暴露 `Review Agent` 的问题  
**变更原因**：随着 `PM Agent` 与 `UI Designer Agent` Prompt 逐步成型，发现 `Orchestrator` 的现有描述仍略偏宽泛，且 `Mockup` 页前台身份展示与“内部 Agent 不暴露”原则存在冲突，需要在 PRD 中正式收口架构边界  

**本次新增要点**
- 明确 `Orchestrator` 在 `V1` 只承担 `阶段绑定 / 路由分发 / 状态迁移 / Gate 控制 / 任务触发` 五类最小职责
- 明确 `Orchestrator` 可发送系统确认消息，但不进行多轮人格化对话
- 明确路由策略采用 `AI 判断优先，低置信度时再由用户选择方向`
- 新增全局 `Gate 控制规则`，统一约束所有 `确认并进入下一阶段` 的最终裁决逻辑
- 修正 `Mockup` 页面中将 `Review Agent` 作为前台身份展示的不一致问题

### v1.10 — Agent 架构图补全（2026-03-24）
**变更内容**：在 `Agent System Architecture` 中新增 Mermaid 架构图，补充分层关系与 Mockup 反馈路由图  
**变更原因**：文字定义已经清楚，但缺少直观可视化表达，不利于后续 UI Spec、技术方案和执行阶段对 Agent 系统的统一理解  

**本次新增要点**
- 新增 `图 1：分层与调度架构`
- 新增 `图 2：Mockup 反馈与路由架构`
- 明确前台交互层、系统调度层、内部 Agent 层与项目资产层的关系
- 明确 Mockup 阶段反馈如何通过 `Orchestrator` 路由到 `PM Agent / UI Designer Agent / Mockup Agent`

### v1.9 — Agent 架构补强（2026-03-24）
**变更内容**：新增 Agent System Architecture，明确可见/内部 Agent 分层、职责边界、Orchestrator 权限、路由规则与质量约束  
**变更原因**：产品流程与页面已经较完整，但 Agent 系统才是核心执行能力，需要在 PRD 中单独定义架构边界与协作方式  

**本次新增要点**
- 明确 `PM / UI Designer / Dev` 为用户可见 Agent
- 明确 `Mockup / Review / Test / Orchestrator` 为系统内部 Agent
- 明确 `Mockup 工作台` 在前台，但 `Mockup Agent` 在后台执行
- 明确 `Review Agent` 只做质量守门员，尤其负责 Mockup 与设计稿一致性检查
- 明确 `Orchestrator` 只能路由、Review、状态迁移，不能直接编辑用户资产正文
- 明确 Agent 的输入上下文、输出结果与质量约束

### v1.8 — 首页主 CTA 收敛（2026-03-24）
**变更内容**：移除 `Page001 官网首页` Hero 区域中与 `申请试用` 并列的 `去登录` CTA，仅保留右上角导航中的登录入口  
**变更原因**：避免首页主视觉区域 CTA 分散注意力，进一步突出 `申请试用` 作为当前阶段的核心行动入口  

**本次新增要点**
- Hero 区仅保留一个主 CTA：`申请试用`
- 登录入口保留在页面右上角导航与页尾辅助入口中
- 首页首屏行动优先级更加聚焦

### v1.7 — 官网首页文案补全（2026-03-24）
**变更内容**：补充 `Page001 官网首页` 的完整核心文案，包括 Hero、副标题、当前阶段说明、流程说明、路线图说明、差异化与 CTA 文案  
**变更原因**：当前首页页面原型已有结构，但主要区块仍缺少可直接用于设计和实现的完整文案表达  

**本次新增要点**
- Hero 区补充完整标题、说明文案和行动解释
- Current Stage 区补充当前支持能力与即将支持能力的完整说明
- Workflow 区补充“每一步为什么存在”的说明文案
- Roadmap 区补充分阶段目标与用户收益表达
- Differentiation 区补充与普通 Demo 工具的完整对比文案
- CTA 区补充试用、登录与联系的完整引导文案

### v1.6 — 官网首页原型重构（2026-03-24）
**变更内容**：重构 `Page001 官网首页` 的页面原型，使其承载最终愿景、当前能力、工作流、路线图、差异化与 CTA 的完整信息结构  
**变更原因**：之前仅补充了定位说明，但首页页面原型本身仍偏向第一阶段说明页，无法准确承接 `Blueprint` 的长期定位  

**本次新增要点**
- 首页信息结构调整为：`Hero -> Current Stage -> Workflow -> Roadmap -> Differentiation -> CTA`
- Hero 主标题统一为 `From idea to MVP delivery.`
- 单独增加“当前支持能力”区块，明确当前支持与即将支持
- 路线图区采用“用户旅程 + 产品阶段”结合表达

### v1.5 — 产品定位与官网表达补强（2026-03-24）
**变更内容**：补充最终产品定位、V1 当前阶段定位、三阶段路线图，以及官网表达策略  
**变更原因**：确保官网既呈现 `Blueprint` 的长期愿景，又准确说明当前第一阶段可交付能力，避免用户预期错位  

**本次新增要点**
- 明确 `Blueprint` 的最终目标是完整的 AI 驱动 MVP 交付平台
- 明确 `V1` 只是第一阶段，当前聚焦结构化产品资产生成与确认
- 新增 `Phase 1 / Phase 2 / Phase 3` 路线图说明
- 新增官网表达策略：同时呈现最终愿景、当前能力和路线图

### v1.4 — Agent 驱动回退机制补强（2026-03-24）
**变更内容**：将需求变更与设计返工从“直接状态迁移”改为“先拉起对应阶段 Agent 新会话，多轮澄清后再确认执行”  
**变更原因**：使产品更符合真实共创流程，避免用户一点击入口就触发过早的阶段重开  

**本次新增要点**
- `发起需求变更` 始终拉起与 `PM Agent` 的新会话
- `返回 UI 阶段重设计` 始终拉起与 `UI Designer Agent` 的新会话
- 入口按钮保持动作型文案，但会话头部需明确当前正在讨论的 Agent 身份与意图
- 阶段重开不在入口点击瞬间发生，而是在 Agent 澄清后由用户显式确认执行
- 新增显式确认动作：`确认按此方案更新 PRD`、`确认按此方案重开 UI Spec`

### v1.3 — 导航与回退机制补强（2026-03-24）
**变更内容**：明确所有工作台统一输入框、阶段导航点击规则、会话区块与阶段导航关系，并新增 `设计返工` 机制  
**变更原因**：补齐工作台交互模型，支持用户从 Mockup 返回 UI 阶段重设计，而不误触发需求层变更  

**本次新增要点**
- 所有工作台页面明确保留 Agent 对话输入框
- 阶段导航定义为一级切换，会话区块定义为阶段内二级切换
- 增加阶段导航可点击规则、锁定规则和 `Outdated` 阶段访问规则
- 在 `Mockup / Tech Spec / 交付摘要` 增加 `返回 UI 阶段重设计` 入口
- 区分 `需求变更` 与 `设计返工` 两类回退路径

### v1.2 — 会话与变更机制补强（2026-03-24）
**变更内容**：补充首页完整表达、Onboarding 四步内容、阶段内会话历史与新建会话机制、需求变更与阶段重开机制  
**变更原因**：让产品支持真实迭代场景，避免进入下游阶段后无法安全回到上游修改需求  

**本次新增要点**
- 首页文案从骨架升级为可执行的信息表达
- Onboarding 明确为 4 步流程，并定义逐步切换与完成态
- 各工作台新增阶段内独立的会话历史区块和 `新建会话` 入口
- Agent 由阶段自动绑定，不提供 slash 命令式手动切换
- 新增 `发起需求变更` 入口、影响分析、阶段重开与下游过期标记机制
- 明确定义 `Draft / In Review / Confirmed / Reopened / Outdated / Regenerating / Reconfirmed` 等阶段状态

### v1.1 — 页面原型补强（2026-03-24）
**变更内容**：统一产品对外名称为 `Blueprint`，补充 P0 页面原型、统一工作台框架、补足官网与项目创建的验收标准  
**变更原因**：使 PRD 能直接支持后续 `UI Spec` 生成、页面设计与前端实现  

**本次新增要点**
- 产品对外名称统一改为 `Blueprint`
- 新增 `## 🖼️ 页面原型`，覆盖首页、账号、Onboarding、项目创建、各阶段工作台与交付摘要页
- 明确文档类与预览类页面共享统一工作台框架
- 首页主 CTA 明确为 `申请试用`
- Onboarding 支持首次强制展示与后续回看入口
- 项目创建页新增 `产品类型/行业`、`目标用户`、`目标平台(Web)` 字段
- 工作台顶部按钮统一采用 `确认并进入下一阶段`

### v1.0 — 初始版本（2026-03-24）
**变更内容**：完成 V1 产品定义、范围收敛、核心流程和功能边界设计  
**变更原因**：为 `57Blocks` 内部试运营与小范围客户试用建立统一的产品需求基线  

**本次确定的关键取舍**
- V1 聚焦交付结构化产品文档包，而非代码与部署
- 仅保留 `Owner` 单角色，避免早期协作复杂度
- 采用邀请制账号体系，不开放自由注册
- `PRD` 不做站内评论，采用在线编辑 + 导出 + 手动版本快照
- `UI Spec` 作为主线资产，设计稿为可视化产物
- 设计稿编辑通过 `Paper` 承接，平台负责预览与 MCP 读回
- `Mockup` 作为可交互前端原型，用于验证核心流程体验
- 每阶段都需要人工确认后才能进入下一阶段

## 🎯 目标与成功指标

### 核心问题
当前市场上的 AI 建站或 AI 原型工具能够快速生成 Demo，但往往缺少结构化产品资产，导致后续研发、交付、测试和部署难以高质量衔接。`Blueprint` 要解决的问题是：如何把一次性的 AI 聊天成果升级为可继续交付、可审阅、可迭代的完整产品文档包。

### 目标用户
- 小团队 PM
- 设计师主导或参与的创业团队
- 有明确业务方向但产品化能力不足的创业团队
- 对该模式感兴趣的 `57Blocks` 现有客户

### 成功指标
- 文档包满意度 `>= 9/10`
- Mockup 验收前平均迭代轮次 `<= 3 次`
- 首次生成后无需大改的 `UI Spec` 占比 `>= 95%`

## 📋 功能清单

### P0（必须有）
| 功能ID | 功能名称 | 功能描述 |
|--------|---------|---------|
| F001 | 品牌官网 | 展示核心 story、工作流、产品价值差异，并提供 `申请试用` 主 CTA 与 `登录 / 联系 57Blocks` 辅助入口 |
| F002 | 邀请制账号体系 | 通过邮件邀请链接完成注册、设置密码、登录与找回密码 |
| F003 | Onboarding | 向用户解释工作流、阶段输入、预期输出与预计耗时 |
| F004 | 项目创建与管理 | 创建项目并填写项目名称、描述、产品类型/行业、目标用户、目标平台(Web)，然后进入阶段化流程 |
| F005 | PM Agent 生成 PRD | 通过对话生成 PRD，并支持实时预览 |
| F006 | PRD 编辑与版本快照 | 支持 Markdown 编辑、导出、手动保存版本、填写更新说明 |
| F007 | PRD 自动 Review | 在进入下一阶段前检查 PRD 缺项并提示用户 |
| F008 | UI Designer Agent 生成 UI Spec | 基于 PRD 生成结构化 UI Spec，并允许补充设计偏好输入 |
| F009 | 设计偏好输入 | 支持参考截图、参考链接、品牌与风格偏好输入或推荐选择 |
| F010 | 设计稿生成与预览 | 基于 UI Spec 生成高保真设计稿，并在平台内提供预览 |
| F011 | Paper 集成 | 支持跳转 `Paper` 外部编辑，并通过 MCP 读回变更摘要 |
| F012 | UI Spec 同步回写 | 根据设计稿变化提示用户是否同步更新 UI Spec |
| F013 | Mockup 生成与预览 | 生成可交互 Web 原型，支持链接或内嵌预览 |
| F014 | 反馈归因与回写 | 对 Mockup 反馈执行问题归因，回写 PRD 或 UI Spec |
| F015 | Dev Agent 生成 Tech Spec | 在前述资产确认后生成结构化 Tech Spec |
| F016 | 交付摘要页 | 汇总完整文档包、阶段状态和最终输出 |
| F017 | 需求变更会话与阶段重开 | 在下游阶段发起需求变更，先新建与 `PM Agent` 的会话，澄清完成后再重开上游阶段，并将受影响下游阶段标记为过期 |
| F018 | 设计返工会话与 UI 重开 | 在不改变产品需求的前提下，从下游阶段拉起 `UI Designer Agent` 会话，澄清完成后再重开 UI Spec，并将设计稿、Mockup、Tech Spec 标记为过期 |

### P1（后续考虑）
| 功能ID | 功能名称 | 功能描述 |
|--------|---------|---------|
| F101 | 项目分享链接 | 允许通过受控链接分享项目结果 |
| F102 | 只读查看角色 | 支持站内只读查看交付结果 |
| F103 | 版本 Diff | 支持文档与设计产物的细粒度版本对比 |
| F104 | 多方案设计探索 | 支持多套设计方向并行生成与比较 |
| F105 | Mockup 历史版本回看 | 支持查看和比较历次 Mockup 输出 |
| F106 | 阶段时间线 | 记录每个阶段的状态、确认记录与关键节点 |

### P2（远期演进）
| 功能ID | 功能名称 | 功能描述 |
|--------|---------|---------|
| F201 | 代码生成闭环 | 基于文档包继续生成代码、测试与开发任务 |
| F202 | 自动化部署 | 自动部署 MVP 并交付在线访问链接 |
| F203 | 开放式 SaaS | 面向外部市场开放注册与自助付费使用 |

## 👤 用户故事

### US001: 邀请加入并开始项目
**As a** 受邀用户  
**I want** 通过邀请邮件快速完成注册并登录  
**So that** 我可以立即进入平台开始构建 MVP 文档包

### US002: 了解工作流
**As a** 产品负责人  
**I want** 在开始前看到清晰的工作流与每阶段需要准备的输入  
**So that** 我知道接下来该做什么，以及最终能获得什么

### US003: 用对话生成 PRD
**As a** 产品负责人  
**I want** 与 PM Agent 通过对话生成并编辑 PRD  
**So that** 我的产品想法可以被结构化为后续可落地的产品需求文档

### US004: 基于 PRD 生成 UI Spec
**As a** 产品负责人  
**I want** 基于已确认的 PRD 生成 UI Spec  
**So that** 后续设计稿和原型生成可以建立在更稳定的界面规范上

### US005: 调整设计结果
**As a** 产品负责人  
**I want** 预览设计稿，并在必要时通过外部设计工具进行修改  
**So that** 我可以对难以用文字表达的视觉细节做出直接调整

### US006: 验证 Mockup 体验
**As a** 产品负责人  
**I want** 预览可点击的 Mockup 并反馈问题  
**So that** 我可以验证核心流程是否符合预期用户体验

### US007: 自动归因并迭代
**As a** 产品负责人  
**I want** 让系统帮助判断问题来自 PRD 还是 UI Spec  
**So that** 我可以快速修正文档源头，并重新生成更好的结果

### US008: 输出完整文档包
**As a** 产品负责人  
**I want** 在所有阶段确认后获得一套完整文档包和交付摘要  
**So that** 我可以把这些结果交给团队或后续研发流程继续推进

### US009: 在后续阶段回到上游修改需求
**As a** 产品负责人  
**I want** 在完成 UI Spec、设计稿或 Mockup 后仍能安全地发起需求变更  
**So that** 我可以在不丢失上下文的前提下更新 PRD，并让受影响的下游结果重新生成

### US010: 从 Mockup 返回 UI 阶段重设计
**As a** 产品负责人  
**I want** 在需求不变的情况下从 Mockup 返回 UI 阶段重新设计界面  
**So that** 我可以优化交互结构和视觉方向，而不需要错误地回到 PRD 重写需求

## ✅ 关键验收标准

### F001: 品牌官网
- Given 未登录用户访问首页
- When 页面加载完成
- Then 用户应看到 `Blueprint` 的核心 story、工作流说明、与普通 Demo 工具的差异化说明，以及 `申请试用` 主 CTA

- Given 用户在首页查看导航和首屏
- When 用户选择任一入口
- Then 系统应提供 `申请试用`、`登录`、`联系 57Blocks` 三类清晰动作入口，并保证主次层级明显

### F002: 邀请制账号体系
- Given 用户收到有效邀请邮件
- When 用户点击邀请链接
- Then 用户应进入设置密码页面并完成注册

- Given 用户已完成注册
- When 用户输入正确账号密码登录
- Then 系统应允许其进入平台首页或最近项目页

- Given 用户忘记密码
- When 用户提交找回密码请求
- Then 系统应发送重置密码邮件并允许其完成密码重设

### F003: Onboarding
- Given 用户首次登录成功
- When 系统检测到用户尚未完成 Onboarding
- Then 系统应展示工作流、阶段输入要求、预期输出和预计耗时说明

- Given 用户已完成首次 Onboarding
- When 用户进入任意项目工作台
- Then 系统应提供“查看工作流说明”入口，但不应再次强制弹出完整 Onboarding

### F004: 项目创建与管理
- Given 用户进入项目创建页
- When 用户填写项目名称、项目描述、产品类型/行业、目标用户、目标平台并提交
- Then 系统应成功创建项目并进入 `PRD` 阶段工作台

- Given 用户未填写必填字段
- When 用户点击创建项目
- Then 系统应阻止提交，并在对应字段展示明确的校验提示

### F005-F007: PRD 生成与确认
- Given 用户已创建项目
- When 用户与 PM Agent 对话
- Then 系统应生成可实时预览的 Markdown PRD

- Given 用户修改了 PRD
- When 用户手动保存版本
- Then 系统应记录版本快照和更新说明

- Given 用户准备进入 UI Spec 阶段
- When 系统执行 PRD 自动 Review
- Then 系统应展示缺失项或风险项，并要求用户确认后再进入下一阶段

### F008-F012: UI Spec 与设计稿
- Given PRD 已确认
- When 用户开始 UI Spec 阶段
- Then 系统应允许用户补充设计偏好输入并生成 UI Spec

- Given UI Spec 已生成
- When 系统生成设计稿
- Then 用户应能在平台中预览设计稿，并可跳转到 Paper 编辑

- Given 用户在 Paper 中修改了设计稿
- When 系统读回设计稿变更
- Then 系统应生成变更摘要并提示用户是否同步更新 UI Spec

### F013-F014: Mockup 与问题归因
- Given 设计稿已确认
- When 系统生成 Mockup
- Then 用户应能够通过链接或内嵌预览方式体验可点击原型

- Given 用户对 Mockup 提出问题反馈
- When Agent 分析反馈内容
- Then 系统应给出问题归因建议，并要求用户确认更新 PRD 或 UI Spec 后再重新生成

### F015-F016: Tech Spec 与交付摘要
- Given `PRD / UI Spec / 设计稿 / Mockup` 均已确认
- When 用户进入 Tech Spec 阶段
- Then 系统应生成结构化 Tech Spec

- Given 全部必需阶段已确认
- When 系统生成交付摘要
- Then 用户应看到完整文档包入口、阶段状态和最终交付摘要

### F017: 需求变更与阶段重开
- Given 用户已处于 `UI Spec / 设计稿 / Mockup / Tech Spec / 交付摘要` 任一阶段
- When 用户点击 `发起需求变更`
- Then 系统应新建一条与 `PM Agent` 的会话，并将当前阶段、当前最新版本、入口意图作为上下文注入会话头部

- Given 用户已与 `PM Agent` 完成多轮对话澄清
- When Agent 输出影响分析与建议方案
- Then 系统应展示建议重开的目标阶段、受影响的下游阶段，以及明确确认动作 `确认按此方案更新 PRD`

- Given Agent 已输出建议方案
- When 用户点击 `确认按此方案更新 PRD`
- Then 系统应执行对应上游阶段重开、创建重开后的新会话，并将受影响的下游阶段标记为 `Outdated`

### F018: 设计返工与 UI 重开
- Given 用户位于 `Mockup / Tech Spec / 交付摘要` 阶段
- When 用户点击 `返回 UI 阶段重设计`
- Then 系统应新建一条与 `UI Designer Agent` 的会话，并在会话头部明确当前意图是“重新设计 UI，而非修改 PRD”

- Given 用户已与 `UI Designer Agent` 完成多轮对话澄清
- When Agent 输出返工建议与影响范围
- Then 系统应展示明确确认动作 `确认按此方案重开 UI Spec`，并说明不会修改 `PRD`

- Given Agent 已输出返工方案
- When 用户点击 `确认按此方案重开 UI Spec`
- Then 系统应执行 `UI Spec` 重开，并将 `设计稿 / Mockup / Tech Spec` 标记为 `Outdated`，随后进入新的 `UI Spec` 会话

## 🔀 核心流程图
> 每个核心流程覆盖正常路径、关键分支与异常出口

### Flow001: 邀请注册与项目启动
**涉及角色**: 用户 / 系统  
**关联功能**: F001, F002, F003, F004

```mermaid
flowchart TD
    A[用户收到邀请邮件] --> B[点击邀请链接]
    B --> C{邀请链接是否有效?}
    C -->|否| D[提示链接失效并引导重新申请]
    C -->|是| E[设置密码完成注册]
    E --> F[登录系统]
    F --> G{是否首次进入?}
    G -->|是| H[展示 Onboarding]
    G -->|否| I[进入项目列表]
    H --> J[创建项目]
    I --> J
    J --> K[填写项目名称和描述]
    K --> L[进入 PRD 阶段]
```

### Flow002: PRD 生成、编辑与确认
**涉及角色**: 用户 / PM Agent / 系统  
**关联功能**: F005, F006, F007

```mermaid
flowchart TD
    A[进入 PRD 阶段] --> B[用户与 PM Agent 对话]
    B --> C[生成 PRD Markdown 预览]
    C --> D{用户是否编辑 PRD?}
    D -->|是| E[更新 PRD 内容]
    D -->|否| F[准备提交]
    E --> G[手动保存版本并填写更新说明]
    G --> F
    F --> H[Agent 自动 Review PRD]
    H --> I{是否存在缺项或风险?}
    I -->|是| J[展示缺项并要求用户补充]
    J --> B
    I -->|否| K[用户确认 PRD]
    K --> L[进入 UI Spec 阶段]
```

### Flow003: UI Spec 与设计稿生成闭环
**涉及角色**: 用户 / UI Designer Agent / 系统 / Paper  
**关联功能**: F008, F009, F010, F011, F012

```mermaid
flowchart TD
    A[进入 UI Spec 阶段] --> B[补充设计偏好输入]
    B --> C[UI Designer Agent 生成 UI Spec]
    C --> D[系统生成设计稿]
    D --> E{用户是否满意设计稿?}
    E -->|是| F[确认设计稿]
    E -->|否| G{是否前往 Paper 修改?}
    G -->|否| H[继续与 Agent 对话调整 UI Spec]
    H --> C
    G -->|是| I[跳转 Paper 编辑]
    I --> J[系统通过 MCP 读取变更摘要]
    J --> K{是否同步回 UI Spec?}
    K -->|是| L[更新 UI Spec]
    K -->|否| M[仅更新设计稿版本]
    L --> D
    M --> D
    F --> N[进入 Mockup 阶段]
```

### Flow004: Mockup 反馈归因与再生成
**涉及角色**: 用户 / 系统 / Mockup Review Agent  
**关联功能**: F013, F014

```mermaid
flowchart TD
    A[进入 Mockup 阶段] --> B[系统生成可交互 Mockup]
    B --> C[用户预览 Mockup]
    C --> D{用户是否提出反馈?}
    D -->|否| E[确认 Mockup]
    D -->|是| F[Agent 自动分析反馈]
    F --> G{归因到 PRD 还是 UI Spec?}
    G -->|PRD| H[提示更新 PRD]
    G -->|UI Spec| I[提示更新 UI Spec]
    H --> J[用户确认后更新 PRD]
    I --> K[用户确认后更新 UI Spec]
    J --> L[重新生成设计稿与 Mockup]
    K --> L
    L --> C
    E --> M[进入 Tech Spec 阶段]
```

### Flow005: Tech Spec 与交付总结
**涉及角色**: 用户 / Dev Agent / 系统  
**关联功能**: F015, F016

```mermaid
flowchart TD
    A[进入 Tech Spec 阶段] --> B[Dev Agent 读取 PRD UI Spec 设计稿 Mockup]
    B --> C[生成 Tech Spec]
    C --> D{用户是否确认?}
    D -->|否| E[用户反馈修改意见]
    E --> B
    D -->|是| F[系统汇总交付摘要]
    F --> G[展示完整文档包]
    G --> H[项目完成]
```

### Flow006: 需求变更与阶段重开
**涉及角色**: 用户 / 当前阶段 Agent / 系统  
**关联功能**: F017

```mermaid
flowchart TD
    A[用户位于下游阶段] --> B[点击发起需求变更]
    B --> C[新建与 PM Agent 的会话]
    C --> D[用户与 PM Agent 多轮澄清]
    D --> E[Agent 输出影响分析和建议方案]
    E --> F{用户是否确认按此方案更新 PRD?}
    F -->|否| G[继续对话或取消本次变更]
    F -->|是| H[系统重开目标上游阶段]
    H --> I[受影响下游阶段标记为 Outdated]
    I --> J[创建重开后的阶段会话]
    J --> K[进入重开的阶段继续对话]
```

### Flow007: 设计返工与 UI 重开
**涉及角色**: 用户 / 当前阶段 Agent / 系统  
**关联功能**: F018

```mermaid
flowchart TD
    A[用户位于 Mockup 或更下游阶段] --> B[点击返回 UI 阶段重设计]
    B --> C[新建与 UI Designer Agent 的会话]
    C --> D[用户与 UI Designer Agent 多轮澄清]
    D --> E[Agent 输出返工方案和影响范围]
    E --> F{用户是否确认按此方案重开 UI Spec?}
    F -->|否| G[继续对话或取消本次返工]
    F -->|是| H[系统重开 UI Spec]
    H --> I[设计稿 Mockup Tech Spec 标记为 Outdated]
    I --> J[创建新的 UI Spec 会话]
    J --> K[进入 UI Spec 工作台继续对话]
```

## 🖼️ 页面原型
> 每个核心页面用三层表达：ASCII 线框图 + 组件树 + 交互状态表

### Page001: 官网首页 (`/`)

#### 线框图
```text
Screen: Marketing Home | Route: / | Layout: long-scroll marketing

┌────────────────────────────────────────────────────────────────────────────┐
│ [Blueprint]                                 登录   联系 57Blocks           │
│                                                                            │
│  From idea to MVP delivery.                                                │
│  Blueprint 是一套 AI 驱动的 MVP 结构化交付平台。                           │
│  它帮助你把模糊想法沉淀为可继续落地的产品资产，并逐步走向                  │
│  代码仓库生成、部署交付与最终验收。                                        │
│  当前第一阶段，我们先把最关键的事情做好：                                  │
│  让需求、设计、原型和技术规格形成一套可以继续交付的结构化基础。            │
│                                                                            │
│  ╔══════════════╗                                                        │
│  ║   申请试用   ║                                                        │
│  ╚══════════════╝                                                        │
│                                                                            │
│  [当前阶段能力]                                                             │
│  当前支持: PRD / UI Spec / 设计稿 / Mockup / Tech Spec                     │
│  你可以先把产品想法讲清楚、做成结构化文档，并通过设计稿与 Mockup           │
│  反复校验到足够稳定。                                                       │
│  即将支持: 代码仓库生成 / 自动部署                                          │
│  当第一阶段稳定后，Blueprint 会继续延伸到真正的代码与交付。               │
│                                                                            │
│  [完整流程]                                                                 │
│  想法澄清 -> PRD -> UI Spec -> 设计稿 -> Mockup -> Tech Spec               │
│  每一步都不是孤立输出，而是下一步的输入基础，确保产品逐步收敛。            │
│                                                                            │
│  [路线图]                                                                   │
│  Phase 1: 结构化产品资产                                                     │
│  Phase 2: 可交付代码仓库                                                     │
│  Phase 3: 自动部署、验收与仓库交付                                          │
│  这是产品的分阶段实施路径，也是用户最终会经历的完整交付旅程。              │
│                                                                            │
│  [差异化说明]                                                               │
│  普通 Demo 工具生成“看起来像产品”的结果，难以继续进入真实交付。            │
│  Blueprint 从一开始就围绕“可继续落地”来组织需求、设计、原型与技术规格。   │
│                                                                            │
│  [收尾 CTA]                                                                 │
│  当前开放第一阶段试用。                                                     │
│  如果你希望把想法更快变成一套可交付的产品资产，可以申请试用。              │
│  如果你已经收到邀请，可以直接登录开始。                                    │
│  如果你想进一步了解合作方式，可以联系 57Blocks。                          │
└────────────────────────────────────────────────────────────────────────────┘
```

#### 组件树
```text
Page: Marketing Home
  Route: /
  Layout: marketing, multi-section, max-width content

  - Header
    - Brand: "Blueprint"
    - NavLink: "登录" -> /login
    - NavLink: "联系 57Blocks" -> /contact
  - Hero
    - Eyebrow: "AI-powered MVP delivery platform"
    - Heading/h1: "From idea to MVP delivery."
    - Paragraph: "Blueprint 是一套 AI 驱动的 MVP 结构化交付平台。从模糊想法，到结构化产品资产，再到代码仓库与部署交付。"
    - SupportingText: "当前第一阶段，我们先帮助你把需求、设计、原型和技术规格沉淀为一套可以继续交付的结构化基础。"
    - Button[primary]: "申请试用"
  - CurrentStageSection
    - Heading/h2: "当前第一阶段已支持"
    - CapabilityList[current]: PRD, UI Spec, 设计稿, Mockup, Tech Spec
    - CapabilityList[next]: 代码仓库生成, 自动部署
    - Note: "你可以先把产品想法讲清楚、做成结构化文档，并通过设计稿与 Mockup 反复校验到足够稳定。"
    - SubNote: "后续阶段将在此基础上继续生成代码仓库并完成部署。"
  - WorkflowSection
    - Heading/h2: "完整流程"
    - Paragraph: "想法澄清 -> PRD -> UI Spec -> 设计稿 -> Mockup -> Tech Spec。每一步都作为下一步的输入基础，让产品逐步收敛，而不是停留在零散聊天记录中。"
    - StepList: 想法澄清, PRD, UI Spec, 设计稿, Mockup, Tech Spec
  - RoadmapSection
    - Heading/h2: "Blueprint 路线图"
    - Paragraph: "这既是 Blueprint 的产品演进路线，也是用户最终会经历的完整交付旅程。"
    - PhaseCard[Phase 1]: "生成并确认结构化产品资产"
    - PhaseCard[Phase 2]: "基于确认结果生成可交付代码仓库"
    - PhaseCard[Phase 3]: "完成自动部署、用户验收并交付仓库"
  - DifferentiationSection
    - Heading/h2: "为什么不是普通 Demo 工具"
    - CompareCard: "普通 Demo 工具生成演示结果；Blueprint 从一开始就围绕可继续交付来组织需求、设计、原型与技术规格。"
  - FooterCTA
    - Heading/h2: "开始体验 Blueprint"
    - Paragraph: "当前开放第一阶段试用。如果你希望更快把想法变成一套可交付的产品资产，现在就可以申请试用。"
    - SubParagraph: "如果你已收到邀请，请直接登录；如果你想了解合作方式，也可以联系 57Blocks。"
    - Button[primary]: "申请试用"
    - Link/Button: "去登录"
    - Link/Button: "联系 57Blocks"
```

#### 关键文案

| 区块 | 文案类型 | 建议文案 |
|------|------|---------|
| Hero | Eyebrow | `AI-powered MVP delivery platform` |
| Hero | H1 | `From idea to MVP delivery.` |
| Hero | Body | `Blueprint 是一套 AI 驱动的 MVP 结构化交付平台。从模糊想法，到结构化产品资产，再到代码仓库与部署交付。` |
| Hero | Supporting | `当前第一阶段，我们先帮助你把需求、设计、原型和技术规格沉淀为一套可以继续交付的结构化基础。` |
| Current Stage | Heading | `当前第一阶段已支持` |
| Current Stage | Body | `你可以先把产品想法讲清楚、做成结构化文档，并通过设计稿与 Mockup 反复校验到足够稳定。` |
| Current Stage | Current | `当前支持：PRD / UI Spec / 设计稿 / Mockup / Tech Spec` |
| Current Stage | Next | `即将支持：代码仓库生成 / 自动部署` |
| Workflow | Heading | `完整流程` |
| Workflow | Body | `想法澄清 -> PRD -> UI Spec -> 设计稿 -> Mockup -> Tech Spec。每一步都作为下一步的输入基础，让产品逐步收敛，而不是停留在零散聊天记录中。` |
| Roadmap | Heading | `Blueprint 路线图` |
| Roadmap | Body | `这既是 Blueprint 的产品演进路线，也是用户最终会经历的完整交付旅程。` |
| Roadmap | Phase 1 | `生成并确认结构化产品资产` |
| Roadmap | Phase 2 | `基于确认结果生成可交付代码仓库` |
| Roadmap | Phase 3 | `完成自动部署、用户验收并交付仓库` |
| Differentiation | Heading | `为什么不是普通 Demo 工具` |
| Differentiation | Body | `普通 Demo 工具生成演示结果；Blueprint 从一开始就围绕可继续交付来组织需求、设计、原型与技术规格。` |
| Footer CTA | Heading | `开始体验 Blueprint` |
| Footer CTA | Body | `当前开放第一阶段试用。如果你希望更快把想法变成一套可交付的产品资产，现在就可以申请试用。` |
| Footer CTA | Secondary | `如果你已收到邀请，请直接登录；如果你想了解合作方式，也可以联系 57Blocks。` |

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 页面加载 | 拉取基础营销内容 | 页面展示 Hero、当前阶段能力、流程、路线图、差异化与 CTA 区块 |
| 点击 `申请试用` | 打开试用申请入口 | 跳转申请试用表单或试用联系流程 |
| 点击 `联系 57Blocks` | 打开联系入口 | 展示联系表单或联系方式 |
| 向下滚动 | 浏览首页各区块 | 按顺序浏览最终愿景、当前能力、工作流、路线图和差异化说明 |
| 浏览 `当前第一阶段已支持` 区块 | 查看能力范围 | 明确当前支持与即将支持能力的边界 |
| 浏览 `Blueprint 路线图` 区块 | 查看三阶段规划 | 理解当前处于 Phase 1，后续将支持代码仓库生成与自动部署 |

### Page002: 邀请注册/设置密码页 (`/invite/accept`)

#### 线框图
```text
Screen: Invite Accept | Route: /invite/accept | Layout: centered-card

┌─────────────────────────────────────┐
│           [Blueprint]               │
│      "完成注册，开始你的项目"        │
│                                     │
│  邀请邮箱: invited@company.com      │
│  ┌───────────────────────────────┐  │
│  │ 新密码                         │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ 确认密码                       │  │
│  └───────────────────────────────┘  │
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║     完成注册并进入系统         ║  │
│  ╚═══════════════════════════════╝  │
└─────────────────────────────────────┘
```

#### 组件树
```text
Page: Invite Accept
  Route: /invite/accept
  Layout: center-card, max-w-480

  - Header
    - Brand: "Blueprint"
    - Text/h1: "完成注册，开始你的项目"
  - InviteSummary
    - ReadonlyText: invited email
  - Form
    - Input[password]: label="新密码", required
    - Input[password]: label="确认密码", required
    - Button[primary, submit]: "完成注册并进入系统"
  - ErrorBanner: hidden by default
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 页面加载 | 校验邀请 token | 有效 -> 展示表单；无效 -> 展示失效提示 |
| 点击完成注册 | 提交密码设置 | Loading -> 成功进入 `/onboarding` 或项目页 |
| 密码不一致 | 前端校验拦截 | 字段报错，禁止提交 |

### Page003: 登录页 (`/login`)

#### 线框图
```text
Screen: Login | Route: /login | Layout: centered-card

┌─────────────────────────────────────┐
│           [Blueprint]               │
│            "欢迎回来"               │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 邮箱                           │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ 密码                           │  │
│  └───────────────────────────────┘  │
│       忘记密码? →                  │
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║            登录               ║  │
│  ╚═══════════════════════════════╝  │
└─────────────────────────────────────┘
```

#### 组件树
```text
Page: Login
  Route: /login
  Layout: center-card, max-w-480

  - Header
    - Brand: "Blueprint"
    - Heading/h1: "欢迎回来"
  - Form
    - Input[email]: required
    - Input[password]: required
    - Link: "忘记密码?" -> /forgot-password
    - Button[primary, submit]: "登录"
  - ErrorBanner
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 点击登录且表单合法 | 提交登录请求 | Loading -> 成功跳转最近项目或 Onboarding |
| 点击登录且表单非法 | 前端校验 | 字段错误提示 |
| 密码错误 | 后端返回失败 | 展示 error banner |

### Page004: 忘记密码页 (`/forgot-password`)

#### 线框图
```text
Screen: Forgot Password | Route: /forgot-password | Layout: centered-card

┌─────────────────────────────────────┐
│         "重置你的密码"              │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 注册邮箱                       │  │
│  └───────────────────────────────┘  │
│                                     │
│  ╔═══════════════════════════════╗  │
│  ║        发送重置邮件           ║  │
│  ╚═══════════════════════════════╝  │
└─────────────────────────────────────┘
```

#### 组件树
```text
Page: Forgot Password
  Route: /forgot-password
  Layout: center-card, max-w-480

  - Header
    - Heading/h1: "重置你的密码"
  - Form
    - Input[email]: label="注册邮箱", required
    - Button[primary]: "发送重置邮件"
  - SuccessState
  - ErrorBanner
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 提交邮箱 | 请求发送重置邮件 | Loading -> 成功提示“请检查邮箱” |
| 邮箱格式错误 | 前端校验 | 字段报错 |
| 邮件服务失败 | 后端失败 | 展示重试提示 |

### Page005: Onboarding 页 (`/onboarding`)

#### 线框图
```text
Screen: Onboarding | Route: /onboarding | Layout: stepper-content

┌──────────────────────────────────────────────────────────────┐
│ [进度] 1/4  2/4  3/4  4/4                                   │
│                                                              │
│  [Step 1] Blueprint 是什么，能解决什么问题                  │
│  你有想法，但缺少结构化产品化过程。Blueprint 帮你把想法      │
│  变成可继续交付的产品资产，而不是只停留在聊天记录中。        │
│                                                              │
│  [底部操作]                                                  │
│  ┌──────────────┐      ╔══════════════════════════╗          │
│  │     上一步    │      ║          下一步          ║          │
│  └──────────────┘      ╚══════════════════════════╝          │
└──────────────────────────────────────────────────────────────┘
```

#### 组件树
```text
Page: Onboarding
  Route: /onboarding
  Layout: full-page, stepper

  - Header
    - Brand
    - ProgressIndicator
  - StepContent
    - Step1: "Blueprint 是什么，能解决什么问题"
    - Step2: "完整工作流与每一步产出"
    - Step3: "你需要准备哪些输入，分别在什么时候提供"
    - Step4: "协作与确认机制、修改回退、最终交付包"
  - FooterActions
    - Button[secondary]: "上一步"
    - Button[primary]: "下一步"
    - FinalButton[primary]: "开始创建项目"
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 首次登录 | 自动进入 Onboarding | 强制展示 Step 1/4 |
| 点击下一步 | 切换到下一步内容 | 更新进度到 2/4、3/4、4/4 |
| 点击上一步 | 返回上一屏 | 展示前一步内容 |
| 点击已看过的进度点 | 跳转到对应已访问步骤 | 只允许切换已浏览过的步骤 |
| 到达 Step 4 | 隐藏“下一步”并显示“开始创建项目” | 用户可完成 Onboarding |
| 点击开始创建项目 | 标记 Onboarding 完成 | 跳转 `/projects/new` |
| 后续在工作台点击“查看工作流说明” | 打开说明层 | 展示 4 步内容的回看版本 |

### Page006: 项目创建页 (`/projects/new`)

#### 线框图
```text
Screen: New Project | Route: /projects/new | Layout: centered-form

┌──────────────────────────────────────────────────────────────┐
│                  "创建一个新的 Blueprint 项目"               │
│                                                              │
│  项目名称                                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  └────────────────────────────────────────────────────────┘  │
│  项目描述                                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│  产品类型 / 行业   目标用户   目标平台(Web)                 │
│                                                              │
│  ╔════════════════════════════════════════════════════════╗  │
│  ║                创建项目并进入 PRD                     ║  │
│  ╚════════════════════════════════════════════════════════╝  │
└──────────────────────────────────────────────────────────────┘
```

#### 组件树
```text
Page: Project Create
  Route: /projects/new
  Layout: form-page, max-w-720

  - Header
    - Heading/h1: "创建一个新的 Blueprint 项目"
  - Form
    - Input[text]: label="项目名称", required
    - Textarea: label="项目描述", required
    - Select: label="产品类型 / 行业", required
    - Input[text]: label="目标用户", required
    - Select: label="目标平台", default="Web", disabled=true
    - Button[primary]: "创建项目并进入 PRD"
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 提交完整表单 | 创建项目 | 成功后进入 `/projects/:id/prd` |
| 缺失必填项 | 前端校验 | 字段级错误提示 |
| 创建失败 | 后端失败 | 顶部 banner 提示并允许重试 |

### Page007: PRD 工作台 (`/projects/:id/prd`)

#### 线框图
```text
Screen: PRD Workspace | Route: /projects/:id/prd | Layout: workspace-3pane

┌─────────────────────────────────────────────────────────────────────────────┐
│ Blueprint / 项目名 [PM Agent] [PRD 阶段] [版本 vX] [状态: Review中] [确认并进入] │
├───────────────┬───────────────────────────────┬─────────────────────────────┤
│ 阶段导航*     │ Agent 对话区                   │ PRD Markdown 预览           │
│ - PRD         │ - 消息流                       │ - 标题                      │
│ - UI Spec     │ - 动作状态                     │ - 章节目录                  │
│ - 设计稿      │ - 简要步骤日志                 │ - 正文                      │
│ - Mockup      │ - 输入框                       │ - 编辑/导出/保存版本        │
│ - Tech Spec   │                               │                             │
│ [会话区块**]  │                               │                             │
│ - PRD 初稿    │                               │                             │
│ - PRD Review  │                               │                             │
│ [新建会话]    │                               │                             │
├───────────────┴───────────────────────────────┴─────────────────────────────┤
│ 底部提示: 请先完成 Review / 请先确认当前版本                                 │
│ * 点击阶段导航切换阶段；** 会话列表始终跟随当前阶段刷新                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 组件树
```text
Page: PRD Workspace
  Route: /projects/:id/prd
  Layout: workspace-shell, 3-column

  - TopBar
    - Breadcrumb
    - AgentBadge: "PM Agent"
    - StageBadge: "PRD"
    - VersionSelect
    - StatusBadge
    - Button[primary]: "确认并进入下一阶段"
    - Button[ghost]: "发起需求变更"
  - Sidebar
    - ProjectSummary
    - StageNav[*]: clickable
    - LinkButton: "查看工作流说明"
    - SessionSection
      - SessionItem[*]: 跟随当前阶段刷新的历史会话
      - Button[secondary]: "新建会话"
  - ConversationPane
    - AgentIdentity: 当前 Agent 名称、职责、上下文版本
    - IntentBanner: default hidden; when opened from action entry, show current intent and source stage
    - AgentStatus
    - StepLog
    - MessageList
    - PromptInput
  - PreviewPane
    - Tab: "预览"
    - Tab: "编辑"
    - MarkdownDocument
    - Button: "导出 Markdown"
    - Button: "保存版本"
    - Input: "更新说明"
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 发送消息 | 触发 PM Agent 生成或修改 PRD | 对话区显示动作状态与步骤日志，右侧文档实时更新 |
| 点击阶段导航中的已完成阶段 | 进入对应阶段页面 | 左侧会话区块刷新为该阶段会话列表 |
| 点击阶段导航中的未解锁阶段 | 阻止进入编辑 | 提示“请先完成前一阶段确认” |
| 点击阶段导航中的 `Outdated` 阶段 | 进入该阶段 | 顶部提示该阶段需重新生成与确认 |
| 点击历史会话 | 切换当前阶段会话线程 | 中间对话区切换到对应历史会话，右侧仍展示最新确认版本 |
| 点击新建会话 | 基于当前阶段最新文档版本创建新线程 | 新会话建立，顶部显示上下文来源版本 |
| 点击保存版本 | 记录快照和更新说明 | 新版本生成并可切换 |
| 点击确认并进入下一阶段 | 先执行 Review | 未通过则显示“请先完成 Review”；通过后进入 `/ui-spec` |
| 点击发起需求变更 | 新建与 PM Agent 的会话 | 会话头部展示“你正在与 PM Agent 讨论需求变更”，并注入当前阶段与版本上下文 |
| 点击查看工作流说明 | 打开说明面板 | 展示简化版 Onboarding 内容 |

### Page008: UI Spec 工作台 (`/projects/:id/ui-spec`)

#### 线框图
```text
Screen: UI Spec Workspace | Route: /projects/:id/ui-spec | Layout: workspace-3pane

┌─────────────────────────────────────────────────────────────────────────────┐
│ 项目名 [UI Designer Agent] [UI Spec 阶段] [版本 vX] [状态: 生成中] [确认并进入下一阶段] │
├───────────────┬───────────────────────────────┬─────────────────────────────┤
│ 阶段导航*     │ Agent 对话区                   │ UI Spec 文档预览            │
│ [会话区块**]  │ - 当前 Agent 职责              │ - 页面结构                  │
│ - 首轮生成    │ - 风格偏好输入                 │ - 组件建议                  │
│ - 风格迭代2   │ - 参考链接/截图                │ - 状态说明                  │
│ [新建会话]    │ - 推荐选项说明                 │                             │
│               │ - 输入框                        │                             │
└───────────────┴───────────────────────────────┴─────────────────────────────┘
```

#### 组件树
```text
Page: UI Spec Workspace
  Route: /projects/:id/ui-spec
  Layout: workspace-shell, 3-column

  - TopBar
    - AgentBadge: "UI Designer Agent"
    - StageBadge: "UI Spec"
    - VersionSelect
    - StatusBadge
    - Button[primary]: "确认并进入下一阶段"
    - Button[ghost]: "发起需求变更"
  - Sidebar
    - StageNav[*]: clickable
    - LinkButton: "查看工作流说明"
    - SessionSection
      - SessionItem[*]
      - Button[secondary]: "新建会话"
  - ConversationPane
    - AgentIdentity
    - IntentBanner: default hidden; when opened from action entry, show current intent and source stage
    - AgentStatus
    - MessageList
    - PromptInput
    - Upload: "参考截图"
    - Input: "参考网站链接"
    - SelectGroup: "品牌色/字体/风格偏好"
  - PreviewPane
    - StructuredSpecPreview
    - Button: "保存版本"
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 上传截图或输入参考链接 | 提供设计上下文 | Agent 在生成时引用这些输入 |
| 选择推荐风格 | 更新偏好参数 | 下一轮 UI Spec 与设计稿生成使用该偏好 |
| 点击阶段导航中的其他阶段 | 进入对应阶段 | 会话区块切换为对应阶段会话 |
| 点击历史会话 | 切换当前阶段对话线程 | 对话区切换到对应会话，右侧继续显示最新确认版本 |
| 点击新建会话 | 基于当前 UI Spec 最新版本开启新线程 | 顶部显示上下文来源版本 |
| 点击确认并进入下一阶段 | 校验当前版本与必填输入 | 通过后进入 `/design`，否则提示缺项 |
| 点击发起需求变更 | 新建与 PM Agent 的会话 | 会话头部明确当前在讨论需求变更，待澄清后再决定是否重开 PRD |

### Page009: 设计稿预览页 (`/projects/:id/design`)

#### 线框图
```text
Screen: Design Preview | Route: /projects/:id/design | Layout: workspace-preview

┌─────────────────────────────────────────────────────────────────────────────┐
│ 项目名 [UI Designer Agent] [设计稿阶段] [版本 vX] [状态: 待确认] [确认并进入下一阶段] │
├───────────────┬───────────────────────────────┬─────────────────────────────┤
│ 阶段导航*     │ 对话/操作区                    │ 大尺寸设计稿预览            │
│ [会话区块**]  │ - 当前 Agent 职责              │ - 缩放/切换页面             │
│ - 初版设计稿  │ - 生成状态                     │ - 打开 Paper 编辑           │
│ - 视觉调整1   │ - 变更摘要                     │                             │
│ [新建会话]    │ - 是否同步回 UI Spec           │                             │
│               │ - 消息流                        │                             │
│               │ - 输入框                        │                             │
└───────────────┴───────────────────────────────┴─────────────────────────────┘
```

#### 组件树
```text
Page: Design Preview
  Route: /projects/:id/design
  Layout: workspace-shell, preview-heavy

  - TopBar
    - AgentBadge: "UI Designer Agent"
    - StageBadge: "设计稿"
    - VersionSelect
    - StatusBadge
    - Button[primary]: "确认并进入下一阶段"
    - Button[ghost]: "发起需求变更"
  - Sidebar
    - StageNav[*]: clickable
    - SessionSection
      - SessionItem[*]
      - Button[secondary]: "新建会话"
  - ControlPane
    - AgentIdentity
    - IntentBanner: default hidden; when opened from action entry, show current intent and source stage
    - AgentStatus
    - MessageList
    - PromptInput
    - ChangeSummary
    - Button[secondary]: "去 Paper 编辑"
    - ButtonGroup: "同步回 UI Spec / 暂不同步"
  - PreviewPane
    - DesignCanvasPreview
    - ZoomControl
    - PageSwitcher
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 点击去 Paper 编辑 | 跳转外部设计工具 | 打开 Paper 并标记当前版本为“外部编辑中” |
| 在输入框中发送设计反馈 | 请求 Agent 更新设计方向 | 中间消息流新增反馈记录，后续重新生成设计稿 |
| 点击阶段导航中的其他阶段 | 进入对应阶段 | 会话区块切换为该阶段会话列表 |
| 点击历史会话 | 查看该阶段历史讨论 | 对话区切换到历史会话，设计稿预览保持当前确认版本 |
| 点击新建会话 | 基于当前设计相关最新版本开启新线程 | 对话区出现新的设计讨论线程 |
| 系统读回设计稿变更 | 生成变更摘要 | 显示“请先处理设计变更”并要求选择是否回写 UI Spec |
| 点击确认并进入下一阶段 | 校验设计稿状态 | 无未处理变更时进入 `/mockup` |
| 点击发起需求变更 | 新建与 PM Agent 的会话 | 在多轮对话澄清后，由 Agent 给出是否需要重开 PRD 或 UI Spec 的建议 |

### Page010: Mockup 预览页 (`/projects/:id/mockup`)

#### 线框图
```text
Screen: Mockup Preview | Route: /projects/:id/mockup | Layout: workspace-preview

┌─────────────────────────────────────────────────────────────────────────────┐
│ 项目名 [Mockup 工作台] [Mockup 阶段] [版本 vX] [状态: 可预览] [确认并进入下一阶段] │
├───────────────┬───────────────────────────────┬─────────────────────────────┤
│ 阶段导航*     │ 反馈区                         │ 内嵌原型预览                 │
│ [会话区块**]  │ - 当前 Agent 职责              │ - Web 原型 iframe            │
│ - 首轮验收    │ - 反馈输入框                   │ - 新窗口打开                 │
│ - 反馈修正2   │ - 归因建议                     │                             │
│ [新建会话]    │ - 消息流                        │                             │
│               │ - 重新生成按钮                 │                             │
│               │ - 返回 UI 阶段重设计           │                             │
└───────────────┴───────────────────────────────┴─────────────────────────────┘
```

#### 组件树
```text
Page: Mockup Preview
  Route: /projects/:id/mockup
  Layout: workspace-shell, preview-heavy

  - TopBar
    - ContextBadge: "Mockup 工作台"
    - StageBadge: "Mockup"
    - VersionSelect
    - StatusBadge
    - Button[primary]: "确认并进入下一阶段"
    - Button[ghost]: "发起需求变更"
  - Sidebar
    - StageNav[*]: clickable
    - SessionSection
      - SessionItem[*]
      - Button[secondary]: "新建会话"
  - FeedbackPane
    - AgentIdentity
    - IntentBanner: default hidden; when opened from action entry, show current intent and source stage
    - AgentStatus
    - MessageList
    - Textarea: "反馈问题"
    - Button: "提交反馈"
    - AttributionSuggestion
    - Button: "重新生成 Mockup"
    - Button[secondary]: "返回 UI 阶段重设计"
  - PreviewPane
    - EmbeddedPrototype
    - LinkButton: "新窗口打开"
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 页面加载 | 获取最新原型链接 | 成功则显示内嵌预览，失败则展示错误态 |
| 点击阶段导航中的其他阶段 | 进入对应阶段 | 会话区块切换为对应阶段会话 |
| 点击历史会话 | 查看过往反馈轮次 | 中间反馈区切换到对应会话，右侧继续展示当前最新原型 |
| 点击新建会话 | 基于当前 Mockup 最新版本创建新线程 | 开启新一轮验收反馈 |
| 提交反馈 | `Orchestrator` 先执行自动归因 | 高置信度时显示建议更新 `PRD` 或 `UI Spec`；低置信度时提示用户选择交给 `PM Agent` 或 `UI Designer Agent` |
| 用户确认归因 | 路由到对应 Agent 或触发重生成 | 需求问题进入 `PM Agent` 会话；设计问题进入 `UI Designer Agent` 会话；仅需重生成时状态切换为“重新生成中” |
| 点击确认并进入下一阶段 | 检查是否存在待处理反馈 | 无待处理项时进入 `/tech-spec` |
| 点击发起需求变更 | 新建与 PM Agent 的会话 | 会话头部说明当前正在讨论需求变更，待确认方案后才执行阶段重开 |
| 点击返回 UI 阶段重设计 | 新建与 UI Designer Agent 的会话 | 会话头部说明当前正在讨论 UI 重设计，待确认方案后才重开 UI Spec |

### Page011: Tech Spec 工作台 (`/projects/:id/tech-spec`)

#### 线框图
```text
Screen: Tech Spec Workspace | Route: /projects/:id/tech-spec | Layout: workspace-3pane

┌─────────────────────────────────────────────────────────────────────────────┐
│ 项目名 [Dev Agent] [Tech Spec 阶段] [版本 vX] [状态: 待确认] [确认并进入下一阶段] │
├───────────────┬───────────────────────────────┬─────────────────────────────┤
│ 阶段导航*     │ Agent 对话区                   │ Tech Spec 文档预览          │
│ [会话区块**]  │ - 当前 Agent 职责              │ - 系统边界                  │
│ - 首版 Tech   │ - 生成状态                     │ - 模块/接口建议             │
│ - 结构调整    │ - 修改建议                     │ - 风险与假设                │
│ [新建会话]    │ - 工作流说明入口               │                             │
│               │ - 消息流                        │                             │
│               │ - 输入框                        │                             │
└───────────────┴───────────────────────────────┴─────────────────────────────┘
```

#### 组件树
```text
Page: Tech Spec Workspace
  Route: /projects/:id/tech-spec
  Layout: workspace-shell, 3-column

  - TopBar
    - AgentBadge: "Dev Agent"
    - StageBadge: "Tech Spec"
    - VersionSelect
    - StatusBadge
    - Button[primary]: "确认并进入下一阶段"
    - Button[ghost]: "发起需求变更"
  - Sidebar
    - StageNav[*]: clickable
    - LinkButton: "查看工作流说明"
    - SessionSection
      - SessionItem[*]
      - Button[secondary]: "新建会话"
  - ConversationPane
    - AgentIdentity
    - IntentBanner: default hidden; when opened from action entry, show current intent and source stage
    - AgentStatus
    - MessageList
    - PromptInput
  - PreviewPane
    - StructuredDocPreview
    - Button: "保存版本"
    - Button: "导出"
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 发送修改意见 | 触发 Dev Agent 更新 Tech Spec | 右侧文档同步更新 |
| 点击阶段导航中的其他阶段 | 进入对应阶段 | 会话区块刷新为该阶段会话列表 |
| 点击历史会话 | 切换阶段内历史讨论 | 中间对话区切换，右侧保留当前最新确认版本 |
| 点击新建会话 | 基于当前 Tech Spec 最新版本继续讨论 | 新线程创建成功并展示上下文来源 |
| 点击确认并进入下一阶段 | 校验上游阶段均已确认 | 通过后进入 `/delivery` |
| 上游阶段未完成 | 阻止进入 | 顶部提示未完成阶段 |
| 点击发起需求变更 | 新建与 PM Agent 的会话 | 待需求变更方案确认后，再执行 PRD 或上游阶段重开 |
| 点击返回 UI 阶段重设计 | 新建与 UI Designer Agent 的会话 | 待返工方案确认后，再执行 UI Spec 重开 |

### Page012: 交付摘要页 (`/projects/:id/delivery`)

#### 线框图
```text
Screen: Delivery Summary | Route: /projects/:id/delivery | Layout: summary-dashboard

┌──────────────────────────────────────────────────────────────────────────────┐
│ 项目名                     "一句话摘要"                    [导出全部]       │
│ 最后更新时间: 2026-03-24  当前确认版本: v1.1                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ 阶段状态: PRD ✓ | UI Spec ✓ | 设计稿 ✓ | Mockup ✓ | Tech Spec ✓            │
├──────────────────────┬───────────────────────────────────────────────────────┤
│ 资产入口             │ 交付摘要说明                                          │
│ - PRD                │ - 项目背景                                            │
│ - UI Spec            │ - 当前完成范围                                        │
│ - 设计稿             │ - 后续建议                                            │
│ - Mockup             │                                                       │
│ - Tech Spec          │                                                       │
└──────────────────────┴───────────────────────────────────────────────────────┘
```

#### 组件树
```text
Page: Delivery Summary
  Route: /projects/:id/delivery
  Layout: summary, 2-column

  - Header
    - ProjectName
    - OneLineSummary
    - MetaText: last updated, confirmed version
    - Button[primary]: "导出全部"
  - StageStatusBar
    - StatusItem[*]: PRD, UI Spec, 设计稿, Mockup, Tech Spec
  - AssetList
    - LinkCard[*]: 各阶段产物入口
  - SummaryPanel
    - OverviewText
    - ScopeText
    - NextStepText
```

#### 交互与状态

| 触发 | 行为 | 结果状态 |
|------|------|---------|
| 页面加载 | 汇总所有已确认资产 | 展示阶段状态、版本与资产入口 |
| 点击任一资产入口 | 打开对应阶段成果 | 跳转到文档或预览页 |
| 点击导出全部 | 生成导出包 | 下载或导出完整文档包 |
| 点击发起需求变更 | 新建与 PM Agent 的会话 | 用户先与 PM Agent 讨论变更方案，确认后再执行阶段重开 |
| 点击返回 UI 阶段重设计 | 新建与 UI Designer Agent 的会话 | 用户先与 UI Designer Agent 讨论返工方案，确认后再执行 UI Spec 重开 |

## ⚠️ 异常处理
> 按功能和全局两个层次定义异常场景

### F002: 邀请制账号体系 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| 邀请链接失效 | 链接已过期或已被使用 | "邀请链接已失效，请联系邀请方重新发送" | 拒绝注册，记录异常并提供重新申请入口 |
| 邮箱不匹配 | 用户尝试使用非受邀邮箱注册 | "该邮箱与邀请信息不一致" | 阻止注册并提示检查邮箱 |
| 重置邮件发送失败 | 邮件服务异常 | "密码重置邮件发送失败，请稍后再试" | 记录错误并提供重试入口 |
| 多次登录失败 | 连续输入错误密码 | "账号或密码错误，请重试" | 记录失败次数，达到阈值后临时限制尝试 |

### F005-F007: PRD 阶段 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| Agent 生成失败 | 模型服务失败或返回异常 | "PRD 生成失败，请重试" | 保留当前上下文，允许重新生成 |
| Agent 超时 | 生成超过设定时间 | "PRD 生成超时，系统正在重试或请稍后再试" | 自动重试一次，仍失败则提示人工重试 |
| 版本保存失败 | 保存快照时写入异常 | "版本保存失败，请稍后重试" | 保留编辑区内容，阻止误丢失 |
| 未通过 Review 强行下一步 | 用户尝试跳过必填校验 | "请先完成 PRD Review 中的必需项" | 阻止进入下一阶段 |

### F008-F012: UI Spec 与设计稿阶段 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| UI Spec 生成失败 | Agent 无法生成结构化结果 | "UI Spec 生成失败，请调整输入后重试" | 保留已有 PRD 和偏好输入 |
| 设计稿生成失败 | 渲染服务异常 | "设计稿生成失败，请稍后重试" | 记录任务失败并支持重新触发 |
| Paper 集成失败 | 无法打开或连接外部设计工具 | "暂时无法连接设计工具，请稍后再试" | 允许用户继续使用平台内生成流程 |
| 设计稿读回失败 | MCP 无法读取 Paper 修改结果 | "设计稿修改暂未同步，请稍后重试" | 保留上一次成功版本并标记同步失败 |
| 同步回写冲突 | UI Spec 在读回期间已被手动修改 | "检测到 UI Spec 已更新，请确认如何处理变更" | 暂停自动回写，要求用户确认 |

### F013-F014: Mockup 阶段 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| Mockup 生成失败 | 原型构建任务异常 | "Mockup 生成失败，请稍后重试" | 保留输入资产并允许重新触发 |
| Mockup 预览不可用 | 预览链接失效或加载错误 | "当前原型暂时无法预览" | 提供重新生成链接或重新打开预览 |
| 反馈归因不明确 | Agent 无法判断问题来自 PRD 或 UI Spec | "该问题暂无法自动归因，请选择更新 PRD 或 UI Spec" | 由用户手动选择归因方向 |
| 循环迭代过多 | 多轮修改仍未通过 | "建议回到上游文档重新梳理核心需求" | 标记项目风险并提示回退至上游阶段 |

### F017: 需求变更与阶段重开 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| 会话初始化失败 | 点击入口后未能成功拉起 PM Agent 会话 | "暂时无法启动需求变更会话，请稍后重试" | 保留入口上下文并允许重新拉起会话 |
| 影响分析失败 | Agent 无法判断变更影响范围 | "暂时无法完成影响分析，请补充需求说明后重试" | 保留会话上下文并允许继续澄清 |
| 重开阶段失败 | 状态迁移写入失败 | "阶段重开失败，请稍后重试" | 保留当前阶段状态，不执行半完成更新 |
| 下游过期标记失败 | 部分受影响阶段未成功更新状态 | "部分阶段状态更新失败，请检查后重试" | 记录告警并阻止继续确认流程 |
| 基于过期版本继续确认 | 用户尝试确认 `Outdated` 阶段 | "该阶段已因上游变更过期，请重新生成并确认" | 阻止确认并引导回到最新待处理阶段 |

### F018: 设计返工与 UI 重开 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| 会话初始化失败 | 点击入口后未能成功拉起 UI Designer Agent 会话 | "暂时无法启动 UI 重设计会话，请稍后重试" | 保留入口上下文并允许重新拉起会话 |
| 返工原因不明确 | 用户未说明需要重设计的界面问题 | "请补充需要重设计的页面或交互问题" | 阻止执行并保留输入内容 |
| 错误触发 PRD 级变更 | Agent 判断返工内容实际涉及需求变更 | "该修改影响产品需求，建议改走需求变更流程" | 中止设计返工并引导用户切换到需求变更 |
| UI Spec 重开失败 | 状态更新异常 | "UI 阶段重开失败，请稍后重试" | 保持当前状态不变 |
| 下游过期标记失败 | 设计稿/Mockup/Tech Spec 未成功标记 | "部分下游阶段未成功标记为过期，请检查后重试" | 阻止继续确认后续阶段 |

### F015-F016: Tech Spec 与交付总结 - 异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| 上游资产未确认 | 用户直接进入 Tech Spec | "请先确认前序阶段结果" | 阻止进入并高亮未完成阶段 |
| Tech Spec 生成失败 | Dev Agent 生成异常 | "Tech Spec 生成失败，请重试" | 保留上游资产与当前上下文 |
| 交付摘要汇总失败 | 资产索引或展示异常 | "交付摘要暂时不可用，请稍后重试" | 允许单独访问各阶段成果 |

### 全局异常处理

| 异常场景 | 触发条件 | 用户提示 | 系统行为 |
|---------|---------|---------|---------|
| 邀请链接失效 | 链接过期或已失效 | "邀请已失效，请联系邀请方" | 阻止注册，记录日志 |
| Agent 生成失败或超时 | 任一 Agent 在规定时间内未成功返回 | "当前任务处理中断，请稍后重试" | 自动重试一次，失败后保留上下文并提示 |
| Paper 集成失败 / 设计稿无法读回 | 外部设计工具调用失败 | "设计稿同步失败，请稍后重试" | 保留最近一次成功版本，允许后续继续同步 |
| Mockup 生成失败 | Mockup 服务或任务异常 | "Mockup 生成失败，请稍后重试" | 保留输入资产并支持重新生成 |
| 未确认直接进入下一阶段 | 用户跳过阶段确认 | "请先确认当前阶段结果" | 阻止跳转并定位到待确认阶段 |
| 文档版本冲突 / 回退失败 | 版本写入或恢复异常 | "版本恢复失败，请检查当前版本后重试" | 锁定风险版本，保留最新稳定版本 |

## 📊 关键事件追踪
> 定义试运营期间的事件、漏斗和监控指标

### 事件清单

| 事件名称 | 触发时机 | 事件属性 | 用途 |
|---------|---------|---------|------|
| invite_link_opened | 用户打开邀请链接 | invite_id, email_domain | 衡量邀请转化起点 |
| invite_registration_completed | 用户完成邀请注册 | invite_id, duration_ms | 评估邀请制注册体验 |
| login_success | 用户登录成功 | user_id, login_method=password | 评估登录稳定性 |
| onboarding_completed | 用户完成 Onboarding | user_id, project_type | 衡量工作流理解完成率 |
| project_created | 用户创建项目 | project_id, industry | 衡量启动项目数量 |
| prd_generation_started | 用户开始 PRD 生成 | project_id | 统计 PRD 阶段启动量 |
| prd_generation_completed | 首版 PRD 生成完成 | project_id, duration_ms | 监控生成时长与成功率 |
| prd_review_failed | PRD Review 发现缺项 | project_id, missing_count | 分析 PRD 常见缺失项 |
| prd_confirmed | 用户确认 PRD | project_id, version | 衡量 PRD 阶段完成率 |
| ui_spec_generated | UI Spec 生成完成 | project_id, duration_ms | 衡量 UI Spec 输出效率 |
| ui_spec_major_rework_flagged | UI Spec 被标记为大改 | project_id, reason | 计算无需大改占比 |
| design_preview_viewed | 用户查看设计稿 | project_id, source=platform | 衡量设计稿触达情况 |
| paper_edit_opened | 用户跳转 Paper 编辑 | project_id | 分析外部编辑使用率 |
| design_change_synced | 设计稿改动同步回 UI Spec | project_id, synced=true/false | 评估双轨单主线机制有效性 |
| mockup_generated | Mockup 生成完成 | project_id, duration_ms | 衡量原型生成效率 |
| mockup_feedback_submitted | 用户提交 Mockup 反馈 | project_id, feedback_count | 评估迭代强度 |
| mockup_confirmed | 用户确认 Mockup | project_id, iteration_count | 计算平均迭代轮次 |
| tech_spec_generated | Tech Spec 生成完成 | project_id, duration_ms | 衡量交付包完成进度 |
| session_created | 用户创建阶段内新会话 | project_id, stage, based_on_version | 衡量阶段内分支讨论使用情况 |
| session_viewed | 用户切换历史会话 | project_id, stage, session_id | 分析历史会话回看频率 |
| change_request_submitted | 用户发起需求变更 | project_id, stage, target_stage | 统计真实变更发生量 |
| change_request_clarification_started | 需求变更入口成功拉起 PM Agent 会话 | project_id, source_stage, based_on_version | 衡量需求变更会话启动成功率 |
| change_request_confirmed | 用户确认按方案更新 PRD | project_id, reopened_stage, affected_stage_count | 衡量从澄清到执行的转化率 |
| design_rework_requested | 用户发起设计返工 | project_id, stage, target_stage=ui-spec | 衡量从下游返回 UI 阶段的频率 |
| design_rework_clarification_started | 设计返工入口成功拉起 UI Designer Agent 会话 | project_id, source_stage, based_on_version | 衡量设计返工会话启动成功率 |
| design_rework_confirmed | 用户确认按方案重开 UI Spec | project_id, affected_stage_count | 统计返工执行量 |
| stage_reopened | 系统重开上游阶段 | project_id, reopened_stage, affected_stage_count | 衡量重开机制使用情况 |
| stage_marked_outdated | 下游阶段被标记过期 | project_id, stage, reason | 分析需求变化对下游资产的影响 |
| delivery_package_completed | 完整文档包完成 | project_id, total_cycle_time_ms | 统计项目完成量 |
| satisfaction_submitted | 用户提交满意度评分 | project_id, score | 衡量整体满意度 |

### 核心转化漏斗

| 漏斗名称 | 步骤 | 预期转化率 |
|---------|------|----------|
| 邀请激活漏斗 | 打开邀请链接 -> 完成注册 -> 登录成功 | >= 80% |
| PRD 完成漏斗 | 创建项目 -> 启动 PRD 生成 -> 首版 PRD 生成 -> PRD 确认 | >= 70% |
| 设计交付漏斗 | UI Spec 生成 -> 设计稿生成 -> 设计稿确认 -> Mockup 生成 -> Mockup 确认 | >= 60% |
| 完整文档包漏斗 | 项目创建 -> PRD 确认 -> UI Spec 确认 -> 设计稿确认 -> Mockup 确认 -> Tech Spec 确认 -> 交付包完成 | >= 40% |

### 关键业务监控指标

| 指标名称 | 计算方式 | 告警阈值 |
|---------|---------|---------|
| 文档包满意度 | 满意度评分平均值 | < 9.0 |
| Mockup 平均迭代轮次 | Mockup 确认前总迭代次数 / 确认项目数 | > 3 |
| UI Spec 无大改占比 | 首次生成后未标记大改项目数 / UI Spec 生成项目数 | < 95% |
| Agent 任务失败率 | 失败任务数 / 总任务数 | > 10% |
| 邀请注册链接成功率 | 完成注册用户数 / 打开邀请链接用户数 | < 80% |
| Mockup 可预览成功率 | 成功打开预览次数 / Mockup 生成次数 | < 95% |

## 🚫 明确不做（Out of Scope）
- 面向公众开放的注册和自助获客
- Google 或其他第三方快捷登录
- 站内多人协作编辑与评论
- 站内只读查看角色与外部分享链接
- 复杂版本管理与审批流
- 完整设计编辑器能力
- 自动代码生成、测试、部署与线上交付
- 计费、订阅、企业采购流程
- 移动端原生 App
- 多租户企业级权限体系

## ⚙️ 非功能性需求

### 性能
- 关键页面首屏加载时间目标 `< 3s`
- Agent 任务必须在界面中提供明确状态反馈，避免用户在等待期间失去上下文
- 文档和设计类异步任务需支持轮询或状态刷新

### 安全
- 邀请链接必须具备时效性和一次性约束能力
- 密码必须安全存储，禁止明文保存
- 仅允许受邀用户访问项目内容
- 导出功能必须受当前用户权限控制

### 可访问性
- 核心表单需支持键盘操作
- 错误提示需清晰可见，避免仅通过颜色表达
- 状态变化应有明确文本说明，例如生成中、失败、待确认

### 兼容性
- V1 优先支持桌面端现代浏览器：Chrome、Edge、Safari 最新两个主版本
- 暂不保证移动端完整体验

## 📎 附录

### 首页信息架构建议
- 品牌名称：`Blueprint`
- Hero 首屏应表达最终愿景：`从模糊想法，到结构化产品资产，再到代码仓库与部署交付`
- 核心 story：不是做 Demo，而是做能继续落地的结构化产品资产，并逐步走向完整 MVP 交付
- 当前阶段说明：当前第一阶段聚焦 `PRD -> UI Spec -> 设计稿 -> Mockup -> Tech Spec`
- 路线图区：清楚展示 `Phase 1 / Phase 2 / Phase 3`
- 产品差异化：说明与普通 Demo 工具的区别，以及 `Blueprint` 最终不是单点工具，而是一条交付链路
- CTA：主 CTA 为 `申请试用`，辅助入口为 `登录 / 联系 57Blocks`

### 角色定义
- `Owner`：项目唯一编辑者与确认者，负责创建项目、主导对话、确认每个阶段结果

### 关键术语定义
- `PRD`：结构化产品需求文档，是后续 UI、原型和技术方案的输入基础
- `UI Spec`：结构化界面规格说明，是设计稿与原型生成的主线资产
- `设计稿`：高保真视觉设计结果，偏设计工具资产
- `Mockup`：接近真实网页体验的可交互前端原型，使用 mock 数据呈现核心流程
- `Tech Spec`：基于前述文档包生成的结构化技术规格说明
- `交付摘要`：项目最终输出页，汇总各阶段结果与完成状态

### 阶段状态定义
- `Draft`：当前阶段编辑中，尚未提交 Review
- `In Review`：当前阶段已进入自动检查或人工校验流程
- `Confirmed`：当前阶段已由用户确认，可进入下一阶段
- `Reopened`：当前阶段因需求变更被重新打开，需要继续修改
- `Outdated`：该阶段结果因上游阶段变化而过期，不可继续作为最终确认版本
- `Regenerating`：系统正在基于上游更新重新生成当前阶段产物
- `Reconfirmed`：阶段在被重开后已重新确认完成

### 版本历史
- v1.10 (2026-03-24): 新增 Agent System Architecture Mermaid 架构图与 Mockup 路由图
- v1.9 (2026-03-24): 新增 Agent System Architecture，明确各 Agent 的职责边界、路由与质量约束
- v1.8 (2026-03-24): 移除首页 Hero 区并列登录 CTA，进一步突出申请试用
- v1.7 (2026-03-24): 补全 Page001 官网首页核心文案，新增首页关键文案表
- v1.5 (2026-03-24): 补充最终产品定位、V1 当前阶段定位、路线图与官网表达策略
- v1.4 (2026-03-24): 将需求变更与设计返工改为先拉起对应 Agent 新会话，多轮澄清后再确认执行阶段重开
- v1.3 (2026-03-24): 明确工作台统一输入框、阶段导航点击规则、会话与阶段关系，并新增设计返工机制
- v1.2 (2026-03-24): 补充首页完整文案、Onboarding 四步、阶段内会话机制、需求变更与阶段重开流程
- v1.1 (2026-03-24): 统一产品名为 Blueprint，补充页面原型与缺失验收标准
- v1.0 (2026-03-24): 初始版本
