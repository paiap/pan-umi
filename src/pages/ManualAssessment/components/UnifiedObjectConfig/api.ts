/*
 * @creater: panan
 * @message: 统一化对象配置组件API接口
 * @since: 2025-07-21 12:35:17
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-21 12:35:17
 * @文件相对于项目的路径: /pan-umi/src/components/UnifiedObjectConfig/api.ts
 */

import { request } from 'umi';
import { 
  GetModelsParams,
  GetModelVersionsParams, 
  GetTrainingTasksParams,
  GetInferenceResultSetsParams,
  Model,
  ModelVersion,
  TrainingTask,
  InferenceResultSet,
  ApiResponse 
} from './types';

// Mock 数据
const mockModels: Model[] = [
  { id: '123', name: '默认评估模型', description: '评估对象专用模型' },
  { id: '1', name: 'qwen-chat-v2.5', description: 'Qwen对话模型v2.5版本' },
  { id: '2', name: 'llama-3-8b-instruct', description: 'Meta Llama 3 8B指令模型' },
  { id: '3', name: 'baichuan2-13b-chat', description: '百川2 13B对话模型' },
  { id: '4', name: 'chatglm3-6b', description: 'ChatGLM3 6B模型' },
  { id: '5', name: 'yi-34b-chat', description: '01-AI Yi 34B对话模型' },
];

const mockModelVersions: { [modelId: string]: ModelVersion[] } = {
  '123': [
    { id: 'v100', version: 'defaultVersion', description: '默认评估模型版本', modelId: '123' },
  ],
  '1': [
    { id: 'v1', version: 'V260', description: 'qwen模型V260版本', modelId: '1' },
    { id: 'v2', version: 'V261', description: 'qwen模型V261版本', modelId: '1' },
    { id: 'v3', version: 'V262', description: 'qwen模型V262版本', modelId: '1' },
    { id: 'v4', version: 'V263', description: 'qwen模型V263版本', modelId: '1' },
  ],
  '2': [
    { id: 'v5', version: '3.0.1', description: 'Llama 3 版本3.0.1', modelId: '2' },
    { id: 'v6', version: '3.0.2', description: 'Llama 3 版本3.0.2', modelId: '2' },
  ],
  '3': [
    { id: 'v7', version: '13B-v1.0', description: '百川2 13B v1.0', modelId: '3' },
    { id: 'v8', version: '13B-v1.1', description: '百川2 13B v1.1', modelId: '3' },
  ],
  '4': [
    { id: 'v9', version: '6B-v3.0', description: 'ChatGLM3 6B v3.0', modelId: '4' },
    { id: 'v10', version: '6B-v3.1', description: 'ChatGLM3 6B v3.1', modelId: '4' },
  ],
  '5': [
    { id: 'v11', version: '34B-v1.0', description: 'Yi 34B v1.0', modelId: '5' },
    { id: 'v12', version: '34B-v1.1', description: 'Yi 34B v1.1', modelId: '5' },
  ],
};

const mockTrainingTasks: { [modelId: string]: TrainingTask[] } = {
  '123': [
    {
      id: 'default_task1',
      name: '默认评估训练任务001',
      description: '默认评估模型的训练任务',
      modelId: '123',
      workload: [
        { path: '/workload/default_checkpoint_001', name: 'default_checkpoint_001', description: '默认训练检查点001' },
        { path: '/workload/default_checkpoint_002', name: 'default_checkpoint_002', description: '默认训练检查点002' },
      ]
    },
  ],
  '1': [
    {
      id: 'task1',
      name: 'qwen_sft_task_001',
      description: 'Qwen SFT训练任务001',
      modelId: '1',
      workload: [
        { path: '/workload/checkpoint_001', name: 'checkpoint_001', description: '训练检查点001' },
        { path: '/workload/checkpoint_002', name: 'checkpoint_002', description: '训练检查点002' },
        { path: '/workload/checkpoint_003', name: 'checkpoint_003', description: '训练检查点003' },
      ]
    },
    {
      id: 'task2',
      name: 'qwen_sft_task_002',
      description: 'Qwen SFT训练任务002',
      modelId: '1',
      workload: [
        { path: '/workload/checkpoint_004', name: 'checkpoint_004', description: '训练检查点004' },
        { path: '/workload/checkpoint_005', name: 'checkpoint_005', description: '训练检查点005' },
      ]
    },
  ],
  '2': [
    {
      id: 'task3',
      name: 'llama3_finetune_task_001',
      description: 'Llama3微调任务001',
      modelId: '2',
      workload: [
        { path: '/workload/llama_checkpoint_001', name: 'llama_checkpoint_001', description: 'Llama检查点001' },
        { path: '/workload/llama_checkpoint_002', name: 'llama_checkpoint_002', description: 'Llama检查点002' },
      ]
    },
  ],
  // 其他模型的训练任务
  '3': [{ id: 'task4', name: 'baichuan2_task_001', description: '百川2训练任务', modelId: '3', workload: [{ path: '/workload/bc_checkpoint_001' }] }],
  '4': [{ id: 'task5', name: 'chatglm3_task_001', description: 'ChatGLM3训练任务', modelId: '4', workload: [{ path: '/workload/glm_checkpoint_001' }] }],
  '5': [{ id: 'task6', name: 'yi_task_001', description: 'Yi训练任务', modelId: '5', workload: [{ path: '/workload/yi_checkpoint_001' }] }],
};

