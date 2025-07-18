/*
 * @creater: panan
 * @message: 人工评估详情页
 * @since: 2025-07-10 12:45:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-17 16:00:41
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/pages/AssessmentDetail.tsx
 */

import React, { useState, useEffect } from 'react';
import {
  Button,
  Tabs,
  Row,
  Col,
  Progress,
  Typography,
  Space,
  message,
  Card,
  Spin
} from 'antd';
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'umi';
import ContentDisplay from '../components/ContentDisplay';
import ScoreRow from '../components/ScoreRow';
import FullscreenDisplay from '../components/FullscreenDisplay';
import ComparisonComment from '../components/ComparisonComment';
import {
  getAssessmentInfo,
  getContentList,
  submitTaskLineScoring,
  getStatistics,
  type UnifiedSubmitData
} from '../api';

const { Title, Text } = Typography;

interface AssessmentData {
  taskId: number;
  name: string;
  description: string;
  totalLineCount: number;
  completedLineCount: number;
  statisticsList: Array<{
    targetId: number;
    targetType: number;
    targetRole: string;
    targetName: string;
    metricScore: number;
    metricName: string;
    metricDescription: string;
    winCount: number;
    loseCount: number;
    drawCount: number;
  }>;
  // 为了兼容现有代码，保留计算字段
  totalCount?: number;
  evaluatedCount?: number;
  unevaluatedCount?: number;
  averageScores?: {
    truthfulness: number | string;
    usability: number | string;
    consistency: number | string;
  };
  progress?: number;
  firstContentId?: string;
}

interface ContentData {
  id: string;
  query: string;                    // 对应原来的prompt
  primaryTargetAnswer: string;      // 对应原来的expectedResult
  comparisonTargetAnswer: string;   // 对应原来的modelAnswer
  status: 'NOT_COMPARE' | 'COMPARED'; // 状态字段
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
    metricId: number; // 改为number类型，与Mock数据保持一致
    metricName: string;
    metricDescription: string;
    metricScore: number;
    compareResult: 'win' | 'lose' | 'draw';
    createTime: string;
  }>;
  hasNext: boolean;
  hasPrevious: boolean;
}

const AssessmentDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'NOT_COMPARE' | 'COMPARED'>('NOT_COMPARE');
  const [fullscreenData, setFullscreenData] = useState<{ title: string, content: string } | null>(null);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null); // 跟踪高亮元素

  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [currentScores, setCurrentScores] = useState<{
    truthfulness?: number;
    usability?: number;
    consistency?: number;
  }>({});
  const [evaluationComment, setEvaluationComment] = useState<{ text?: string; images?: string[] }>({});

  // 清除高亮效果的函数
  const clearHighlight = () => {
    if (highlightedElement) {
      highlightedElement.style.backgroundColor = '';
      highlightedElement.style.border = '';
      highlightedElement.style.borderRadius = '';
      highlightedElement.style.transition = '';
      setHighlightedElement(null);
    }
  };

  // 加载内容详情（新的分页方式）
  async function loadContentDetail(pageNum: number = currentPage) {
    setLoading(true);
    try {
      // 处理 'all' Tab 的情况，默认为 'NOT_COMPARE'
      const apiTab = activeTab === 'all' ? 'NOT_COMPARE' : activeTab;
      const response = await getContentList(id!, apiTab, pageNum, 1) as any;
      console.log('📄 [getContentList] 接口返回数据:', { taskId: id, activeTab, pageNum, response });

      if (response.code === 0) {
        const { data } = response;
        console.log('📝 [getContentList] 内容数据:', data);

        if (data.list && data.list.length > 0) {
          const contentItem = data.list[0]; // 每页只有一条数据

          // 转换为组件需要的格式
          const transformedContent: ContentData = {
            id: contentItem.id,
            query: contentItem.query,
            primaryTargetAnswer: contentItem.primaryTargetAnswer,
            comparisonTargetAnswer: contentItem.comparisonTargetAnswer,
            status: contentItem.status || 'NOT_COMPARE', // 添加status字段
            evaluationStatus: contentItem.evaluationStatus,
            scores: contentItem.scores || {},
            evaluationComment: contentItem.evaluationComment || null,
            comment: contentItem.comment || null,
            primaryTargetScore: contentItem.primaryTargetScore || [],
            hasNext: contentItem.hasNext,
            hasPrevious: contentItem.hasPrevious,
          };

          setContentData(transformedContent);
          setCurrentPage(data.pageNum);
          setTotalPages(data.pages);

          // 回显评分，从primaryTargetScore的metricScore字段获取
          let scores: {
            truthfulness?: number;
            usability?: number;
            consistency?: number;
          } = {};

          // 从primaryTargetScore中获取分数（重点使用metricScore字段）
          if (transformedContent.primaryTargetScore && transformedContent.primaryTargetScore.length > 0) {
            console.log('🔍 [分数回显] primaryTargetScore原始数据:', transformedContent.primaryTargetScore);

            const truthfulnessMetric = transformedContent.primaryTargetScore.find(item => item.metricName === '真实性');
            if (truthfulnessMetric && truthfulnessMetric.metricScore !== undefined && truthfulnessMetric.metricScore !== null) {
              scores.truthfulness = truthfulnessMetric.metricScore;
              console.log('✅ [分数回显] 真实性分数:', truthfulnessMetric.metricScore);
            }

            const usabilityMetric = transformedContent.primaryTargetScore.find(item => item.metricName === '可用性');
            if (usabilityMetric && usabilityMetric.metricScore !== undefined && usabilityMetric.metricScore !== null) {
              scores.usability = usabilityMetric.metricScore;
              console.log('✅ [分数回显] 可用性分数:', usabilityMetric.metricScore);
            }

            const consistencyMetric = transformedContent.primaryTargetScore.find(item => item.metricName === '一致性');
            if (consistencyMetric && consistencyMetric.metricScore !== undefined && consistencyMetric.metricScore !== null) {
              scores.consistency = consistencyMetric.metricScore;
              console.log('✅ [分数回显] 一致性分数:', consistencyMetric.metricScore);
            }
          } else if (transformedContent.scores) {
            // 回退到scores字段 - 只有在值存在时才设置
            console.log('⚠️ [分数回显] 使用备用scores字段:', transformedContent.scores);
            if (transformedContent.scores.truthfulness !== undefined && transformedContent.scores.truthfulness !== null) {
              scores.truthfulness = transformedContent.scores.truthfulness;
            }
            if (transformedContent.scores.usability !== undefined && transformedContent.scores.usability !== null) {
              scores.usability = transformedContent.scores.usability;
            }
            if (transformedContent.scores.consistency !== undefined && transformedContent.scores.consistency !== null) {
              scores.consistency = transformedContent.scores.consistency;
            }
          }

          setCurrentScores(scores);
          console.log('🎯 [分数回显] 最终设置的评分:', scores);
          console.log('🔍 [分数回显] primaryTargetScore详细信息:', transformedContent.primaryTargetScore?.map(item => ({
            metricName: item.metricName,
            metricScore: item.metricScore,
            metricId: item.metricId
          })));
          console.log('🔍 [分数回显] scores字段:', transformedContent.scores);
          console.log('🔍 [分数回显] 内容状态:', transformedContent.status, transformedContent.evaluationStatus);

          // 加载已有的评估说明，优先从comment字段获取
          if (transformedContent.comment) {
            const { text, images } = transformedContent.comment;
            setEvaluationComment({
              text: text || '',
              images: images || []
            });
          } else if (transformedContent.evaluationComment) {
            // 回退到evaluationComment字段
            const { text, screenshots } = transformedContent.evaluationComment;
            setEvaluationComment({
              text: text || '',
              images: screenshots || []
            });
          } else {
            setEvaluationComment({}); // 重置评估说明
          }
        } else {
          message.info('暂无内容');
        }
      } else {
        message.error(response.msg || '加载内容失败');
      }
    } catch (error) {
      message.error('加载内容失败');
    } finally {
      setLoading(false);
    }
  }

  // 加载评估基本信息
  const loadAssessmentInfo = async () => {
    try {
      const response = await getAssessmentInfo(id!) as any;
      console.log('🔍 [getAssessmentInfo] 接口返回数据:', response);

      if (response.code === 0) {
        const data = response.data;
        console.log('📊 [getAssessmentInfo] 解析后的数据:', data);

        // 计算兼容字段
        const progress = Math.round((data.completedLineCount / data.totalLineCount) * 100);
        const unevaluatedCount = data.totalLineCount - data.completedLineCount;

        // 从statisticsList中提取实时得分（使用中文维度名）
        const truthfulnessScore = data.statisticsList.find((item: any) => item.metricName === '真实性')?.metricScore ?? '-';
        const usabilityScore = data.statisticsList.find((item: any) => item.metricName === '可用性')?.metricScore ?? '-';
        const consistencyScore = data.statisticsList.find((item: any) => item.metricName === '一致性')?.metricScore ?? '-';

        const enhancedData = {
          ...data,
          totalCount: data.totalLineCount,
          evaluatedCount: data.completedLineCount,
          unevaluatedCount: unevaluatedCount,
          progress: progress,
          averageScores: {
            truthfulness: truthfulnessScore,
            usability: usabilityScore,
            consistency: consistencyScore,
          },
        };

        console.log('✨ [getAssessmentInfo] 增强后的数据:', enhancedData);

        setAssessmentData(enhancedData);
        // 加载第一页内容
        loadContentDetail(1);
      }
    } catch (error) {
      message.error('加载评估信息失败');
    }
  };

  // 更新统计信息
  const updateStatistics = async () => {
    try {
      const response = await getStatistics(id!) as any;
      console.log('📈 [getStatistics] 统计数据返回:', response);

      if (response.code === 0 && assessmentData) {
        const updatedData = {
          ...assessmentData,
          ...response.data,
        };
        console.log('📊 [getStatistics] 更新后的统计数据:', updatedData);
        setAssessmentData(updatedData);
      }
    } catch (error) {
      console.error('更新统计信息失败:', error);
    }
  };

  // 提交评分并跳转下一条
  const handleSubmitAndNext = async () => {
    if (!contentData) return;

    // 检查是否已完成评分（使用 undefined 而不是 -999）
    const uncompletedScores = [];
    if (currentScores.truthfulness === undefined) uncompletedScores.push('truthfulness');
    if (currentScores.usability === undefined) uncompletedScores.push('usability');
    if (currentScores.consistency === undefined) uncompletedScores.push('consistency');

    if (uncompletedScores.length > 0) {
      // 先清除之前的高亮
      clearHighlight();

      // 滚动到第一个未打分的维度
      const firstUncompletedScore = uncompletedScores[0];
      const targetElement = document.getElementById(`score-row-${firstUncompletedScore}`);
      if (targetElement) {
        // 找到评估效果区域的容器，只在这个容器内滚动
        const scoreContainer = document.getElementById('score-container');
        if (scoreContainer) {
          // 获取目标元素相对于容器的位置
          const containerRect = scoreContainer.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();
          const relativeTop = targetRect.top - containerRect.top + scoreContainer.scrollTop;

          // 滚动到目标位置，让元素在容器中居中显示
          const scrollPosition = relativeTop - (containerRect.height - targetRect.height) / 2;
          scoreContainer.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
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
      } message.warning('请完成所有维度的评分');
      return;
    }

    setSubmitting(true);
    try {
      // 调试信息
      console.log('🔍 [单个评估] contentData.primaryTargetScore:', contentData.primaryTargetScore);
      console.log('🔍 [单个评估] currentScores:', currentScores);

      // 从 contentData.primaryTargetScore 获取 metricId
      const scoreArray = [];

      if (contentData.primaryTargetScore && contentData.primaryTargetScore.length > 0) {
        // 使用 primaryTargetScore 中的 metricId
        for (const metric of contentData.primaryTargetScore) {
          let score: number | undefined;

          // 根据 metricName 匹配当前评分（支持中文和英文名称）
          if (metric.metricName === 'truthfulness' || metric.metricName === '真实性') {
            score = currentScores.truthfulness;
          } else if (metric.metricName === 'usability' || metric.metricName === '可用性') {
            score = currentScores.usability;
          } else if (metric.metricName === 'consistency' || metric.metricName === '一致性') {
            score = currentScores.consistency;
          }

          if (score !== undefined) {
            scoreArray.push({
              metricId: String(metric.metricId), // 转换为字符串
              score: score
            });
            console.log(`✅ [单个评估] 匹配到维度: ${metric.metricName} -> metricId: ${metric.metricId}, score: ${score}`);
          } else {
            console.log(`❌ [单个评估] 未匹配到维度: ${metric.metricName}`);
          }
        }
      } else {
        // 如果没有 primaryTargetScore，创建默认的 metricId（这是备用方案）
        console.warn('⚠️ 没有找到 primaryTargetScore，使用默认 metricId');
        if (currentScores.truthfulness !== undefined) {
          scoreArray.push({ metricId: 'truthfulness', score: currentScores.truthfulness });
        }
        if (currentScores.usability !== undefined) {
          scoreArray.push({ metricId: 'usability', score: currentScores.usability });
        }
        if (currentScores.consistency !== undefined) {
          scoreArray.push({ metricId: 'consistency', score: currentScores.consistency });
        }
      }

      console.log('📊 [单个评估] 最终 scoreArray:', scoreArray);

      // 构建评论数据
      let commentData: { text?: string; images?: string[] } | undefined;
      if (evaluationComment.text?.trim() || (evaluationComment.images && evaluationComment.images.length > 0)) {
        commentData = {};
        if (evaluationComment.text?.trim()) commentData.text = evaluationComment.text.trim();
        if (evaluationComment.images && evaluationComment.images.length > 0) commentData.images = evaluationComment.images;
      }

      const submitData: UnifiedSubmitData = {
        lineId: contentData.id,
        score: scoreArray,
        comment: commentData,
      };

      // 提交前打印参数确认
      console.log('🚀 [单个评估] 提交参数:', JSON.stringify(submitData, null, 2));

      const submitResponse = await submitTaskLineScoring(submitData) as any;
      console.log('✅ [submitTaskLineScoring] 提交响应:', submitResponse);

      if (submitResponse.code === 0) {
        message.success('评分提交成功');

        // 更新当前内容的状态为已评估
        setContentData(prev => prev ? {
          ...prev,
          evaluationStatus: 'COMPLETED',
          status: 'COMPARED'
        } : prev);

        // 更新统计信息
        await updateStatistics();

        // 延迟一下确保状态更新完成
        setTimeout(() => {
          // 如果有下一页，跳转到下一页
          if (contentData.hasNext) {
            loadContentDetail(currentPage + 1);
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

  // 上一条
  const handlePrevious = () => {
    if (contentData?.hasPrevious && currentPage > 1) {
      loadContentDetail(currentPage - 1);
    }
  };

  // 下一条
  const handleNext = () => {
    if (contentData?.hasNext && currentPage < totalPages) {
      loadContentDetail(currentPage + 1);
    }
  };

  // 返回列表页
  const handleBack = () => {
    navigate('/ManualAssessment');
  };

  // 全屏显示处理
  const handleFullscreen = (title: string, content: string) => {
    setFullscreenData({ title, content });
  };

  // 退出全屏
  const handleExitFullscreen = () => {
    setFullscreenData(null);
  };

  useEffect(() => {
    if (id) {
      loadAssessmentInfo();
    }
  }, [id]);

  // Tab切换时重新加载数据
  const handleTabChange = (key: string) => {
    console.log('🔄 [Tab切换] 从', activeTab, '切换到', key);
    setActiveTab(key as 'all' | 'NOT_COMPARE' | 'COMPARED');
    setCurrentPage(1); // 重置到第一页
    // 清除当前评分状态，让新数据能正确回显
    setCurrentScores({});
    setEvaluationComment({});
    // 延迟加载，让tab切换动画完成
    setTimeout(() => {
      loadContentDetail(1);
    }, 100);
  };

  if (!assessmentData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* 顶部区域 */}
      <Card style={{ marginBottom: '8px' }} bodyStyle={{ padding: '12px 16px' }}>
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
                {assessmentData.name}
              </Title>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 中间导航和统计区域 */}
      <Card style={{ marginBottom: '8px' }} bodyStyle={{ padding: '0px 16px' }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              items={[
                {
                  key: 'all',
                  label: `全部 (${assessmentData.totalLineCount || 0})`,
                },
                {
                  key: 'NOT_COMPARE',
                  label: `未评估 (${(assessmentData.totalLineCount || 0) - (assessmentData.completedLineCount || 0)})`,
                },
                {
                  key: 'COMPARED',
                  label: `已评估 (${assessmentData.completedLineCount || 0})`,
                },
              ]}
            />
          </Col>

          <Col>
            <Space size="large" align="center">
              <Space style={{ minWidth: '120px' }}>
                <span style={{ marginBottom: '4px' }}>
                  <Text strong style={{ fontSize: '12px' }}>评估进度</Text>
                </span>
                <Progress
                  percent={assessmentData.progress}
                  size="small"
                  style={{ width: '200px' }}
                  strokeWidth={6}
                  showInfo={true}
                  format={(percent) => `${percent}%`}
                />
              </Space>

              <div style={{ minWidth: '200px' }}>
                <Text strong style={{ fontSize: '12px', marginRight: '8px' }}>实时得分:</Text>
                <Space split={<span style={{ color: '#d9d9d9' }}>|</span>} size="small">
                  <Text style={{ fontSize: '12px' }}>真实性: {assessmentData.averageScores?.truthfulness ?? '-'}</Text>
                  <Text style={{ fontSize: '12px' }}>可用性: {assessmentData.averageScores?.usability ?? '-'}</Text>
                  <Text style={{ fontSize: '12px' }}>一致性: {assessmentData.averageScores?.consistency ?? '-'}</Text>
                </Space>
              </div>

              {/* 删除发布成绩功能 */}
              {/* <Button
                type="primary"
                // icon={<PublishOutlined />}

                onClick={handlePublishGrades}
                loading={publishing}
                danger
              >
                发布成绩
              </Button> */}
            </Space>
          </Col>
        </Row>
        {/* 主要内容区域 */}
        <Spin spinning={loading}>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, marginBottom: 16 }}>
              {/* 主要内容区域 */}
              {contentData && (
                <div style={{ height: 'calc(100vh - 300px)', marginBottom: '8px', position: 'relative' }}>
                  {/* 第一行：Prompt 和 预期结果 (37.5% = 3/8) */}
                  <Row gutter={[8, 8]} style={{ marginBottom: '8px', height: '37.5%' }}>
                    <Col span={12} style={{ height: '100%' }}>
                      <ContentDisplay
                        title="问题描述"
                        content={contentData.query}
                        height="100%"
                        onFullscreen={handleFullscreen}
                      />
                    </Col>
                    <Col span={12} style={{ height: '100%' }}>
                      <ContentDisplay
                        title="主要目标答案"
                        content={contentData.primaryTargetAnswer}
                        height="100%"
                        onFullscreen={handleFullscreen}
                      />
                    </Col>
                  </Row>
                  {/* 第二行：模型回答 和 打分栏 (62.5% = 5/8) */}
                  <Row gutter={[8, 8]} style={{ height: '62.5%', }}>
                    <Col span={12} style={{ height: '100%' }}>
                      <ContentDisplay
                        title="对比目标答案"
                        content={contentData.comparisonTargetAnswer}
                        height="100%"
                        onFullscreen={handleFullscreen}
                      />
                    </Col>
                    <Col span={12} style={{ height: '100%' }}>
                      <Card
                        title={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>评估效果</span>
                            <div style={{ fontSize: 12, color: '#666', fontWeight: 'normal' }}>
                              评估项目：可用性、真实性、一致性
                            </div>
                          </div>
                        }
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        bodyStyle={{ padding: '8px', display: 'flex', flexDirection: 'column', height: '100%' }}
                      >
                        {/* 评估效果区域 */}
                        <div id="score-container" style={{ marginBottom: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                          <div id="score-row-usability" style={{ transition: 'all 0.3s ease', borderRadius: '6px', padding: '0 8px' }}>
                            <ScoreRow
                              title="可用性"
                              value={currentScores.usability}
                              onChange={(value) => {
                                clearHighlight(); // 清除高亮
                                setCurrentScores({
                                  ...currentScores,
                                  usability: value
                                });
                              }}
                              disabled={contentData?.status === 'COMPARED'}
                            />
                          </div>
                          <div id="score-row-truthfulness" style={{ transition: 'all 0.3s ease', borderRadius: '6px', padding: '0 8px' }}>
                            <ScoreRow
                              title="真实性"
                              value={currentScores.truthfulness}
                              onChange={(value) => {
                                clearHighlight(); // 清除高亮
                                setCurrentScores({
                                  ...currentScores,
                                  truthfulness: value
                                });
                              }}
                              disabled={contentData?.status === 'COMPARED'}
                            />
                          </div>
                          <div id="score-row-consistency" style={{ transition: 'all 0.3s ease', borderRadius: '6px', padding: '0 8px' }}>
                            <ScoreRow
                              title="一致性"
                              value={currentScores.consistency}
                              onChange={(value) => {
                                clearHighlight(); // 清除高亮
                                setCurrentScores({
                                  ...currentScores,
                                  consistency: value
                                });
                              }}
                              disabled={contentData?.status === 'COMPARED'}
                            />
                          </div>
                        </div>
                        {/* 评估说明区域 */}
                        <div style={{
                          flex: 1,
                          borderTop: '1px solid #f0f0f0',
                          paddingTop: '12px',
                          backgroundColor: '#fafafa',
                          padding: '12px',
                          borderRadius: '4px',
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          <ComparisonComment
                            value={evaluationComment}
                            onChange={setEvaluationComment}
                            placeholder="请输入评估说明（选填）"
                            disabled={contentData?.status === 'COMPARED'}
                          />
                        </div>
                      </Card>
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
                      onClick={handlePrevious}
                      disabled={!contentData?.hasPrevious || currentPage <= 1}
                      size="large"
                    >
                      上一条
                    </Button>
                    {/* 页面指示器 */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '80px',
                      padding: '0 16px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {currentPage} / {totalPages}
                    </div>
                    <Button
                      icon={<RightOutlined />}
                      onClick={handleNext}
                      disabled={!contentData?.hasNext || currentPage >= totalPages}
                      size="large"
                    >
                      下一条
                    </Button>
                    {/* 只有当状态不是已对比时才显示提交按钮 */}
                    {contentData?.status !== 'COMPARED' && (
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={handleSubmitAndNext}
                        loading={submitting}
                        size="large"
                      >
                        {contentData?.hasNext ? '完成并下一条' : '完成评估'}
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

export default AssessmentDetail;
