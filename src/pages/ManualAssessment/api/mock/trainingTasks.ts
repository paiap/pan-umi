/*
 * @creater: panan
 * @message: 训练任务列表的 mock 数据
 * @since: 2025-07-10 12:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-17 16:19:52
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/api/mock/trainingTasks.ts
 */

// 训练任务列表 mock 数据
export const mockTrainingTasks = [
  {
    id: '1',
    name: 'V260模型训练任务',
    description: '基于大规模数据集的V260版本模型训练',
    status: 'completed',
    progress: 100,
    totalEpochs: 50,
    completedEpochs: 50,
    startTime: '2025-07-01 09:00:00',
    endTime: '2025-07-05 18:30:00',
    accuracy: 95.8,
    loss: 0.12,
    modelType: 'qwen',
    version: 'V260',
    datasetSize: 1000000,
    batchSize: 32,
    learningRate: 0.001,
    creator: '张三',
    createTime: '2025-07-01 09:00:00',
    updateTime: '2025-07-05 18:30:00'
  },
  {
    id: '2',
    name: 'V261模型训练任务',
    description: '优化超参数的V261版本模型训练',
    status: 'completed',
    progress: 100,
    totalEpochs: 45,
    completedEpochs: 45,
    startTime: '2025-07-06 10:00:00',
    endTime: '2025-07-10 16:45:00',
    accuracy: 96.2,
    loss: 0.11,
    modelType: 'qwen',
    version: 'V261',
    datasetSize: 1200000,
    batchSize: 64,
    learningRate: 0.0008,
    creator: '李四',
    createTime: '2025-07-06 10:00:00',
    updateTime: '2025-07-10 16:45:00'
  },
  {
    id: '3',
    name: 'V262模型训练任务',
    description: '集成新算法的V262版本模型训练',
    status: 'running',
    progress: 78,
    totalEpochs: 60,
    completedEpochs: 47,
    startTime: '2025-07-12 08:00:00',
    endTime: null,
    accuracy: 94.9,
    loss: 0.15,
    modelType: 'qwen',
    version: 'V262',
    datasetSize: 1500000,
    batchSize: 128,
    learningRate: 0.0012,
    creator: '王五',
    createTime: '2025-07-12 08:00:00',
    updateTime: '2025-07-17 14:20:00'
  },
  {
    id: '4',
    name: '多模态模型训练任务',
    description: '结合文本和图像的多模态模型训练',
    status: 'pending',
    progress: 0,
    totalEpochs: 80,
    completedEpochs: 0,
    startTime: null,
    endTime: null,
    accuracy: 0,
    loss: 0,
    modelType: 'multimodal',
    version: 'V1.0',
    datasetSize: 800000,
    batchSize: 16,
    learningRate: 0.0005,
    creator: '赵六',
    createTime: '2025-07-15 11:00:00',
    updateTime: '2025-07-15 11:00:00'
  },
  {
    id: '5',
    name: 'checkpoint恢复训练任务',
    description: '从checkpoint_002恢复继续训练',
    status: 'failed',
    progress: 35,
    totalEpochs: 40,
    completedEpochs: 14,
    startTime: '2025-07-08 14:00:00',
    endTime: '2025-07-09 02:30:00',
    accuracy: 88.3,
    loss: 0.25,
    modelType: 'qwen',
    version: 'checkpoint_002',
    datasetSize: 900000,
    batchSize: 32,
    learningRate: 0.0009,
    creator: '孙七',
    createTime: '2025-07-08 14:00:00',
    updateTime: '2025-07-09 02:30:00'
  }
];

// 获取训练任务列表的 mock 响应
export const getTrainingTasksResponse = (pageNum: number = 1, pageSize: number = 10, status?: string) => {
  let filteredTasks = [...mockTrainingTasks];
  
  // 根据状态筛选
  if (status && status !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }
  
  // 分页处理
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
  
  return {
    code: 0,
    msg: '获取训练任务列表成功',
    data: {
      list: paginatedTasks,
      total: filteredTasks.length,
      pageNum,
      pageSize,
      pages: Math.ceil(filteredTasks.length / pageSize)
    }
  };
};

// 获取单个训练任务详情的 mock 响应
export const getTrainingTaskDetailResponse = (taskId: string) => {
  const task = mockTrainingTasks.find(t => t.id === taskId);
  
  if (task) {
    return {
      code: 0,
      msg: '获取训练任务详情成功',
      data: {
        ...task,
        // 额外的详情数据
        logs: [
          { timestamp: '2025-07-17 10:00:00', level: 'INFO', message: '开始训练第47轮' },
          { timestamp: '2025-07-17 10:05:00', level: 'INFO', message: '当前loss: 0.15, accuracy: 94.9%' },
          { timestamp: '2025-07-17 10:10:00', level: 'WARNING', message: 'GPU内存使用率达到85%' },
          { timestamp: '2025-07-17 10:15:00', level: 'INFO', message: '第47轮训练完成' }
        ],
        metrics: {
          gpuUtilization: 89,
          memoryUsage: 85,
          cpuUtilization: 45,
          diskIO: 67
        }
      }
    };
  } else {
    return {
      code: 1,
      msg: '训练任务不存在',
      data: null
    };
  }
};
