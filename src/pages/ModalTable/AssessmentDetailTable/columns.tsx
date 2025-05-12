/*
 * @creater: panan
 * @message: 
 * @since: 2025-05-08 14:20:31
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-05-08 15:52:19
 * @文件相对于项目的路径: /pan-umi/src/pages/ModalTable/AssessmentDetailTable/columns.tsx
 */
export const initColumns = [
  // 序号、评估任务名称、关联模型、模型版本、评估结果、评估人
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 50,
  },
  {
    title: '评估任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
    width: 100,
    ellipsis: true,
  },
  {
    title: '关联模型',
    dataIndex: 'modelFolderName',
    key: 'modelFolderName',
    width: 100,
    ellipsis: true,
  },
  {
    title: '模型版本',
    dataIndex: 'modelVersion',
    key: 'modelVersion',
    width: 100,
    ellipsis: true,
  },
  {
    title: '评估结果',
    dataIndex:'result',
    key:'result',
    width: 100,
    ellipsis: true,
  },
  {
    title: '评估人',
    dataIndex:'user',
    key:'user',
    width: 100,
    ellipsis: true,
  },
];

// 模拟数据
export const initData = [
  // mock一个数据
  {
    index: 1,
    taskName: '评估任务1',
    modelFolderName: '模型文件夹1',
    modelVersion: '模型版本1',
    result: '评估结果1',
    user: '评估人1',
  },
]