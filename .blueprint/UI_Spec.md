# UI 规范: Blueprint

## 📊 元信息
**基于**: `./.blueprint/PRD_V1.md`  
**版本**: `1.3`  
**创建日期**: `2026-03-30`  
**设计系统基础**: `shadcn/ui + Tailwind CSS`  
**视觉风格参考**: `57Blocks 官网气质 + blueprint.html 已验证原型`  
**主题**: `浅色主题`  
**设计关键词**: `57Blocks-accurate`、`editorial`、`professional`、`structured delivery`、`lightweight system`

---

## 🎯 设计目标

`Blueprint` 不是普通的 AI Demo 站点，也不是传统企业后台。它需要同时成立三种感受：

1. 首页要有品牌叙事感，能承接 `From idea to MVP delivery` 的长期愿景。
2. 工作台要有严肃的产品工具感，支持高频阅读、对比、确认和追踪。
3. 整体视觉必须继承 `57Blocks` 的专业可信气质，但避免直接复制官网的营销页表达。

本规范因此采用：

- 营销页使用更强的排版对比、渐变点缀、宽松留白和少量 serif 标题
- 工作台使用更克制的系统语言，以中性浅色表面、清晰边界和高可读正文为主
- 品牌识别集中在 hero、主 CTA、进度高亮、焦点态和状态提示中，不泛滥使用渐变

---

## 🎨 设计系统

### 设计 Brief

- **颜色基底**: 以 `#ffffff / #f8f8fc` 为主的轻亮背景，搭配 `#192f3f` 深海军蓝正文
- **品牌强调**: 使用 `#EE53FF -> #31E1F8` 的 57Blocks 品牌渐变，集中在主 CTA、hero 高亮、焦点态
- **排版策略**: 营销页主标题以 `Plus Jakarta Sans + Instrument Serif` 组合建立品牌感，产品区统一回到稳健 sans
- **空间节奏**: 首页偏开阔、工作台偏紧凑但不拥堵，避免把状态区做成第二个主内容区
- **整体方向**: 向 `blueprint.html` 已验证原型对齐，形成“57Blocks 品牌营销页 + 结构化交付工作台”的双系统语言

### 色彩系统

```css
/* Base */
--bg: #ffffff;
--bg-soft: #f8f8fc;
--surface: #ffffff;
--surface-muted: #f8f8fc;
--surface-subtle: #eef2f8;

/* Text */
--text: #212529;
--text-strong: #192f3f;
--text-muted: #6c757d;
--text-subtle: #adb5bd;
--text-disabled: #cbd5e1;

/* Border */
--border: #e9edf5;
--border-strong: #e2e8f0;
--border-hover: rgba(25, 47, 63, 0.18);

/* Brand */
--primary-1: #ee53ff;
--primary-2: #31e1f8;
--primary-3: #8371f3;
--primary-solid: #8b5cf6;
--primary-soft: rgba(168, 85, 247, 0.08);
--primary-soft-2: rgba(34, 211, 238, 0.08);
--primary-gradient: linear-gradient(99.28deg, #EE53FF -14.33%, #31E1F8 117.46%);
--primary-gradient-soft: linear-gradient(90deg, #CD5CF3, #8371F3);

/* Status */
--success: #1f9d63;
--success-soft: #edf9f2;
--warning: #c88618;
--warning-soft: #fff7e8;
--error: #cc425c;
--error-soft: #fff0f3;
--info: #356ae6;
--info-soft: #eef3ff;

/* Overlay */
--overlay: rgba(16, 18, 25, 0.48);
```

### 字体系统

```css
--font-sans: "Plus Jakarta Sans", "Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-display: "Instrument Serif", Georgia, serif;
--font-mono: "JetBrains Mono", "SFMono-Regular", monospace;

/* Marketing display */
--text-display-xl: 96px;
--text-display-lg: 64px;
--text-display-md: 48px;

/* Product headings */
--text-h1: 40px;
--text-h2: 32px;
--text-h3: 24px;
--text-h4: 20px;

/* Body */
--text-body-lg: 18px;
--text-body: 16px;
--text-body-sm: 14px;
--text-caption: 12px;

/* Line height */
--leading-display: 0.98;
--leading-tight: 1.2;
--leading-snug: 1.35;
--leading-body: 1.6;
--leading-loose: 1.75;

/* Weight */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### 间距系统

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-14: 56px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-30: 120px;
```

### 圆角系统

```css
--radius-xs: 8px;
--radius-sm: 10px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-pill: 999px;
```

### 阴影系统

```css
--shadow-xs: 0 1px 2px rgba(16, 18, 25, 0.04);
--shadow-sm: 0 4px 24px rgba(0, 0, 0, 0.04);
--shadow-md: 0 8px 40px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 24px 64px rgba(168, 85, 247, 0.12);
--shadow-brand: 0 6px 24px rgba(168, 85, 247, 0.28);
```

### 栅格与容器

```css
--container-marketing: 1200px;
--container-product: 1440px;
--gutter-desktop: 32px;
--gutter-mobile: 16px;
```

### 节奏规则

- 首页 section 垂直节奏优先使用 `96px / 120px`
- 表单和工作台内部模块间距优先使用 `16px / 20px / 24px`
- 文档阅读区域段间距优先使用 `16px`
- Banner、Card Header、Toolbar 这类信息分组，内部优先使用 `12px`

### 图标规则

- 导航、状态、操作图标统一使用 `18px`
- 表单前缀、消息状态、轻操作图标使用 `16px`
- 首页流程和路线图中的强调图形可使用 `20px-24px`
- 默认图标线宽视觉接近 `1.75px`
- 禁止在同一块区域混用过多图标风格

---

## 🧭 信息架构

### 页面清单

- `Page001` 官网首页
- `Page002-Page005` 请求试用 / 邀请注册 / 登录 / 忘记密码
- `Page006` Onboarding
- `Page007` 项目创建
- `Page008` PRD 资产视图
- `Page009` UI Spec 资产视图
- `Page010` 设计稿资产视图
- `Page011` Mockup 资产视图
- `Page012` Tech Spec 资产视图
- `Page013` 交付摘要页

### 导航策略

- 官网首页采用 `中置导航 + 右侧操作区`
- 产品内采用 `统一工作台导航`
- 不引入独立多级产品导航，避免前台暴露系统内部复杂度

### 页面分组

