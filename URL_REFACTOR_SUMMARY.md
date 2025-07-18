# URL结构调整和导航逻辑修改总结

## 修改背景
用户要求调整多对比评估详情页面的URL结构和导航逻辑，从原来的直接跳转改为先调用接口获取详情信息再跳转的模式。

## 原有问题
- URL结构：`/multiCompareDetail/2/2` 
- 直接跳转到详情页面
- 没有先获取行详情信息的步骤

## 修改后的结构
- URL结构：`/multiDetail/2/content/1/2`（assessmentId/content/rowId/contentId）
- 点击详情时先调用接口获取行详情信息
- 根据接口返回的contentId和导航信息跳转

## 具体修改内容

### 1. 新增API接口
**文件**: `/src/pages/ManualAssessment/api/index.tsx`

新增两个接口：
- `getRowDetailInfo(assessmentId, rowId)`: 获取行详情和导航信息
- `getRowIdByContentId(assessmentId, contentId)`: 根据contentId获取对应的rowId

```typescript
// 行详情数据类型
export interface RowDetailData {
  rowId: string;
  contentId: string;
  prevRowId?: string;
  nextRowId?: string;
  prevContentId?: string;
  nextContentId?: string;
}
```

### 2. 路由配置调整
**文件**: `/src/pages/route.tsx`

```typescript
// 修改前
{
  path: '/ManualAssessment/multiDetail/:assessmentId/content/:contentId',
  component: './ManualAssessment/pages/AssessmentMultiCompareDetail',
}

// 修改后
{
  path: '/ManualAssessment/multiDetail/:assessmentId/content/:rowId/:contentId',
  component: './ManualAssessment/pages/AssessmentMultiCompareDetail',
}
```

### 3. 表格组件修改
**文件**: `/src/pages/ManualAssessment/components/ResultTable.tsx`

- 新增 `handleDetailClick` 函数
- 点击详情按钮时先调用 `getRowDetailInfo` 接口
- 根据接口返回的 `contentId` 跳转到新的URL结构

```typescript
// 处理详情点击
const handleDetailClick = async (rowId: string) => {
  try {
    const response = await getRowDetailInfo(assessmentId, rowId) as any;
    if (response.success) {
      const { contentId } = response.data;
      navigate(`/ManualAssessment/multiDetail/${assessmentId}/content/${rowId}/${contentId}`);
    }
  } catch (error) {
    message.error('获取详情信息失败');
  }
};
```

### 4. 详情页面组件修改
**文件**: `/src/pages/ManualAssessment/pages/AssessmentMultiCompareDetail.tsx`

- 更新URL参数解析，新增 `rowId` 参数
- 修改 `navigateToContent` 函数，支持新的URL结构
- 在导航时先获取目标contentId对应的rowId

```typescript
// URL参数解析
const { assessmentId, rowId, contentId } = useParams<{ 
  assessmentId: string; 
  rowId: string;
  contentId: string;
}>();

// 导航到指定内容
const navigateToContent = async (targetContentId: string) => {
  try {
    // 先获取对应的rowId
    const rowResponse = await getRowIdByContentId(assessmentId!, targetContentId);
    if (rowResponse.success) {
      const targetRowId = rowResponse.data.rowId;
      await loadData(targetContentId);
      
      // 更新URL
      window.history.replaceState(
        null,
        '',
        `/ManualAssessment/multiDetail/${assessmentId}/content/${targetRowId}/${targetContentId}`
      );
    }
  } catch (error) {
    message.error('导航失败');
  }
};
```

## URL结构对比

### 修改前
- 列表页面: `/ManualAssessment/multiDetail/2`
- 详情页面: `/ManualAssessment/multiCompareDetail/2/2`

### 修改后  
- 列表页面: `/ManualAssessment/multiDetail/2`
- 详情页面: `/ManualAssessment/multiDetail/2/content/1/2`

新的URL结构更清晰地表达了层级关系：
- `2`: assessmentId（评估任务ID）
- `content`: 内容路径标识
- `1`: rowId（行ID）
- `2`: contentId（内容ID）

## 数据流程

### 修改前
1. 点击详情按钮 → 直接跳转到详情页面
2. 详情页面根据contentId加载数据

### 修改后
1. 点击详情按钮 → 调用 `getRowDetailInfo(assessmentId, rowId)`
2. 获取 `contentId` 和导航信息 → 跳转到新URL结构
3. 详情页面根据contentId加载数据
4. 导航时调用 `getRowIdByContentId(assessmentId, contentId)` 获取对应rowId

## 优势
1. **URL更有语义**: 清晰表达了assessmentId、rowId、contentId的层级关系
2. **数据一致性**: 通过接口确保rowId和contentId的对应关系正确
3. **扩展性更好**: 支持更复杂的导航逻辑和数据关联
4. **调试友好**: URL包含更多上下文信息，便于问题定位

## 测试建议
1. 测试从列表页面点击详情按钮的跳转
2. 测试在详情页面使用上一条/下一条导航
3. 测试URL的正确性和参数传递
4. 测试浏览器前进/后退功能
5. 测试页面刷新后的数据加载

## 注意事项
- mock数据中rowId和contentId的映射关系需要根据实际业务调整
- 实际项目中需要替换mock接口为真实的后端接口
- 确保新的URL结构与后端API设计保持一致
