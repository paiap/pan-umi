/*
 * @creater: panan
 * @message: Mock 数据统一导出文件
 * @since: 2025-07-10 12:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-17 16:19:52
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/api/mock/index.ts
 */

// 导出训练任务相关 mock 数据
export {
  mockTrainingTasks,
  getTrainingTasksResponse,
  getTrainingTaskDetailResponse
} from './trainingTasks';

// 导出工作负载选项相关 mock 数据
export {
  mockWorkloadOptions,
  getWorkloadOptionsResponse
} from './workloadOptions';

// 导出创建评估任务相关 mock 数据
export {
  createEvaluationTaskResponse,
  createTaskValidationErrorResponse,
  batchCreateTasksResponse,
  updateTaskStatusResponse
} from './createTask';
