export const initColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 50,
  },
  {
    title: '数据集名称',
    dataIndex: 'datasetName',
    key: 'datasetName',
    width: 200,
    ellipsis: true,
  },
  // {
  //   title: '关联模型',
  //   dataIndex: 'modelName',
  //   key: 'modelName',
  //   width: 150,
  //   ellipsis: true,
  // },
  {
    title: '训练集版本',
    dataIndex: 'trainDatasets',
    key: 'trainDatasets',
    width: 250,
    ellipsis: true,
  },
  {
    title: ' 测试集版本',
    dataIndex: 'testDatasets',
    key: 'testDatasets',
    width: 250,
    ellipsis: true,
  },
];

// 模拟数据
export const initData = [
  // 训练集版本和测试集版本为数组，每一项都有版本号、日期、描述
  {
    datasetName: '数据集1',
    modelName: '模型1',
    trainDatasets: [
      {
        version: '1.0.0',
        time: '2021-01-01',
        user:'user1',
        datasetVersionName: '描述1',
        isUpdate: false,
      },
      {
        version: '1.0.1',
        time: '2021-03-01',
        user:'user2',
        datasetVersionName: '描述2cdch不吃饭v发育方式非常棒额VB额发热v不飞蛾不糊二五不然',
        isUpdate: true,
      }
    ],
    testDatasets: [
      {
        version: '1.0.0',
        time: '2021-01-01',
        user:'user1',
        datasetVersionName: '描述1',
        isUpdate: true,
      },
      {
        version: '1.0.1',
        time: '2021-03-01',
        user:'user2',
        datasetVersionName: '描述2',
        isUpdate: false,
      }
    ],
  }
];