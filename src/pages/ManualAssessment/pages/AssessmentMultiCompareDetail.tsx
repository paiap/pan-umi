/*
 * @creater: panan
 * @message: 多对比评估详情页
 * @since: 2025-07-14 00:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-14 16:49:18
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/pages/AssessmentMultiCompareDetail.tsx
 */

import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Space, Spin, message, Typography, Avatar } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'umi';
import ContentDisplay from '../components/ContentDisplay';
import ComparisonComment from '../components/ComparisonComment';
import FullscreenDisplay from '../components/FullscreenDisplay';
import {
  getTaskLineDetail,
  submitTaskLineScoring,
  type UnifiedSubmitData,
} from '../api';
import './AssessmentMultiCompareDetail.css';

// 基于单个评估详情接口的数据类型定义
interface TaskLineDetailData {
  id: string;
  taskId: number;
  instruction: string;
  query: string;
  primaryTargetId: number;
  primaryTargetName: string;
  primaryTargetAnswer: string;
  primaryTargetScore: Array<{
    metricId: string;
    metricName: string;
    metricDescription: string;
    metricScore: number;
    compareResult: 'win' | 'lose' | 'draw';
    createTime: string;
  }>;
  comparisonTargetId: number;
  comparisonTargetName: string | number;
  comparisonTargetAnswer: string;
  comparisonTargetScore: Array<{
    metricId: string;
    metricName: string;
    metricDescription: string;
    metricScore: number;
    compareResult: 'win' | 'lose' | 'draw';
    createTime: string;
  }>;
  comment: {
    text: string;
    images: string[];
  } | null;
  status: 'NOT_COMPARE' | 'COMPARED';
  creator: string;
  createTime: string;
}

const { Text } = Typography;

