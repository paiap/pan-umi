/*
 * @creater: panan
 * @message: 实验结论组件
 * @since: 2025-04-23 15:30:52
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 15:30:52
 * @文件相对于项目的路径: /pan-umi/src/pages/ExperimentalConclusion/index.tsx
 */

import { Select, Button, message, Table, Space, Pagination, Input } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const { TextArea } = Input;

const mockGroups = Array(5).fill(0).map((_, i) => ({
  value: `group-${i + 1}`,
  label: `实验组${i + 1}`,
}));

// 表格列定义
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 60,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '结论内容',
    dataIndex: 'content',
    key: 'content',
    width: 500,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '操作时间',
    dataIndex: 'operationTime',
    key: 'operationTime',
    width: 150,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
    width: 180,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 150,
    align: 'center',
    fixed: 'right',
    render: (_: any, record: any) => (
      <Space>
        <Button type="link">编辑</Button>
        <Button type="link" danger>删除</Button>
      </Space>
    ),
  },
];

// 实验结论组件
const ExperimentalConclusion: React.FC = () => {
  // 实验组列表
  const [experimentalGroups, setExperimentalGroups] = useState<any[]>([]);
  // 选中的实验组
  const [selectedGroup, setSelectedGroup] = useState<string>();
  // 实验结论内容
  const [conclusionContent, setConclusionContent] = useState<string>('');
  // 控制下拉框显示
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  // 下拉框引用
  const selectRef = useRef<any>(null);
  // 表格数据
  const [dataSource, setDataSource] = useState<any[]>([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // 分页信息
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
    total: number;
    [key: string]: any;
  }>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });


  // 获取表格数据
  const fetchTableData = async (params?: any) => {
    setLoading(true);
    try {
      // 这里应该是API调用获取表格数据
      console.log('获取表格数据参数:', params, '选中的实验组:', selectedGroup);

      // 模拟API调用，实际项目中应替换为真实API
      const mockData = Array(10).fill(0).map((_, i) => ({
        id: i + 1,
        content: `这是实验组${selectedGroup}的实验结论${i + 1}`,
        operationTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        operator: '操作人',
      }));

      setDataSource(mockData);
      setPagination({
        ...pagination,
        total: 100, // 模拟总数据量
      });
    } catch (error) {
      message.error('获取表格数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 保存实验结论
  const saveExperimentalConclusion = async () => {
    if (!selectedGroup) {
      message.warning('请选择实验组');
      return;
    }
    if (!conclusionContent.trim()) {
      message.warning('请输入实验结论内容');
      return;
    }

    try {
      setSubmitLoading(true);
      // 这里应该是API调用保存实验结论
      console.log('保存实验结论:', selectedGroup, '结论内容:', conclusionContent);

      // 模拟API调用，实际项目中应替换为真实API
      message.success('保存成功');
      // 清空输入框
      setConclusionContent('');
      // 刷新表格数据
      fetchTableData();
    } catch (error) {
      message.error('保存失败');
    } finally {
      setSubmitLoading(false);
    }
  };

  // 处理分页变化
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    fetchTableData({
      ...pagination,
      ...filters,
      sortField: sorter?.field || undefined,
      sortOrder: sorter?.order || undefined,
    });
  };

  // 初始化加载实验组列表
  useEffect(() => {
    setExperimentalGroups(mockGroups);
    // 默认选中第一个实验组
    if (mockGroups.length > 0 && !selectedGroup) {
      setSelectedGroup(mockGroups[0].value);
    }
  }, []);

  // 不再需要点击外部关闭下拉框的逻辑，由Select组件自动处理

  // 当选中的实验组或分页信息变化时，重新加载表格数据
  useEffect(() => {
    if (selectedGroup) {
      fetchTableData();
    }
  }, [selectedGroup, pagination.pageNum, pagination.pageSize]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
          <span>【</span>
          <div>
            <div
              onClick={() => setSelectOpen(true)}
              style={{
                cursor: 'pointer',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {selectedGroup ? experimentalGroups.find(g => g.value === selectedGroup)?.label : '请选择实验组'}
            </div>
            <Select
              ref={selectRef}
              placeholder="请选择实验组"
              style={{ width: 200, position: 'absolute', opacity: 0, zIndex: -1 }}
              options={experimentalGroups}
              value={selectedGroup}
              open={selectOpen}
              onDropdownVisibleChange={setSelectOpen}
              onChange={(value) => {
                setSelectedGroup(value);
                setSelectOpen(false);
              }}
              dropdownStyle={{ zIndex: 1050 }}
            />
          </div>
          <span>】</span>
          <span>实验组结论</span>
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextArea
            placeholder="请输入实验结论内容"
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={conclusionContent}
            onChange={(e) => setConclusionContent(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <div style={{
            textAlign: 'right',
          }}>
            <Button type="primary" loading={submitLoading} onClick={saveExperimentalConclusion}>保存</Button>
          </div>
        </div>
      </div>

      <Table
        columns={columns as any[]}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
        rowKey="id"
        size='small'
        scroll={{ x: 'max-content' }}
      />

      <Pagination
        style={{ textAlign: 'right', width: '100%', display: 'block', marginTop: 16 }}
        current={pagination.pageNum}
        pageSize={pagination.pageSize}
        total={pagination.total}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 条`}
        onChange={(page, pageSize) => {
          setPagination({
            ...pagination,
            pageNum: page,
            pageSize,
          });
        }}
      />
    </div>
  );
};

export default ExperimentalConclusion;