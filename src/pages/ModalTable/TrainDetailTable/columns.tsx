/*
 * @creater: panan
 * @message: 
 * @since: 2025-05-08 14:01:44
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-05-08 15:43:48
 * @文件相对于项目的路径: /pan-umi/src/pages/ModalTable/TrainDetailTable/columns.tsx
 */
export const initColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 50,
  },
  {
    title: '训练任务名称',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    ellipsis: true,
  },
  {
    title: '训练任务类型',
    dataIndex: 'trainType',
    key: 'trainType',
    width: 150,
    ellipsis: true,
    // 1-任务式建模、2-交互式建模、3-可视化建模
    render: (text: string) => {
      if (text === '1') {
        return '任务式建模'
      }
      if (text === '2') {
        return '交互式建模'
      }
      if (text === '3') {
        return '可视化建模'
      }
      return '-'
    }
  },
  {
    title: '关联模型',
    dataIndex: 'modelFolderName',
    key: 'modelFolderName',
    width: 200,
    ellipsis: true,
  },
  {
    title: '训练时长(h)',
    dataIndex: 'trainTime',
    key: 'trainTime',
    width: 150,
    ellipsis: true,
  },
  {
    title: '训练卡时(h)',
    dataIndex: 'trainCardTime',
    key: 'trainCardTime',
    width: 150,
    ellipsis: true,
  },
  {
    title: '训练成本',
    dataIndex: 'trainCost',
    key: 'trainCost',
    width: 150,
    ellipsis: true,
  },
  {
    title: '代码提交次数',
    dataIndex: 'codeCommitTimes',
    key: 'codeCommitTimes',
    width: 150,
    ellipsis: true,
  },
  {
    title: '代码增加行数',
    dataIndex: 'codeAdditions',
    key: 'codeAdditions',
    width: 150,
    ellipsis: true,
  },
  {
    title: '代码删除行数',
    dataIndex: 'codeDeletions',
    key: 'codeDeletions',
    width: 150,
    ellipsis: true,
  }
];

// 模拟数据
export const initData = [
  // mock一个数据
  {
    index: 1,
    name: '训练任务1',
    trainType: '1',
    modelFolderName: '模型1',
    trainTime: '1',
    trainCardTime: '1',
    trainCost: '1',
    codeCommitTimes: '1',
    codeAdditions: '1',
    codeDeletions: '1',
  },
  {
    index: 2,
    name: '训练任务2',
    trainType: '2',
    modelFolderName: '模型2',
    trainTime: '2',
    trainCardTime: '2',
    trainCost: '2',
    codeCommitTimes: '2',
    codeAdditions: '2',
    codeDeletions: '2',
  }
]