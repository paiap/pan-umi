import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Tabs, message, Spin, Progress, Card, Row, Col, Space } from 'antd';
import DisplayBlock from '../components/DisplayBlock';
import ScoreSelector, { ScoreValue } from '../components/ScoreSelector';
import {
  fetchAssessmentDetail,
  publishAssessmentScore,
  fetchAssessmentContent,
  submitAssessmentScore,
} from '../api/mockApi';
import styles from './AssessmentCompareDetail.module.less';

const { TabPane } = Tabs;

/**
 * 对比评估详情页
 */
const AssessmentCompareDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'finished' | 'unfinished'>('all');
  const [detail, setDetail] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [score, setScore] = useState<ScoreValue>({ truth: 0, usability: 0, consistency: 0 });
  const [contentId, setContentId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 获取详情和内容
  const loadData = async (tabType = tab, cid = contentId) => {
    setLoading(true);
    const d = await fetchAssessmentDetail(id);
    setDetail(d);
    let firstId = d.tabList.find((t: any) => t.type === tabType)?.firstId || '';
    const c = await fetchAssessmentContent(tabType, cid || firstId);
    setContent(c);
    setContentId(c.contentId);
    setScore(c.score);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [id]);

  // Tab切换
  const handleTabChange = async (key: string) => {
    setTab(key as any);
    await loadData(key as any, '');
  };

  // 上一条/下一条
  const handlePrevNext = async (nextId: string) => {
    if (!nextId) return;
    setLoading(true);
    const c = await fetchAssessmentContent(tab, nextId);
    setContent(c);
    setContentId(c.contentId);
    setScore(c.score);
    setLoading(false);
  };

  // 完成并下一条
  const handleSubmitAndNext = async () => {
    setSubmitting(true);
    await submitAssessmentScore(contentId, score);
    message.success('提交成功');
    // 更新tab数据
    await loadData(tab, content.nextId);
    setSubmitting(false);
  };

  // 发布成绩
  const handlePublish = async () => {
    setSubmitting(true);
    await publishAssessmentScore(id, detail.score);
    message.success('成绩已发布');
    history.push('/ManualAssessment');
    setSubmitting(false);
  };

  if (loading || !detail || !content) {
    return <Spin style={{ marginTop: 100 }} />;
  }

  return (
    <div className={styles.page}>
      {/* 顶部返回和标题 */}
      <div className={styles.header}>
        <Button onClick={() => history.goBack()}>返回</Button>
        <span className={styles.title}>{detail.name}</span>
      </div>
      {/* Tab和进度/分数/发布 */}
      <div className={styles.topBar}>
        <Tabs activeKey={tab} onChange={handleTabChange}>
          <TabPane tab={`全部(${detail.total})`} key="all" />
          <TabPane tab={`未评估(${detail.unfinished})`} key="unfinished" />
          <TabPane tab={`已评估(${detail.finished})`} key="finished" />
        </Tabs>
        <div className={styles.progressBox}>
          <div>评估进度：<Progress percent={Math.round((detail.finished / detail.total) * 100)} size="small" /></div>
          <div>真实性：{detail.score.truth}</div>
          <div>可用性：{detail.score.usability}</div>
          <div>一致性：{detail.score.consistency}</div>
        </div>
        <Button type="primary" onClick={handlePublish} loading={submitting} style={{ marginLeft: 16 }}>发布成绩</Button>
      </div>
      {/* 展示区域 */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={6}>
          <DisplayBlock title="Prompt" height={180}>{content.prompt}</DisplayBlock>
        </Col>
        <Col span={6}>
          <DisplayBlock title="预期结果" height={180}>{content.expected}</DisplayBlock>
        </Col>
        <Col span={6}>
          <DisplayBlock title="模型回答" height={180}>{content.modelAnswer}</DisplayBlock>
        </Col>
        <Col span={6}>
          <DisplayBlock title="评估效果" height={180}>
            <ScoreSelector value={score} onChange={setScore} />
          </DisplayBlock>
        </Col>
      </Row>
      {/* 底部操作栏 */}
      <div className={styles.footerBar}>
        <Space>
          <Button onClick={() => handlePrevNext(content.prevId)} disabled={!content.prevId}>上一条</Button>
          <Button onClick={() => handlePrevNext(content.nextId)} disabled={!content.nextId}>下一条</Button>
          <Button type="primary" onClick={handleSubmitAndNext} loading={submitting} disabled={!content.nextId}>完成并下一条</Button>
        </Space>
      </div>
    </div>
  );
};

export default AssessmentCompareDetail;