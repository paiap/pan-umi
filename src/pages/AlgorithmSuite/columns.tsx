/*
 * @creater: panan
 * @message: 算法组概览表格列定义
 * @since: 2025-04-17 21:40:45
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-17 22:28:39
 * @文件相对于项目的路径: /pan-umi/src/pages/AlgorithmSuite/columns.tsx
 */

// 基础列定义 - 所有视图共用的列
const baseColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 80,
    align: 'center',
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: '算法组',
    dataIndex: 'algorithmGroup',
    key: 'algorithmGroup',
    width: 150,
    align: 'center',
  },
];

// 算法人员列定义 - 仅在人员视图中使用
const algorithmPersonColumn = {
  title: '算法人员',
  dataIndex: 'algorithmPerson',
  key: 'algorithmPerson',
  width: 120,
  align: 'center',
};

// 其他共用列定义 - 算法人员列后面的所有列
const otherColumns = [
  {
    title: '模型数',
    dataIndex: 'modelCount',
    key: 'modelCount',
    width: 100,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.modelCount || 0) - (b.modelCount || 0);
    },
  },
  {
    title: '模型版本数',
    dataIndex: 'modelVersionCount',
    key: 'modelVersionCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.modelVersionCount || 0) - (b.modelVersionCount || 0);
    },
  },
  {
    title: '推理应用数',
    dataIndex: 'inferenceAppCount',
    key: 'inferenceAppCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.inferenceAppCount || 0) - (b.inferenceAppCount || 0);
    },
  },
  {
    title: '业务方数',
    dataIndex: 'businessCount',
    key: 'businessCount',
    width: 100,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.businessCount || 0) - (b.businessCount || 0);
    },
  },
  {
    title: '训练任务数',
    dataIndex: 'trainingCount',
    key: 'trainingCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.trainingCount || 0) - (b.trainingCount || 0);
    },
  },
  {
    title: '训练总时长',
    dataIndex: 'trainingTotalTime',
    key: 'trainingTotalTime',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.trainingTotalTime || 0) - (b.trainingTotalTime || 0);
    },
  },
  {
    title: '训练总卡时',
    dataIndex: 'trainingTotalGpuTime',
    key: 'trainingTotalGpuTime',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.trainingTotalGpuTime || 0) - (b.trainingTotalGpuTime || 0);
    },
  },
  {
    title: '训练总成本',
    dataIndex: 'trainingTotalCost',
    key: 'trainingTotalCost',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.trainingTotalCost || 0) - (b.trainingTotalCost || 0);
    },
  },
  {
    title: '代码提交次数',
    dataIndex: 'codeSubmitCount',
    key: 'codeSubmitCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.codeSubmitCount || 0) - (b.codeSubmitCount || 0);
    },
  },
  {
    title: '代码新增行数',
    dataIndex: 'codeAddLines',
    key: 'codeAddLines',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.codeAddLines || 0) - (b.codeAddLines || 0);
    },
  },
  {
    title: '代码删除行数',
    dataIndex: 'codeDeleteLines',
    key: 'codeDeleteLines',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.codeDeleteLines || 0) - (b.codeDeleteLines || 0);
    },
  },
  {
    title: '评估任务数',
    dataIndex: 'evaluationTaskCount',
    key: 'evaluationTaskCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.evaluationTaskCount || 0) - (b.evaluationTaskCount || 0);
    },
  },
  {
    title: '评估覆盖率',
    dataIndex: 'evaluationCoverage',
    key: 'evaluationCoverage',
    width: 130,
    align: 'center',
    render: (text: number) => text !== null && text !== undefined ? `${text}%` : '-',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.evaluationCoverage || 0) - (b.evaluationCoverage || 0);
    },
  },
  {
    title: '评估结果',
    dataIndex: 'evaluationResult',
    key: 'evaluationResult',
    width: 100,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.evaluationResult || 0) - (b.evaluationResult || 0);
    },
  },
  {
    title: '数据集数',
    dataIndex: 'datasetCount',
    key: 'datasetCount',
    width: 100,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.datasetCount || 0) - (b.datasetCount || 0);
    },
  },
  {
    title: '训练集版本数',
    dataIndex: 'trainingSetVersionCount',
    key: 'trainingSetVersionCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.trainingSetVersionCount || 0) - (b.trainingSetVersionCount || 0);
    },
  },
  {
    title: '测试集版本数',
    dataIndex: 'testSetVersionCount',
    key: 'testSetVersionCount',
    width: 130,
    align: 'center',
    sorter: (a: any, b: any) => {
      // 正常比较，不特殊处理null或undefined值
      return (a.testSetVersionCount || 0) - (b.testSetVersionCount || 0);
    },
  },
];

// 算法组视图的表格列定义 - 不包含算法人员列
export const columns = [...baseColumns, ...otherColumns];

// 算法组人员视图的表格列定义 - 在算法组后插入算法人员列
export const columnsWithPerson = [
  ...baseColumns,
  algorithmPersonColumn,
  ...otherColumns
];

// 模拟数据
export const mockData = [
  {
    id: 1,
    algorithmGroup: '算法组1',
    algorithmPerson: '张三',
    modelCount: 23,
    modelVersionCount: 5,
    inferenceAppCount: 8,
    businessCount: 3,
    trainingCount: 65,
    trainingTotalTime: 120,
    trainingTotalGpuTime: 480,
    trainingTotalCost: 1200,
    codeSubmitCount: 23,
    codeAddLines: 1500,
    codeDeleteLines: 500,
    evaluationTaskCount: 12,
    evaluationCoverage: 85,
    evaluationResult: 92,
    datasetCount: 15,
    trainingSetVersionCount: 8,
    testSetVersionCount: 6,
  },
  {
    id: 2,
    algorithmGroup: '算法组2',
    algorithmPerson: '李四',
    modelCount: 18,
    modelVersionCount: 4,
    inferenceAppCount: 6,
    businessCount: 2,
    trainingCount: 48,
    trainingTotalTime: 95,
    trainingTotalGpuTime: 380,
    trainingTotalCost: 950,
    codeSubmitCount: 19,
    codeAddLines: 1200,
    codeDeleteLines: 300,
    evaluationTaskCount: 10,
    evaluationCoverage: 78,
    evaluationResult: 88,
    datasetCount: 12,
    trainingSetVersionCount: 6,
    testSetVersionCount: 4,
  },
  {
    id: 3,
    algorithmGroup: '算法组3',
    algorithmPerson: '王五',
    modelCount: 27,
    modelVersionCount: 7,
    inferenceAppCount: 10,
    businessCount: 4,
    trainingCount: 72,
    trainingTotalTime: 145,
    trainingTotalGpuTime: 580,
    trainingTotalCost: 1450,
    codeSubmitCount: 28,
    codeAddLines: 1800,
    codeDeleteLines: 600,
    evaluationTaskCount: 15,
    evaluationCoverage: 92,
    evaluationResult: 95,
    datasetCount: 18,
    trainingSetVersionCount: 10,
    testSetVersionCount: 8,
  },
];