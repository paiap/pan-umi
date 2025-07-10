# AssessmentCompareDetail 评估详情页

## 组件用途
用于展示和操作单个对比评估任务详情，包括评估内容、打分、进度、成绩发布等。

## 主要API
- fetchAssessmentDetail(id): 获取评估任务详情
- publishAssessmentScore(id, score): 发布成绩
- fetchAssessmentContent(type, contentId): 获取评估内容详情
- submitAssessmentScore(contentId, score): 提交打分

## 主要Props/参数
- 路由参数 id：评估任务id

## 使用示例
```tsx
<Route path="/ManualAssessment/pages/:id" component={AssessmentCompareDetail} />
```

## 主要功能
- 顶部返回和标题展示
- Tab切换全部/未评估/已评估，展示数量
- 右侧展示进度、分数、发布按钮
- 中间四区块：Prompt、预期结果、模型回答、评估效果（打分）
- 底部操作栏：上一条、下一条、完成并下一条

## 注意事项
- 依赖antd、react-router-dom、mockApi
- 需配合DisplayBlock、ScoreSelector等组件
- 需后续替换为真实接口