const mockInferenceResultSets: InferenceResultSet[] = [
  { 
    id: 'irs1', 
    name: 'V172推理结果集(profile模型)', 
    description: '基于profile模型的推理结果', 
    modelVersionId: 'v1',
    dataCount: 1000,
    createdAt: '2025-07-10 10:00:00'
  },
  { 
    id: 'irs2', 
    name: 'checkpoint_002推理结果集', 
    description: '基于checkpoint_002的推理结果', 
    checkpointId: 'checkpoint_002',
    dataCount: 800,
    createdAt: '2025-07-09 15:30:00'
  },
  { 
    id: 'irs3', 
    name: '通用推理结果集_0701', 
    description: '7月1日生成的通用推理结果', 
    modelVersionId: 'v2',
    dataCount: 1200,
    createdAt: '2025-07-01 09:00:00'
  },
  {
    id: 'irs4',
    name: 'qwen_v260_inference_001',
    description: 'Qwen V260模型推理结果集001',
    modelVersionId: 'v1',
    dataCount: 1500,
    createdAt: '2025-07-15 14:20:00'
  },
  {
    id: 'irs5',
    name: 'llama3_inference_batch_001',
    description: 'Llama3批量推理结果001',
    modelVersionId: 'v5',
    dataCount: 900,
    createdAt: '2025-07-12 16:45:00'
  },
];

/**
 * 获取模型列表
 * @param params 查询参数
 * @returns Promise<ApiResponse<Model[]>>
 */
export const getModels = async (params: GetModelsParams = {}): Promise<ApiResponse<Model[]>> => {
  const { keyword = '', pageNum = 1, pageSize = 50 } = params;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredModels = mockModels;
      
      // 关键字搜索
      if (keyword) {
        filteredModels = mockModels.filter(model => 
          model.name.toLowerCase().includes(keyword.toLowerCase()) ||
          (model.description && model.description.toLowerCase().includes(keyword.toLowerCase()))
        );
      }
      
      // 分页处理
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredModels.slice(startIndex, endIndex);
      
      resolve({
        code: 0,
        msg: '成功',
        data: paginatedData
      });
    }, 300);
  });
};

/**
 * 获取模型版本列表
 * @param params 查询参数
 * @returns Promise<ApiResponse<ModelVersion[]>>
 */
export const getModelVersions = async (params: GetModelVersionsParams = {}): Promise<ApiResponse<ModelVersion[]>> => {
  const { modelId, keyword = '', pageNum = 1, pageSize = 50 } = params;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!modelId) {
        resolve({
          code: 0,
          msg: '成功',
          data: []
        });
        return;
      }
      
      let versions = mockModelVersions[modelId] || [];
      
      // 关键字搜索
      if (keyword) {
        versions = versions.filter(version => 
          version.version.toLowerCase().includes(keyword.toLowerCase()) ||
          (version.description && version.description.toLowerCase().includes(keyword.toLowerCase()))
        );
      }
      
      // 分页处理
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = versions.slice(startIndex, endIndex);
      
resolve({
          code: 0,
          msg: '成功',
          data: modelId ? paginatedData : []
        });
    }, 200);
  });
};

/**
 * 获取训练任务列表
 * @param params 查询参数
 * @returns Promise<ApiResponse<TrainingTask[]>>
 */
export const getTrainingTasks = async (params: GetTrainingTasksParams = {}): Promise<ApiResponse<TrainingTask[]>> => {
  const { modelId, keyword = '', pageNum = 1, pageSize = 50 } = params;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!modelId) {
        resolve({
          code: 0,
          msg: '成功',
          data: []
        });
        return;
      }
      
      let tasks = mockTrainingTasks[modelId] || [];
      
      // 关键字搜索
      if (keyword) {
        tasks = tasks.filter(task => 
          task.name.toLowerCase().includes(keyword.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(keyword.toLowerCase()))
        );
      }
      
      // 分页处理
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = tasks.slice(startIndex, endIndex);
      
      resolve({
        code: 0,
        msg: '成功',
        data: paginatedData
      });
    }, 200);
  });
};

/**
 * 获取推理结果集列表
 * @param params 查询参数
 * @returns Promise<ApiResponse<InferenceResultSet[]>>
 */
export const getInferenceResultSets = async (params: GetInferenceResultSetsParams = {}): Promise<ApiResponse<InferenceResultSet[]>> => {
  const { 
    keyword = '', 
    modelId,
    modelVersionId, 
    trainingTaskId,
    workloadPath,
    pageNum = 1, 
    pageSize = 50 
  } = params;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      let resultSets = [...mockInferenceResultSets];
      
      // 根据参数过滤
      if (modelVersionId) {
        resultSets = resultSets.filter(rs => rs.modelVersionId === modelVersionId);
      }
      
      if (trainingTaskId) {
        // 根据训练任务和工作负载路径过滤
        const taskRelatedSets = mockInferenceResultSets.filter(rs => {
          // 可以根据训练任务和工作负载路径进行过滤逻辑
          if (workloadPath) {
            return rs.checkpointId && rs.checkpointId.includes(workloadPath.split('/').pop() || '');
          }
          return rs.checkpointId !== undefined;
        });
        resultSets = taskRelatedSets;
      }
      
      // 关键字搜索
      if (keyword) {
        resultSets = resultSets.filter(rs => 
          rs.name.toLowerCase().includes(keyword.toLowerCase()) ||
          (rs.description && rs.description.toLowerCase().includes(keyword.toLowerCase()))
        );
      }
      
      // 分页处理
      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = resultSets.slice(startIndex, endIndex);
      
      resolve({
        code: 0,
        msg: '成功',
        data: paginatedData
      });
    }, 200);
  });
};

// 重新导出类型定义
export type {
  Model,
  ModelVersion,
  TrainingTask,
  InferenceResultSet,
  GetModelsParams,
  GetModelVersionsParams,
  GetTrainingTasksParams,
  GetInferenceResultSetsParams,
  ApiResponse
} from './types';
