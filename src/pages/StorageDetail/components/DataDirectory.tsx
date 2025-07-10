/*
 * @creater: panan
 * @message: DataDirectory-数据目录表格
 * @since: 2025-05-13 15:35:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 17:16:50
 */

import React from 'react';
import { Table, Button, Input, Space, Typography, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './DataDirectory.less';
import DataPublish from './DataPublish';
import SyncRecord from './SyncRecord';
import ClusterSync from './ClusterSync';
import { changeUnit } from '@/components/TagsProgress';
import AddDirectoryModal from './AddDirectoryModal';

const { Title } = Typography;

interface DataDirectoryProps {
  directoryData: any[];
}
const DataDirectory: React.FC<DataDirectoryProps> = ({ directoryData }) => {
  const columns = [
    {
      title: '数据目录',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '数据容量',
      dataIndex: 'size',
      key: 'size',
      render: (text: number) => changeUnit(text),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: (
        <Space>
          <span>操作</span>
          <span style={{ textAlign: 'right' }}>
            <SyncRecord />
          </span>
        </Space>
      ),
      key: 'action',
      width: 200,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="link" size="small">文件预览</Button>
          <ClusterSync />
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => console.log('删除', record)}
          >
            <Button type="link" size="small" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.directoryContainer}>
      <div className={styles.directoryHeader}>
        <Title level={5}>数据目录</Title>
        <div className={styles.searchBox}>
          <Input
            placeholder="输入目录名称，按Enter搜索"
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
          />
          <AddDirectoryModal />
          <DataPublish />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={directoryData}
        rowKey="id"
        size='small'
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default DataDirectory;