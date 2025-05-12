/*
 * @creater: panan
 * @message: 云服务使用情况数据表格
 * @since: 2025-03-26 10:36:05
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-26 15:51:50
 */

import { ProTable } from '@ant-design/pro-components';
import React from 'react';

const columns: any[] = [
  {
    key: 'account',
    title: '云账号',
    dataIndex: 'account',
    minWidth: 120,
  },
  {
    key: 'productCode',
    title: '产品',
    dataIndex: 'productCode',
    minWidth: 120,
  },
  {
    key: 'month',
    title: '出账月份',
    dataIndex: 'month',
    minWidth: 120,
  },
  {
    key: 'amount',
    title: '产品费用（元）',
    dataIndex: 'amount',
    width: 200,
  },
  {
    key: 'amountAnnulus',
    title: '环比增长',
    dataIndex: 'amountAnnulus',
    minWidth: 120,
  }
];

interface CloudTableProps {
  dataSource: any[];
}

const CloudTable: React.FC<CloudTableProps> = ({ dataSource }) => {
  return (
    <ProTable
      headerTitle="云服务使用情况"
      columns={columns}
      dataSource={dataSource}
      rowKey="cloudName"
      search={false}
      options={false}
      pagination={{
        pageSize: 10,
      }}
      scroll={{ x: true }}
    />
  );
};

export default CloudTable;