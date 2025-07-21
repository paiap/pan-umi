/*
 * @creater: panan
 * @message: 结果表格组件
 * @since: 2025-07-12 16:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-14 14:02:54
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ResultTable.tsx
 */

import { Button, Card, Form, Table, Tabs, Tooltip, message, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { getContentList, ContentListItem } from '../api';
import { useNavigate } from 'react-router-dom';

interface ResultTableProps {
  assessmentId: string;
  selectedDimension?: string;
  selectedVersion?: string;
  searchFilters?: {
    targetId?: number;
    metricId?: number;
    compareResult?: string;
    comment?: string;
    status?: string;
  };
  dimensionOptions?: Array<{ label: string; value: any }>;
  targetOptions?: Array<{ label: string; value: number }>;
  onSearchFiltersChange?: (filters: any) => void;
  onClearFilters?: () => void; // 新增清除筛选回调
  onRefresh?: () => void;
  hasFilterCard?: boolean; // 是否有筛选条件卡片
  evaluationType?: 'single' | 'multi'; // 新增：评估类型
}

const ResultTable = forwardRef<any, ResultTableProps>(({
  assessmentId,
  selectedDimension,
  selectedVersion,
  searchFilters = {},
  dimensionOptions = [],
  targetOptions = [],
  onSearchFiltersChange,
  onClearFilters,
  hasFilterCard = false, // 默认值为false
  evaluationType = 'multi', // 默认为多个评估
}, ref) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false); // 搜索loading状态
  const [data, setData] = useState<ContentListItem[]>([]);
  const [allData, setAllData] = useState<ContentListItem[]>([]); // 存储所有数据
  const [activeTab, setActiveTab] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [tableHeight, setTableHeight] = useState(400);
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    compared: 0,
    uncompared: 0,
  }); // 存储各标签页的数量统计
  const navigate = useNavigate();

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      form.resetFields();
      form.setFieldValue('compareResult', 'win');
    }
  }));

  // 辅助函数：获取当前的total统计数据
  const getCurrentTotals = () => {
    return {
      comparedTotal: tabCounts.compared,
      uncomparedTotal: tabCounts.uncompared,
    };
  };

  // 应用过滤器和分页
  const applyFiltersAndPagination = (
    data: any[],
    tab: string,
    page: number,
    size: number,
    comparedTotal?: number,
    uncomparedTotal?: number
  ) => {
    // 根据tab过滤数据
    let filteredData = data;
    if (tab === 'compared') {
      filteredData = data.filter(item => item.isCompared);
    } else if (tab === 'uncompared') {
      filteredData = data.filter(item => !item.isCompared);
    }

    // 计算正确的总数，使用传入的参数或回退到计算值
    let realTotal = filteredData.length;
    if (tab === 'compared') {
      realTotal = comparedTotal ?? tabCounts.compared ?? filteredData.length;
    } else if (tab === 'uncompared') {
      realTotal = uncomparedTotal ?? tabCounts.uncompared ?? filteredData.length;
    } else {
      realTotal = (comparedTotal ?? tabCounts.compared ?? 0) + (uncomparedTotal ?? tabCounts.uncompared ?? 0);
    }

    // 分页处理
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setData(paginatedData);
    setPagination(prev => ({
      ...prev,
      current: page,
      total: realTotal,
      pageSize: size
    }));
  };

  // 初始化数据获取（只在组件加载时调用一次接口）
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 检查搜索条件是否完整
      const { targetId, metricId, compareResult, comment } = searchFilters;
      const hasCompleteFilters = targetId && metricId && compareResult;

      // 构建查询参数，按照API文档要求的结构
      const queryParams: any = {};

      // query里放前三个搜索项（都有值才有）
      if (hasCompleteFilters) {
        queryParams.query = {
          targetId: searchFilters.targetId,
          metricId: searchFilters.metricId,
          compareResult: searchFilters.compareResult,
        };
      }

      // comment 字段独立处理，放在外面
      if (comment) {
        queryParams.comment = comment;
      }

      // 获取已对比和未对比的数据
      const [comparedResponse, uncomparedResponse] = await Promise.all([
        getContentList(assessmentId, 'COMPARED', 1, 9999, queryParams) as any, // 获取所有已对比数据
        getContentList(assessmentId, 'NOT_COMPARE', 1, 9999, queryParams) as any, // 获取所有未对比数据
      ]);

      let combinedData: ContentListItem[] = [];
      let comparedTotal = 0;
      let uncomparedTotal = 0;

      if (comparedResponse.code === 0) {
        const comparedData = (comparedResponse.data.list || []).map((item: any) => ({
          ...item,
          isCompared: true, // 显式标记为已对比
        }));
        combinedData = [...combinedData, ...comparedData];
        comparedTotal = comparedResponse.data.total || 0; // 使用接口返回的total字段
      }

      if (uncomparedResponse.code === 0) {
        const uncomparedData = (uncomparedResponse.data.list || []).map((item: any) => ({
          ...item,
          isCompared: false, // 显式标记为未对比
        }));
        combinedData = [...combinedData, ...uncomparedData];
        uncomparedTotal = uncomparedResponse.data.total || 0; // 使用接口返回的total字段
      }

      // 使用接口返回的total字段设置Tab数量
      setTabCounts({
        all: comparedTotal + uncomparedTotal,
        compared: comparedTotal,
        uncompared: uncomparedTotal,
      });

      setAllData(combinedData);

      // 初始化显示数据
      applyFiltersAndPagination(combinedData, activeTab, 1, pagination.pageSize, comparedTotal, uncomparedTotal);

    } catch (error) {
      console.error('Failed to fetch all data:', error);
      setAllData([]);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // 处理详情点击
  const handleDetailClick = async (rowId: string) => {
    try {
      // 计算当前数据在当前tab中的序号
      // 需要基于当前页码和数据在页面中的位置计算全局序号
      const currentPageData = data;
      const indexInPage = currentPageData.findIndex(item => item.id === rowId);
      const globalIndex = (pagination.current - 1) * pagination.pageSize + indexInPage + 1;

      // 构建查询参数
      const queryParams = new URLSearchParams({
        ...(activeTab !== 'all' && { tab: activeTab }), // 全部状态不传tab参数
        index: globalIndex.toString(), // 在当前tab中的序号
      });

      // 根据评估类型跳转到不同的详情页
      if (evaluationType === 'single') {
        // 单个评估跳转到单个评估详情页
        navigate(`/ManualAssessment/singleCompareDetail/${assessmentId}/content/${rowId}?${queryParams.toString()}`);
      } else {
        // 多个评估跳转到多个评估详情页
        navigate(`/ManualAssessment/multiDetail/${assessmentId}/content/${rowId}?${queryParams.toString()}`);
      }
    } catch (error) {
      message.error('跳转详情页面失败');
    }
  };

  // 表格列定义（根据 ContentListItem 数据结构）
  const columns: ColumnsType<ContentListItem> = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      align: 'center',
      fixed: 'left',
      render: (_, __, index) => {
        // 确保序号从当前页的正确位置开始计算
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: 'query',
      dataIndex: 'query',
      key: 'query',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <div style={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: '主要目标答案',
      dataIndex: 'primaryTargetAnswer',
      key: 'primaryTargetAnswer',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <div style={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: '对比目标答案',
      dataIndex: 'comparisonTargetAnswer',
      key: 'comparisonTargetAnswer',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip title={text} placement="topLeft">
          <div style={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}>
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          'COMPARED': '已对比',
          'NOT_COMPARE': '未对比',
        };
        return statusMap[status as keyof typeof statusMap] || status;
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (time) => {
        if (!time) return '-';
        return time; // API 已经返回格式化的时间字符串
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          onClick={() => handleDetailClick(record.id)}
        >
          查看详情
        </Button>
      ),
    },
  ];

  // 分页变化处理
  // 分页变化处理
  const handlePaginationChange = (page: number, pageSize: number) => {
    const { comparedTotal, uncomparedTotal } = getCurrentTotals();
    applyFiltersAndPagination(allData, activeTab, page, pageSize, comparedTotal, uncomparedTotal);
  };

  // 清除搜索条件
  const handleClearFilters = () => {
    // 重置表单
    form.resetFields();
    // 设置对比结果默认为胜利
    form.setFieldValue('compareResult', 'win');

    // 调用父组件的清除函数，清除上方展示内容和搜索条件
    if (onClearFilters) {
      onClearFilters();
    }

    // 同时通知父组件搜索条件变化
    if (onSearchFiltersChange) {
      onSearchFiltersChange({
        compareResult: 'win'
      });
    }
  };  // 搜索按钮点击处理
  const handleSearch = async () => {
    try {
      const values = await form.validateFields();
      setSearchLoading(true);

      // 通知父组件搜索条件变化
      if (onSearchFiltersChange) {
        onSearchFiltersChange(values);
      }
    } catch (error) {
      console.error('Search validation failed:', error);
    } finally {
      setSearchLoading(false);
    }
  };  // Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // Tab切换时重置到第一页
    const { comparedTotal, uncomparedTotal } = getCurrentTotals();
    applyFiltersAndPagination(allData, key, 1, pagination.pageSize, comparedTotal, uncomparedTotal);
  };

  // 计算表格高度
  useEffect(() => {
    const calculateTableHeight = () => {
      const viewportHeight = window.innerHeight;
      const headerHeight = 120; // 页面头部高度
      const comparisonChartHeight = 250; // 对比图表高度
      const searchFormHeight = 100; // 搜索表单高度
      const tabsHeight = 40; // Tabs 高度
      const paginationHeight = 60; // 分页器高度
      const cardPadding = 48; // Card 内边距
      const margins = 40; // 其他边距
      const filterCardHeight = hasFilterCard ? 65 : 0; // 筛选条件卡片高度（包括margin）

      const availableHeight =
        viewportHeight -
        headerHeight -
        comparisonChartHeight -
        searchFormHeight -
        tabsHeight -
        paginationHeight -
        cardPadding -
        margins -
        filterCardHeight;
      setTableHeight(Math.max(300, availableHeight)); // 最小高度 300px
    };

    calculateTableHeight();
    window.addEventListener('resize', calculateTableHeight);
    return () => window.removeEventListener('resize', calculateTableHeight);
  }, [hasFilterCard]); // 添加hasFilterCard依赖

  // 监听 activeTab 变化
  useEffect(() => {
    if (allData.length > 0) {
      const { comparedTotal, uncomparedTotal } = getCurrentTotals();
      applyFiltersAndPagination(allData, activeTab, 1, pagination.pageSize, comparedTotal, uncomparedTotal);
    }
  }, [activeTab, allData]);

  // 监听依赖变化
  useEffect(() => {
    fetchAllData(); // 初始化获取所有数据（包含Tab统计数据）
  }, [assessmentId, selectedDimension, selectedVersion, searchFilters]);

  // 同步搜索表单值
  useEffect(() => {
    // 设置表单值，确保对比结果有默认值
    const formValues = {
      ...searchFilters,
      compareResult: searchFilters.compareResult || 'win', // 默认为胜利
    };
    form.setFieldsValue(formValues);
  }, [searchFilters, form]);

  return (
    <Card
      title="评估详情"
      extra={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Form
            form={form}
            layout="inline"
            initialValues={{ compareResult: 'win' }}
            style={{ marginBottom: 0 }}
            onValuesChange={(changedValues, allValues) => {
              // 当表单值变化时，通知父组件
              if (onSearchFiltersChange) {
                onSearchFiltersChange(allValues);
              }
            }}
          >
            {/* 根据评估类型显示不同的搜索字段 */}
            {evaluationType === 'multi' && (
              <>
                <Form.Item name="metricId" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="评估维度"
                    allowClear
                    style={{ width: 200 }}
                    options={dimensionOptions}
                  />
                </Form.Item>
                <Form.Item name="targetId" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="对象版本"
                    allowClear
                    style={{ width: 200 }}
                    options={targetOptions}
                  />
                </Form.Item>
                <Form.Item name="compareResult" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="对比结果"
                    style={{ width: 160 }}
                    options={[
                      { label: '胜利', value: 'win' },
                      { label: '失败', value: 'lose' },
                      { label: '平局', value: 'draw' },
                    ]}
                  />
                </Form.Item>
              </>
            )}
            {evaluationType === 'single' && (
              <>
                <Form.Item name="status" style={{ marginBottom: 0 }}>
                  <Select
                    placeholder="评估状态"
                    allowClear
                    style={{ width: 160 }}
                    options={[
                      { label: '已完成', value: 'COMPLETED' },
                      { label: '未完成', value: 'PENDING' },
                    ]}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item name="comment" style={{ marginBottom: 0 }}>
              <Input
                placeholder="内容搜索"
                allowClear
                style={{ width: 300 }}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                loading={searchLoading}
                onClick={handleSearch}
              >
                搜索
              </Button>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                onClick={handleClearFilters}
              >
                清除
              </Button>
            </Form.Item>
          </Form>
        </div>
      }
      styles={{
        body: {
          padding: '0 16px'
        }
      }}
    >
      <div >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={[
            {
              key: 'all',
              label: `全部 (${tabCounts.all})`,
            },
            {
              key: 'compared',
              label: `已对比 (${tabCounts.compared})`,
            },
            {
              key: 'uncompared',
              label: `未对比 (${tabCounts.uncompared})`,
            },
          ]}
        />
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: handlePaginationChange,
          }}
          scroll={{ x: 'max-content', y: tableHeight }}
          rowKey="id"
        />
      </div>
    </Card>
  );
});

export default ResultTable;
