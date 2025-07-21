/*
 * @creater: panan
 * @message: 多个评估详情页 - 对比评估页
 * @since: 2025-07-12 16:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-21 09:24:24
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/pages/Assessment                 <Space>
              <Button
                type="text"
                icon={<RollbackOutlined />}
                onClick={handleBack}
              >
                返回
              </Button>
              <Title level={4} style={{ margin: 0 }}>
                {data.name}Button
                type="text"
                icon={<RollbackOutlined />}
                onClick={handleBack}
              >
                返回
              </Button>tail.tsx
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message, Spin, Row, Col, Typography, Card, Space } from 'antd';
import { RollbackOutlined, ReloadOutlined } from '@ant-design/icons';
import { VersionComparisonData, getAssessmentMultiDetail, getAssessmentInfo } from '../api';
import ComparisonChart from '../components/ComparisonChart';
import ResultTable from '../components/ResultTable';

const { Title } = Typography;

const AssessmentMultiDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VersionComparisonData | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<string | undefined>();
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>();

  // 从 URL 参数获取任务类型
  const searchParams = new URLSearchParams(window.location.search);
  const taskType = (searchParams.get('taskType') || 'multi') as 'single' | 'multi';

  // 搜索条件状态
  const [searchFilters, setSearchFilters] = useState<{
    targetId?: number;
    metricId?: number;
    compareResult?: string;
    comment?: string;
  }>({
    compareResult: 'win', // 默认为胜利
  });

  const resultTableRef = useRef<any>(null);

  // 获取评估详情数据
  const fetchData = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await getAssessmentMultiDetail(id) as any;
      if (response.code === 0) {
        setData(response.data);
      } else {
        message.error(response.msg || '获取评估详情失败');
      }
    } catch (error) {
      console.error('Failed to fetch assessment detail:', error);
      message.error('获取评估详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取原始统计数据（用于搜索选项）
  const [rawStatistics, setRawStatistics] = useState<any[]>([]);

  const fetchRawStatistics = async () => {
    if (!id) return;
    try {
      const response = await getAssessmentInfo(id) as any;
      if (response.code === 0) {
        setRawStatistics(response.data.statisticsList || []);
      }
    } catch (error) {
      console.error('Failed to fetch raw statistics:', error);
    }
  };

  // 获取维度选项（去重）
  const getDimensionOptions = () => {
    const dimensionMap = new Map();
    rawStatistics.forEach(stat => {
      if (!dimensionMap.has(stat.metricName)) {
        dimensionMap.set(stat.metricName, {
          label: stat.metricName,
          value: stat.metricId, // 使用 metricId 作为值
        });
      }
    });
    return Array.from(dimensionMap.values());
  };

  // 获取目标版本选项（去重）
  const getTargetOptions = () => {
    const targetMap = new Map();
    rawStatistics.forEach(stat => {
      if (!targetMap.has(stat.targetName)) {
        targetMap.set(stat.targetName, {
          label: stat.targetName,
          value: stat.targetId,
        });
      }
    });
    return Array.from(targetMap.values());
  };

  // 根据维度名称和版本名称获取对应的ID
  const getIdsByNames = (dimensionName?: string, versionName?: string) => {
    let metricId: number | undefined;
    let targetId: number | undefined;

    if (dimensionName) {
      const stat = rawStatistics.find(s => s.metricName === dimensionName);
      metricId = stat?.metricId;
    }

    if (versionName) {
      const stat = rawStatistics.find(s => s.targetName === versionName);
      targetId = stat?.targetId;
    }

    return { metricId, targetId };
  };

  // 刷新数据
  const handleRefresh = () => {
    fetchData();
    message.success('刷新成功');
  };

  // 返回列表页
  const handleBack = () => {
    navigate('/ManualAssessment');
  };

  // 柱状图点击处理
  const handleDimensionClick = (dimensionKey: string, version?: string) => {
    setSelectedDimension(dimensionKey);
    setSelectedVersion(version);

    // 获取对应的ID并更新搜索条件
    const { metricId, targetId } = getIdsByNames(dimensionKey, version);
    const newFilters = {
      ...searchFilters,
      metricId,
      targetId,
      compareResult: searchFilters.compareResult || 'win', // 确保对比结果有值
    };
    setSearchFilters(newFilters);

    if (version) {
      message.info(`已选择维度: ${dimensionKey}, 版本: ${version}`);
    } else {
      message.info(`已选择维度: ${dimensionKey}`);
    }
  };

  // 搜索条件变化处理
  const handleSearchFiltersChange = (newFilters: typeof searchFilters) => {
    setSearchFilters(newFilters);

    // 根据ID反向查找名称，更新显示状态
    const dimensionName = rawStatistics.find(s => s.metricId === newFilters.metricId)?.metricName;
    const versionName = rawStatistics.find(s => s.targetId === newFilters.targetId)?.targetName;

    setSelectedDimension(dimensionName);
    setSelectedVersion(versionName);
  };  // 清除筛选条件的处理函数
  const handleClearFilters = () => {
    setSelectedDimension(undefined);
    setSelectedVersion(undefined);
    setSearchFilters({
      compareResult: 'win', // 保持对比结果为胜利
    });

    // 调用子组件的表单重置方法
    if (resultTableRef.current) {
      resultTableRef.current.resetForm();
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchData();
    fetchRawStatistics();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        flexDirection: 'column',
        gap: 16,
      }}>
        <div>数据加载失败</div>
        <Button type="primary" onClick={fetchData}>
          重新加载
        </Button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* 顶部区域 */}
      <Card style={{ marginBottom: '8px' }} bodyStyle={{ padding: '12px 16px' }}>
        <Row align="middle">
          <Col>
            <Space>
              <Button
                type="text"
                icon={<RollbackOutlined />}
                onClick={handleBack}
              ></Button>
              <Title level={4} style={{ margin: 0 }}>
                {data.name}
              </Title>
            </Space>
          </Col>
          <Col flex="auto" />
          <Col>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              type="default"
            >
              刷新
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 选中状态显示 */}
      {(selectedDimension || selectedVersion) && (
        <Card
          size="small"
          style={{ marginBottom: 16, backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe' }}
        >
          <Space>
            <span style={{ color: '#1e40af', fontWeight: 'bold' }}>当前筛选:</span>
            {selectedDimension && (
              <span style={{ color: '#059669' }}>维度: {selectedDimension}</span>
            )}
            {selectedVersion && (
              <span style={{ color: '#7c3aed' }}>版本: {selectedVersion}</span>
            )}
            <Button
              type="link"
              size="small"
              onClick={handleClearFilters}
            >
              清除筛选
            </Button>
          </Space>
        </Card>
      )}

      {/* 中间对比图区域 */}
      <ComparisonChart
        data={data.dimensions}
        progress={data.progress}
        onDimensionClick={handleDimensionClick}
      />

      {/* 下方详情表格 */}
      <ResultTable
        ref={resultTableRef}
        assessmentId={id!}
        selectedDimension={selectedDimension}
        selectedVersion={selectedVersion}
        searchFilters={searchFilters}
        dimensionOptions={getDimensionOptions()}
        targetOptions={getTargetOptions()}
        onSearchFiltersChange={handleSearchFiltersChange}
        onClearFilters={handleClearFilters}
        onRefresh={handleRefresh}
        hasFilterCard={!!(selectedDimension || selectedVersion)}
        evaluationType={taskType} // 传递任务类型
      />
    </div>
  );
};

export default AssessmentMultiDetail;