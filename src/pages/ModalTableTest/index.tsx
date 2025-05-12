/*
 * @creater: panan
 * @message: 
 * @since: 2025-05-08 11:25:44
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-05-08 13:35:37
 * @文件相对于项目的路径: /pan-umi/src/pages/ModalTableTest/index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import ModalTable from '../ModalTable';

// 定义表格列
const initColumns = [
  {
    title: '模型详情',
    dataIndex: 'name',
    key: 'name',
    behavior: 'modelDetail'
  },
  {
    title: '训练详情',
    dataIndex: 'age',
    key: 'age',
    behavior: 'trainDetail'
  },
  {
    title: '评估详情',
    dataIndex: 'address',
    key: 'address',
    behavior: 'assessmentDetail'
  },
  {
    title: '覆盖详情',
    dataIndex: 'tags',
    key: 'tags',
    behavior: 'coverageDetail'
  },
  {
    title: '数据详情',
    dataIndex: 'datadetail',
    key: 'datadetail',
    behavior: 'dataDetail'
  }
];

const data = [
  {
    key: '1',
    name: 57,
    age: 32,
    address: 43,
    tags: 23,
    datadetail: 234
  },
]

const ModalTableTest: React.FC = () => {

  const [columns, setColumns] = useState<any[]>(initColumns);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    const curColumns = (initColumns || []).map((item: any) => {
      if (item.behavior) {
        item.render = (text: string, record: any) => {
          return <ModalTable type={item.behavior} text={text} record={record} />
        }
      }
      return item
    })
    setColumns(curColumns)
    setDataSource(data)
  }, [])

  return (
    <Card title="基础表格示例" bordered={false}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key"
        size="small"
      />
    </Card>
  );
};

export default ModalTableTest;