# Mockup Review HTML Mode V1

> 本文档定义 `Mockup Review Agent` 在 `Mockup Agent` 单 HTML 实验方案下的适配规则。
> 它只服务于实验分支，不替代当前主线的正式 `Mockup Review Agent` 规范。

---

## 1. 实验目标

当 `Mockup Agent` 的产物从“可运行前端项目”变为“单文件可交互 HTML”后，`Mockup Review Agent` 需要重新回答一个问题：

**在没有项目结构、没有本地 dev server、没有组件目录的情况下，如何仍然稳定地做一致性与可体验性审查。**

本实验方案的目标是：

- 保留 `Mockup Review Agent` 的 Gate 职责
- 降低它对工程环境和运行链路的依赖
- 让它更多依赖“结构化锚点 + 可触发状态 + HTML 可观察结果”

---

## 2. 被审查对象变化

### 2.1 旧模式

旧模式下，Review 主要审查：

- 项目文件结构
- 运行中的预览地址
- 页面路由
- 组件文件与页面文件
- 本地运行结果

### 2.2 新实验模式

新模式下，Review 主要审查：

- 单 HTML 文件本身
- HTML 中的页面锚点
- HTML 中的组件 / 区域锚点
- HTML 中可触发的状态和流程步骤
- `review_hints` 或内嵌数据属性

因此，审查对象会从“工程 + 运行结果”转为“HTML 资产 + 交互行为 + 结构化锚点”。

---

## 3. 新的输入契约

### 3.1 必读输入

| 输入 | 来源 | 用途 |
|------|------|------|
| 已确认 PRD | `.blueprint/PRD_V{N}.md` | 识别页面、流程、验收要点 |
| 已确认 UI Spec | 当前主版本 | 识别布局、组件、状态和文案结构 |
| 已确认设计稿 / 摘要 | 设计资产 / Paper 读回 | 识别关键视觉落点 |
| 当前 HTML Mockup | `.blueprint/mockup-html/index.html` | 作为被检查对象 |
| 当前生成回执 | `Mockup Agent` 输出 | 获取 `generated_scope / review_hints / risk_items` |
| 当前版本信息 | `Orchestrator` 注入 | 建立本次检查基线 |

### 3.2 可选输入

| 输入 | 来源 | 用途 |
|------|------|------|
| 历史 Review 结果 | Review 记录 | 回归复查 |
| 变更摘要 | `Orchestrator` | 聚焦局部更新范围 |
| HTML 截图 | 后续如有工具支持 | 辅助视觉判断 |

---

## 4. 新的检查证据

在 HTML 模式下，Review 需要依赖更稳定的可观察证据。

### 4.1 推荐证据类型

- `data-page`
- `data-section`
- `data-component`
- `data-state`
- `data-flow-step`
- 关键 CTA 是否存在且可触发
- 页面 / 视图切换结果是否可见
- 状态切换是否在 DOM 中可观察

### 4.2 推荐辅助信息

由 `Mockup Agent` 回传的 `review_hints` 应尽量包含：

- 页面列表
- 可切换状态列表
- 关键流程步骤列表
- 特殊 fallback 区域说明

这样 Review 可以避免对整份 HTML 做过多猜测。

---

## 5. 审查重点如何变化

### 5.1 仍然必须检查的内容

以下内容在新模式下仍然必须检查：

- P0 页面是否存在
- P0 核心流程是否可体验
- 关键 CTA 是否可点击
- 关键状态是否可验证
- 是否与 `PRD / UI Spec / 设计稿` 存在明显冲突

### 5.2 不再默认要求的内容

在实验模式下，不再默认要求 Review 检查：

- React 组件拆分是否合理
- 目录结构是否清晰
- 构建配置是否存在
- 路由文件是否符合工程规范
- 依赖管理是否合理

原因很简单：这些不再是该模式的核心交付目标。

### 5.3 新增重点

实验模式下需要新增关注：

- 单 HTML 是否过度拥挤，导致流程难以体验
- 视图切换逻辑是否足够清晰
- 状态切换是否真实可见，而不是只写了静态说明
- `review_hints` 与实际 DOM 是否一致

---

## 6. 审查流程适配

### 第 0 步：前置检查

确认：

- `PRD / UI Spec / 设计稿` 可用
- HTML 文件存在且可读
- 当前生成回执存在
- `review_hints` 或数据锚点至少部分存在

如果 HTML 文件本身缺失，直接阻断。

### 第 1 步：加载规格基线

从上游规格提取：

- 页面清单
- 核心流程
- 关键 CTA
- 关键状态
- 关键视觉结构

### 第 2 步：定位 HTML 锚点

在 HTML 中定位：

- 页面锚点
- 区域锚点
- 组件锚点
- 状态锚点
- 流程步骤锚点

### 第 3 步：检查交互与状态

重点判断：

