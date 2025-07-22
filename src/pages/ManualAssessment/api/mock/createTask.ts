/*
 * @creater: panan
 * @message: 创建评估任务的 mock 响应数据
 * @since: 2025-07-10 12:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-17 16:19:52
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/api/mock/createTask.ts
 */

import { CreateTaskParams } from '../index';

/**
 * 创建评估任务的 mock 响应
 */
export const createEvaluationTaskResponse = (params: CreateTaskParams) => {
  // 生成随机任务ID
  const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // 模拟创建成功后的任务信息
  const createdTask = {
    id: taskId,
    ...params,
    status: 'draft' as const,
    creator: '当前用户',
    createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    // 添加一些额外的任务统计信息
    statistics: {
      totalSamples: 0,
      completedSamples: 0,
      progress: 0,
      estimatedDuration: '预计2小时',
      assignedEvaluators: []
    }
  };

  return {
    code: 0,
    msg: '评估任务创建成功',
    data: createdTask
  };
};

/**
 * 任务创建过程中的验证错误 mock 响应
 */
export const createTaskValidationErrorResponse = (errorType: 'dataset_not_found' | 'invalid_params' | 'duplicate_task') => {
  const errorMessages = {
    dataset_not_found: '指定的数据集不存在',
    invalid_params: '任务参数不完整或格式错误',
    duplicate_task: '任务名称已存在，请使用不同的名称'
  };

  return {
    code: 1,
    msg: errorMessages[errorType],
    data: null
  };
};

/**
 * 批量创建任务 mock 响应
 */
export const batchCreateTasksResponse = (taskList: CreateTaskParams[]) => {
  const createdTasks = taskList.map((params, index) => ({
    id: `batch_task_${Date.now()}_${index}`,
    ...params,
    status: 'draft' as const,
    creator: '当前用户',
    createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  }));

  return {
    code: 0,
    msg: `批量创建${taskList.length}个评估任务成功`,
    data: {
      successCount: taskList.length,
      failedCount: 0,
      tasks: createdTasks
    }
  };
};

/**
 * 任务状态更新 mock 响应
 */
export const updateTaskStatusResponse = (taskId: string, newStatus: 'draft' | 'running' | 'completed' | 'failed') => {
  return {
    code: 0,
    msg: `任务状态已更新为${newStatus}`,
    data: {
      taskId,
      previousStatus: 'draft',
      currentStatus: newStatus,
      updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }
  };
};
