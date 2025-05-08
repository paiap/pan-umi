/*
 * @creater: panan
 * @message: TPC项目组数据表格
 * @since: 2025-03-26 10:36:05
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-26 17:29:07
 */

import { ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import React, { useState } from 'react';
import HandleDataButton from './HandleDataButton';

interface TpcTableProps {
  dataSource: any[];
  refresh:() => void;
}

const TpcTable: React.FC<TpcTableProps> = ({ dataSource, refresh }) => {
  const [selectIds, setSelectIds] = useState<React.Key[]>([]);

  const columns: any[] = [
    {
      title: 'tpc',
      key: 'tpcName',
      dataIndex: 'tpcName',
      minWidth: 120,
    },
    {
      title: '成本类型',
      key: 'type',
      dataIndex: 'type',
      minWidth: 120,
    },
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      minWidth: 120,
    },
    {
      title: '出账月份',
      key: 'month',
      dataIndex: 'month',
      minWidth: 120,
    },
    {
      title: '金额 (元)',
      key: 'amount',
      dataIndex: 'amount',
      minWidth: 120,
    },
    {
      title: '环比增长',
      key: 'amountAnnulus',
      dataIndex: 'amountAnnulus',
      width: 120,
    },
    {
      title: 'gpu成本',
      key: 'gpuAmount',
      dataIndex: 'gpuAmount',
      minWidth: 120,
    },
    {
      title: 'gpu环比增长',
      key: 'gpuAmountAnnulus',
      dataIndex: 'gpuAmountAnnulus',
      width: 120,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      minWidth: 120,
      render: (status: number) => {
        // 0 未确认、1 已确认、2 确认有误
        if (status === 0) {
          return <Tag bordered={false} >未确认</Tag>
        }
        if (status === 1) {
          return <Tag bordered={false} color='green'>已确认</Tag>
        }
        if (status === 2) {
          return <Tag bordered={false} color='red'>确认有误</Tag>
        }
        if (status === 3) {
          return <Tag bordered={false} color='lime'>无需确认</Tag>
        }
        return <Tag bordered={false}>未知状态</Tag>
      }
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'action',
      minWidth: 120,
      render: (_: any, record: any) => (
        <HandleDataButton record={record} type='single' refresh={refresh} />
      )

    },
  ];

  const toolBarRender = () => [
    selectIds.length > 0 && (
      <HandleDataButton
        type="multiple"
        selectIds={selectIds}
        refresh={refresh}
      />
    ),
  ];

  return (
    <ProTable
      headerTitle="TPC项目组数据"
      columns={columns}
      dataSource={dataSource}
      search={false}
      options={false}
      pagination={{
        pageSize: 10,
      }}
      scroll={{ x: true }}
      rowKey="id"
      rowSelection={{
        selectedRowKeys: selectIds,
        onChange: (selectedRowKeys: React.Key[]) => {
          setSelectIds(selectedRowKeys || []);
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.status === 3
        })
      }}
      toolBarRender={toolBarRender}
    />
  );
};

export default TpcTable;