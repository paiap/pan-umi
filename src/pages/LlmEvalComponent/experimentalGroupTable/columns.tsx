/*
 * @creater: panan
 * @message: 实验组表格列定义
 * @since: 2025-04-22 20:30:52
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 11:02:20
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/experimentalGroupTable/columns.tsx
 */
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';

export const initColumns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 60,
    align: 'center',
  },
  {
    title: '实验组名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '实验组号',
    dataIndex: 'groupId',
    key: 'groupId',
    width: 120,
    align: 'center',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <Space style={{ margin: '8px' }}>
        <Input
          placeholder="请输入实验组号"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ width: 188 }}
        />
        <a onClick={confirm}>搜索</a>
        <a onClick={clearFilters}>重置</a>
      </Space>
    ),
    filterIcon: <SearchOutlined />,
  },
  {
    title: '实验组标签',
    dataIndex: 'labelId',
    key: 'labelId',
    width: 150,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '实验组描述',
    dataIndex: 'description',
    key: 'description',
    width: 200,
    align: 'center',
    ellipsis: true,
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <Space style={{ margin: '8px' }}>
        <Input
          placeholder="请输入实验组描述"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ width: 188 }}
        />
        <a onClick={confirm}>搜索</a>
        <a onClick={clearFilters}>重置</a>
      </Space>
    ),
    filterIcon: <SearchOutlined />,
  },
  {
    title: '实验数',
    dataIndex: 'taskNumber',
    key: 'taskNumber',
    width: 100,
    align: 'center',
    sorter: true,
  },
  {
    title: '最近实验时间',
    dataIndex: 'lastExperimentTime',
    key: 'lastExperimentTime',
    width: 150,
    align: 'center',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
    width: 120,
    align: 'center',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <Space style={{ margin: '8px' }}>
        <Input
          placeholder="请输入实验组号"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ width: 188 }}
        />
        <a onClick={confirm}>搜索</a>
        <a onClick={clearFilters}>重置</a>
      </Space>
    ),
    filterIcon: <SearchOutlined />,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 150,
    align: 'center',
  },
];