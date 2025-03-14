import React, { useState } from 'react';
import { Table, Input, Space, Select, Button } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  taskName: string;
  tags: string[];
  status: string;
}

const BaseTable: React.FC = () => {
  const [filterValues, setFilterValues] = useState({
    tag1: undefined,
    tag2: undefined,
    keyword: '',
  });

  const tagOptions = [
    { label: '重要', value: '重要' },
    { label: '紧急', value: '紧急' },
    { label: '开发', value: '开发' },
    { label: '设计', value: '设计' },
    { label: '测试', value: '测试' },
  ];

  const data: DataType[] = [
    {
      key: '1',
      taskName: '测试任务1',
      tags: ['重要', '紧急', '开发'],
      status: '进行中',
    },
    {
      key: '2',
      taskName: '测试任务2',
      tags: ['普通', '设计', '测试'],
      status: '已完成',
    },
  ];

  const handleReset = async (clearFilters?: () => void) => {
    clearFilters?.();
    await setFilterValues({
      tag1: undefined,
      tag2: undefined,
      keyword: '',
    });
    handleTableChange(undefined, undefined, undefined, { action: 'filter' });
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: '任务标签',
      dataIndex: 'tags',
      key: 'tags',
      filterDropdown: ({ confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Space size="small">
            <Select
              placeholder="标签1"
              style={{ width: 200 }}
              options={tagOptions}
              value={filterValues.tag1}
              onChange={(value) => setFilterValues({ ...filterValues, tag1: value })}
              allowClear
            />
            <Select
              placeholder="标签2"
              style={{ width: 200 }}
              options={tagOptions}
              value={filterValues.tag2}
              onChange={(value) => setFilterValues({ ...filterValues, tag2: value })}
              allowClear
            />
            <Input
              placeholder="请输入关键词"
              value={filterValues.keyword}
              onChange={(e) => setFilterValues({ ...filterValues, keyword: e.target.value })}
              style={{ width: 200 }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                  handleTableChange();
                }}
              >
                查询
              </Button>
              <Button
                onClick={() => handleReset(clearFilters)}
              >
                重置
              </Button>
            </Space>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <span style={{ color: filtered ? '#1890ff' : undefined }}>🔍</span>
      ),
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <span key={tag} style={{ marginRight: 8 }}>
              {tag}
            </span>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const handleTableChange: TableProps<DataType>['onChange'] = (
    pagination?,
    filters?,
    sorter?,
    extra?
  ) => {
    console.log('筛选值:', filterValues);
    console.log('分页:', pagination);
    console.log('筛选:', filters);
    console.log('排序:', sorter);
    console.log('额外信息:', extra);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={handleTableChange}
    />
  );
};

export default BaseTable;
