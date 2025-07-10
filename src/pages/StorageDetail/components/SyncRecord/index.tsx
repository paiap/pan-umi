/*
 * @creater: panan
 * @message: SyncRecord-同步记录
 * @since: 2025-05-13 22:10:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 15:49:29
 */

import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

// 模拟同步记录数据
const mockSyncData = [
  {
    id: '1',
    date: '2025-03-12 12:24:52',
    operator: '艾布萨',
    syncTarget: '试卷网数学题目',
    targetStorage: 'XXXXXX',
    status: '进行中'
  },
  {
    id: '2',
    date: '2025-03-12 12:24:52',
    operator: '艾布萨',
    syncTarget: '试卷网数学题目',
    targetStorage: 'XXXXXX',
    status: '成功'
  },
  {
    id: '3',
    date: '2025-03-12 12:24:52',
    operator: '艾布萨',
    syncTarget: '试卷网数学题目',
    targetStorage: 'XXXXXX',
    status: '成功'
  },
  {
    id: '4',
    date: '2025-03-12 12:24:52',
    operator: '艾布萨',
    syncTarget: '试卷网数学题目',
    targetStorage: 'XXXXXX',
    status: '失败'
  },
  {
    id: '5',
    date: '2025-03-12 12:24:52',
    operator: '艾布萨',
    syncTarget: '试卷网数学题目',
    targetStorage: 'XXXXXX',
    status: '失败'
  }
];

interface SyncRecordProps {
  [x: string]: any;
}

const SyncRecord: React.FC<SyncRecordProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: '同步对象',
      dataIndex: 'syncTarget',
      key: 'syncTarget',
    },
    {
      title: '目标共享存储',
      dataIndex: 'targetStorage',
      key: 'targetStorage',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        let color = 'black';
        if (text === '成功') color = 'green';
        if (text === '失败') color = 'red';
        if (text === '进行中') color = 'blue';
        return <span style={{ color }}>{text}</span>;
      }
    }
  ];

  return (
    <>
      <Button icon={<FieldTimeOutlined />} onClick={showModal}>同步记录</Button>
      <Modal
        title="同步记录"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Table
          dataSource={mockSyncData}
          columns={columns}
          rowKey="id"
          size='small'
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: 101,
            onChange: handlePageChange,
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 项数据`
          }}
        />
      </Modal>
    </>
  );
};

export default SyncRecord;