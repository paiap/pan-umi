/*
 * @creater: panan
 * @message: 评估指标相关API
 * @since: 2025-07-15 15:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-15 15:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/api.ts
 */

// 评估指标数据类型定义
export interface EvaluationMetric {
  id: string;
  metricNameCn: string; // 指标中文名
  metricNameEn: string; // 指标英文名
  metricDescription: string; // 指标描述

  // 基础配置
  evaluationStandard: 'higher_better' | 'lower_better'; // 评判标准：越大越好 | 越小越好
  valueRangeMin: number; // 数值范围最小值
  valueRangeMax: number; // 数值范围最大值
  precisionMatchKey: string; // 精准匹配键

  // 新增：分类和标签系统
  category: string; // 主分类
  subCategory?: string; // 子分类
  tags?: string[]; // 标签列表
  applicationScenarios?: string[]; // 应用场景

  // 新增：计算逻辑相关
  calculationFormula?: string; // 计算公式
  dependentMetrics?: string[]; // 依赖的指标ID列表
  metricWeight?: number; // 指标权重 (0-1)

  // 新增：数据源配置
  dataSource?: {
    type: 'api' | 'file' | 'database' | 'manual'; // 数据源类型
    config: Record<string, any>; // 数据源配置
    fieldMapping?: Record<string, string>; // 字段映射
    transformRules?: string[]; // 数据转换规则
  };

  // 新增：质量管理
  qualityRules?: {
    completenessCheck: boolean; // 完整性检查
    accuracyThreshold?: number; // 准确性阈值
    validationRules?: string[]; // 验证规则
  };

  // 新增：版本和状态管理
  version: string; // 版本号
  status: 'draft' | 'active' | 'deprecated' | 'archived'; // 状态
  approver?: string; // 审批人
  approvalTime?: string; // 审批时间

  // 新增：使用统计
  usageStats?: {
    usageCount: number; // 使用次数
    lastUsedTime?: string; // 最后使用时间
    avgScore?: number; // 平均得分
    successRate?: number; // 成功率
  };

  // 基础信息
  creator: string; // 创建人
  createTime: string; // 创建时间
  updateTime?: string; // 更新时间
  updater?: string; // 更新人
}

// 查询参数类型
export interface QueryMetricsParams {
  pageNum: number;
  pageSize: number;
  metricNameCn?: string;
  metricNameEn?: string;
  creator?: string;
}

// 添加指标参数类型
export interface AddMetricParams {
  metricNameCn: string;
  metricNameEn: string;
  metricDescription: string;
  category: string;
  subCategory?: string;
  tags?: string[];
  applicationScenarios?: string[];
  evaluationStandard: 'higher_better' | 'lower_better';
  valueRangeMin: number;
  valueRangeMax: number;
  precisionMatchKey: string;
  calculationFormula?: string;
  dependentMetrics?: string[];
  metricWeight?: number;
  dataSource?: {
    type: 'api' | 'file' | 'database' | 'manual';
    config: Record<string, any>;
    fieldMapping?: Record<string, string>;
    transformRules?: string[];
  };
  qualityRules?: {
    completenessCheck: boolean;
    accuracyThreshold?: number;
    validationRules?: string[];
  };
}

// 更新指标参数类型
export interface UpdateMetricParams extends AddMetricParams {
  id: string;
}

// API响应类型
export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface PageResult<T> {
  list: T[];
  total: number;
  pageNum: number;
  pageSize: number;
}