- `营销入口层`: 首页
- `账号进入层`: Request Access、邀请注册、登录、忘记密码
- `首次引导层`: Onboarding、项目创建
- `核心工作层`: PRD / UI Spec / 设计稿 / Mockup / Tech Spec
- `交付收束层`: 交付摘要

---

## 📄 页面视觉设计

### Page001: 官网首页 `/`

#### 设计意图

建立一个与 `blueprint.html` 一致的品牌首页：第一屏先传达 `idea -> MVP -> delivery` 的长期愿景，随后用 `Phase 1` 的能力边界、工作链路和路线图解释这不是普通 AI Demo 工具。

#### 视觉层次

1. 品牌 Hero：`Idea MVP Deliver`
2. 当前阶段说明与主 CTA
3. `Current Phase / Services Offerings`
4. `How It Works` 链路解释
5. `Blueprint Roadmap`
6. `Not a demo tool. A delivery chain.`
7. 引述带与收尾 CTA

#### Header

- 采用固定顶部白色导航，不是极简双端结构，而是 `左品牌 / 中部导航 / 右操作`
- 导航高度: `68px`
- 背景: `rgba(255,255,255,0.92)`
- `backdrop-filter: blur(12px)`
- 滚动后允许增加 `0 2px 20px rgba(0,0,0,0.07)` 阴影

Header 样式:

```css
height: 68px;
display: flex;
align-items: center;
justify-content: space-between;
font-size: 14px;
color: var(--text-muted);
```

Header 内容:

- 左: `Blueprint` 品牌字标 + 渐变图标
- 中: `Capabilities`、`Roadmap`、`How It Works`、`57Blocks`
- 右: `Sign in` ghost button + `Contact Us` 渐变主按钮

#### Hero

布局:

```css
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
padding: 100px 40px 60px;
text-align: center;
position: relative;
overflow: hidden;
```

背景图形:

- 使用 `57Blocks` 风格的浅紫/浅蓝 radial glow
- 可叠加 2-3 条超淡流线 mesh path
- 装饰线透明度控制在 `0.04 - 0.10`

#### Hero 文案样式

- Eyebrow:
  - `font-size: 11px`
  - `font-weight: 700`
  - `letter-spacing: 0.08em`
  - `text-transform: uppercase`
  - 胶囊容器 + 极浅品牌色描边
  - `margin-bottom: 28px`

- H1:
  - 主体使用 `Plus Jakarta Sans`
  - `font-size: clamp(56px, 7vw, 96px)`
  - `line-height: 1.0`
  - `font-weight: 800`
  - `letter-spacing: -0.035em`
  - `color: var(--text-strong)`
  - `MVP` 使用品牌渐变文字
  - `Deliver` 使用 `Instrument Serif italic`

- 正文:
  - `font-size: 17px`
  - `line-height: 1.75`
  - `max-width: 600px`
  - `color: var(--text-muted)`
  - 关键词加粗，不再额外增加大段 supporting 文本

- 主 CTA:
  - `Request Access`
  - `height: 48px - 52px`
  - `padding: 0 32px`
  - `border-radius: 999px`
  - `background: var(--primary-gradient)`
  - `box-shadow: var(--shadow-brand)`
  - `margin-top: 36px`
- 次 CTA:
  - `Already invited? Sign in`
  - 与主按钮并列居中
  - gap `14px`

- Hero 辅助说明行:
  - `font-size: 12px`
  - `color: var(--text-subtle)`
  - 推荐文案结构: `Invite-only · No self-registration · Phase 1 open`

#### 首页 Section 风格

- 标题使用 `32px / 1.2 / 600`
- 段落使用 `16px / 28px`
- section 说明行宽不超过 `680px`
- 卡片背景优先用 `#ffffff` 与 `#f7f8fc`，避免重边框
- section 标题与正文间距: `16px`
- section 标题与内容网格间距: `32px`

#### 首页区块精细规格

#### `Current Phase / Services Offerings`

- 不使用双大卡，而是 `左说明 + 右资产列表`
- 外层 section 背景: `#f8f8fc`
- 左侧:
  - 标题 `Services Offerings — AI-Driven Delivery`
  - 一段能力边界说明
  - 底部 `Coming next` 小卡，列出 `Code repository generation` 与 `Automated deployment`
- 右侧:
  - 纵向资产表，单行高度 `62px`
  - 当前 Phase 的 `PRD / UI Spec / Design / Mockup / Tech Spec` 标记为 `Live`
  - `Code / Deploy` 以 `upcoming` 低权重显示

资产列表规则:

- 单行布局: `44px number / 120px name / 1fr desc / pill`
- 当前行左侧可使用 `3px` 渐变高亮条
- 容器圆角 `16px`
- 背景白色，边界轻，hover 仅轻微变底色

#### `完整流程`

- 不使用 6 个横向节点，而采用 `左流程链 + 右聊天示意卡`
- 左列使用纵向流程项，依次为:
  - `Idea clarification`
  - `PRD — confirm requirements baseline`
  - `UI Spec + Design — visual direction locked`
  - `Mockup — validate the experience`
  - `Tech Spec — engineering-ready handoff`
- 每个流程项:
  - 左侧序号 `12px`
  - 标题 `15px / 700`
  - 描述 `13px / 1.55`
  - 分割线为浅灰细线
- 右列使用聊天样例卡，展示:
  - `Blueprint AI`
  - 用户确认 PRD baseline
  - 系统提示 UI Spec / Design 将继承 PRD

#### `路线图`

- 使用 `3` 张 Phase Card
- 外层背景: `#f8f8fc`
- 当前 `Phase 1` 采用轻微品牌描边与更强阴影
- `Phase 2`、`Phase 3` 保持中性卡

Roadmap Card 精细规则:

- 高度: `220px`
- 内边距: `24px`
- 标题区到底部说明区采用 `space-between`
- Phase 标签:
  - `font-size: 12px`
  - `letter-spacing: 0.08em`
  - `text-transform: uppercase`
- 卡片标题: `24px / 1.2 / 600`
- 说明文字: `14px / 24px`

#### `为什么不是普通 Demo 工具`

- 使用严格的双栏对比:
  - 左: `Typical AI / prototyping tools`
  - 右: `Blueprint`
- 外层一个共享描边容器，左右背景不同
- 左列使用更灰的 bullet，右列使用渐变 bullet
- 不把右列做成重卡片，而是通过顶部 `3px` 渐变条轻量强调