- 是否真的可以切换页面 / 视图
- 是否真的可以触发关键 CTA
- 是否真的可以看到 loading / empty / error / success 等状态变化

### 第 4 步：问题分级与归因

重点区分：

- 是 HTML 模式本身承载不足
- 还是 `Mockup Agent` 的实现遗漏
- 还是上游规格缺口

### 第 5 步：输出结构化结论

结论仍然采用：

- `pass`
- `pass_with_risks`
- `blocked`

---

## 7. 新的问题分类建议

在实验模式下，建议额外支持以下问题语义：

| 分类 | 说明 |
|------|------|
| `html_structure_issue` | HTML 结构混乱，影响定位或体验 |
| `state_simulation_issue` | 状态模拟存在但不可触发或不可观察 |
| `flow_simulation_issue` | 单文件流程切换逻辑不完整 |
| `review_hint_gap` | 缺少足够的审查锚点或 hints |
| `html_mode_limit` | 当前需求超出单 HTML 模式合理承载范围 |

这些分类不一定要替代现有 `flow / page / component / state`，但应作为实验模式下的重要补充。

---

## 8. 何时必须阻断

在 HTML 模式下，以下情况必须 `blocked`：

- 核心页面无法在 HTML 中定位
- 核心流程主路径无法体验
- 关键 CTA 存在但无触发结果
- 关键状态无法观察
- 缺少足够审查锚点，导致规格无法对照
- 当前需求已经明显超出单 HTML 模式可承载上限

最后一条很重要：

如果问题不是“HTML 写得不好”，而是“这个范围根本不适合单 HTML”，Review 也应该把它识别出来。

---

## 9. 输出契约适配

### 9.1 仍然保留的字段

- `status`
- `runtime`
- `input_versions`
- `review_scope`
- `coverage_summary`
- `issues`
- `risk_summary`
- `blocking_issue_count`
- `non_blocking_issue_count`
- `recommended_routes`
- `can_proceed`
- `handoff_request`
- `needs_confirmation`

### 9.2 建议新增字段

| 字段 | 说明 |
|------|------|
| `html_mode_fit` | `fit / borderline / unfit` |
| `anchor_coverage` | 数据锚点覆盖情况 |
| `state_coverage` | 关键状态覆盖情况 |
| `flow_simulation_quality` | 流程模拟质量总结 |

### 9.3 示例

```json
{
  "status": "pass_with_risks",
  "runtime": {
    "phase_trace": ["think", "plan", "execute", "reflect"],
    "task_complexity": "L2",
    "plan_level": "light",
    "goal_of_this_turn": "检查单 HTML Mockup 是否覆盖 P0 页面与关键流程",
    "goal_completed": true
  },
  "html_mode_fit": "borderline",
  "anchor_coverage": "已覆盖 3 个页面锚点、4 个关键组件锚点、4 个关键状态锚点。",
  "state_coverage": "loading / empty / error / success 均可观察，但 disabled 状态未提供触发方式。",
  "flow_simulation_quality": "P0 主流程可走通，但工作台次级切换逻辑较弱。",
  "recommended_routes": [
    "Mockup Agent"
  ],
  "can_proceed": true
}
```

---

## 10. 与 Orchestrator 的协作变化

### 10.1 不变的部分

- `Orchestrator` 仍然负责触发审查
- `Orchestrator` 仍然负责 Gate 和路由
- `Mockup Review Agent` 仍然只给结构化结论，不直接改资产

### 10.2 新增判断

在实验模式下，Review 应帮助 `Orchestrator` 回答：

- 这是 `Mockup Agent` 实现问题吗
- 这是上游规格问题吗
- 还是“单 HTML 模式本身不适合当前需求范围”

如果是第三种，`handoff_request` 不一定是回某个 Agent，也可能是建议系统层面终止该实验方向。

---

## 11. 相比旧方案的主要变化

| 维度 | 旧方案 | 新实验方案 |
|------|------|------|
| 被审查对象 | 项目工程 + 预览页 | 单 HTML + 结构化锚点 |
| 证据来源 | 文件结构 + 路由 + 运行结果 | DOM 锚点 + 状态切换 + hints |
| 工程审查成分 | 较多 | 较少 |
| 体验审查成分 | 高 | 更高 |
| 模式适配判断 | 很少单独考虑 | 需要显式判断是否适合 HTML 模式 |

---

## 12. 明确不做

本实验方案暂不解决：

- 如何在没有浏览器自动化的情况下做更深交互验证
- 如何做像素级视觉比对
- 如何把 HTML 模式和项目型模式统一到一个正式 Review 规范
- 如何解决大型单 HTML 文件的长期可维护性

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|---------|
| V0.1 | 2026-03-30 | 实验分支初稿，定义 `Mockup Review Agent` 在单 HTML Mockup 模式下的审查对象、证据、流程和结构化输出适配 |
