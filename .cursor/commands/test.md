# Test Stage

**目的**：严格参照 `.blueprint/Test_Spec.md` 执行测试计划（P0→P1→P2），完成自动化+人工回归，并产出**可发布的测试报告**与**缺陷清单**（含证据与结论）。

## 执行要求

现在请你作为项目 QA / 测试执行负责人，**按 `.blueprint/Test_Spec.md` 完整执行**，并遵循以下规则：

### 基本规则

- **以 `.blueprint/Test_Spec.md` 为唯一测试来源**：不擅自改用例口径；如发现用例与实现不一致，记录为缺陷或阻塞项。
- **不允许“口头通过”**：每条用例必须有**可核验证据**（命令输出、日志片段、截图/录屏、网络请求信息等）。
- **优先级与门禁**：先保证 **P0 100% 执行并判定**；P1/P2 依资源执行；按 Test Spec 的 Release Gate 给出最终结论。
- **环境分层**：能自动化的先自动化；同一类核心链路至少在**本地**与**Vercel Preview（如可用）**各跑一轮（无法访问则标记为阻塞与待补测）。
- **失败处理**：
  - 明确是测试/脚手架/数据问题：可做最小修复并复跑。
  - 明确是产品/实现缺陷：记录为缺陷（含复现步骤与证据），不要“改需求让它通过”。

### 执行流程

每个阶段都要输出进度与产物（不要等到最后才汇总）：

1. **准备阶段**
   - 识别实际项目目录（例如 monorepo 子目录），确认 Node/包管理器版本与依赖安装方式。
   - 读取 `.blueprint/Test_Spec.md`，提取：
     - P0/P1/P2 用例清单（Functional/UI/API/NFT）
     - 关键环境变量与第三方依赖（Slack/Resend 等）
     - 通过标准（Release Gate / DoD）
   - 创建本次运行的测试记录文档：`reports/test-runs/Test_Run_YYYY-MM-DD.md`（或仓库已有约定则沿用）。

2. **基线检查（自动化优先）**
   - 执行并记录：`lint`、`typecheck`、`unit`、`integration`（若项目脚本存在则使用脚本）。
   - 对 `/api/leads` 相关路径重点验证 201/400/429/500 的响应契约与不泄露敏感信息。

3. **E2E / 关键链路回归（P0 必做最小集）**
   - 覆盖 `Test_Spec.md` 的 E2E 最小集（Tours→Detail→Book→ThankYou + 关键失败路径 + 429 限流提示）。
   - 如已有 Playwright：直接跑；如未具备：以最小改动补齐并只实现 P0 smoke（避免过度工程化）。

4. **人工回归（按 Spec 清单执行）**
   - 按 `Test_Spec.md` 的 FT/UI/NFT 清单逐条执行与判定。
   - 对“口径一致性/可复制政策块/China-ready 披露/反爬展示”等高风险点做重点证据留存（复制文本对比、截图、页面元素检查等）。

5. **汇总与门禁结论**
   - 给出 Release Gate 结论（PASS/FAIL/BLOCKED），并明确阻塞项与风险项。
   - 输出可执行的回归建议（需要复测的用例 ID 列表）。

## 进度更新格式（每个阶段都要更新）

```markdown
**总体进度**: `0%`

### 🟡 阶段 1：准备
- [ ] 定位项目目录与运行方式
- [ ] 读取并提取 `.blueprint/Test_Spec.md` 用例清单
- [ ] 创建 `reports/test-runs/Test_Run_YYYY-MM-DD.md`

### ⬜ 阶段 2：基线检查（lint/typecheck/unit/integration）
- [ ] lint
- [ ] typecheck
- [ ] unit
- [ ] integration（含 /api/leads 契约）

### ⬜ 阶段 3：E2E（P0 最小集）
- [ ] 路径 1：tours → detail → book → thank-you（成功）
- [ ] 路径 2：必填缺失（阻止提交 + 可访问错误）
- [ ] 路径 3：China-ready 未勾选 acknowledgement（阻止提交）
- [ ] 路径 4：429 限流（友好提示）

### ⬜ 阶段 4：人工回归（按 FT/UI/NFT）
- [ ] FT-P0-xxx ...
- [ ] UI-P0-xxx ...
- [ ] NFT-P0-xxx ...

### ⬜ 阶段 5：测试报告与门禁结论
- [ ] 汇总通过率与阻塞项
- [ ] 缺陷清单（可复现、可定位、可回归）
```

## 测试记录/报告输出格式（写入 `reports/test-runs/Test_Run_YYYY-MM-DD.md`）

```markdown
# Test Run - YYYY-MM-DD

## Run 信息
- 范围：按 `.blueprint/Test_Spec.md`（vX.X）
- 环境：Local / Vercel Preview（如有，填 URL）
- 运行人：AI（代执行）
- 运行时间：开始/结束
- 运行上下文：OS、Node 版本、包管理器、项目目录、（如有）commit hash

## 总体结论（Release Gate）
- 结论：PASS / FAIL / BLOCKED
- P0：x / y 通过
- P1：x / y 通过
- P2：x / y 通过
- 主要风险点（最多 5 条）：

## 自动化结果摘要
- lint：
- typecheck：
- unit：
- integration（/api/leads 201/400/429/500）：
- e2e：
- lighthouse / a11y（如执行）：

## 用例执行明细（按 ID）
| ID | 标题 | 优先级 | 环境 | 结果 | 证据 | 备注 |
|---|---|---|---|---|---|---|
| FT-P0-001 | ... | P0 | Local | PASS/FAIL/BLOCKED | 命令输出/截图路径/日志 | ... |

## 缺陷清单
| 缺陷ID | 严重级别 | 影响面 | 复现步骤 | 期望 | 实际 | 证据 | 初步原因/建议 |
|---|---|---|---|---|---|---|---|

## 未执行/阻塞项
- 用例ID：原因、需要的依赖/权限、建议下一步

## 回归建议
- 需要复测的用例 ID 列表：
```

## 重要原则

1. **证据优先**：没有证据就不能判定通过。
2. **先门禁后扩展**：先把 P0 跑通并稳定，再扩展 P1/P2。
3. **不掩盖问题**：失败就记录失败；把“可复现、可定位、可回归”写清楚。
4. **最小修复**：为让测试可运行而做的修复要最小且可解释，避免引入额外风险。

## 遇到问题时

如果遇到：
- 不确定项目入口/脚本/目录
- 缺少环境变量或第三方凭据（Slack/Resend）
- 无法访问 Vercel Preview
- 用例与实现存在明显冲突需要产品决策

请将相关项标记为 **BLOCKED**，记录阻塞原因与可执行的下一步（例如：需要提供某个环境变量、需要一个 preview URL、需要开启某脚本），并继续执行其余不受阻的用例。
