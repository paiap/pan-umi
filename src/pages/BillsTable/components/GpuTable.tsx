/*
 * @creater: panan
 * @message: GPU使用情况数据表格
 * @since: 2025-03-26 10:36:05
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-26 15:50:57
 */

import { ProTable } from '@ant-design/pro-components';
import React from 'react';

const columns: any[] = [
  {
    key: 'appName',
    title: '应用',
    dataIndex: 'appName',
    minWidth: 120,
  },
  {
    key: 'appAliasName',
    title: '应用中文名',
    dataIndex: 'appAliasName',
    minWidth: 120,
  },
  {
    key: 'appAdmins',
    title: '应用负责人',
    dataIndex: 'appAdmins',
    minWidth: 180,
  },
  {
    key: 'month',
    title: '出账月份',
    dataIndex: 'month',
    minWidth: 120,
  },
  {
    key: 'cluster',
    title: '集群',
    dataIndex: 'cluster',
    minWidth: 180,
    render: (text: string, record: any) => {
      return <span>{record.cluster || '-'} | {record.clusterName || '-'}</span>
    }
  },
  {
    key: 'workloadName',
    title: '工作负载名',
    dataIndex: 'workloadName',
    minWidth: 180,
  },
  {
    key: 'cpuMemCost',
    title: '月度gpu、mem成本',
    dataIndex: 'cpuMemCost',
    minWidth: 150,
  },
  {
    key: 'cpuMemCostAnnulus',
    title: 'cpu、mem成本环比增长',
    dataIndex: 'cpuMemCostAnnulus',
    minWidth: 180,
  },
  {
    key: 'gpuCost',
    title: '月度gpu成本',
    dataIndex: 'gpuCost',
    minWidth: 120,
  },
  {
    key: 'gpuCostAnnulus',
    title: 'gpu成本环比增长',
    dataIndex: 'gpuCostAnnulus',
    minWidth: 150,
  },
  {
    key: 'gpuCard',
    title: '月度gpu卡时',
    dataIndex: 'gpuCard',
    minWidth: 120,
  },
  {
    key: 'gpuCardAnnulus',
    title: 'gpu卡时环比增长',
    dataIndex: 'gpuCardAnnulus',
    minWidth: 150,
  },
  {
    key: 'gpuModel',
    title: 'gpu型号',
    dataIndex: 'gpuModel',
    minWidth: 120,
  },
];

interface GpuTableProps {
  dataSource: any[];
}

const GpuTable: React.FC<GpuTableProps> = ({ dataSource }) => {
  return (
    <ProTable
      headerTitle="云账号明细"
      columns={columns}
      dataSource={dataSource}
      rowKey="application"
      search={false}
      options={false}
      pagination={{
        pageSize: 10,
      }}
      scroll={{ x: true }}
    />
  );
};

export default GpuTable;