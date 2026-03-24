# Blueprint — Start Here

57Blocks 的 AI 辅助工程操作系统。在写任何代码之前，先让 Agent 生成完整的上下文包。

---

## 第一次使用？5分钟上手

### 1. 理解核心逻辑（2分钟）

Blueprint 的核心原则只有一句话：**所有"定义"在代码动之前必须完成并一致。**

流程分两个阶段：

**Define 阶段** — 让 Agent 依次生成7份文档，直到 `/verify` 通过
```
/create-prd → /create-ui-spec → /create-mockup → /review-mockup
→ /create-tech-spec → /create-test-spec → /verify
```

**Implement 阶段** — 在文档约束下编码，不猜测，不假设
```
/create-plan → /execute → /review → /test
```

### 2. 找到你现在的位置（1分钟）

打开 `.blueprint/CONTEXT.md`，查看"流水线执行记录"表格，找到第一个 ⚪（待生成）的步骤，从那里开始。

**如果是全新项目**：从 `/create-prd` 开始。

### 3. 运行第一个命令（2分钟）

在 Cursor 中输入对应命令，Agent 会引导你完成整个对话过程。每个命令都有详细的引导，不需要提前准备什么。

---

## 关键文件

| 文件 | 用途 |
|-----|-----|
| `.blueprint/CONTEXT.md` | **每次开始前先读这里** — 当前项目状态总览 |
| `QUICK_REFERENCE.md` | 命令速查表、路径速查、常见错误 |
| `.cursor/commands/README.md` | 每个命令的详细说明 |

---

## 三个最重要的规则

**① Test Spec 在开发之前生成**
`/create-test-spec` 在 `/create-tech-spec` 之后、`/execute` 之前运行。测试用例是编码的验收边界，不是事后检验。

**② `/verify` 不能跳过**
在 `/create-plan` 之前必须运行 `/verify`。发现跨文档矛盾，在代码动之前是代价最低的时机。

**③ `/execute` 必须先读 Mission Briefing**
Exe Agent 在编码前会强制读取 Tech Spec、mockup、Test Spec。如果跳过这步，代码漂移几乎是必然的。

---

## 遇到问题

- **不知道该运行哪个命令** → 看 `QUICK_REFERENCE.md`
- **命令细节不清楚** → 看 `.cursor/commands/[命令名].md`
- **AI 偏离了规格** → 引用具体文档章节指出偏差，而不是重新描述需求
- **上下文窗口太长** → 新开会话，只带 `.blueprint/CONTEXT.md`