对比块规则:

- 外层使用 `2 列`，gap `20px`
- 每列卡片最小高度 `220px`
- 左侧卡片背景: `#f7f8fc`
- 右侧卡片背景: `#ffffff`
- 右侧卡片增加顶部 `2px` 渐变描边
- 每条对比项采用 `标题 + 2 行解释` 结构，避免纯 bullet 堆砌

#### `Quote Band`

- 新增独立引述带，位置在差异化对比与收尾 CTA 之间
- 背景: 超浅品牌渐变
- 中心对齐
- 引述中允许 1 个 serif italic 强调词

#### `收尾 CTA`

- 不是双栏大聚焦卡，而是居中收尾 CTA section
- 标题:
  - `Start building with Blueprint`
  - `Blueprint` 可用 serif italic
- 副文:
  - 一句话收束产品承诺
- 按钮组:
  - `Request Access`
  - `Already invited? Sign in`
  - `Contact 57Blocks`

#### Footer

- 高度建议 `96px - 120px`
- 左: 品牌与副说明
- 右: `Product / Roadmap / Contact / 57blocks.com`

#### Mobile 适配

- 顶部导航收束，中部菜单可折叠或简化
- Hero 标题允许降到 `48px`
- `Current Phase` 从左右结构改为上下堆叠
- `How It Works` 保持纵向链路，不做横向节点
- Roadmap 三卡改单列
- 收尾 CTA 按钮纵向排列

---

### Page002-Page005: 认证与访问页组

#### 共享设计意图

认证相关页面不再是“居中单卡”，而是与 `blueprint.html` 一致的 `左表单 / 右品牌辅助面板`。这样既保留品牌连续性，又让用户在登录或受邀注册时继续理解 Blueprint 的交付包概念。

#### 共享布局

```css
min-height: 100vh;
display: grid;
grid-template-columns: 1fr 1fr;
background: #ffffff;
```

- 左侧表单区:
  - 白底
  - 左右 padding `56px`
  - 内容最大宽度 `400px`
- 右侧辅助视觉区:
  - 渐变背景 `#f0e8ff -> #e8f0ff -> #e0f8ff`
  - 中央放置半透明玻璃卡
  - 用于展示 `Your delivery package / What you’ll get`

#### 文案层级

- 标题: `28px / 800`
- 说明: `14px / 24px`
- 标签: `12px / 600`
- 输入框高度: `46px - 48px`

#### 页面差异

- `Request Access`:
  - 作为第一入口页
  - 重点说明 invite-only 流程
  - 成功后切换成 success state，不直接进入产品
- `邀请注册 / 设置密码`:
  - 顶部显示只读 invite email chip
  - 允许展示 password strength
- `登录`:
  - 维持最轻表单
  - 提供 `Forgot password?`
- `忘记密码`:
  - 成功后切换成单独的成功提示状态

#### Mobile 适配

- 改为单列
- 隐藏右侧辅助视觉区
- 左侧表单 padding 降为 `24px`

---

### Page006: Onboarding `/onboarding`

#### 设计意图

让用户在首次进入时迅速建立“这个系统如何工作”的认知，而不是陷入教程感过强的冗长导览。

#### 布局

- 与 `blueprint.html` 对齐为 `左侧 step sidebar + 右侧内容区`
- 左侧栏宽度: `300px`
- 右侧内容区为主阅读面板
- 整体不是教程弹窗，而是完整页面

#### 视觉策略

- 左栏承担“进度与认知地图”
- 右栏承担“单步详细说明”
- 底部操作区内聚于右栏底部，不再是全宽固定底栏

#### Sidebar

- 背景使用浅紫到浅蓝渐变
- 顶部显示品牌
- 下方 `4` 个 step item
- 当前步骤:
  - 浅品牌底
  - 数字圆点渐变填充
- 已完成步骤:
  - 使用 success 浅绿底

#### 主内容区

- 顶部:
  - `Step 01 — Overview`
  - 标题 `32px`
  - 可在标题内使用 `Instrument Serif italic` 强调词
- 正文:
  - `15px / 1.8`
  - 最大宽度 `560px`
- 列表:
  - 显示结构化交付包将包含哪些产物
- 底部:
  - 左侧 segmented progress
  - 右侧 `Back / Next`

#### 关键文案基线

- Step 1 标题建议沿用:
  - `What is Blueprint, and what does it solve?`
- 正文必须明确:
  - 这是一个 `connected and versioned` 的交付链
  - 最终产出不是 demo，而是 delivery package

---

### Page007: 项目创建页 `/projects/new`

#### 设计意图

在“开始真正共创项目”前给用户一个明确、正式的起点，强调结构化输入的重要性。

#### 布局

- 顶部为轻量 `TopBar + Breadcrumb`
- 主内容区水平居中
- 表单包裹宽度改为 `640px`
- 页面背景: `#f8f8fc`

#### 视觉

- 不额外插入独立说明卡，标题下方直接给一句初始化提示
- 表单承载于单张白卡:
  - `padding: 32px`
  - `border-radius: 18px`
  - `background: #ffffff`
  - `border: 1px solid #e9edf5`

#### 字段规则

- `Project description` 使用 textarea
- `Industry / Type`、`Target users`、`Target platform` 在 Desktop 使用 `3 列`
- `Target platform` 仍为禁用但可见的只读选择框
- 底部主按钮全宽铺满卡片，符合原型中的正式启动感

#### 页面文案基线

- 标题: `Create a new Blueprint project`
- 说明: `Fill in the basics — Blueprint will initialize your full delivery package automatically`
- 底部 footnote:
  - 明确会初始化 `PRD · UI Spec · Design · Mockup · Tech Spec · Delivery Summary`

---

### Page008-Page012: 统一工作台框架

#### 总体设计意图

工作台必须同时支持：

- 连续对话
- 多资产切换
- 右侧实时预览
- 版本/状态/确认摘要展示

因此工作台采用固定三栏框架，但通过不同资产焦点改变右侧预览类型和中间输入控件。

#### 统一 Desktop 布局

```css
height: 100vh;
display: grid;
grid-template-columns: 272px minmax(420px, 1fr) minmax(420px, 560px);
background: var(--bg-soft);
```

