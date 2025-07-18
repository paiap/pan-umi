/*
 * @creater: panan
 * @message: 评估指标卡片展示组件
 * @since: 2025-07-15 21:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16 17:13:19
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/MetricCards.tsx
 */

import React, { useState } from 'react';
import { Card, Button, Space, Typography, Input, Modal, Popconfirm, Tag } from 'antd';
import { InfoCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { EvaluationMetric } from './api';
import EvaluationMetrics from './index';

const { Text, Paragraph } = Typography;

interface MetricCardsProps {
  selectedMetrics: EvaluationMetric[];
  onChange: (metrics: EvaluationMetric[]) => void;
  precisionMatchKey?: string;
  onPrecisionMatchKeyChange?: (key: string) => void;
}

const MetricCards: React.FC<MetricCardsProps> = ({
  selectedMetrics,
  onChange,
  precisionMatchKey = '',
  onPrecisionMatchKeyChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // 处理删除指标
  const handleDeleteMetric = (metricId: string) => {
    const newMetrics = selectedMetrics.filter(metric => metric.id !== metricId);
    onChange(newMetrics);
  };

  // 处理指标选择
  const handleMetricsSelect = (metrics: EvaluationMetric[]) => {
    onChange(metrics);
  };

  // 处理弹窗确认
  const handleModalOk = () => {
    setModalVisible(false);
    // 确认选择的指标，不需要额外逻辑因为 selectedMetrics 已经通过 handleMetricsSelect 更新了
    console.log('确认选择指标:', selectedMetrics);
  };

  // 显示指标详情
  const showMetricDetail = (metric: EvaluationMetric) => {
    Modal.info({
      title: `${metric.metricNameCn}（${metric.metricNameEn}）`,
      content: (
        <div>
          <p><strong>评判标准：</strong>{metric.evaluationStandard === 'higher_better' ? '越大越好' : '越小越好'}</p>
          <p><strong>数值范围：</strong>{metric.valueRangeMin} ~ {metric.valueRangeMax}</p>
          <p><strong>精准匹配键：</strong>{metric.precisionMatchKey}</p>
          <p><strong>创建人：</strong>{metric.creator}</p>
          <p><strong>指标描述：</strong></p>
          <Paragraph>{metric.metricDescription}</Paragraph>
        </div>
      ),
      width: 600,
    });
  };

  return (
    <div>
      {/* 已关联的指标标题和添加按钮 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text strong style={{ fontSize: 16 }}>已关联的指标：</Text>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          关联指标
        </Button>
      </div>

      {/* 指标卡片列表 */}
      <div style={{ marginBottom: 24 }}>
        {selectedMetrics.length === 0 ? (
          <Card style={{ textAlign: 'center', color: '#999' }}>
            暂无关联指标，请点击&ldquo;关联指标&rdquo;按钮添加
          </Card>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {selectedMetrics.map((metric) => (
              <Card
                key={metric.id}
                size="small"
                hoverable
                style={{
                  width: 280,
                  marginBottom: 12
                }}
                bodyStyle={{ padding: '12px 16px' }}
                extra={
                  <Space>
                    <Button
                      type="text"
                      size="small"
                      icon={<InfoCircleOutlined />}
                      onClick={() => showMetricDetail(metric)}
                    />
                    <Popconfirm
                      title="确定要移除这个指标吗？"
                      onConfirm={() => handleDeleteMetric(metric.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button
                        type="text"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </Space>
                }
              >
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <Text strong style={{ fontSize: 14 }}>{metric.metricNameCn}</Text>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <Tag color="blue" style={{ fontSize: 12 }}>
                      {metric.category}
                    </Tag>
                  </div>
                  <div>
                    <Paragraph
                      ellipsis={{
                        rows: 2,
                        tooltip: metric.metricDescription
                      }}
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: '#666',
                        lineHeight: '16px'
                      }}
                    >
                      {metric.metricDescription}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 精准匹配键输入 */}
      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginRight: 8 }}>
          <span style={{ color: '#ff4d4f' }}>*</span> 精准匹配键：
        </Text>
        <Input
          placeholder="请输入精准匹配键"
          value={precisionMatchKey}
          onChange={(e) => onPrecisionMatchKeyChange?.(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      {/* 关联指标弹窗 */}
      <Modal
        title="关联指标"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText="确认"
        cancelText="取消"
        width={1200}
        destroyOnClose
      >
        <EvaluationMetrics
          embedded
          multiple
          value={selectedMetrics.map(m => m.id)}
          onChange={handleMetricsSelect}
        />
      </Modal>
    </div>
  );
};

export default MetricCards;
