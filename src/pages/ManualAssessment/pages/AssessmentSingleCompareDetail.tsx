/*
 * @creater: panan
 * @message: 单个评估详情页 - 使用统一交互逻辑但保持单个评估UI布局
 * @since: 2025-07-21 01:29:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-21 15:23:22
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/pages/AssessmentSingleCompareDetail.tsx
 */

import {
  ArrowLeftOutlined,
  CheckOutlined,
  LeftOutlined,
  ReloadOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'umi';
import {
  getContentList,
  getStatistics,
  submitTaskLineScoring,
  type UnifiedSubmitData,
} from '../api';
import ComparisonComment from '../components/ComparisonComment';
import ContentDisplay from '../components/ContentDisplay';
import FullscreenDisplay from '../components/FullscreenDisplay';
import ScoreRow from '../components/ScoreRow';

const { Title, Text } = Typography;

interface ContentData {
  id: string;
  query: string;
  primaryTargetAnswer: string;
  comparisonTargetAnswer: string;
  status: 'NOT_COMPARE' | 'COMPARED';
  evaluationStatus: 'PENDING' | 'COMPLETED';
  scores: {
    truthfulness: number;
    usability: number;
    consistency: number;
  } | null;
  evaluationComment: {
    text: string;
    screenshots: string[];
  } | null;
  comment: {
    text: string;
    images: string[];
  } | null;
  primaryTargetScore: Array<{
    metricId: number;
    metricName: string;
    metricDescription: string;
    metricScore: number;
    compareResult: 'win' | 'lose' | 'draw';
    createTime: string;
  }>;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface AssessmentData {
  taskId: number;
  name: string;
  description: string;
  totalLineCount: number;
  completedLineCount: number;
  totalCount: number;
  evaluatedCount: number;
  unevaluatedCount: number;
  averageScores: {
    truthfulness: number | string;
    usability: number | string;
    consistency: number | string;
  };
  progress: number;
  firstContentId?: string;
}

// 评分类别配置
const SCORE_CATEGORIES = [
  {
    key: 'usability',
    title: '可用性',
    id: 'score-row-usability'
  },
  {
    key: 'truthfulness',
    title: '真实性',
    id: 'score-row-truthfulness'
  },
  {
    key: 'consistency',
    title: '一致性',
    id: 'score-row-consistency'
  }
] as const;

type ScoreKey = typeof SCORE_CATEGORIES[number]['key'];

const AssessmentSingleCompareDetail: React.FC = () => {
  const params = useParams<{
    assessmentId?: string;
    contentId?: string;
  }>();

  // 解析URL查询参数
  const searchParams = new URLSearchParams(window.location.search);
  const navigationContext = {
    tab: searchParams.get('tab') || 'all',
    index: parseInt(searchParams.get('index') || '1'),
  };

  const assessmentId = params.assessmentId;
  const contentId = params.contentId;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null,
  );

  // 评分状态
  const [currentScores, setCurrentScores] = useState<Record<ScoreKey, number | undefined>>({
    usability: undefined,
    truthfulness: undefined,
    consistency: undefined
  });

  // 评论状态
  const [evaluationComment, setEvaluationComment] = useState<{
    text?: string;
    images?: string[];
  }>({});

  const [fullscreenData, setFullscreenData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  // 导航状态管理
  const [currentIndex, setCurrentIndex] = useState(navigationContext.index);
  const [totalCount, setTotalCount] = useState(1);
  const [canNavigatePrev, setCanNavigatePrev] = useState(false);
  const [canNavigateNext, setCanNavigateNext] = useState(false);

  // 高亮元素管理
  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null);

  // 清除高亮
  const clearHighlight = () => {
    if (highlightedElement) {
      highlightedElement.style.backgroundColor = '';
      highlightedElement.style.border = '';
      highlightedElement.style.borderRadius = '';
      highlightedElement.style.transition = '';
      setHighlightedElement(null);
    }
  };

  // 加载内容详情数据
  const loadContentDetail = async (pageNum: number = currentIndex) => {
    if (!assessmentId) {
      return;
    }

    setLoading(true);
    try {
      let evaluationType: 'NOT_COMPARE' | 'COMPARED' = 'NOT_COMPARE';
      if (navigationContext.tab === 'compared') {
        evaluationType = 'COMPARED';
      } else if (navigationContext.tab === 'uncompared') {
        evaluationType = 'NOT_COMPARE';
      } else {
        // 全部状态下，优先获取未评估的
        evaluationType = 'NOT_COMPARE';
      }

      const response = (await getContentList(
        assessmentId,
        evaluationType,
        pageNum,
        1,
      )) as any;
      if (response.code === 0 && response.data.list.length > 0) {
        const contentItem = response.data.list[0];
        setContentData(contentItem);
        setTotalCount(response.data.total || 1);
        setCurrentIndex(pageNum);
        setCanNavigatePrev(pageNum > 1);
        setCanNavigateNext(pageNum < (response.data.total || 1));

        // 如果已完成评估，回显数据
        if (
          contentItem.evaluationStatus === 'COMPLETED' &&
          contentItem.scores
        ) {
          // 回显评分数据
          setCurrentScores({
            truthfulness: contentItem.scores.truthfulness,
            usability: contentItem.scores.usability,
            consistency: contentItem.scores.consistency,
          });

          // 回显评论数据
          if (contentItem.comment) {
            setEvaluationComment({
              text: contentItem.comment.text,
              images: contentItem.comment.images || [],
            });
          }

        } else {
          // 未完成状态，清空数据
          setCurrentScores({
            usability: undefined,
            truthfulness: undefined,
            consistency: undefined
          });
          setEvaluationComment({});
        }
      } else {
        message.error('获取评估详情失败');
      }
    } catch (error) {
      console.error('❌ [AssessmentSingleCompareDetail] 加载数据失败:', error);
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 导航函数
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
      const newUrl = `/ManualAssessment/singleCompareDetail/${assessmentId}/content/content-${assessmentId}-${targetIndex}?${queryParams.toString()}`;
      navigate(newUrl);

      // 重新加载数据
      await loadContentDetail(targetIndex);
    } catch (error) {
      console.error('导航失败:', error);
      message.error('导航失败');
    }
  };

  // 初始化数据加载
  useEffect(() => {
    if (assessmentId) {
      loadContentDetail();
    } else {
      setLoading(false);
    }
  }, [assessmentId, contentId]);

  // 更新统计信息
  const updateStatistics = async () => {
    if (!assessmentId) return;
    try {
      const statsResponse = (await getStatistics(assessmentId)) as any;
      if (statsResponse.code === 0) {
        setAssessmentData((prev) =>
          prev
            ? {
              ...prev,
              ...statsResponse.data,
            }
            : null,
        );
      }
    } catch (error) {
      console.error('更新统计信息失败:', error);
    }
  };

  // 返回单个评估列表页
  const handleBack = () => {
    navigate(`/ManualAssessment/singleDetail/${assessmentId}`);
  };

  // 刷新数据
  const handleRefresh = () => {
    loadContentDetail();
    message.success('刷新成功');
  };

  // 评论变化
  const handleCommentChange = (value: { text?: string; images?: string[] }) => {
    setEvaluationComment(value);
  };

  // 评分变化
  const handleScoreChange = (dimension: ScoreKey, score: number) => {
    setCurrentScores((prev) => ({
      ...prev,
      [dimension]: score,
    }));
    clearHighlight(); // 清除高亮
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
    if (!contentData) return;

    // 检查是否已完成评分
    const uncompletedScores = SCORE_CATEGORIES.filter(
      category => currentScores[category.key] === undefined
    ).map(category => category.key);

    if (uncompletedScores.length > 0) {
      // 先清除之前的高亮
      clearHighlight();

      // 滚动到第一个未打分的维度
      const firstUncompletedScore = uncompletedScores[0];
      const targetElement = document.getElementById(
        `score-row-${firstUncompletedScore}`,
      );
      if (targetElement) {
        // 找到评估效果区域的容器，只在这个容器内滚动
        const scoreContainer = document.getElementById('score-container');
        if (scoreContainer) {
          // 获取目标元素相对于容器的位置
          const containerRect = scoreContainer.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const relativeTop =
            targetRect.top - containerRect.top + scoreContainer.scrollTop;

          // 滚动到目标位置，让元素在容器中居中显示
          const scrollPosition =
            relativeTop - (containerRect.height - targetRect.height) / 2;
          scoreContainer.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth',
          });
        }

        // 添加高亮效果
        targetElement.style.backgroundColor = '#fff2e8';
        targetElement.style.border = '2px solid #ff7a45';
        targetElement.style.borderRadius = '6px';
        targetElement.style.transition = 'all 0.3s ease';

        // 保存当前高亮的元素
        setHighlightedElement(targetElement);

        // 3秒后自动清除高亮
        setTimeout(() => {
          clearHighlight();
        }, 3000);
      }

      message.warning('请完成所有维度的评分');
      return;
    }

    setSubmitting(true);
    try {
      // 构建评分数据
      const scoreArray = [];
      if (
        contentData.primaryTargetScore &&
        contentData.primaryTargetScore.length > 0
      ) {
        // 使用 primaryTargetScore 中的 metricId
        for (const metric of contentData.primaryTargetScore) {
          let score: number | undefined;

          // 根据 metricName 匹配当前评分
          if (
            metric.metricName === 'truthfulness' ||
            metric.metricName === '真实性'
          ) {
            score = currentScores.truthfulness;
          } else if (
            metric.metricName === 'usability' ||
            metric.metricName === '可用性'
          ) {
            score = currentScores.usability;
          } else if (
            metric.metricName === 'consistency' ||
            metric.metricName === '一致性'
          ) {
            score = currentScores.consistency;
          }

          if (score !== undefined) {
            scoreArray.push({
              metricId: String(metric.metricId),
              score: score,
            });
          }
        }
      } else {
        // 备用方案
        if (currentScores.truthfulness !== undefined) {
          scoreArray.push({
            metricId: 'truthfulness',
            score: currentScores.truthfulness,
          });
        }
        if (currentScores.usability !== undefined) {
          scoreArray.push({
            metricId: 'usability',
            score: currentScores.usability,
          });
        }
        if (currentScores.consistency !== undefined) {
          scoreArray.push({
            metricId: 'consistency',
            score: currentScores.consistency,
          });
        }
      }

      // 构建评论数据
      let commentData: { text?: string; images?: string[] } | undefined;
      if (
        evaluationComment.text?.trim() ||
        (evaluationComment.images && evaluationComment.images.length > 0)
      ) {
        commentData = {};
        if (evaluationComment.text?.trim())
          commentData.text = evaluationComment.text.trim();
        if (evaluationComment.images && evaluationComment.images.length > 0)
          commentData.images = evaluationComment.images;
      }

      const submitData: UnifiedSubmitData = {
        lineId: contentData.id,
        score: scoreArray,
        comment: commentData,
      };

      const submitResponse = (await submitTaskLineScoring(submitData)) as any;

      if (submitResponse.code === 0) {
        message.success('评分提交成功');

        // 更新当前内容的状态为已评估
        setContentData((prev) =>
          prev
            ? {
              ...prev,
              evaluationStatus: 'COMPLETED',
              status: 'COMPARED',
            }
            : prev,
        );

        // 更新统计信息
        await updateStatistics();

        // 延迟一下确保状态更新完成
        setTimeout(async () => {
          if (canNavigateNext) {
            await navigateByIndex(currentIndex + 1);
          } else {
            message.info('已是最后一条');
          }
        }, 300);
      } else {
        message.error(submitResponse.msg || '提交失败');
      }
    } catch (error) {
      message.error('提交失败');
      console.error('提交错误:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // 全屏显示处理
  const handleFullscreen = (title: string, content: string) => {
    setFullscreenData({ title, content });
  };

  // 退出全屏
  const handleExitFullscreen = () => {
    setFullscreenData(null);
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!contentData) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div>暂无数据</div>
        <Button type="primary" onClick={() => loadContentDetail()}>
          重新加载
        </Button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* 顶部区域 */}
      <Card
        style={{ marginBottom: '8px' }}
        bodyStyle={{ padding: '12px 16px' }}
      >
        <Row align="middle">
          <Col>
            <Space size="middle">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
              >
                返回
              </Button>
              <Title level={4} style={{ margin: 0 }}>
                单个评估任务详情
              </Title>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 中间导航和统计区域 */}
      <Card style={{ marginBottom: '8px' }} bodyStyle={{ padding: '0px 16px' }}>
        <Row align="middle" justify="space-between">
          <Col>
            <div style={{ padding: '16px 0' }}>
              <Space size="large">
                <Text type="secondary">
                  当前进度：{currentIndex} / {totalCount}
                </Text>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                  刷新
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
        {/* 主要内容区域 */}
        <Spin spinning={loading}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, marginBottom: 16 }}>
              {/* 主要内容区域 */}
              {contentData && (
                <div
                  style={{
                    height: 'calc(100vh - 300px)',
                    marginBottom: '8px',
                    position: 'relative',
                  }}
                >
                  {/* 第一行：问题描述 和 评估效果 */}
                  <Row
                    gutter={[8, 8]}
                    style={{ marginBottom: '8px', height: '45%' }}
                  >
                    <Col span={12} style={{ height: '100%' }}>
                      <ContentDisplay
                        title="问题描述"
                        content={contentData.query}
                        height="100%"
                        onFullscreen={handleFullscreen}
                      />
                    </Col>
                    <Col span={12} style={{ height: '100%' }}>
                      <Card
                        title={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <span>评估效果</span>
                            <div
                              style={{
                                fontSize: 12,
                                color: '#666',
                                fontWeight: 'normal',
                              }}
                            >
                              评估项目：可用性、真实性、一致性
                            </div>
                          </div>
                        }
                        style={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        styles={{
                          body: {
                            height: '100%',
                            overflow: 'auto',
                          }
                        }}
                      // bodyStyle={{ padding: '12px', display: 'flex', flexDirection: 'column', height: '100%' }}
                      >
                        {/* 评估效果区域 */}
                        <div
                          id="score-container"
                          style={{
                            // marginBottom: '16px',
                            flex: '0 0 auto',
                            paddingRight: '16px',
                            borderRight: '1px solid #f0f0f0',
                          }}
                        >
                          {SCORE_CATEGORIES.map((category, index) => (
                            <div
                              key={category.key}
                              id={category.id}
                              style={{
                                transition: 'all 0.3s ease',
                                borderRadius: '6px',
                                padding: '8px',
                                marginBottom: index < SCORE_CATEGORIES.length - 1 ? '8px' : '0px',
                              }}
                            >
                              <ScoreRow
                                title={category.title}
                                value={currentScores[category.key]}
                                onChange={(value) => handleScoreChange(category.key, value)}
                                disabled={contentData?.evaluationStatus === 'COMPLETED'}
                              />
                            </div>
                          ))}
                        </div>

                        {/* 评估说明区域 - 占据剩余空间 */}
                        <div
                          style={{
                            flex: 1,
                            borderTop: '1px solid #f0f0f0',
                            paddingTop: '16px',
                            backgroundColor: '#fafafa',
                            padding: '16px',
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '200px',
                          }}
                        >
                          <ComparisonComment
                            value={evaluationComment}
                            onChange={setEvaluationComment}
                            placeholder="请输入评估说明（选填）"
                            disabled={
                              contentData?.evaluationStatus === 'COMPLETED'
                            }
                          />
                        </div>
                      </Card>
                    </Col>
                  </Row>
                  {/* 第二行：主要目标答案 和 对比目标答案  */}
                  <Row gutter={[8, 8]} style={{ height: '55%' }}>
                    <Col span={12} style={{ height: '100%' }}>
                      <ContentDisplay
                        title="主要目标答案"
                        content={contentData.primaryTargetAnswer}
                        height="100%"
                        onFullscreen={handleFullscreen}
                      />
                    </Col>
                    <Col span={12} style={{ height: '100%' }}>
                      <ContentDisplay
                        title="对比目标答案"
                        content={contentData.comparisonTargetAnswer}
                        height="100%"
                        onFullscreen={handleFullscreen}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </div>
            {/* 底部操作栏 */}
            <Card bodyStyle={{ padding: '8px 8px' }}>
              <Row justify="center">
                <Col>
                  <Space size="large">
                    <Button
                      icon={<LeftOutlined />}
                      onClick={handlePrev}
                      disabled={!canNavigatePrev}
                      size="large"
                    >
                      上一条
                    </Button>
                    {/* 页面指示器 */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '80px',
                        padding: '0 16px',
                        fontSize: '14px',
                        color: '#666',
                      }}
                    >
                      {currentIndex} / {totalCount}
                    </div>
                    <Button
                      icon={<RightOutlined />}
                      onClick={handleNext}
                      disabled={!canNavigateNext}
                      size="large"
                    >
                      下一条
                    </Button>
                    {/* 只有当状态不是已完成时才显示提交按钮 */}
                    {contentData?.evaluationStatus !== 'COMPLETED' && (
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={handleSubmitAndNext}
                        loading={submitting}
                        size="large"
                      >
                        {canNavigateNext ? '完成并下一条' : '完成评估'}
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          </div>
        </Spin>
      </Card>
      {/* 全屏显示 */}
      <FullscreenDisplay
        visible={!!fullscreenData}
        title={fullscreenData?.title || ''}
        content={fullscreenData?.content || ''}
        onClose={handleExitFullscreen}
      />
    </div>
  );
};

export default AssessmentSingleCompareDetail;