- TopBar 高度: `72px`
- Sidebar 内边距: `20px`
- Conversation Pane 内边距: `24px`
- Preview Pane 内边距: `24px`
- 列间分隔线: `1px solid var(--border)`
- TopBar 下方内容区高度: `calc(100vh - 72px)`
- Sidebar 最小宽度不小于 `256px`
- 中间对话列推荐舒适阅读宽度 `720px-840px`

#### 工作台视觉原则

- 不追求“满屏卡片化”，优先通过留白和细边界建立层级
- 同一垂直方向内必须有清晰 lane:
  - 顶部状态
  - 中部消息
  - 底部输入
- 所有历史项、资产目录项、版本项的左图标位宽保持一致，避免视觉抖动

#### TopBar

- 左侧: 项目名 / Breadcrumb
- 中间: `6` 个交付节点
- 右侧: 当前聚焦标签、版本选择、次要操作

TopBar 样式:

```css
height: 72px;
background: rgba(255,255,255,0.82);
backdrop-filter: blur(18px);
border-bottom: 1px solid var(--border);
padding: 0 24px;
```

TopBar 细化:

- 左侧 breadcrumb 与项目名间距: `10px`
- 中部交付节点区最大宽度: `720px`
- 右侧操作区 gap: `12px`
- 右侧版本选择器宽度: `132px`

#### 交付节点

- 节点高度: `32px`
- 默认背景: `transparent`
- 当前聚焦:
  - `background: var(--primary-soft)`
  - `color: var(--primary-solid)`
- 已确认:
  - 左侧细圆点 `success`
- 待同步:
  - 使用 `warning` 描边

交付节点精细规则:

- 单节点高度 `32px`
- 水平内边距 `12px`
- 标签字号 `13px`
- 状态点直径 `8px`
- 当前节点字重 `600`
- 节点之间 gap `8px`
- 超出宽度时允许横向滚动，不换行

#### Sidebar

- 背景: `#fbfcff`
- 项目包目录与聊天历史之间保留 `24px`
- 当前资产项:
  - `background: #ffffff`
  - `border: 1px solid var(--border-strong)`
  - `box-shadow: var(--shadow-xs)`

Sidebar 精细规则:

- 顶部项目概览卡 padding `14px`
- 目录分组标题字号 `12px`, uppercase
- 目录项高度 `40px`
- 聊天历史项高度 `44px`
- 聊天历史项支持两行:
  - 第一行会话名 `13px / 500`
  - 第二行资产焦点 `12px / muted`

#### Conversation Pane

- 主背景: `var(--surface)`
- Message List 使用 `12px` 间距
- 输入区固定在底部
- 顶部必须保留一个 `紧凑状态 lane`
- 状态 lane 内部承载:
  - `Focus summary`
  - `AgentStatus`
  - `Impact` 提示位
  - `Step / progress` 辅助信息

Conversation Pane 精细规则:

- 顶部状态区推荐总高度: `96px - 132px`
- 不允许把 `FocusBanner / ImpactBanner / AgentStatus / StepLog` 机械展开成 3-4 张等权重大卡
- 默认形态应为:
  - 1 条主状态容器
  - 1 行辅助 pills / meta row
- `ImpactBanner` 只在当前操作确实影响下游资产时出现
- `StepLog` 默认使用紧凑 activity strip，控制在 `2-3` 条
- Message List 外层最大宽度: `760px`
- 用户消息与 AI 消息宽度不超过 `92%`
- Message Bubble padding: `14px 16px`
- 时间戳和次要元信息采用 `12px`
- 输入区上边框: `1px solid var(--border)`
- 输入区内边距: `16px 24px 20px`

#### Preview Pane

- 背景: `#ffffff`
- 根据资产不同呈现 Markdown、结构化 spec、设计稿预览、原型预览或摘要面板
- 顶部保留真正可操作的轻量工具栏，而不是纯说明文字

Preview Pane 精细规则:

- 工具栏高度: `48px`
- 工具栏与内容区间距: `16px`
- 大预览模式下允许内容区使用 `height: calc(100vh - 72px - 48px - 48px)`
- 所有预览滚动条区域需保留 `12px` 侧边安全留白

---

### Page008: PRD 资产视图

- 右侧预览以 `Markdown 文档阅读体验` 为主
- 行宽控制在 `760px`
- 文档目录和正文之间保留 `24px`
- `SelfCheckSummaryCard` 放在右侧预览区底部，作为收尾摘要卡，而非抢占顶部阅读入口

精细规则:

- 右侧采用 `目录 + 文档` 的双层结构
- 目录宽度 `180px`
- 正文标题 `32px`
- 二级标题 `22px`
- 段落 `15px / 27px`
- 顶部工具栏建议包含:
  - `Outline`
  - `Save version`
  - `Export .md`
- 左侧栏在 `Package` 与 `Chat History` 之间加入 `Workflow guide` 入口
- 中栏顶部状态区默认保持紧凑，不得高于对话区首屏高度的 `20%`

### Page009: UI Spec 资产视图

- 中栏输入区比其他文档页更丰富，需容纳:
  - 图片上传
  - 链接输入
  - 风格选择 chip
- 右侧预览更像结构化 spec 面板，而非纯 Markdown 长文

精细规则:

- 中栏输入组件顺序:
  - `参考截图上传`
  - `参考链接输入`
  - `品牌色 / 字体 / 风格偏好 chip`
  - `PromptInput`
- 右侧预览采用 section cards，单卡最小高度 `120px`
- 页面与组件规范的标题层级必须固定，方便后续 agent 消费

### Page010: 设计稿资产视图

- 右侧预览占视觉主导，建议预览区最小宽度 `560px`
- 中栏使用 `控制台式操作区`
- `同步回 UI Spec / 暂不同步` 为紧邻变更摘要的双按钮组

精细规则:

- 右侧画布预览容器背景 `#f3f5fb`
- 画布容器圆角 `20px`
- Page Switcher 位于画布上方右侧
- 变更摘要卡:
  - `padding: 16px`
  - `border-radius: 16px`
  - `background: #fffaf1`
  - `border: 1px solid rgba(200, 134, 24, 0.22)`

### Page011: Mockup 资产视图

- 右侧内嵌原型容器:
  - `background: #f7f8fc`
  - `border-radius: 18px`
  - `overflow: hidden`
- `ReviewSummaryCard` 固定在预览区下方
- 中栏反馈输入使用 `textarea`，最小高度 `120px`

精细规则:

- 原型 iframe 容器最小高度 `560px`
- 上方工具条需包含:
  - `新窗口打开`
  - `重新生成 Mockup`
  - `当前版本`
