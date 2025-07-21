/*
 * @creater: panan
 * @message: 单个评估详情页 - 使用多对比评估详情页的布局结构
 * @since: 2025-07-21 01:29:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-21 17:03:21
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/pages/AssessmentSingleCompareDetail.tsx
 */

import {
  LeftOutlined,
  ReloadOutlined,
  RightOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'umi';
import {
  getContentList,
  submitTaskLineScoring,
  type UnifiedSubmitData,
} from '../api';
import ComparisonComment from '../components/ComparisonComment';
import ContentDisplay from '../components/ContentDisplay';
import FullscreenDisplay from '../components/FullscreenDisplay';
import ScoreRow from '../components/ScoreRow';

const { Text } = Typography;

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

// 评分类别配置
const SCORE_CATEGORIES = [
  {
    key: 'usability',
    title: '可用性',
    id: 'score-row-usability',
  },
  {
    key: 'truthfulness',
    title: '真实性',
    id: 'score-row-truthfulness',
  },
  {
    key: 'consistency',
    title: '一致性',
    id: 'score-row-consistency',
  },
] as const;

type ScoreKey = (typeof SCORE_CATEGORIES)[number]['key'];

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

  // 评分状态
  const [currentScores, setCurrentScores] = useState<
    Record<ScoreKey, number | undefined>
  >({
    usability: undefined,
    truthfulness: undefined,
    consistency: undefined,
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
            consistency: undefined,
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

  // 返回单个评估列表页
  const handleBack = () => {
    navigate(`/ManualAssessment/singleDetail/${assessmentId}`);
  };

  // 刷新数据
  const handleRefresh = () => {
    loadContentDetail();
    message.success('刷新成功');
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
      (category) => currentScores[category.key] === undefined,
    ).map((category) => category.key);

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
    <>
      <div
        style={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        {/* 顶部栏 */}
        <Card
          style={{ marginBottom: 16, flexShrink: 0 }}
          bodyStyle={{ padding: '12px 16px' }}
        >
          <Row align="middle">
            <Col>
              <Space>
                <Button
                  type="text"
                  icon={<RollbackOutlined />}
                  onClick={handleBack}
                />
                <span style={{ fontWeight: 600, fontSize: 18 }}>
                  单个评估任务详情
                </span>
              </Space>
            </Col>
            <Col flex="auto" />
            <Col>
              <Space>
                <Text type="secondary">
                  {currentIndex} / {totalCount}
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
          <Spin spinning={loading}>
            {contentData && (
              <Row gutter={16} style={{ height: '100%' }}>
                {/* 内容区域 */}
                <Col span={24}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Query和答案对比区域 - 固定高度 */}
                    <Card
                      bodyStyle={{
                        padding: 12,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      style={{
                        height: 600,
                        overflow: 'hidden',
                        marginBottom: 12,
                      }}
                    >
                      {/* Query区域 - 占25%高度 */}
                      <div
                        style={{
                          flex: '0 0 25%',
                          marginBottom: 8,
                          minHeight: 80,
                          overflow: 'hidden',
                          height: '25%',
                        }}
                      >
                        <div style={{ height: '100%' }}>
                          <ContentDisplay
                            title="问题描述"
                            content={contentData.query}
                            height="100%"
                            style={{ height: '100%' }}
                            onFullscreen={handleFullscreen}
                          />
                        </div>
                      </div>

                      {/* Answer对比区域 - 占75%高度 */}
                      <div
                        style={{
                          flex: '0 0 75%',
                          minHeight: 140,
                          overflow: 'hidden',
                          height: '75%',
                        }}
                      >
                        <Row gutter={0} style={{ height: '100%', margin: '0' }}>
                          <Col
                            span={12}
                            style={{
                              height: '100%',
                            }}
                          >
                            <div
                              style={{ height: '100%', margin: '0 5px 0 0' }}
                            >
                              <ContentDisplay
                                title="主要目标答案"
                                content={contentData.primaryTargetAnswer}
                                height="100%"
                                style={{ height: '100%' }}
                                onFullscreen={handleFullscreen}
                              />
                            </div>
                          </Col>
                          <Col
                            span={12}
                            style={{
                              height: '100%',
                            }}
                          >
                            <div
                              style={{ height: '100%', margin: '0 0 0 5px' }}
                            >
                              <ContentDisplay
                                title="对比目标答案"
                                content={contentData.comparisonTargetAnswer}
                                height="100%"
                                style={{ height: '100%' }}
                                onFullscreen={handleFullscreen}
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </div>
                </Col>

                {/* 评估维度和评估说明并排 */}
                <Col span={24}>
                  <Row gutter={8} style={{ height: '100%' }}>
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
                        style={{ height: '100%' }}
                        styles={{
                          body: {
                            height: '500px',
                            margin: '0',
                            overflow: 'auto',
                          },
                        }}
                      >
                        {/* 评估效果区域 */}
                        <div
                          id="score-container"
                          style={{
                            height: '100%',
                            overflowY: 'auto',
                          }}
                        >
                          {SCORE_CATEGORIES.map((category) => (
                            <div
                              key={category.key}
                              id={category.id}
                              style={{
                                marginBottom: 12,
                                transition: 'all 0.3s ease',
                                borderRadius: '6px',
                                padding: '8px 12px',
                                border: '1px solid #f0f0f0',
                                backgroundColor: '#fafafa',
                              }}
                            >
                              <ScoreRow
                                title={category.title}
                                value={currentScores[category.key]}
                                onChange={(value) =>
                                  handleScoreChange(category.key, value)
                                }
                                disabled={
                                  contentData?.evaluationStatus === 'COMPLETED'
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </Col>
                    <Col span={12} style={{ height: '100%' }}>
                      <Card
                        style={{ height: '100%' }}
                        title="评估说明"
                        styles={{
                          body: {
                            padding: '8px 16px',
                            height: '500px',
                            borderRadius: '8px',
                            overflow: 'auto',
                          },
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
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
          </Spin>
        </div>

        {/* 底部操作区 */}
        <Card style={{ flexShrink: 0 }} bodyStyle={{ padding: 12 }}>
          <Row justify="center" align="middle">
            <Col>
              <Space size="large">
                <Button
                  onClick={handlePrev}
                  disabled={!canNavigatePrev}
                  icon={<LeftOutlined />}
                >
                  上一条
                </Button>
                <Text type="secondary">
                  {currentIndex} / {totalCount}
                </Text>
                <Button onClick={handleNext} disabled={!canNavigateNext}>
                  下一条
                  <RightOutlined />
                </Button>
                {/* 只在未完成状态下显示提交按钮 */}
                {contentData?.evaluationStatus !== 'COMPLETED' && (
                  <Button
                    type="primary"
                    loading={submitting}
                    onClick={handleSubmitAndNext}
                    style={{ marginLeft: 16 }}
                  >
                    {canNavigateNext ? '完成并下一条' : '完成评估'}
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
        onClose={handleExitFullscreen}
      />
    </>
  );
};

export default AssessmentSingleCompareDetail;
