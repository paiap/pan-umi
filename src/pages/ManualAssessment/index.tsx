/*
 * @creater: panan
 * @message: ManualAssessment
 * @since: 2025-07-09 15:00:27
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-10 14:50:39
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/index.tsx
 */

import React, { useState, useEffect, useRef } from 'react';
import { Table, Pagination, Space, Input, message, Button, Tag, Typography, Tooltip, Card } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'umi';
import { initColumns } from './columns';
import { getManualAssessmentList, ManualAssessmentQueryParams, ManualAssessmentItem } from './service';

const { Text } = Typography;

const ManualAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<ManualAssessmentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 20,
    total: 0,
  });
  const [searchParams, setSearchParams] = useState<ManualAssessmentQueryParams>({});
  const [columns, setColumns] = useState<any[]>([]);
  const [searchValues, setSearchValues] = useState<any>({}); // 存储所有列的搜索值
  const [tableHeight, setTableHeight] = useState<number>(400); // 表格高度
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (selectedKeys: any[], confirm: any, columnKey: string) => {
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
    delete (newSearchParams as any)[columnKey];
    setSearchParams(newSearchParams);

    // 重置到第一页
    setPagination({
      ...pagination,
      pageNum: 1,
    });
  };


  // 获取列配置
  const getColumns = () => {
    const searchableColumns = ['name', 'taskType', 'modelA', 'modelB', 'createByName'];
    // 需要显示 Tooltip 的文本列（排除序号和操作列）
    const textColumns = ['name', 'taskType', 'taskTypeDesc', 'modelA', 'modelB', 'statusDesc', 'createByName', 'createTime'];

    const curColumns = initColumns.map((item: any) => {
      let columnConfig = { ...item };

      // 为文本列添加 Tooltip 功能
      if (textColumns.includes(item.key)) {
        columnConfig.render = (text: string, record: any) => {
          // 如果是状态列，使用原有的 render 逻辑
          if (item.key === 'status' && item.render) {
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

      // 为序号列添加计算逻辑
      if (item.key === 'index' && item.title === '序号') {
        columnConfig = {
          ...columnConfig,
          render: (_: any, __: any, index: number) => {
            return (pagination.pageNum - 1) * pagination.pageSize + index + 1;
          },
        };
      }

      // 操作列渲染
      if (item.key === 'action') {
        columnConfig = {
          ...columnConfig,
          render: (_: any, record: any) => {
            const isSingleComparison = record.taskType === '单个对比评估';
            return (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    if (isSingleComparison) {
                      navigate(`/ManualAssessment/detail/${record.id}`);
                    } else {
                      navigate(`/ManualAssessment/multiDetail/${record.id}`);
                    }
                  }}
                  title={isSingleComparison ? '查看单个对比详情' : '查看多个对比详情'}
                >
                  详情
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => navigate(`/manual-assessment/edit/${record.id}`)}
                >
                  编辑
                </Button>
                <Button type="link" size="small" danger>删除</Button>
              </Space>
            );
          },
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
      const allParams: ManualAssessmentQueryParams = {
        ...searchParams,
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        ...params,
      };
      console.log('所有搜索参数:', allParams);
      console.log('当前所有列的搜索值:', searchValues);      // 调用真实API
      const response = await getManualAssessmentList(allParams);

      if (response.code === 0 && response.data) {
        setDataSource(response.data.data);
        setPagination({
          ...pagination,
          total: response.data.total,
        });
      } else {
        message.error(response.msg || '获取数据失败');
      }
    } catch (error) {
      console.error('获取数据失败:', error);
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 计算表格应该显示的高度
  const calculateTableHeight = () => {
    // 获取视窗高度
    const viewportHeight = window.innerHeight;

    // 估算其他元素的高度
    const containerPadding = 32; // 容器内边距 (16px * 2)
    const buttonAreaHeight = 56; // 创建按钮区域高度
    const searchAreaHeight = searchParams && Object.keys(searchParams).length > 0 ? 80 : 0; // 搜索条件显示区域
    const paginationHeight = 64; // 分页器高度
    const paginationMargin = 16; // 分页器上方的paddingTop

    // 计算表格可用高度，确保分页器恰好在屏幕底部
    const availableHeight = viewportHeight - containerPadding - buttonAreaHeight - searchAreaHeight - paginationHeight - paginationMargin - 100;

    // 最小高度300px，确保至少能显示几行数据
    const calculatedHeight = Math.max(300, availableHeight);

    setTableHeight(calculatedHeight);
  };

  // 监听窗口大小变化
  useEffect(() => {
    calculateTableHeight();

    const handleResize = () => {
      calculateTableHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchParams]);

  useEffect(() => {
    getColumns();
  }, [searchValues, pagination.pageNum, pagination.pageSize]);

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
    <Card
      styles={{
        body: {
          padding: 0,
          margin: 0,
        }
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          overflow: 'hidden'
        }}
      >
        {/* 操作按钮区域 */}
        <div style={{ marginBottom: 16, flexShrink: 0 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/manual-assessment/create')}
          >
            创建人工评估任务
          </Button>
        </div>

        {/* 搜索条件显示区域 */}
        {Object.keys(searchParams).length > 0 && (
          <div style={{
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            flexShrink: 0
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
                      delete (newSearchParams as any)[key];
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

        {/* 表格和分页器容器 - 占用剩余空间 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* 表格容器 */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Table
              key={JSON.stringify(searchValues)} // 强制重新渲染表格
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              pagination={false}
              rowKey="id"
              scroll={{ x: 1200, y: tableHeight }}
            />
          </div>

          {/* 分页器紧贴表格下方 */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: 16
          }}>
            <Pagination
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
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ManualAssessment;
