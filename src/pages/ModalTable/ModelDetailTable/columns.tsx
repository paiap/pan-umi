/*
 * @creater: panan
 * @message: 模型详情表格列定义
 * @since: 2024-07-09 10:00:00
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-05-08 15:33:15
 * @文件相对于项目的路径: /pan-umi/src/pages/ModalTable/ModelDetailTable/columns.tsx
 */

export const initColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 50,
    fixed: 'left',
  },
  {
    title: '模型名称',
    dataIndex: 'modelName',
    key: 'modelName',
    width: 200,
    ellipsis: true,
  },
  {
    title: '业务方',
    dataIndex: 'businessTpcs',
    key: 'businessTpcs',
    width: 150,
    ellipsis: true,
    
  },
  {
    title: '模型版本',
    dataIndex: 'versions',
    key: 'versions',
    width: 250,
    ellipsis: true,
  },
  {
    title: '推理应用',
    dataIndex: 'appNames',
    key: 'appNames',
    width: 250,
    ellipsis: true,
  },
];

// 模拟数据
export const initData = [
  {
    key: '1',
    modelName: '数据部神经大模型',
    businessTpcs: ['解析查数', '数据治理', '数据建模', '数据质量', '数据仓库'],
    versions: [
      { version: 'v2.43', description: '标准sql-v20250416-v1-日常运行代' },
      { version: 'v2.42', description: '标准sql-v20250414-v1-指标召回更新' }
    ],
    appNames: [
      'aime-hihinkgpt-niu-standardsql-euny7aiv-b2c',
      'aime-standardsql-euny7aiv-8b-pre'
    ]
  },
];