const AssessmentMultiCompareDetail: React.FC = () => {
  const params = useParams<{
    assessmentId?: string;
    rowId?: string;
    contentId?: string;
    taskId?: string;
    lineId?: string;
  }>();

  // 解析URL查询参数
  const searchParams = new URLSearchParams(window.location.search);
  const navigationContext = {
    tab: searchParams.get('tab') || 'all', // 来源tab状态，默认为'all'  
    index: parseInt(searchParams.get('index') || '1'), // 在当前tab中的序号，默认为1
  };

  // 处理不同的路由格式
  // 支持新路由: /ManualAssessment/multiDetail/:assessmentId/content/:contentId
  // 支持旧路由: /ManualAssessment/multiDetail/task_1/content/:lineId
  const assessmentId = params.assessmentId || params.taskId || 'task_1';
  const contentId = params.contentId || params.lineId;

  console.log('🎯 [AssessmentMultiCompareDetail] Route params:', {
    assessmentId,
    contentId,
    navigationContext
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<TaskLineDetailData | null>(null);
  const [dimensionSelections, setDimensionSelections] = useState<Record<string, string>>({});
  const [comment, setComment] = useState<{ text?: string; images?: string[] }>({});
  const [fullscreenData, setFullscreenData] = useState<{ title: string; content: string } | null>(null);

  // 导航状态管理
  const getInitialIndex = () => {
    if (contentId) {
      const parsed = parseInt(contentId);
      return !isNaN(parsed) && parsed > 0 ? parsed : navigationContext.index;
    }
    return navigationContext.index;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex());
  const [totalCount, setTotalCount] = useState(1);
  const [canNavigatePrev, setCanNavigatePrev] = useState(false);
  const [canNavigateNext, setCanNavigateNext] = useState(false);

  // 加载单条评估详情数据
  const loadData = async (pageNum: number = currentIndex) => {
    console.log('🔍 [AssessmentMultiCompareDetail] loadData called:', {
      assessmentId,
      contentId,
      pageNum,
      currentIndex
    });

    if (!assessmentId) {
      console.error('❌ [AssessmentMultiCompareDetail] assessmentId is missing');
      return;
    }

    // 如果有具体的contentId，优先使用contentId作为pageNum
    // 这里假设contentId就是行号/页号
    let actualPageNum = pageNum;
    if (contentId) {
      const parsedContentId = parseInt(contentId);
      if (!isNaN(parsedContentId) && parsedContentId > 0) {
        actualPageNum = parsedContentId;
      }
    }

    console.log('📤 [AssessmentMultiCompareDetail] Using pageNum:', actualPageNum); setLoading(true);
    try {
      console.log('📤 [AssessmentMultiCompareDetail] Calling getTaskLineDetail...');
      const response = await getTaskLineDetail(assessmentId, actualPageNum, 1) as any;
      console.log('📥 [AssessmentMultiCompareDetail] Response received:', response);

      if (response.code === 0 && response.data.data.length > 0) {
        const taskLineData = response.data.data[0];
        console.log('✅ [AssessmentMultiCompareDetail] Task line data:', taskLineData);
        setData(taskLineData);

        // 设置总数和导航状态
        setTotalCount(response.data.total || 1);
        setCurrentIndex(actualPageNum);
        setCanNavigatePrev(actualPageNum > 1);
        setCanNavigateNext(actualPageNum < (response.data.total || 1));

        // 如果已完成评估，回显数据
        if (taskLineData.status === 'COMPARED') {
          // 回显评论数据
          if (taskLineData.comment) {
            setComment({
              text: taskLineData.comment.text,
              images: taskLineData.comment.images || []
            });
          }

          // 从 primaryTargetScore 中恢复评估选择
          // 根据状态已经是 COMPARED，我们可以直接恢复所有有效的选择
          if (taskLineData.primaryTargetScore && taskLineData.primaryTargetScore.length > 0) {
            const selections: Record<string, string> = {};
            taskLineData.primaryTargetScore.forEach((score: any) => {
              // 只要分数存在就回显选择（已完成状态下的分数都是有效的）
              if (score.metricScore !== undefined && score.metricScore !== null) {
                selections[score.metricId] = score.metricScore.toString();
              }
            });
            setDimensionSelections(selections);
          }
        } else {
          // 未完成状态，清空数据
          setComment({});
          setDimensionSelections({});
        }
      } else {
        console.error('❌ [AssessmentMultiCompareDetail] No data received:', response);
        message.error('获取评估详情失败');
      }
    } catch (error) {
      console.error('❌ [AssessmentMultiCompareDetail] 加载数据失败:', error);
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 检查边界状态
  const checkBoundaries = async () => {
    if (!assessmentId) return;

    try {
      // 检查上一条
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 1) {
        const prevResponse = await getTaskLineDetail(assessmentId, prevIndex, 1) as any;
        setCanNavigatePrev(prevResponse.code === 0 && prevResponse.data.data.length > 0);
      } else {
        setCanNavigatePrev(false);
      }

      // 检查下一条
      const nextIndex = currentIndex + 1;
      const nextResponse = await getTaskLineDetail(assessmentId, nextIndex, 1) as any;
      setCanNavigateNext(nextResponse.code === 0 && nextResponse.data.data.length > 0);

    } catch (error) {
      console.error('边界检查失败:', error);
      setCanNavigatePrev(false);
      setCanNavigateNext(false);
    }
  };

  // 基于索引的导航函数
  const navigateByIndex = async (targetIndex: number) => {
    if (!assessmentId) return;

    try {
      setCurrentIndex(targetIndex);

      // 构建新的URL参数
      const queryParams = new URLSearchParams({
        ...(navigationContext.tab !== 'all' && { tab: navigationContext.tab }),
        index: targetIndex.toString(),
      });

      // 导航到新的URL并加载数据
      const newUrl = `/ManualAssessment/multiDetail/${assessmentId}/content/${targetIndex}?${queryParams.toString()}`;
      navigate(newUrl);

      // 重新加载数据
      await loadData(targetIndex);
    } catch (error) {
      console.error('导航失败:', error);
      message.error('导航失败');
    }
  };

  // 初始化数据加载
  useEffect(() => {
    loadData();
  }, [assessmentId, contentId]);

  // 检查边界
  useEffect(() => {
    if (data) {
      checkBoundaries();
    }
  }, [data, currentIndex]);

  // 返回多对比评估详情列表页
  const handleBack = () => {
    navigate(`/ManualAssessment/multiDetail/${assessmentId}`);
  };

  // 刷新数据
  const handleRefresh = () => {
    loadData();
    message.success('刷新成功');
  };

  // 评论变化
  const handleCommentChange = (value: { text?: string; images?: string[] }) => {
    setComment(value);
  };

  // 选项选择
  const handleSelectOption = (dimensionKey: string, optionKey: string) => {
    setDimensionSelections(prev => ({
      ...prev,
      [dimensionKey]: optionKey
    }));
  };

  // 上一条
  const handlePrev = () => {
    if (canNavigatePrev) {
      navigateByIndex(currentIndex - 1);
    }
  };

  // 下一条
  const handleNext = () => {
    if (canNavigateNext) {
      navigateByIndex(currentIndex + 1);
    }
  };

  // 提交并下一条
  const handleSubmitAndNext = async () => {
    if (!data || !assessmentId) return;

    // 验证所有维度都已选择
    const unselectedDimensions = data.primaryTargetScore.filter((metric: any) => !dimensionSelections[metric.metricId]);
    if (unselectedDimensions.length > 0) {
      // 滚动到第一个未打分的维度
      const firstUnselectedMetricId = unselectedDimensions[0].metricId;
      const targetElement = document.getElementById(`dimension-${firstUnselectedMetricId}`);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        // 添加高亮效果
        targetElement.style.backgroundColor = '#fff2e8';
        targetElement.style.border = '2px solid #ff7a45';
        setTimeout(() => {
          targetElement.style.backgroundColor = '';
          targetElement.style.border = '';
        }, 3000);
      }

      message.warning(`请完成所有维度的选择：${unselectedDimensions.map((d: any) => d.metricName).join('、')}`);
      return;
    }

    setSubmitting(true);
    try {
      // 构建评分数据
      const scoreArray = data.primaryTargetScore.map((metric: any) => ({
        metricId: metric.metricId,
        score: parseInt(dimensionSelections[metric.metricId])
      }));

      // 构建评论数据
      let commentData: { text?: string; images?: string[] } | undefined;
      if (comment.text || (comment.images && comment.images.length > 0)) {
        commentData = {};
        if (comment.text) commentData.text = comment.text;
        if (comment.images && comment.images.length > 0) commentData.images = comment.images;
      }

      const submitData: UnifiedSubmitData = {
        lineId: data.id,
        score: scoreArray,
        comment: commentData,
      };

      // 提交前打印参数确认
      console.log('🚀 [多个评估] 提交参数:', JSON.stringify(submitData, null, 2));

      const response = await submitTaskLineScoring(submitData) as any;
      if (response.code === 0) {
        message.success('提交成功');

        // 更新当前数据状态为已完成
        setData(prev => prev ? { ...prev, status: 'COMPARED' } : prev);

        // 重新加载当前数据以获取最新的评估状态和数据
        await loadData(currentIndex);

        // 延迟一下确保数据更新完成再导航
        setTimeout(async () => {
          if (canNavigateNext) {
            await navigateByIndex(currentIndex + 1);
          } else {
            message.info('已完成所有对比任务');
            // 可以选择停留在当前页面查看完成状态，或返回列表
            // handleBack();
          }
        }, 500);
      } else {
        message.error(response.msg || '提交失败');
      }
    } catch (error) {
      message.error('提交失败');
      console.error('提交错误:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // 全屏显示
  const handleFullscreen = (title: string, content: string) => {
    setFullscreenData({ title, content });
  };

  // 关闭全屏
  const handleCloseFullscreen = () => {
    setFullscreenData(null);
  };

  if (loading || !data) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="multi-compare-detail-root" style={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden'
      }}>
        {/* 顶部栏 */}
        <Card style={{ marginBottom: 16, flexShrink: 0 }} bodyStyle={{ padding: '12px 16px' }}>
          <Row align="middle">
            <Col>
              <Space>
                <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>
                  返回
                </Button>
                <span style={{ fontWeight: 600, fontSize: 18 }}>
                  模型多对比任务详情
                </span>
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space>
                <Text type="secondary">
                  {currentIndex + 1} / {totalCount}
                </Text>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                  刷新
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 主体区域 */}
        <div style={{ flex: 1, overflow: 'hidden', marginBottom: 16 }}>
          <Row gutter={16} style={{ height: '100%' }}>
            {/* 左侧内容区 */}
            <Col span={18}>
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Query和答案对比区域 - 固定高度 */}
                <Card
                  bodyStyle={{ padding: 12, height: '100%', display: 'flex', flexDirection: 'column' }}
                  style={{
                    height: 600,
                    overflow: 'hidden',
                    marginBottom: 12
                  }}
                >
                  {/* Query区域 - 占2/7 */}
                  <div style={{
                    flex: '0 0 28.57%',
                    marginBottom: 8,
                    minHeight: 80,
                    overflow: 'hidden',
                    height: '28.57%',
                  }}>
                    <div style={{ height: '100%' }}>
                      <ContentDisplay
                        title="Query"
                        content={data.query}
                        height="100%"
                        style={{ height: '100%' }}
                        onFullscreen={handleFullscreen}
                      />
                    </div>
                  </div>

                  {/* Answer对比区域 - 占5/7 */}
                  <div style={{
                    flex: '0 0 71.43%',
                    minHeight: 140,
                    overflow: 'hidden',
                    height: '71.43%',
                  }}>
                    <Row gutter={0} style={{ height: '100%', margin: '0' }}>
                      <Col span={12} style={{
                        height: '100%',
                      }}>
                        <div style={{ height: '100%', margin: '0 5px 0 0' }}>
                          <ContentDisplay
                            title="Answer A"
                            content={data.primaryTargetAnswer}
                            height="100%"
                            style={{ height: '100%' }}
                            onFullscreen={handleFullscreen}
                          />
                        </div>
                      </Col>
                      <Col span={12} style={{
                        height: '100%',
                      }}>
                        <div style={{ height: '100%', margin: '0 0 0 5px' }}>
                          <ContentDisplay
                            title="Answer B"
                            content={data.comparisonTargetAnswer}
                            height="100%"
                            style={{ height: '100%' }}
                            onFullscreen={handleFullscreen}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>评估维度</span>
                      {data.primaryTargetScore && data.primaryTargetScore.length > 0 && (
                        <div style={{ fontSize: 12, color: '#666', fontWeight: 'normal' }}>
                          评估类别：{data.primaryTargetScore.map(metric => metric.metricName).join('、')}
                        </div>
                      )}
                    </div>
                  }
                  className="evaluation-dimension-card"
                  styles={{
                    body: {
                      flex: 1,
                      minHeight: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '300px', // 固定一个较小的高度来测试滚动
                      margin: '0'
                    }
                  }}
                >
                  {/* 评估维度区域 - 自动撑满剩余空间 */}
                  {data.primaryTargetScore && data.primaryTargetScore.length > 0 && (
                    <div
                      style={{
                        height: '100%',
                        overflowY: 'auto',
                      }}
                    >
                      {data.primaryTargetScore.map((metric, index) => (
                        <div
                          key={metric.metricId}
                          id={`dimension-${metric.metricId}`}
                          className="multi-compare-detail-dimension-item"
                          style={{
                            marginBottom: 24,
                            transition: 'all 0.3s ease',
                            borderRadius: '6px',
                            padding: '12px'
                          }}
                        >
                          <Space style={{ marginBottom: 12 }} align="center">
                            <Avatar
                              size={20}
                              style={{
                                backgroundColor: '#1890ff',
                                fontSize: 12,
                                minWidth: 20,
                                height: 20
                              }}
                            >
                              {index + 1}
                            </Avatar>
                            <Typography.Text strong style={{ fontSize: 15 }}>
                              {metric.metricName}
                            </Typography.Text>
                            <Typography.Text style={{ fontSize: 13, color: '#666' }}>
                              {metric.metricDescription}
                            </Typography.Text>
                          </Space>

                          {/* 评估选项 */}
                          <Row gutter={[12, 12]} style={{ marginTop: 12 }}>
                            {[
                              { key: '-2', title: '← A更好', value: -2 },
                              { key: '0', title: '平局', value: 0 },
                              { key: '2', title: 'B更好 →', value: 2 }
                            ].map((option) => {
                              const colSpan = 8; // 3个选项，每个占8/24
                              const isSelected = dimensionSelections[metric.metricId] === option.key;
                              const isCompleted = data.status === 'COMPARED';

                              return (
                                <Col span={colSpan} key={option.key}>
                                  <Button
                                    block
                                    type={isSelected ? 'primary' : 'default'}
                                    disabled={isCompleted}
                                    onClick={() => !isCompleted && handleSelectOption(metric.metricId, option.key)}
                                    style={{ height: 36 }}
                                  >
                                    {option.title}
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </Col>

            {/* 右侧说明区 */}
            <Col span={6}>
              <Card
                bodyStyle={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}
                style={{ height: '100%' }}
                title="对比说明"
              >
                <ComparisonComment
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="请选择你认为更好的答案并添加评价说明..."
                  disabled={data.status === 'COMPARED'}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* 底部操作区 */}
        <Card style={{ flexShrink: 0 }} bodyStyle={{ padding: 12 }}>
          <Row justify="center" align="middle">
            <Col>
              <Space size="large">
                <Button
                  onClick={handlePrev}
                  disabled={currentIndex <= 0}
                  icon={<ArrowLeftOutlined />}
                >
                  上一条
                </Button>
                <Text type="secondary">
                  {currentIndex + 1} / {totalCount}
                </Text>
                <Button
                  onClick={handleNext}
                  disabled={!canNavigateNext}
                >
                  下一条
                  <ArrowLeftOutlined style={{ transform: 'rotate(180deg)' }} />
                </Button>
                {/* 只在未完成状态下显示提交按钮 */}
                {data.status !== 'COMPARED' && (
                  <Button
                    type="primary"
                    loading={submitting}
                    onClick={handleSubmitAndNext}
                    style={{ marginLeft: 16 }}
                  >
                    完成并下一条
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Card>
      </div>

      {/* 全屏显示 */}
      <FullscreenDisplay
        visible={!!fullscreenData}
        title={fullscreenData?.title || ''}
        content={fullscreenData?.content || ''}
        onClose={handleCloseFullscreen}
      />
    </>
  );
};

export default AssessmentMultiCompareDetail; 