// 模拟数据
const mockMetrics: EvaluationMetric[] = [
  {
    id: '1',
    metricNameCn: 'F1值',
    metricNameEn: 'F1-Score',
    metricDescription:
      '衡量模型在分类任务中的平衡能力，综合考虑了模型的正确率（Precision）和召回率（Recall）。F1分数越高，模型在识别正类样本时的表现越好。',
    category: '首道指标',
    evaluationStandard: 'higher_better',
    valueRangeMin: 0,
    valueRangeMax: 1,
    precisionMatchKey: 'f1_score',
    creator: '张三',
    createTime: '2025-07-15 10:30:00',
    version: '1.0',
    status: 'active',
  },
  {
    id: '2',
    metricNameCn: '正确率',
    metricNameEn: 'Precision',
    metricDescription:
      '衡量模型在所有预测为正类的样本中，实际为正类的比例。高Precision表明模型在正类样本的预测上表现更加准确。',
    category: '首道指标',
    evaluationStandard: 'higher_better',
    valueRangeMin: 0,
    valueRangeMax: 1,
    precisionMatchKey: 'precision',
    creator: '李四',
    createTime: '2025-07-15 09:15:00',
    version: '1.0',
    status: 'active',
  },
  {
    id: '3',
    metricNameCn: '召回率',
    metricNameEn: 'Recall',
    metricDescription:
      '衡量模型在所有实际为正类的样本中，被正确预测为正类的比例。高Recall表明模型能够识别更多的正类样本。',
    category: '二道指标',
    evaluationStandard: 'higher_better',
    valueRangeMin: 0,
    valueRangeMax: 1,
    precisionMatchKey: 'recall',
    creator: '王五',
    createTime: '2025-07-15 08:45:00',
    version: '1.0',
    status: 'active',
  },
  {
    id: '4',
    metricNameCn: '均方误差',
    metricNameEn: 'MSE',
    metricDescription:
      '衡量预测值与真实值之间的平均平方差，常用于回归任务。MSE越小，说明模型的预测精度越高。',
    category: '回归指标',
    evaluationStandard: 'lower_better',
    valueRangeMin: 0,
    valueRangeMax: 100,
    precisionMatchKey: 'mse',
    creator: '赵六',
    createTime: '2025-07-15 07:20:00',
    version: '1.0',
    status: 'active',
  },
  {
    id: '5',
    metricNameCn: '准确率',
    metricNameEn: 'Accuracy',
    metricDescription:
      '衡量模型预测正确的样本数占总样本数的比例。准确率是最直观的评估指标，但在样本不平衡时可能存在误导性。',
    category: '基础指标',
    evaluationStandard: 'higher_better',
    valueRangeMin: 0,
    valueRangeMax: 1,
    precisionMatchKey: 'accuracy',
    creator: '钱七',
    createTime: '2025-07-14 16:20:00',
    version: '1.0',
    status: 'active',
  },
];

let nextId = 6;

// 模拟延迟函数
const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

// 查询评估指标列表
export const queryMetrics = async (
  params: QueryMetricsParams,
): Promise<ApiResponse<PageResult<EvaluationMetric>>> => {
  await delay(500);

  let filteredData = [...mockMetrics];

  // 模拟搜索过滤
  if (params.metricNameCn) {
    filteredData = filteredData.filter((item) =>
      item.metricNameCn
        .toLowerCase()
        .includes(params.metricNameCn!.toLowerCase()),
    );
  }

  if (params.metricNameEn) {
    filteredData = filteredData.filter((item) =>
      item.metricNameEn
        .toLowerCase()
        .includes(params.metricNameEn!.toLowerCase()),
    );
  }

  if (params.creator) {
    filteredData = filteredData.filter((item) =>
      item.creator.toLowerCase().includes(params.creator!.toLowerCase()),
    );
  }

  // 分页
  const start = (params.pageNum - 1) * params.pageSize;
  const end = start + params.pageSize;
  const pageData = filteredData.slice(start, end);

  return {
    code: 0,
    msg: 'Success',
    data: {
      list: pageData,
      total: filteredData.length,
      pageNum: params.pageNum,
      pageSize: params.pageSize,
    },
  };
};

