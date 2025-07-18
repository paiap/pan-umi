# 多个评估详情页开发文档

## 概述

此页面为人工评估模块的多个评估详情页，用于展示多版本模型对比评估的详细信息。

## 文件结构

```
/src/pages/ManualAssessment/
├── api/
│   └── index.tsx                    # API接口定义和mock数据
├── components/
│   ├── ComparisonChart.tsx          # 对比图组件
│   ├── ProgressCircle.tsx           # 圆形进度条组件
│   └── ResultTable.tsx              # 结果表格组件
└── pages/
    └── AssessmentMultiDetail.tsx    # 多个评估详情页主页面
```

## 功能特性

### 1. 页面顶部
- **返回按钮**：点击返回人工评估列表页
- **评估名称**：显示当前评估任务的名称
- **刷新按钮**：刷新当前页面所有数据

### 2. 中间对比图区域

#### 左侧柱状图
- 展示不同维度的版本胜利数量对比
- 支持鼠标悬浮显示详细信息
- 支持点击柱状图列来筛选下方表格数据
- 动态适配版本数量（不限于V260、V261）

#### 右侧数据表格
- **序号**：维度排序编号
- **维度名称**：评估维度名称
- **平均实时得分**：该维度的平均得分
- **各版本胜率/败率/平局率**：动态显示所有版本的统计信息
  - 格式：`百分比 (胜利数/总数)`
  - 自动计算百分比

#### 最右侧圆形进度条
- 显示整体评估进度
- 美观的圆形进度条样式

### 3. 下方详情表格

#### Tab切换
- **全部**：显示所有数据，并标注总数量
- **已对比**：仅显示已完成对比的数据
- **未对比**：仅显示未完成对比的数据

#### 搜索功能
- **关键词搜索**：支持在query、V260、V261字段中搜索
- **状态筛选**：支持按状态进行筛选
- **重置功能**：一键清空所有搜索条件

#### 表格展示
- 支持水平滚动（避免表头过窄过高）
- 超长文本自动省略并支持hover显示完整内容
- 分页功能：支持页码跳转和页大小选择

### 4. 特殊交互

#### 柱状图点击
- 点击柱状图的任意维度列
- 自动筛选下方表格数据，显示该维度相关的评估结果
- 提供用户反馈信息

## 技术实现

### API接口

#### 1. getAssessmentMultiDetail(id)
获取评估基本信息和维度统计数据
```typescript
interface VersionComparisonData {
  id: string;
  name: string;
  progress: number;
  dimensions: DimensionData[];
}
```

#### 2. getAssessmentMultiTable(params)
获取详情表格数据，支持筛选和搜索
```typescript
interface SearchParams {
  id: string;
  tab: 'all' | 'compared' | 'uncompared';
  dimensionKey?: string;
  query?: string;
  status?: string;
}
```

### 组件设计

#### ComparisonChart组件
- 左侧自定义柱状图：使用div+CSS实现
- 右侧Antd Table：动态列生成
- 圆形进度条：Antd Progress组件

#### ResultTable组件
- 搜索表单：Antd Form + Input组件
- 数据表格：Antd Table，支持分页和滚动
- Tab切换：Antd Tabs组件

### 样式特点
- 最小化CSS和内联样式使用
- 主要依靠Antd组件的默认样式
- 合理的间距和布局
- 响应式设计考虑

## 路由配置

页面路由：`/ManualAssessment/multiDetail/:id`
- 通过`useParams`获取评估ID
- 从列表页点击详情按钮跳转（非单个对比评估任务）

## 使用方法

1. **访问页面**：从人工评估列表页点击详情按钮
2. **查看对比图**：观察不同维度的版本表现
3. **点击维度**：点击柱状图筛选特定维度数据
4. **搜索数据**：使用搜索表单查找特定评估结果
5. **切换视图**：通过Tab查看不同状态的评估数据

## 扩展性

### 支持动态版本数量
- 不限于V260、V261两个版本
- 表格列和图表会根据实际版本数量动态调整

### 可维护的组件结构
- 组件职责单一，易于维护
- 接口和数据类型明确定义
- 良好的错误处理和加载状态

### 未来扩展建议
- 可添加更多图表类型（折线图、饼图等）
- 支持数据导出功能
- 添加更多筛选条件
- 实时数据更新功能

## 开发注意事项

1. **性能优化**：大数据量时考虑虚拟滚动
2. **错误处理**：网络请求失败的友好提示
3. **用户体验**：适当的加载状态和反馈
4. **类型安全**：完善的TypeScript类型定义
5. **测试覆盖**：建议添加单元测试和集成测试
