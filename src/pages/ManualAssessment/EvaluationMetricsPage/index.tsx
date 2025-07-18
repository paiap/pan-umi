/*
 * @creater: panan
 * @message: 评估指标管理页面
 * @since: 2025-07-15 15:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16 15:28:58
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/EvaluationMetricsPage/index.tsx
 */

import React, { useState } from 'react';
import { Card, Space, Button, Form, message, Divider, Input, Row, Col } from 'antd';
import EvaluationMetrics from '../components/EvaluationMetrics';
import MetricCards from '../components/EvaluationMetrics/MetricCards';
import MetricFormItem from '../components/EvaluationMetrics/MetricFormItem';
import { EvaluationMetric } from '../components/EvaluationMetrics/api';

const EvaluationMetricsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedMetrics, setSelectedMetrics] = useState<EvaluationMetric[]>([]);
  const [precisionMatchKey, setPrecisionMatchKey] = useState<string>('');

  // 处理指标选择变化
  const handleMetricsChange = (metrics: EvaluationMetric[]) => {
    setSelectedMetrics(metrics);
    console.log('选中的指标:', metrics);
    // 自动设置精准匹配键（取第一个指标的匹配键）
    if (metrics.length > 0 && !precisionMatchKey) {
      setPrecisionMatchKey(metrics[0].precisionMatchKey);
    }
  };

  // 处理精准匹配键变化
  const handlePrecisionKeyChange = (key: string) => {
    setPrecisionMatchKey(key);
  };

  // 获取选中的指标
  const handleGetSelected = () => {
    message.info(`当前选中了 ${selectedMetrics.length} 个指标`);
    console.log('获取到的选中指标:', selectedMetrics);
  };

  // 重置选择
  const handleResetSelection = () => {
    setSelectedMetrics([]);
    message.success('已重置选择');
  };

  // 刷新数据
  const handleRefresh = () => {
    message.success('已刷新数据');
  };

  // 表单提交
  const handleSubmit = (values: any) => {
    console.log('表单提交:', {
      ...values,
      selectedMetrics: selectedMetrics,
    });
    message.success('表单提交成功，请查看控制台');
  };

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>
      <Card
        title="评估指标管理组件使用示例"
        style={{ marginBottom: 24 }}
        extra={
          <Space>
            <Button onClick={handleGetSelected}>获取选中指标</Button>
            <Button onClick={handleResetSelection}>重置选择</Button>
            <Button onClick={handleRefresh}>刷新数据</Button>
          </Space>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* 卡片式指标展示示例 */}
          <div>
            <h3>评估指标关联示例</h3>
            <p style={{ color: '#666', marginBottom: 16 }}>
              按照UI设计稿实现的卡片式指标展示，支持指标关联、详情查看和精准匹配键设置
            </p>
            <MetricCards
              selectedMetrics={selectedMetrics}
              onChange={handleMetricsChange}
              precisionMatchKey={precisionMatchKey}
              onPrecisionMatchKeyChange={handlePrecisionKeyChange}
            />
          </div>

          <Divider />

          <div>
            <h3>功能说明</h3>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ul>
                  <li>✅ 支持指标的增删改查操作</li>
                  <li>✅ 支持按指标中文名、英文名、创建人搜索</li>
                  <li>✅ 支持指标唯一性校验（中文名、英文名、精准匹配键）</li>
                  <li>✅ 支持数值范围验证（不能小于0，最大值必须大于最小值）</li>
                </ul>
              </Col>
              <Col span={12}>
                <ul>
                  <li>✅ 支持表单嵌入模式，可用作表单项</li>
                  <li>✅ 支持单选/多选模式</li>
                  <li>✅ 包含权限控制预留接口（TODO注释）</li>
                  <li>✅ 响应式设计，支持移动端</li>
                </ul>
              </Col>
            </Row>
          </div>

          <Divider />

          <div>
            <h3>组件特点</h3>
            <Space wrap>
              <Card size="small" title="评判标准" style={{ width: 200 }}>
                <p>支持&ldquo;越大越好&rdquo;和&ldquo;越小越好&rdquo;两种标准</p>
              </Card>
              <Card size="small" title="数值验证" style={{ width: 200 }}>
                <p>范围不能低于0，最大值必须大于最小值</p>
              </Card>
              <Card size="small" title="唯一性校验" style={{ width: 200 }}>
                <p>中文名、英文名、精准匹配键需要唯一</p>
              </Card>
              <Card size="small" title="权限控制" style={{ width: 200 }}>
                <p>预留权限控制接口（TODO注释）</p>
              </Card>
            </Space>
          </div>
        </Space>
      </Card>

      {/* 独立使用示例 */}
      <Card title="独立使用示例" style={{ marginBottom: 24 }}>
        <p style={{ marginBottom: 16, color: '#666' }}>
          可以直接作为独立页面使用，支持完整的增删改查功能
        </p>
        <EvaluationMetrics
          onChange={handleMetricsChange as any}
        />
      </Card>

      {/* 表单嵌入示例 */}
      <Card title="表单嵌入示例（新版本）">
        <p style={{ marginBottom: 16, color: '#666' }}>
          新版本的表单项组件，符合UI设计稿要求，支持点击按钮弹窗选择指标
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="任务名称"
                name="taskName"
                rules={[{ required: true, message: '请输入任务名称' }]}
              >
                <Input placeholder="请输入任务名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="任务描述"
                name="taskDescription"
              >
                <Input placeholder="请输入任务描述" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="关联指标"
            name="metrics"
            rules={[{ required: true, message: '请选择关联指标' }]}
          >
            <MetricFormItem placeholder="请点击上方按钮选择评估指标" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交表单
              </Button>
              <Button onClick={() => form.resetFields()}>
                重置表单
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 原版表单嵌入示例 */}
      <Card title="原版表单嵌入示例">
        <p style={{ marginBottom: 16, color: '#666' }}>
          可以作为表单项嵌入到其他表单中，支持单选和多选模式
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="任务名称"
                name="taskName"
                rules={[{ required: true, message: '请输入任务名称' }]}
              >
                <Input placeholder="请输入任务名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="任务描述"
                name="taskDescription"
              >
                <Input placeholder="请输入任务描述" />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ marginBottom: 16 }}>
            <label style={{ marginBottom: 8, display: 'block' }}>关联指标</label>
            <EvaluationMetrics />
          </div>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交表单
              </Button>
              <Button onClick={() => form.resetFields()}>
                重置表单
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Card
          size="small"
          title="当前选中的指标"
          style={{
            background: '#f9f9f9',
            marginTop: 16
          }}
        >
          {selectedMetrics.length > 0 ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              {selectedMetrics.map(metric => (
                <div key={metric.id} style={{
                  padding: 8,
                  background: 'white',
                  borderRadius: 4,
                  border: '1px solid #d9d9d9'
                }}>
                  <Space>
                    <strong>{metric.metricNameCn}</strong>
                    <span style={{ color: '#666' }}>({metric.metricNameEn})</span>
                    <span style={{ color: '#999' }}>
                      - {metric.evaluationStandard === 'higher_better' ? '越大越好' : '越小越好'}
                    </span>
                    <span style={{ color: '#999' }}>
                      - 范围: {metric.valueRangeMin}~{metric.valueRangeMax}
                    </span>
                  </Space>
                  {metric.metricDescription && (
                    <div style={{
                      marginTop: 4,
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.4'
                    }}>
                      {metric.metricDescription}
                    </div>
                  )}
                </div>
              ))}
            </Space>
          ) : (
            <p style={{ color: '#999', margin: 0 }}>暂未选择任何指标</p>
          )}
        </Card>
      </Card>
    </div>
  );
};

export default EvaluationMetricsPage;