// 添加评估指标
export const addMetric = async (
  params: AddMetricParams,
): Promise<ApiResponse<EvaluationMetric>> => {
  await delay(300);

  // 检查中文名唯一性
  const existingCn = mockMetrics.find(
    (item) => item.metricNameCn === params.metricNameCn,
  );
  if (existingCn) {
    return {
      code: 1,
      msg: '指标中文名已存在',
      data: {} as EvaluationMetric,
    };
  }

  // 检查英文名唯一性
  const existingEn = mockMetrics.find(
    (item) => item.metricNameEn === params.metricNameEn,
  );
  if (existingEn) {
    return {
      code: 1,
      msg: '指标英文名已存在',
      data: {} as EvaluationMetric,
    };
  }

  // 检查精准匹配键唯一性
  const existingKey = mockMetrics.find(
    (item) => item.precisionMatchKey === params.precisionMatchKey,
  );
  if (existingKey) {
    return {
      code: 1,
      msg: '精准匹配键已存在',
      data: {} as EvaluationMetric,
    };
  }

  const newMetric: EvaluationMetric = {
    id: String(nextId++),
    ...params,
    creator: '当前用户', // TODO: 替换为实际当前用户
    createTime: new Date().toLocaleString('zh-CN'),
    version: '1.0',
    status: 'active',
  };

  mockMetrics.unshift(newMetric);

  return {
    code: 0,
    msg: 'Success',
    data: newMetric,
  };
};

// 更新评估指标
export const updateMetric = async (
  params: UpdateMetricParams,
): Promise<ApiResponse<EvaluationMetric>> => {
  await delay(300);

  const index = mockMetrics.findIndex((item) => item.id === params.id);
  if (index === -1) {
    return {
      code: 1,
      msg: '指标不存在',
      data: {} as EvaluationMetric,
    };
  }

  // 检查中文名唯一性（排除自己）
  const existingCn = mockMetrics.find(
    (item) =>
      item.metricNameCn === params.metricNameCn && item.id !== params.id,
  );
  if (existingCn) {
    return {
      code: 1,
      msg: '指标中文名已存在',
      data: {} as EvaluationMetric,
    };
  }

  // 检查英文名唯一性（排除自己）
  const existingEn = mockMetrics.find(
    (item) =>
      item.metricNameEn === params.metricNameEn && item.id !== params.id,
  );
  if (existingEn) {
    return {
      code: 1,
      msg: '指标英文名已存在',
      data: {} as EvaluationMetric,
    };
  }

  // 检查精准匹配键唯一性（排除自己）
  const existingKey = mockMetrics.find(
    (item) =>
      item.precisionMatchKey === params.precisionMatchKey &&
      item.id !== params.id,
  );
  if (existingKey) {
    return {
      code: 1,
      msg: '精准匹配键已存在',
      data: {} as EvaluationMetric,
    };
  }

  const updatedMetric: EvaluationMetric = {
    ...mockMetrics[index],
    ...params,
    updateTime: new Date().toLocaleString('zh-CN'),
  };

  mockMetrics[index] = updatedMetric;

  return {
    code: 0,
    msg: 'Success',
    data: updatedMetric,
  };
};

// 删除评估指标
export const deleteMetric = async (
  id: string,
): Promise<ApiResponse<boolean>> => {
  await delay(300);

  const index = mockMetrics.findIndex((item) => item.id === id);
  if (index === -1) {
    return {
      code: 1,
      msg: '指标不存在',
      data: false,
    };
  }

  // TODO: 添加权限控制逻辑，检查当前用户是否有权限删除该指标
  // const currentUser = getCurrentUser();
  // if (mockMetrics[index].creator !== currentUser.name && !currentUser.isAdmin) {
  //   return {
  //     code: 403,
  //     message: '无权限删除该指标',
  //     data: false
  //   };
  // }

  mockMetrics.splice(index, 1);

  return {
    code: 0,
    msg: 'Success',
    data: true,
  };
};

// 检查指标名称唯一性
export const checkMetricNameUnique = async (
  type: 'cn' | 'en' | 'key',
  value: string,
  excludeId?: string,
): Promise<ApiResponse<boolean>> => {
  await delay(200);

  let exists = false;

  switch (type) {
    case 'cn':
      exists = mockMetrics.some(
        (item) => item.metricNameCn === value && item.id !== excludeId,
      );
      break;
    case 'en':
      exists = mockMetrics.some(
        (item) => item.metricNameEn === value && item.id !== excludeId,
      );
      break;
    case 'key':
      exists = mockMetrics.some(
        (item) => item.precisionMatchKey === value && item.id !== excludeId,
      );
      break;
  }

  return {
    code: 0,
    msg: 'Success',
    data: !exists, // 返回是否唯一（不存在则唯一）
  };
};