- `AttributionSuggestion` 使用浅黄色提示卡
- `ReviewSummaryCard` 分为:
  - 一致性结论
  - 风险项
  - 建议动作

### Page012: Tech Spec 资产视图

- 右侧维持高可读文档模式
- 模块/接口/风险信息使用分节卡片，而不是纯长文

精细规则:

- 右侧主文档分为:
  - 系统边界
  - 模块与职责
  - 数据与接口
  - 风险与假设
- 各分节卡片之间间距 `16px`
- 风险区默认使用 `info-soft` 或 `warning-soft` 背景，而非红色告警感

---

### Page013: 交付摘要页 `/projects/:id/delivery`

#### 设计意图

这是“项目包完成态”的收束页，情绪应当比工作台更稳定、总结感更强。

#### 布局

```css
display: grid;
grid-template-columns: 280px 1fr;
gap: 24px;
padding: 24px 32px 32px;
```

- 顶部摘要区高度: `116px`
- 交付节点与元信息集中在头部
- 主内容区右侧使用纵向摘要块:
  - 项目背景
  - 当前完成范围
  - 后续建议

#### 视觉

- 相比工作台减少操作感，强化“归档 / 汇总”气质
- `导出全部` 使用主按钮
- 资产入口卡使用浅表面卡片，允许快速跳转

#### 精细规则

- 头部摘要区采用 `2 行`
  - 第一行: 项目名、导出按钮
  - 第二行: 最后更新时间、确认版本、交付节点
- 左侧目录卡 padding `16px`
- 右侧 SummaryPanel 分成 `3` 个区块卡
- 每个区块卡最小高度 `140px`

---

## 🖼️ 高保真原型产出规格

### 原型目标

本节用于直接指导 `Paper` 中的高保真原型绘制。目标不是只做“漂亮页面”，而是产出一套能被后续 `Mockup Agent` 和人类评审共同消费的视觉基线。

高保真原型必须满足：

- 首页能完整表达 `Blueprint` 的品牌故事与 Phase 1 能力边界
- 工作台能体现真实产品感，而不是静态 marketing mock
- 关键页面之间保持统一的版式体系、组件语言与状态表达
- 页面内出现的文案层级、状态条、输入区、版本区都已可映射到真实产品

### 画板与出图范围

#### 必做 Desktop 画板

- `Artboard 01` 官网首页: `1440 x 4200`
- `Artboard 02` 邀请注册: `1440 x 1200`
- `Artboard 03` 登录: `1440 x 1200`
- `Artboard 04` Onboarding Step 1: `1440 x 1200`
- `Artboard 05` 项目创建: `1440 x 1400`
- `Artboard 06` PRD 工作台: `1440 x 1024`
- `Artboard 07` UI Spec 工作台: `1440 x 1024`
- `Artboard 08` 设计稿工作台: `1440 x 1024`
- `Artboard 09` Mockup 工作台: `1440 x 1024`
- `Artboard 10` Tech Spec 工作台: `1440 x 1024`
- `Artboard 11` 交付摘要页: `1440 x 1200`

#### 推荐补充 Mobile 画板

- `M01` 官网首页 Mobile: `390 x 3200`
- `M02` 登录 Mobile: `390 x 844`
- `M03` 工作台 Mobile 切换态: `390 x 844`

### 原型优先级

#### P0 必须高保真完成

- 官网首页
- 登录 / 邀请注册
- Onboarding 至少 1 个完整步骤
- 项目创建页
- `PRD / UI Spec / 设计稿 / Mockup / Tech Spec` 五个工作台焦点态
- 交付摘要页

#### P1 建议补画的状态

- `UI Spec` 中上传参考图后的输入态
- `设计稿` 中外部修改读回后的变更摘要态
- `Mockup` 中提交反馈后的归因建议态
- `PRD` 中影响分析横幅展开态

---

### 视觉资产与素材约束

#### 图像策略

- 不使用传统 SaaS 的大面积 dashboard stock image
- 首页只允许使用 `抽象品牌流线 / 轻量结构图 / 文字排版` 作为主视觉
- 工作台内预览区域可以使用真实文档、真实设计稿容器、原型 iframe 容器的模拟内容
- 如果需要人物或团队视觉，只允许出现在 57Blocks 联系或背书语境中，且面积不应超过首页首屏的 `18%`

#### 图标策略

- 全项目只使用一套线性图标
- 推荐风格: 简洁、几何、带轻微圆角端点
- 首页流程节点图标需比工作台图标更轻巧
- 工作台状态图标不得使用插画式彩色图标

#### 品牌图形策略

- 允许在首页 hero 和收尾 CTA 中使用 `流线 mesh / 渐变薄雾 / 轻微方向箭头`
- 禁止在工作台内重复使用大面积渐变波纹背景
- 产品内部品牌识别主要来自:
  - TopBar 当前焦点
  - Delivery Progress 当前节点
  - Primary CTA
  - Focus / Success / Warning 状态

---

### 内容真实度要求

#### 首页内容

- 必须使用真实产品语义文案，不使用 lorem ipsum
- Hero 副文案必须明确:
  - `从 idea 到 structured assets`
  - `当前聚焦 Phase 1`
  - `后续会延伸到 code repository 和 deployment`

#### 工作台内容

- 必须模拟真实对话内容，不可只放空白气泡
- 至少展示:
  - 1 条用户输入
  - 2 条 AI 回复
  - 1 个状态区块
  - 1 个自检或影响分析卡

#### 预览区内容

- `PRD` 预览应展示真实章节结构
- `UI Spec` 预览应展示真实 token 与页面章节
- `设计稿` 预览应模拟 1 张完整页面设计稿
- `Mockup` 预览应展示带浏览器边框的原型容器
- `Tech Spec` 预览应展示模块与接口结构
- `交付摘要` 必须展示真实交付项概览

---

### Page001 高保真模块规格

#### 模块顺序

1. Header
2. Hero
3. 当前第一阶段已支持
4. 完整流程
5. 路线图
6. 差异化对比
7. 收尾 CTA
8. Footer

#### 首屏构图要求

- 首屏必须在 `1440 x 900` 视窗内完整看到:
  - Header
  - Hero 标题
  - 副文案
  - 主 CTA
- 首屏不应在第一屏塞入过多卡片内容
- H1 建议控制在 `2` 行内，最多 `3` 行

