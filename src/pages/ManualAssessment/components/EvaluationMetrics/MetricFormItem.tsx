/*
 * @creater: panan
 * @message: 评估指标表单项组件
 * @since: 2025-07-16 15:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16 17:29:14
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/MetricFormItem.tsx
 */

import React, { useState, useRef } from 'react';
import { Button, Modal, Card, Space, Typography, Tag, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { EvaluationMetric } from './api';
import EvaluationMetrics, { EvaluationMetricsRef } from './index';

const { Text, Paragraph } = Typography;

interface MetricFormItemProps {
  value?: EvaluationMetric[];
  onChange?: (metrics: EvaluationMetric[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MetricFormItem: React.FC<MetricFormItemProps> = ({
  value = [],
  onChange,
  disabled = false,
  placeholder = '请选择关联指标'
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState<EvaluationMetric[]>(value);
  const [tempSelectedMetrics, setTempSelectedMetrics] = useState<EvaluationMetric[]>([]);
  const evaluationMetricsRef = useRef<EvaluationMetricsRef>(null);

  // 打开指标选择弹窗
  const handleOpenModal = () => {
    setTempSelectedMetrics([...selectedMetrics]);
    setModalVisible(true);
  };

  // 弹窗中的指标选择变化
  const handleMetricsSelect = (metrics: EvaluationMetric[]) => {
    setTempSelectedMetrics(metrics);
  };

  // 确认选择
  const handleConfirm = () => {
    setSelectedMetrics([...tempSelectedMetrics]);
    onChange?.(tempSelectedMetrics);
    setModalVisible(false);
  };

  // 取消选择
  const handleCancel = () => {
    setTempSelectedMetrics([...selectedMetrics]);
    setModalVisible(false);
  };

  // 移除指标
  const handleRemoveMetric = (metricId: string) => {
    const newMetrics = selectedMetrics.filter(metric => metric.id !== metricId);
    setSelectedMetrics(newMetrics);
    onChange?.(newMetrics);
  };

  // 显示指标详情
  const showMetricDetail = (metric: EvaluationMetric) => {
    Modal.info({
      title: '指标详情',
      content: (
        <div>
          <p><strong>中文名：</strong>{metric.metricNameCn}</p>
          <p><strong>英文名：</strong>{metric.metricNameEn}</p>
          <p><strong>类别：</strong>{metric.category}</p>
          <p><strong>评判标准：</strong>{metric.evaluationStandard === 'higher_better' ? '越大越好' : '越小越好'}</p>
          <p><strong>数值范围：</strong>{metric.valueRangeMin} ~ {metric.valueRangeMax}</p>
          <p><strong>描述：</strong>{metric.metricDescription}</p>
          <p><strong>精准匹配键：</strong>{metric.precisionMatchKey}</p>
          <p><strong>创建人：</strong>{metric.creator}</p>
        </div>
      ),
      width: 500,
    });
  };

  return (
    <div className="metric-form-item">
      {/* 关联指标按钮 */}
      <div style={{ marginBottom: 16 }}>
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleOpenModal}
          disabled={disabled}
          style={{ width: '100%', height: 40 }}
        >
          关联指标
        </Button>
      </div>

      {/* 已选择指标卡片展示 */}
      {selectedMetrics.length > 0 && (
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
                    onConfirm={() => handleRemoveMetric(metric.id)}
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

      {/* 空状态提示 */}
      {selectedMetrics.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#999',
          padding: '20px 0',
          border: '1px dashed #d9d9d9',
          borderRadius: 6,
          backgroundColor: '#fafafa'
        }}>
          {placeholder}
        </div>
      )}

      {/* 指标选择弹窗 */}
      <Modal
        title="关联指标"
        open={modalVisible}
        onCancel={handleCancel}
        onOk={handleConfirm}
        okText="确认"
        cancelText="取消"
        width={1200}
        destroyOnClose
      >
        <EvaluationMetrics
          ref={evaluationMetricsRef}
          embedded
          multiple
          value={tempSelectedMetrics.map(m => m.id)}
          onChange={handleMetricsSelect}
        />
      </Modal>
    </div>
  );
};

export default MetricFormItem;
