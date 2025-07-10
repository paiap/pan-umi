/*
 * @creater: panan
 * @message: AuthRecord-授权记录
 * @since: 2025-05-13 22:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 15:48:41
 */

import React, { useState } from 'react';
import { Button, Modal, Table, message } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

// 模拟租户列表数据
const mockTenantList = [
  {
    id: '1',
    tenantId: '101',
    tenantName: '张兹'
  },
  {
    id: '2',
    tenantId: '102',
    tenantName: '张兹'
  },
  {
    id: '3',
    tenantId: '103',
    tenantName: '张兹'
  },
  {
    id: '4',
    tenantId: '104',
    tenantName: '张兹'
  },
  {
    id: '5',
    tenantId: '105',
    tenantName: '张兹',
  }
];

// 模拟已授权租户ID数组
const mockAuthorizedTenantIds = ['101', '103'];

interface AuthRecordProps {
  [x: string]: any;
}

const AuthRecord: React.FC<AuthRecordProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tenantList, setTenantList] = useState<any[]>([]);
  const [authorizedTenantIds, setAuthorizedTenantIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const pageSize = 20;

  // 获取租户列表
  const fetchTenantList = () => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setTenantList(mockTenantList);
      setLoading(false);
    }, 500);
  };

  // 获取已授权租户ID列表
  const fetchAuthorizedTenantIds = () => {
    // 模拟API调用
    setTimeout(() => {
      setAuthorizedTenantIds(mockAuthorizedTenantIds);
    }, 300);
  };

  // 授权操作
  const handleAuthorize = (tenantId: string) => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setAuthorizedTenantIds([...authorizedTenantIds, tenantId]);
      message.success('授权成功');
      setLoading(false);
    }, 500);
  };

  // 取消授权操作
  const handleRevokeAuthorization = (tenantId: string) => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setAuthorizedTenantIds(authorizedTenantIds.filter(id => id !== tenantId));
      message.success('已取消授权');
      setLoading(false);
    }, 500);
  };

  const showModal = () => {
    setIsModalOpen(true);
    fetchTenantList();
    fetchAuthorizedTenantIds();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: '租户ID',
      dataIndex: 'tenantId',
      key: 'tenantId',
      width: 150
    },
    {
      title: '租户名',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: any) => {
        const isAuthorized = authorizedTenantIds.includes(record.tenantId);
        return isAuthorized ? (
          <Button
            type="link"
            danger
            onClick={() => handleRevokeAuthorization(record.tenantId)}
            loading={loading}
          >
            取消授权
          </Button>
        ) : (
          <Button
            type="link"
            onClick={() => handleAuthorize(record.tenantId)}
            loading={loading}
          >
            授权
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Button
        // type="primary"
        icon={<FieldTimeOutlined />}
        onClick={showModal}
      >
        授权记录
      </Button>
      <Modal
        title="授权记录"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Table
          columns={columns}
          dataSource={tenantList}
          rowKey="id"
          size='small'
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: handlePageChange,
            total: tenantList.length,
            showSizeChanger: false,
          }}
          loading={loading}
        />
      </Modal>
    </>
  );
};

export default AuthRecord;