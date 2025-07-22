/*
 * @creater: panan
 * @message: 统一化对象配置组件 - 类型定义
 * @since: 2025-01-24 12:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-01-24 12:00:00
 * @文件相对于项目的路径: /pan-umi/src/components/UnifiedObjectConfig/types.ts
 */

// 对象类型枚举
export type ObjectType = 'model_version' | 'checkpoint';

// 推理类型枚举  
export type InferenceType = 'new_data' | 'existing_data';

// 评估或对比模式枚举
export type ConfigMode = 'evaluation' | 'comparison';

// 组件尺寸枚举
export type ComponentSize = 'small' | 'middle' | 'large';

/**
 * 对象配置数据结构
 * 统一管理模型版本和checkpoint的配置信息
 */
export interface ObjectConfigData {
  /** 模型ID */
  modelId?: string;
  /** 对象类型：模型版本或checkpoint */
  objectType: ObjectType;
  /** 模型版本ID（当objectType为model_version时使用） */
  modelVersionId?: string;
  /** 训练任务ID（当objectType为checkpoint时使用） */
  trainingTaskId?: string;
  /** 工作负载路径（当objectType为checkpoint时使用） */
  workloadPath?: string;
  /** 推理类型：新数据或已有数据 */
  inferenceType: InferenceType;
  /** 推理结果集ID（当inferenceType为existing_data时使用） */
  inferenceResultSetId?: string;
}

/**
 * 统一化对象配置组件Props
 */
export interface UnifiedObjectConfigProps {
  /** 配置模式：评估对象或对比对象 */
  objectType: ConfigMode;
  /** 当前配置值 */
  value?: ObjectConfigData;
  /** 配置变化回调函数 */
  onChange?: (data: ObjectConfigData) => void;
  /** 是否禁用组件 */
  disabled?: boolean;
  /** 是否显示模型名称字段（对比对象需要） */
  showModelName?: boolean;
  /** 模型名称值 */
  modelName?: string;
  /** 模型名称变化回调函数 */
  onModelNameChange?: (name: string) => void;
  /** 自定义标题 */
  title?: string;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 组件尺寸 */
  size?: ComponentSize;
  /** 自定义样式类名 */
  className?: string;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
}

/**
 * 模型数据结构
 */
export interface Model {
  /** 模型ID */
  id: string;
  /** 模型名称 */
  name: string;
  /** 模型描述 */
  description?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 状态 */
  status?: string;
}

/**
 * 模型版本数据结构
 */
export interface ModelVersion {
  /** 版本ID */
  id: string;
  /** 版本号 */
  version: string;
  /** 版本描述 */
  description?: string;
  /** 模型ID */
  modelId?: string;
  /** 模型名称 */
  modelName?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 状态 */
  status?: string;
}

/**
 * 训练任务数据结构
 */
export interface TrainingTask {
  /** 任务ID */
  id: string;
  /** 任务名称 */
  name: string;
  /** 任务描述 */
  description?: string;
  /** 模型ID */
  modelId?: string;
  /** 工作负载数据 */
  workload?: WorkloadData[];
  /** 创建时间 */
  createdAt?: string;
  /** 状态 */
  status?: string;
}

/**
 * 工作负载数据结构
 */
export interface WorkloadData {
  /** 工作负载路径 */
  path: string;
  /** 工作负载名称 */
  name?: string;
  /** 工作负载描述 */
  description?: string;
}

/**
 * 推理结果集数据结构
 */
export interface InferenceResultSet {
  /** 结果集ID */
  id: string;
  /** 结果集名称 */
  name: string;
  /** 结果集描述 */
  description?: string;
  /** 关联的模型版本ID */
  modelVersionId?: string;
  /** 关联的checkpoint ID */
  checkpointId?: string;
  /** 数据条数 */
  dataCount?: number;
  /** 创建时间 */
  createdAt?: string;
  /** 状态 */
  status?: string;
}

/**
 * 验证规则类型
 */
export interface ValidationRules {
  /** 是否必填 */
  required?: boolean;
  /** 自定义验证函数 */
  validator?: (value: any) => string | null;
}

/**
 * 字段验证配置
 */
export interface FieldValidationConfig {
  /** 对象类型验证 */
  objectType?: ValidationRules;
  /** 模型版本ID验证 */
  modelVersionId?: ValidationRules;
  /** Checkpoint ID验证 */
  checkpointId?: ValidationRules;
  /** 推理类型验证 */
  inferenceType?: ValidationRules;
  /** 推理结果集ID验证 */
  inferenceResultSetId?: ValidationRules;
}

/**
 * API响应基础结构
 */
export interface ApiResponse<T = any> {
  /** 响应状态码，0表示成功 */
  code: number;
  /** 响应消息 */
  msg: string;
  /** 响应数据 */
  data: T;
}

/**
 * 获取模型列表的参数
 */
export interface GetModelsParams {
  /** 模型名称关键字 */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 状态筛选 */
  status?: string;
}

/**
 * 获取模型版本列表的参数
 */
export interface GetModelVersionsParams {
  /** 模型ID */
  modelId?: string;
  /** 模型名称关键字 */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 状态筛选 */
  status?: string;
}

/**
 * 获取训练任务列表的参数
 */
export interface GetTrainingTasksParams {
  /** 模型ID */
  modelId?: string;
  /** 任务名称关键字 */
  keyword?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 状态筛选 */
  status?: string;
}

/**
 * 获取推理结果集列表的参数
 */
export interface GetInferenceResultSetsParams {
  /** 结果集名称关键字 */
  keyword?: string;
  /** 模型ID */
  modelId?: string;
  /** 关联的模型版本ID */
  modelVersionId?: string;
  /** 关联的训练任务ID */
  trainingTaskId?: string;
  /** 关联的工作负载路径 */
  workloadPath?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 状态筛选 */
  status?: string;
}
