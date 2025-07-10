/*
 * @creater: panan
 * @message: ManualAssessment
 * @since: 2025-07-09 15:00:27
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-10 14:50:39
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Table, Pagination, Space, Input, message, Button, Tag, Typography, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { initColumns } from './columns';

const { Text } = Typography;

const ManualAssessment: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchParams, setSearchParams] = useState<any>({});
  const [columns, setColumns] = useState<any[]>([]);
  const [searchValues, setSearchValues] = useState<any>({}); // 存储所有列的搜索值

  const handleearch = (selectedKeys: any[], confirm: any, columnKey: string) => {
    confirm();

    // 更新当前列的搜索值
    const newSearchValues = {
      ...searchValues,
      [columnKey]: selectedKeys[0] || '',
    };
    setSearchValues(newSearchValues);

    // 过滤掉空值，只保留有效的搜索条件
    const filteredSearchParams = Object.keys(newSearchValues).reduce((acc, key) => {
      if (newSearchValues[key] && newSearchValues[key].trim() !== '') {
        acc[key] = newSearchValues[key].trim();
      }
      return acc;
    }, {} as any);

    setSearchParams(filteredSearchParams);

    // 重置到第一页
    setPagination({
      ...pagination,
      pageNum: 1,
    });
  };

  const handleReset = (clearFilters: any, confirm: any, columnKey: string) => {
    clearFilters();
    confirm();

    // 更新搜索值状态，清除当前列的搜索值
    const newSearchValues = { ...searchValues };
    delete newSearchValues[columnKey];
    setSearchValues(newSearchValues);

    // 更新搜索参数状态
    const newSearchParams = { ...searchParams };
    delete newSearchParams[columnKey];
    setSearchParams(newSearchParams);

    // 重置到第一页
    setPagination({
      ...pagination,
      pageNum: 1,
    });
  };


  // 获取列配置
  const getColumns = () => {
    const searchableColumns = ['taskName', 'taskType', 'evaluationBody', 'comparisonTarget', 'testSet', 'creator'];
    // 需要显示 Tooltip 的文本列（排除序号和操作列）
    const textColumns = ['taskName', 'taskType', 'evaluationBody', 'comparisonTarget', 'testSet', 'evaluationProcess', 'evaluationResult', 'creator', 'createTime'];

    const curColumns = initColumns.map((item: any) => {
      let columnConfig = { ...item };

      // 为文本列添加 Tooltip 功能
      if (textColumns.includes(item.key)) {
        columnConfig.render = (text: string, record: any) => {
          // 如果是状态列，使用原有的 render 逻辑
          if (item.key === 'successStatus' && item.render) {
            const statusElement = item.render(text, record);
            return (
              <Tooltip title={text} placement="top">
                {statusElement}
              </Tooltip>
            );
          }

          // 对于普通文本列
          if (text && text.toString().trim() !== '') {
            return (
              <Tooltip title={text} placement="top">
                <div style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}>
                  {text}
                </div>
              </Tooltip>
            );
          }
          return text || '-';
        };
      }

      // 为可搜索列添加搜索功能
      if (searchableColumns.includes(item.key)) {
        columnConfig = {
          ...columnConfig,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
            // 获取当前列的搜索值
            const currentSearchValue = searchValues[item.key] || '';

            // 同步搜索值到selectedKeys
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (currentSearchValue && !selectedKeys[0]) {
                setSelectedKeys([currentSearchValue]);
              } else if (!currentSearchValue && selectedKeys[0]) {
                setSelectedKeys([]);
              }
            }, [currentSearchValue]);

            const currentValue = selectedKeys[0] || currentSearchValue;

            return (
              <div style={{ padding: 8 }}>
                <Input
                  placeholder={`搜索 ${item.title}`}
                  value={currentValue}
                  onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => handleSearch(selectedKeys, confirm, item.key)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, item.key)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    搜索
                  </Button>
                  <Button
                    onClick={() => handleReset(clearFilters, confirm, item.key)}
                    size="small"
                    style={{ width: 90 }}
                  >
                    重置
                  </Button>
                </Space>
              </div>
            );
          },
          filterIcon: () => {
            // 检查当前列是否有搜索值
            const hasSearchValue = searchValues[item.key] && searchValues[item.key].trim() !== '';
            return (
              <SearchOutlined style={{ color: hasSearchValue ? '#1890ff' : undefined }} />
            );
          },
          filteredValue: searchValues[item.key] ? [searchValues[item.key]] : null,
        };
      }

      // 操作列渲染
      if (item.key === 'action') {
        columnConfig = {
          ...columnConfig,
          render: () => (
            <Space>
              <Button type="link" size="small">详情</Button>
              <Button type="link" size="small">编辑</Button>
              <Button type="link" size="small" danger>删除</Button>
            </Space>
          ),
        };
      }

      return columnConfig;
    });

    setColumns(curColumns);
  };

  const fetchData = async (params?: any) => {
    setLoading(true);
    try {
      // 调用API获取数据
      const allParams = {
        ...searchParams,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        ...params,
      };
      console.log('所有搜索参数:', allParams);
      console.log('当前所有列的搜索值:', searchValues);

      // 模拟API调用，实际项目中应替换为真实API
      const mockData = Array(10).fill(0).map((_, i) => ({
        key: (pagination.pageNum - 1) * pagination.pageSize + i + 1,
        taskName: `pre_training_data_curation_task_${i + 1}_with_very_long_name_to_show_tooltip`,
        taskType: i % 2 === 0 ? '单个对比评估' : '两个对比评估',
        evaluationBody: 'V260',
        comparisonTarget: i % 2 === 0 ? '-' : 'qwen_v2.5_with_long_description',
        testSet: '保存测试集 | V0.0.1 | 非常长的测试集名称用于展示提示框功能',
        evaluationProcess: `50/80`,
        evaluationResult: '正确率：80分，评估结果详细描述信息',
        successStatus: i % 2 === 0 ? '已完成' : '进行中',
        creator: '张三',
        createTime: '2025-06-16 15:15:51',
      }));

      setDataSource(mockData);
      setPagination({
        ...pagination,
        total: 100, // 模拟总数据量为100
      });
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getColumns();
  }, [searchValues]);

  useEffect(() => {
    fetchData();
  }, [pagination.pageNum, pagination.pageSize, searchParams]);

  // 清除所有搜索条件
  const clearAllSearch = () => {
    setSearchValues({});
    setSearchParams({});
    setPagination({
      ...pagination,
      pageNum: 1,
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 搜索条件显示区域 */}
      {Object.keys(searchParams).length > 0 && (
        <div style={{
          background: '#f5f5f5',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <Space wrap>
            <Text strong>当前搜索条件：</Text>
            {Object.entries(searchParams).map(([key, value]: any) => {
              const columnTitle = initColumns.find(col => col.key === key)?.title || key;
              return (
                <Tag
                  key={key}
                  color="blue"
                  closable
                  onClose={() => {
                    const newSearchValues = { ...searchValues };
                    delete newSearchValues[key];
                    setSearchValues(newSearchValues);

                    const newSearchParams = { ...searchParams };
                    delete newSearchParams[key];
                    setSearchParams(newSearchParams);

                    setPagination({
                      ...pagination,
                      pageNum: 1,
                    });
                  }}
                >
                  {columnTitle}: {value}
                </Tag>
              );
            })}
            <Button
              type="text"
              size="small"
              onClick={clearAllSearch}
              style={{ color: '#1890ff' }}
            >
              清除所有
            </Button>
          </Space>
        </div>
      )}

      <Table
        key={JSON.stringify(searchValues)} // 强制重新渲染表格
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        rowKey="key"
        scroll={{ x: 1200 }}
      />
      <Pagination
        style={{ textAlign: 'right', width: '100%', display: 'block' }}
        total={pagination.total}
        current={pagination.pageNum}
        pageSize={pagination.pageSize}
        showSizeChanger
        showQuickJumper
        onChange={(page, pageSize) => {
          setPagination({
            ...pagination,
            pageNum: page,
            pageSize: pageSize || pagination.pageSize,
          });
        }}
        showTotal={(total) => `共 ${total} 条`}
      />
    </Space>
  );
};

export default ManualAssessment;
