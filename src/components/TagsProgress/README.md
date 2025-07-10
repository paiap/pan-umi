# TagsProgress 标签数据可视化组件

## 组件介绍

TagsProgress 是一个用于可视化展示标签数据占比和分布情况的 React 组件。它基于 Ant Design 组件库开发，支持自定义颜色、高度等多种配置。

## 效果展示

组件会根据传入的标签数据，自动计算各标签的占比，并以水平条形图的形式展示。同时可以选择性地显示标签列表。

## 使用方法

```tsx
import TagsProgress from '@/components/TagsProgress';

// 示例数据
const tags = [
  { name: '数据日期', count: 5235 },
  { name: '团队', count: 351 },
  { name: '个人', count: 156 },
  { name: '其他', count: 156 },
];

// 基础用法
<TagsProgress tags={tags} />

// 自定义配置
<TagsProgress 
  tags={tags} 
  height={6}
  showTags={true}
  showTooltip={true}
  defaultColors={['#E5C1CD', '#B8D8BA', '#A4C2F4', '#FFD966']}
/>
```

## API

### TagsProgress Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tags | 标签数据数组 | TagItem[] | - |
| showTags | 是否显示标签 | boolean | true |
| height | 进度条高度 | number | 8 |
| colorMap | 标签名称到颜色的映射 | Record<string, string> | - |
| defaultColors | 默认颜色数组 | string[] | ['#E5C1CD', '#B8D8BA', '#A4C2F4', '#FFD966'] |
| showTooltip | 是否显示提示 | boolean | true |
| className | 自定义类名 | string | - |
| style | 自定义样式 | React.CSSProperties | - |

### TagItem 类型定义

```ts
interface TagItem {
  name: string;      // 标签名称
  count: number;     // 标签数量
  color?: string;    // 标签颜色（可选）
}
```

## 示例页面

项目中提供了完整的示例页面：`/src/pages/TagsProgressDemo/index.tsx`，展示了组件的各种用法和配置选项。