#### Hero 排版规则

- H1 顶部到视窗顶部的视觉距离约 `160px-190px`
- H1 与正文的距离 `28px`
- 正文与 supporting 的距离 `16px`
- supporting 与 CTA 的距离 `36px`
- CTA 与辅助说明行的距离 `18px`

#### 首页模块高度建议

- Header: `76px`
- Hero: `700px-780px`
- 当前能力模块: `360px-420px`
- 完整流程模块: `300px-360px`
- 路线图模块: `340px-380px`
- 差异化模块: `320px-360px`
- 收尾 CTA 模块: `260px-320px`

#### Footer

- Footer 高度建议: `120px-160px`
- 内容仅保留:
  - `57Blocks 联系入口`
  - `登录`
  - `Privacy / Terms`
- 不建议复制 57Blocks 官网那种完整超长 footer

---

### Page006 / Page007 高保真模块规格

#### Onboarding

- 只需先出 `Step 1` 完整高保真画板
- 画面必须同时体现:
  - 顶部进度
  - 单步大标题
  - 简洁说明
  - `What you will get` 列表
  - 底部操作栏

建议文案模块:

- Step label: `Step 1 of 4`
- 标题: `Blueprint 是什么，能解决什么问题`
- 正文: `你有想法，但缺少结构化产品化过程。Blueprint 帮你把想法变成可继续交付的产品资产，而不是只停留在聊天记录中。`
- Benefit rows:
  - `从模糊想法整理为结构化 PRD`
  - `把设计规则、设计稿与 Mockup 串成一条链`
  - `最终形成一套可继续研发的项目交付包`

#### 项目创建

- 页面上方必须有一段强提醒:
  - `创建项目后，系统会初始化完整的交付包骨架`
- 表单内至少展示以下真实字段值示例:
  - 项目名称: `Blueprint V1`
  - 产品类型 / 行业: `Agentic SaaS / Product Delivery`
  - 目标用户: `小团队 PM、设计师、创业团队`
  - 目标平台: `Web`

---

### 工作台高保真装配规格

#### 全部工作台共用装配顺序

1. TopBar
2. Sidebar
3. 中栏顶部状态区
4. 中栏消息流
5. 中栏输入区
6. 右栏工具栏
7. 右栏主预览
8. 右栏辅助摘要卡

#### TopBar 必须出现的元素

- Breadcrumb: `Blueprint / 项目名`
- `6` 个交付节点
- 当前焦点 badge
- 版本选择器

#### Sidebar 必须出现的元素

- 项目概览卡
- 项目包目录
- `查看工作流说明`
- 聊天历史
- `新建聊天`

#### 中栏状态区必须出现的元素

- FocusBanner
- AgentStatus
- StepLog
- 如页面允许，展示 `ImpactBanner` 或 `ChangeSummary`

#### 输入区规则

- 不允许只放一个空输入框
- 必须有完整 composer:
  - 输入区域
  - 至少一个辅助操作
  - 发送按钮
- `UI Spec` 页需多出上传 / 链接 / 偏好 chips
- `Mockup` 页需使用更高的 feedback textarea

---

### 五个工作台页面的真实示例内容

#### PRD 工作台

- FocusBanner: `当前正在完善 PRD`
- AI 消息建议内容:
  - `我已经根据你的项目描述初始化了 PRD 骨架。下一步建议先补齐产品目标、目标用户和 P0 功能范围。`
- Self Check Summary:
  - `已包含产品定位`
  - `已包含核心流程`
  - `待补充验收标准`
  - `待确认当前需求基线`

#### UI Spec 工作台

- FocusBanner: `当前正在完善 UI Spec`
- 参考链接输入示例: `https://57blocks.com/`
- 偏好 chips 示例:
  - `Light`
  - `Editorial`
  - `Structured`
  - `57Blocks-inspired`

#### 设计稿工作台

- ChangeSummary 示例:
  - `首页 Hero 标题行宽缩短`
  - `当前阶段能力区块从 3 列改为 2 列`
  - `建议同步回 UI Spec`

#### Mockup 工作台

- AttributionSuggestion 示例:
  - `这条反馈更像是 UI Spec 范围问题，可能需要先更新当前工作台的信息层级定义。`
- ReviewSummary:
  - `结论: pass_with_risks`
  - `风险: Mockup 页反馈区层级偏弱`
  - `建议: 强化归因建议卡和状态提示`

#### Tech Spec 工作台

- 右侧章节示例:
  - `系统边界`
  - `核心模块`
  - `接口契约`
  - `风险与假设`

---

### 高保真状态页要求

在 Paper 中，除默认态外，至少补 3 个关键状态画板或局部变体：

1. `PRD / UI Spec` 的影响分析横幅展开态
2. `设计稿` 的变更摘要读回态
3. `Mockup` 的反馈归因建议态

这些状态不可只通过文字说明，需要真实画出对应卡片、按钮和层级变化。

---

### Paper 落图约束

#### 命名规范

- Artboard 命名:
  - `01_Home_Desktop`
  - `02_Invite_Desktop`
  - `06_PRD_Workspace`
  - `09_Mockup_Workspace`
- Section 命名:
  - `Hero`
  - `CurrentCapabilities`
  - `Workflow`
  - `ConversationPane`
  - `PreviewPane`

#### 组件复用规范

- 以下组件在 Paper 中应做成可复用组件:
  - Button
  - Input
  - Badge
  - Delivery Progress
  - Navigation Item
  - Chat Composer
  - Status Banner
  - Self Check Summary Card

#### 变体要求

- Button:
  - `Primary / Secondary / Ghost`
  - `Default / Hover / Disabled`
- Status Banner:
  - `Focus / Impact / Success / Error`
- Delivery Progress:
  - `Default / Current / Confirmed / PendingSync`

#### 绘制顺序建议

1. 先搭建设计 token 和基础组件
2. 先完成 `Home` 与 `PRD Workspace`
3. 复制工作台框架生成其余焦点页
4. 最后补状态页和移动端

---

### 评审标准

连接 `Paper MCP` 进行绘制后，高保真原型至少要通过以下检查：

- 首页是否在第一屏同时成立“品牌感”和“产品边界清晰”
- 工作台是否看起来像真实可用产品，而不是拼装线框图
- 所有资产页切换后，是否明显属于同一套框架
- 交付节点、状态横幅、输入区、右侧预览是否形成稳定的视觉语言
- 是否存在营销页和产品页风格断裂
- 是否能让后续 Mockup 生成时减少主观猜测

