# UnifiedObjectConfig 组件

## 组件说明

`UnifiedObjectConfig` 组件用于评估和对比对象的配置，支持模型版本和checkpoint两种对象类型的配置。该组件可以帮助用户创建评估任务和多对象对比的相关配置操作。

## 使用场景

- 创建评估任务时的对象配置
- 多对象对比评估的配置
- 需要配置模型版本或checkpoint的其他场景

## 主要特性

- 支持评估对象和对比对象两种模式
- 统一的数据结构和状态管理
- 自动数据加载和联动更新
- 完整的表单验证和错误处理
- 支持自定义样式和尺寸
- **智能工作负载选项显示：当选择checkpoint类型时，根据训练任务自动显示可用的工作负载路径**
- **联动数据清理：切换训练任务时自动清理之前的工作负载选择**
- **友好的用户体验：无工作负载时显示相应提示信息**

## API

### Props

- `objectType` (string)
  - 类型: `'evaluation' | 'comparison'`
  - 描述: 区分对象类型：评估对象或对比对象
  - 必需: 是

- `value` (Object)
  - 类型: `ObjectConfigData`
  - 描述: 当前配置值
  - 必需: 否

- `onChange` (Function)
  - 参数: `(data: ObjectConfigData) => void`
  - 描述: 配置变化回调
  - 必需: 否

- `disabled` (boolean)
  - 描述: 是否禁用组件
  - 默认值: `false`

- `showModelName` (boolean)
  - 描述: 是否显示模型名称字段（对比对象需要）
  - 默认值: `false`

- `modelName` (string)
  - 描述: 模型名称值
  - 必需: 否

- `onModelNameChange` (Function)
  - 参数: `(name: string) => void`
  - 描述: 模型名称变化回调函数
  - 必需: 否

- `title` (string)
  - 描述: 自定义标题
  - 必需: 否

- `bordered` (boolean)
  - 描述: 是否显示边框
  - 默认值: `true`

- `size` (string)
  - 类型: `'small' | 'middle' | 'large'`
  - 描述: 组件尺寸
  - 默认值: `'middle'`

## 使用示例

```jsx
import React from 'react';
import UnifiedObjectConfig, { ObjectConfigData } from './UnifiedObjectConfig';

const App: React.FC = () => {
  const handleConfigChange = (data: ObjectConfigData) => {
    console.log('配置项变动：', data);
  };

  return (
    <UnifiedObjectConfig
      objectType="evaluation"
      onChange={handleConfigChange}
      showModelName={true}
    />
  );
};

export default App;
```

## 工作负载选项功能说明

### 功能描述

当用户选择 `checkpoint` 对象类型并选择了特定的训练任务后，组件会自动：

1. **显示工作负载选项**：从训练任务数据中获取可用的工作负载路径列表
2. **智能判断显示条件**：仅在选择了训练任务且该任务包含工作负载数据时显示
3. **联动数据清理**：切换训练任务时自动清空之前选择的工作负载路径
4. **友好提示**：当训练任务无可用工作负载时显示相应提示信息
5. **可选字段**：工作负载路径为可选字段，不选择也不影响表单验证

### 数据传递

工作负载路径数据会通过 `onChange` 回调函数传递给父组件，字段名为 `workloadPath`：

```javascript
// 示例数据结构
{
  objectType: 'checkpoint',
  modelId: 'model_123',
  trainingTaskId: 'task_456', 
  workloadPath: '/path/to/workload',  // 工作负载路径（可选）
  inferenceType: 'existing_data',
  inferenceResultSetId: 'result_789'
}
```

### 后端数据要求

训练任务接口返回的数据结构需要包含工作负载信息：

```javascript
// 训练任务数据结构示例
{
  id: 'task_123',
  name: '训练任务名称',
  description: '任务描述',
  workload: [                    // 工作负载数组
    {
      path: '/workload/path1',  // 工作负载路径（必需）
      name: '工作负载1',        // 工作负载名称（可选）
      description: '描述信息'   // 工作负载描述（可选）
    },
    // ... 更多工作负载
  ]
}
```

## 注意事项

- 确保组件引入的依赖已正确安装，例如 `antd`。
- 确保回调函数 `onChange` 和 `onModelNameChange` 正确处理用户输入的数据。
- **工作负载功能依赖训练任务数据中的 `workload` 字段，请确保后端接口返回正确的数据结构**
- 工作负载路径为可选字段，即使不选择也能正常提交表单


