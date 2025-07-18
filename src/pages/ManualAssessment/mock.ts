/*
 * @creater: panan
 * @message: 人工评估API Mock数据
 * @since: 2025-07-16
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/mock.ts
 */

// 模拟人工评估任务数据
const generateMockData = (pageNum: number = 1, pageSize: number = 20) => {
  const mockItems = [];
  const startIndex = (pageNum - 1) * pageSize;

  for (let i = 0; i < pageSize; i++) {
    const index = startIndex + i + 1;
    mockItems.push({
      id: `task_${index}`,
      name: `人工评估任务_${index}`,
      taskType:
        index % 3 === 0
          ? '单个对比评估'
          : index % 3 === 1
          ? '两个对比评估'
          : '多个对比评估',
      taskTypeDesc:
        index % 3 === 0
          ? '单个模型对比评估'
          : index % 3 === 1
          ? '两个模型对比评估'
          : '多个模型对比评估',
      status:
        index % 4 === 0
          ? 'completed'
          : index % 4 === 1
          ? 'running'
          : index % 4 === 2
          ? 'failed'
          : 'waiting',
      statusDesc:
        index % 4 === 0
          ? '已完成'
          : index % 4 === 1
          ? '进行中'
          : index % 4 === 2
          ? '已失败'
          : '等待中',
      modelA: `模型A_${index}`,
      modelB: index % 3 === 0 ? '' : `模型B_${index}`,
      totalItems: 100 + index * 10,
      completedItems:
        index % 4 === 0
          ? 100 + index * 10
          : Math.floor(((100 + index * 10) * (index % 10)) / 10),
      progressPercent: index % 4 === 0 ? 100 : Math.floor((index % 10) * 10),
      createBy: 1000 + index,
      createByName: `用户${index}`,
      createTime: `2025-07-${String(
        Math.floor(Math.random() * 15) + 1,
      ).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(
        2,
        '0',
      )}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(
        Math.floor(Math.random() * 60),
      ).padStart(2, '0')}`,
      updateTime: `2025-07-${String(
        Math.floor(Math.random() * 15) + 1,
      ).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(
        2,
        '0',
      )}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(
        Math.floor(Math.random() * 60),
      ).padStart(2, '0')}`,
      description: `这是人工评估任务${index}的描述信息，包含详细的任务配置和要求。`,
    });
  }

  return mockItems;
};

export const mockManualAssessmentAPI = {
  'GET /api/manual/compare/task/v1/page': (req: any, res: any) => {
    const {
      pageNum = 1,
      pageSize = 20,
      taskName,
      taskType,
      comparisonObject,
      taskStatus,
      // createBy,
      // startTime,
      // endTime,
    } = req.query;

    // 模拟总数据量
    let total = 156;

    // 生成模拟数据
    let mockData = generateMockData(Number(pageNum), Number(pageSize));

    // 模拟搜索过滤
    if (taskName) {
      mockData = mockData.filter((item) =>
        item.name.toLowerCase().includes(taskName.toLowerCase()),
      );
      total = Math.floor(total * 0.6); // 模拟过滤后的总数
    }

    if (taskType) {
      mockData = mockData.filter((item) => item.taskType.includes(taskType));
      total = Math.floor(total * 0.4); // 模拟过滤后的总数
    }

    if (comparisonObject) {
      mockData = mockData.filter(
        (item) =>
          item.modelA.includes(comparisonObject) ||
          item.modelB.includes(comparisonObject),
      );
      total = Math.floor(total * 0.3); // 模拟过滤后的总数
    }

    if (taskStatus) {
      mockData = mockData.filter((item) => item.status === taskStatus);
      total = Math.floor(total * 0.25); // 模拟过滤后的总数
    }

    // 模拟网络延迟
    setTimeout(() => {
      res.json({
        code: 0, // 0为成功
        msg: '查询成功',
        data: {
          total,
          data: mockData,
        },
      });
    }, 300);
  },
};
