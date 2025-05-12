/*
 * @creater: panan
 * @message: 实验组列表 experimentalGroupTable
 * @since: 2025-04-22 20:25:52
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 11:04:37
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/experimentalGroupTable/index.tsx
 */

// 一个表格：序号，实验组名称、实验组号、实验组标签、实验组描述、实验数、最近实验时间、创建人、创建时间、操作
import { Table, message, Pagination, Space, Button, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { initColumns } from './columns';
import CreateExperimentalGroup from "./CreateExperimentalGroup";
import ExperimentalNumberDetail from "./experimentalNumberDetail";
import dayjs from "dayjs";

const ExperimentalGroupTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [cloumns, setColumns] = useState<any[]>([])
  const [loading, setLoading] = useState(false);
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

  const getColumns = () => {
    const curColumns = initColumns.map((item: any) => {
      if (item.key === 'taskNumber') {
        item.render = (text: any, record: any) => {
          return <ExperimentalNumberDetail text={text} record={record} />
        }
      }
      if (item.key === 'action') {
        item.render = (_: any, record: any) => {
          return (
            <Space>
              <Popconfirm
                title="确认删除该实验组吗？"
                okText="确认"
                cancelText="取消"
                onConfirm={() => {
                  message.success('删除成功');
                  console.log(record)
                }}
              >
                <Button
                  type="link"
                  danger
                >
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )
        }
      }

      return item
    })

    setColumns(curColumns)
  }

  useEffect(() => {
    getColumns()
    setColumns(initColumns);
  }, [])

  // 模拟获取数据
  const fetchData = async (params?: any) => {
    setLoading(true);
    try {
      // 这里应该是API调用获取数据
      console.log(params, '>>>>>>')

      // 模拟API调用，实际项目中应替换为真实API
      const mockData = Array(10).fill(0).map((_, i) => ({
        id: i + 1,
        name: `实验组${i + 1}`,
        groupId: `G-${1000 + i}`,
        tags: ['标签1', '标签2'],
        description: `这是实验组${i}的描述`,
        taskNumber: Math.floor(Math.random() * 100),
        lastExperimentTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        creator: '创建人',
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }));

      setDataSource(mockData);
      setPagination({
        ...pagination,
        total: 100, // 模拟总数据量
      });
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载数据
  useEffect(() => {
    fetchData();
  }, [pagination.pageNum, pagination.pageSize]);

  // 处理分页变化
  const handleTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log(pagination, filters, sorter, extra)
    fetchData({
      ...pagination,
      ...filters,
      sortField: sorter?.field || undefined,
      sortOrder: sorter?.order || undefined,
    });
  };

  // 渲染表格
  return (
    <Space direction="vertical">
      <CreateExperimentalGroup />
      <Table
        columns={cloumns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
      />
      <Pagination
        style={{ textAlign: 'right', width: '100%', display: 'block' }}
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
    </Space>
  );
};

export default ExperimentalGroupTable;