---

## 🧩 组件视觉规范

### Button

#### Primary

```css
height: 44px;
padding: 0 18px;
border-radius: 999px;
border: none;
background: var(--primary-gradient);
color: #ffffff;
font-size: 14px;
font-weight: 600;
box-shadow: var(--shadow-brand);
transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
```

- Hover: `transform: translateY(-1px)`
- Active: `transform: translateY(0)`
- Focus: `outline: 3px solid rgba(88,184,255,0.24)`
- Disabled: `opacity: 0.45`

#### Secondary

```css
height: 44px;
padding: 0 18px;
border-radius: 999px;
border: 1px solid var(--border);
background: #ffffff;
color: var(--text);
```

- Hover: `border-color: var(--border-hover); background: var(--bg-soft)`

#### Ghost

```css
height: 40px;
padding: 0 14px;
border-radius: 12px;
background: transparent;
border: none;
color: var(--text-muted);
```

尺寸规范:

- `sm`: `36px`
- `md`: `44px`
- `lg`: `52px`

禁用所有按钮使用纯灰底大面积覆盖，优先使用透明度和边框减弱。

### Delivery Progress

```css
height: 32px;
display: inline-flex;
align-items: center;
gap: 8px;
```

- 节点胶囊半径: `999px`
- 节点 padding: `0 12px`
- 默认文字: `13px / 500`
- 已确认带 `8px` 绿色圆点
- 当前节点底色 `var(--primary-soft)`
- `待同步` 节点边框颜色 `rgba(200, 134, 24, 0.42)`

### Focus Badge

- 高度: `28px`
- padding: `0 10px`
- 圆角: `999px`
- 背景: `#f3f5fb`
- 当前焦点文本颜色: `var(--text-muted)`

### Version Select

- 宽度: `132px`
- 高度: `36px`
- 背景: `#ffffff`
- 边框: `1px solid var(--border)`
- 圆角: `12px`

### Chat Composer

- 外层背景: `#ffffff`
- 外层边框: `1px solid var(--border)`
- 圆角: `18px`
- PromptInput 最小高度:
  - 文档类 `88px`
  - 反馈类 `120px`
- 底部工具栏高度: `36px`
- 工具栏左右布局:
  - 左: 上传、链接、附件等扩展动作
  - 右: 发送按钮
- `PRD` 页默认使用简化模式:
  - 仅保留当前资产、快捷键提示、输入框、发送按钮
- `UI Spec` 页使用增强模式:
  - 上传参考图
  - 参考链接
  - 风格偏好 chips
  - PromptInput

### Step Log

- 单行高度: `28px`
- 前置状态点宽度固定 `16px`
- 文本字号 `12px`
- 运行中状态使用 `info`
- 完成状态使用 `success`
- 在工作台默认态中，`StepLog` 不是独立大卡，而是嵌入顶部状态 lane 的紧凑日志条

### Self Check Summary Card

- 背景: `#f7f9fe`
- 边框: `1px solid var(--border)`
- 圆角: `18px`
- padding: `16px`
- 结构:
  - 标题
  - 2-4 条检查项
  - 底部确认摘要或待补充项

### Input / Textarea / Select

```css
height: 48px;
padding: 0 14px;
border-radius: 14px;
background: #ffffff;
border: 1px solid var(--border);
color: var(--text);
font-size: 14px;
transition: border 150ms ease, box-shadow 150ms ease;
```

- Focus:
  - `border-color: rgba(109,103,255,0.45)`
  - `box-shadow: 0 0 0 4px rgba(109,103,255,0.10)`
- Error:
  - `border-color: rgba(204,66,92,0.42)`
  - `background: var(--error-soft)`

Textarea:

- 最小高度: `120px`
- padding-top/bottom: `14px`

Label / Helper / Error:

- Label: `13px / 500`
- Label 与输入框间距: `8px`
- Helper: `12px / 20px`
- Error: `12px / 20px`

### Card

```css
background: #ffffff;
border: 1px solid var(--border);
border-radius: 18px;
box-shadow: var(--shadow-xs);
```

Card 内部推荐结构:

- Header 区: `padding-bottom: 12px`
- Content 区: `padding-top: 0`
- Footer 区: `padding-top: 16px`

### Badge

```css
height: 28px;
padding: 0 10px;
border-radius: 999px;
font-size: 12px;
font-weight: 600;
```

- Info: `background: var(--info-soft); color: var(--info)`
- Warning: `background: var(--warning-soft); color: var(--warning)`
- Success: `background: var(--success-soft); color: var(--success)`

增加 `Neutral`:

- `background: #f3f5fb`
- `color: var(--text-muted)`

### Tabs

- 高度: `36px`
- 圆角: `12px`
- 当前 tab:
  - `background: #ffffff`
  - `box-shadow: var(--shadow-xs)`

### Navigation Item

- 高度: `40px`
- 左图标槽宽度: `20px`
- 内边距: `0 12px`
- 当前项使用 `1px` 描边卡式高亮
- 文本截断使用单行省略
- 第二信息行仅用于聊天历史，不用于资产目录

### Message Bubble

- 用户消息:
  - `background: #ffffff`
  - `border: 1px solid var(--border)`
- AI 消息:
  - `background: linear-gradient(180deg, #ffffff 0%, #fafbff 100%)`

Message 元数据:

- 发送者标签 `12px / 600`
- 时间或状态 `12px / muted`
- 段间距 `8px`

### Status Banner / Impact Banner

- 半径: `16px`
- padding: `14px 16px`
- 默认使用浅色背景而非高饱和色块
- 影响范围提示采用 `warning-soft`
- 默认不应让多个 banner 与对话流形成并列主视觉
- 推荐组合:
  - 一个主 `Focus summary`
  - 一个右侧 `AgentStatus` badge 或小标签
  - 一行 `Impact / Step / Confirmation` pills
- 顶部状态组合总高度控制在 `96px - 132px`

状态横幅分类:

- FocusBanner: `#f7f9fe`
- ImpactBanner: `warning-soft`
- ErrorBanner: `error-soft`
- SuccessBanner: `success-soft`

### Modal

- 最大宽度: `560px`
- 圆角: `24px`
- 遮罩: `rgba(16,18,25,0.48)`

### Toast

