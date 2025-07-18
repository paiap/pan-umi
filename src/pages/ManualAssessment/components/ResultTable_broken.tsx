/*
 * @creater: panan
 * @message: 结果表格组件
 * @since: 2025-07-12 16:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-14 14:02:54
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ResultTable.tsx
 */

import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Form, Space, Table, Tabs, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { DetailTableItem, getRowDetailInfo, getContentList } from '../api';
import { useNavigate } from 'react-router-dom';

interface ResultTableProps {
  assessmentId: string;
  selectedDimension?: string;
  selectedVersion?: string;
  onRefresh?: () => void;
  hasFilterCard?: boolean; // 是否有筛选条件卡片
}

const ResultTable: React.FC<ResultTableProps> = ({
  assessmentId,
  selectedDimension,
  selectedVersion,
  onRefresh,
  hasFilterCard = false, // 默认值为false
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DetailTableItem[]>([]);
  const [allData, setAllData] = useState<DetailTableItem[]>([]); // 存储所有数据
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

  // 初始化数据获取（只在组件加载时调用一次接口）
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 获取所有状态的数据
      const uncomparedResponse = await getContentList(assessmentId, 'NOT_COMPARE', 1, 999) as any;
      const comparedResponse = await getContentList(assessmentId, 'COMPARED', 1, 999) as any;
      
      let combinedData: DetailTableItem[] = [];
      
      if (uncomparedResponse.code === 0) {
        combinedData = [...combinedData, ...(uncomparedResponse.data.list || [])];
      }
      
      if (comparedResponse.code === 0) {
        combinedData = [...combinedData, ...(comparedResponse.data.list || [])];
      }
      
      setAllData(combinedData);
      // 初始显示所有数据的第一页
      applyFiltersAndPagination(combinedData, activeTab, 1, pagination.pageSize);
      
    } catch (error) {
      console.error('Failed to fetch all data:', error);
      setAllData([]);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // 应用筛选和分页（本地数据处理）
  const applyFiltersAndPagination = (
    sourceData: DetailTableItem[], 
    tab: string, 
    pageNum: number, 
    pageSize: number
  ) => {
    // 根据tab筛选数据
    let filteredData = sourceData;
    if (tab === 'compared') {
      filteredData = sourceData.filter(item => item.status === 'COMPARED');
    } else if (tab === 'uncompared') {
      filteredData = sourceData.filter(item => item.status === 'NOT_COMPARE');
    }
    // tab === 'all' 时显示所有数据
    
    // 计算分页
    const total = filteredData.length;
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    setData(pageData);
    setPagination({
      current: pageNum,
      pageSize,
      total,
    });
  };

  // 更新统计数据（基于本地数据）
  const updateTabCounts = (sourceData: DetailTableItem[]) => {
    const comparedCount = sourceData.filter(item => item.status === 'COMPARED').length;
    const uncomparedCount = sourceData.filter(item => item.status === 'NOT_COMPARE').length;
    const allCount = sourceData.length;
    
    setTabCounts({
      all: allCount,
      compared: comparedCount,
      uncompared: uncomparedCount,
    });
  };  // 处理详情点击
  const handleDetailClick = async (rowId: string) => {
    try {
      const response = await getRowDetailInfo(assessmentId, rowId) as any;
      if (response.code === 0) {
        const { contentId } = response.data;
        navigate(`/ManualAssessment/multiDetail/${assessmentId}/content/${rowId}/${contentId}`);
      } else {
        message.error(response.msg || '获取详情信息失败');
      }
    } catch (error) {
      message.error('获取详情信息失败');
    }
  };

  // 表格列定义（根据新接口数据结构）
  const columns: ColumnsType<DetailTableItem> = [
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
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <span 
          title={text} 
          style={{ 
            display: 'block',
            maxWidth: '250px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'primaryTargetAnswer',
      dataIndex: 'primaryTargetAnswer',
      key: 'primaryTargetAnswer',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <span 
          title={text} 
          style={{ 
            display: 'block',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'comparisonTargetAnswer',
      dataIndex: 'comparisonTargetAnswer',
      key: 'comparisonTargetAnswer',
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <span 
          title={text} 
          style={{ 
            display: 'block',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (status) => {
        const statusMap: Record<string, { text: string; color: string }> = {
          'NOT_COMPARE': { text: '未处理', color: '#fa8c16' },
          'COMPARED': { text: '已处理', color: '#52c41a' },
        };
        const statusInfo = statusMap[status] || { text: '-', color: '#666' };
        return (
          <span
            style={{
              color: statusInfo.color,
              fontWeight: 'bold',
            }}
          >
            {statusInfo.text}
          </span>
        );
      },
    },
    {
      title: 'creator',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
      align: 'center' as const,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <span 
          title={text} 
          style={{ 
            display: 'block',
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'createTime',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      align: 'center' as const,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <span 
          title={text} 
          style={{ 
            display: 'block',
            maxWidth: '160px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      align: 'center' as const,
      fixed: 'right',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDetailClick(record.id)}>详情</Button>
      ),
    },
  ];

  // 分页处理
  const handleTableChange = (paginationConfig: any) => {
    applyFiltersAndPagination(allData, activeTab, paginationConfig.current, paginationConfig.pageSize);
  };

  // 搜索
  const handleSearch = async () => {
    await form.validateFields();
    // 搜索时重置到第一页
    applyFiltersAndPagination(allData, activeTab, 1, pagination.pageSize);
  };
    applyFiltersAndPagination(allData, activeTab, 1, pagination.pageSize);
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
    // 重置时重置到第一页
    applyFiltersAndPagination(allData, activeTab, 1, pagination.pageSize);
  };

  // Tab切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    // Tab切换时重置到第一页
    applyFiltersAndPagination(allData, key, 1, pagination.pageSize);
  };

  // 刷新
  const handleRefresh = () => {
    fetchAllData(); // 重新获取所有数据
    onRefresh?.();
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
      applyFiltersAndPagination(allData, activeTab, 1, pagination.pageSize);
    }
  }, [activeTab, allData]);

  // 监听依赖变化
  useEffect(() => {
    fetchAllData(); // 初始化获取所有数据
  }, [assessmentId, selectedDimension, selectedVersion]);

  const tabItems = [
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
  ];

  return (
    <Card
      style={{
        backgroundColor: '#fff',
        borderRadius: 6,
        marginBottom: '8px',
      }}
      bodyStyle={{ padding: '0px 16px' }}
    >
      {/* Tab 和刷新按钮 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          style={{ marginBottom: -1 }}
        />
        <Button icon={<ReloadOutlined />} onClick={handleRefresh} type="text">
          刷新
        </Button>
      </div>

      <div style={{ padding: '16px 0' }}>
        {/* 搜索表单 */}
        <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
          {/* 暂时移除关键词和状态表单项，后续会添加其他表单项 */}
          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>

        {/* 表格 */}
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
            onChange: (page, pageSize) => {
              fetchData(page, pageSize);
            },
          }}
          scroll={{ x: 'max-content', y: tableHeight }}
          rowKey="id"
        />
      </div>
    </Card>
  );
};

export default ResultTable;
