/*
 * @creater: panan
 * @message: 
 * @since: 2025-06-06 15:28:37
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-06-06 16:16:10
 * @文件相对于项目的路径: /pan-umi/src/pages/DatasetTable/index.tsx
 */
import React, { FC } from 'react'
import { Table } from 'antd'

interface Props {
  [key: string]: any
}

const mockData = [
  {
    datasetId: "1",
    taggingDatasetId: "1-1",
    datasetName: "数据集A",
    cluster: "集群1",
    taggingNum: 123,
    taggingWasteNum: 111,
    taggingTasks: [
      { taskId: 1, taskName: "批次1", checkCount: 11, wasteCount: 2 },
      { taskId: 2, taskName: "批次2", checkCount: 22, wasteCount: 3 },
      { taskId: 3, taskName: "批次3", checkCount: 33, wasteCount: 4 }
    ]
  },
  {
    datasetId: "2",
    taggingDatasetId: "2-1",
    datasetName: "数据集B",
    cluster: "集群2",
    taggingNum: 223,
    taggingWasteNum: 22,
    taggingTasks: [
      { taskId: 3, taskName: "批次3", checkCount: 33, wasteCount: 4 }
    ]
  }
];

const processedData = mockData.flatMap(dataset => {
  return dataset.taggingTasks.map((task, index) => ({
    datasetName: index === 0 ? dataset.datasetName : '',
    taggingNum: index === 0 ? dataset.taggingNum : '',
    taggingWasteNum: index === 0 ? dataset.taggingWasteNum : '',
    taskName: task.taskName,
    checkCount: task.checkCount,
    wasteCount: task.wasteCount,
    rowSpan: index === 0 ? dataset.taggingTasks.length : 0
  }));
});

const DatasetTable: FC<Props> = () => {
  const columns = [
    {
      title: '数据集名称',
      dataIndex: 'datasetName',
      key: 'datasetName',
      render: (text: any, row: any) => ({
        children: text,
        props: { rowSpan: row.rowSpan }
      })
    },
    {
      title: '标注数量',
      dataIndex: 'taggingNum',
      key: 'taggingNum',
      render: (text: any, row: any) => ({
        children: text,
        props: { rowSpan: row.rowSpan }
      })
    },
    {
      title: '废弃数量',
      dataIndex: 'taggingWasteNum',
      key: 'taggingWasteNum',
      render: (text: any, row: any) => ({
        children: text,
        props: { rowSpan: row.rowSpan }
      })
    },
    {
      title: '批次名称',
      dataIndex: 'taskName',
      key: 'taskName'
    },
    {
      title: '批次标注数量',
      dataIndex: 'checkCount',
      key: 'checkCount'
    },
    {
      title: '批次废弃数量',
      dataIndex: 'wasteCount',
      key: 'wasteCount'
    }
  ];

  // 使用 processedData 作为表格数据
  return <Table columns={columns} dataSource={processedData} size='small' />
}

export default DatasetTable