- 宽度: `360px`
- 固定右上角
- 左侧 `4px` 状态色条

### Empty / Error State

- 图形采用极简单色线性图
- 标题: `20px`
- 正文: `14px / 24px`
- 不使用夸张插画

CTA 间距: `16px`

---

## ⚡ 交互与动效

### 全局原则

- 动效应帮助理解状态变化，而不是营造“炫酷”
- 首屏和关键确认动作可使用更明显的节奏，其余区域保持克制

### 页面入场

- 首页 Hero:
  - H1 `600ms`
  - 正文 `700ms`
  - CTA `800ms`
  - 缓动: `cubic-bezier(0.16, 1, 0.3, 1)`

- 工作台:
  - 页面切换不做大幅整体动画
  - 仅对右侧预览区使用 `180ms fade`

### Hover 微交互

- Primary Button: `translateY(-1px)`
- Card: `border-color` 轻微变化，不使用强烈浮起
- Nav Item: 背景从透明到 `#f6f8fd`

### 对话与保存状态

- `AgentStatus` 使用 pulsing dot
- 保存版本成功后 Toast 进入时间 `220ms`
- 影响范围提示出现动画 `fade + translateY(8px -> 0)`，持续 `180ms`

### 重生成状态

- `Mockup` 与 `设计稿` 的重生成中，顶部节点显示 rotating status ring
- 对话区显示 step log，不阻断阅读历史消息

---

## 📱 响应式设计

### 断点

```css
sm: 640px;
md: 768px;
lg: 1024px;
xl: 1280px;
2xl: 1440px;
```

### 总体策略

- 首页: `desktop editorial` -> `mobile clear storytelling`
- 工作台: `3 列` -> `2 列` -> `单列切换式布局`

### 工作台适配

#### Desktop `>= 1280px`

- 保持 `272 / fluid / 420-560` 三栏

#### Tablet `768px - 1279px`

- 改为 `sidebar collapsible + content + preview`
- 预览区宽度降为 `360px`

#### Mobile `< 768px`

- 不同时显示对话与预览
- 顶部提供 `对话 / 预览 / 目录` 三个切换 tab
- 交付节点可横向滚动

### 认证与项目创建页

- 卡片宽度改为 `100%`
- 外层左右留白 `16px`

### 首页

- Header 简化
- Hero 标题降级
- 流程节点改纵向
- 路线图卡片改单列

---

## ♿ 可访问性

### 标准

- 满足 `WCAG 2.1 AA`

### 具体要求

- 所有主要文字对比度 `>= 4.5:1`
- 所有可操作元素支持 `focus-visible`
- 对话输入、上传、切换、保存、确认动作必须可键盘访问
- 状态提示使用颜色外，还需文本标签
- Markdown / Spec / Summary 预览使用正确标题层级
- Modal 采用 `role="dialog"` 与焦点圈定

### Focus 样式

```css
*:focus-visible {
  outline: 3px solid rgba(88, 184, 255, 0.28);
  outline-offset: 2px;
}
```

---

## 🚀 实现优先级

### P0

- 首页
- 邀请注册 / 登录 / 忘记密码
- Onboarding
- 项目创建
- 统一工作台框架
- PRD / UI Spec / 设计稿 / Mockup / Tech Spec / 交付摘要页
- Button / Input / Card / Banner / Tabs / Navigation / Toast

### P1

- 首页流程节点动效
- 更完整的空状态 / 错误状态
- 设计稿与 Mockup 的高级预览工具栏

### P2

- 首页品牌动态背景增强
- 更丰富的文档目录吸附与内容联动

---

## ✅ 质量检查清单

- [x] 页面范围与 `PRD_V1.md` 对齐
- [x] 明确首页、认证、Onboarding、项目创建、工作台、交付摘要的视觉策略
- [x] 统一营销页与工作台的双系统语言
- [x] 明确浅色主题与品牌渐变的使用边界
- [x] 明确统一工作台三栏框架及移动端降级策略
- [x] 明确核心组件的状态风格
- [x] 明确交互动效与可访问性要求

---

## 📝 迭代历史

### v1.3 - 2026-03-30

- 将设计系统、首页、认证页、Onboarding、项目创建与工作台规范向 `blueprint.html` 已验证原型对齐
- 将字体更新为 `Plus Jakarta Sans + Instrument Serif`，并同步 57Blocks 渐变与浅色品牌底色
- 将首页骨架更新为 `中置导航 + 居中 Hero + Current Phase 资产列表 + How It Works 聊天示意 + Roadmap + Diff + Quote + 居中 CTA`
- 将认证流改为 `左表单 / 右辅助视觉面板`，将 Onboarding 改为 `左侧 step sidebar + 右侧内容区`
- 将工作台顶部状态区改为 `紧凑状态 lane`，明确禁止把多个 banner 机械展开成大卡片
- 将 `PRD Workspace` 对齐到已在 Paper 中验证过的更紧凑版本

### v1.2 - 2026-03-27

- 新增 `高保真原型产出规格`，明确 Paper 落图范围、画板尺寸、页面优先级与状态页要求
- 新增视觉资产、图标、品牌图形、真实内容和工作台示例内容约束
- 为首页、Onboarding、项目创建与五个工作台页面补充模块级高保真装配说明
- 新增 Paper 命名规范、组件复用规范、变体要求和推荐绘制顺序

### v1.1 - 2026-03-27

- 细化首页各区块的精确布局、卡片尺寸、流程节点和收尾 CTA 规则
- 补充 Onboarding 与项目创建页的更具体节奏与表单布局规范
- 细化统一工作台三栏框架、交付节点、Sidebar、Conversation Pane、Preview Pane 的尺寸和 lane 规则
- 为 `PRD / UI Spec / 设计稿 / Mockup / Tech Spec / 交付摘要` 增补各自更明确的预览与操作区规则
- 新增产品专属组件规范：`Delivery Progress`、`Focus Badge`、`Version Select`、`Chat Composer`、`Step Log`、`Self Check Summary Card`

### v1.0 - 2026-03-27

- 基于 `PRD_V1.md` 生成首版 `UI Spec`
- 采用 `shadcn/ui + Tailwind CSS`
- 主题确定为 `浅色`
- 风格方向确定为 `承接 57Blocks 官网气质，但更产品化`
- 首页策略确定为 `品牌愿景优先`
- 工作台策略确定为 `舒适密度 + 混合型个性`
