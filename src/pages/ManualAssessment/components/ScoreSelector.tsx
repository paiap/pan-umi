/*
 * @creater: panan
 * @message: 评分选择组件
 * @since: 2025-07-10 12:40:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-10 12:40:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ScoreSelector.tsx
 */

import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';

const { Title, Text } = Typography;

interface ScoreSelectorProps {
  title: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ScoreSelector: React.FC<ScoreSelectorProps> = ({
  title,
  description,
  value,
  onChange,
  disabled = false,
}) => {
  const scores = [1, 2, 3, 4, 5];

  const getScoreColor = (score: number) => {
    if (score <= 2) return '#ff4d4f'; // 红色
    if (score <= 3) return '#faad14'; // 黄色
    return '#52c41a'; // 绿色
  };

  const getScoreText = (score: number) => {
    switch (score) {
      case 1:
        return '很差';
      case 2:
        return '较差';
      case 3:
        return '一般';
      case 4:
        return '较好';
      case 5:
        return '很好';
      default:
        return '';
    }
  };

  return (
    <Card
      size="small"
      title={<Title level={5} style={{ margin: 0, fontSize: '14px' }}>{title}</Title>}
      style={{ marginBottom: 12 }}
      bodyStyle={{ padding: '12px' }}
    >
      {description && (
        <Text type="secondary" style={{ display: 'block', marginBottom: 8, fontSize: '12px' }}>
          {description}
        </Text>
      )}
      
      <Row gutter={[8, 8]} justify="center">
        {scores.map((score) => (
          <Col key={score}>
            <Button
              type={value === score ? 'primary' : 'default'}
              size="large"
              disabled={disabled}
              onClick={() => onChange(score)}
              style={{
                width: 50,
                height: 50,
                borderColor: value === score ? getScoreColor(score) : undefined,
                backgroundColor: value === score ? getScoreColor(score) : undefined,
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              <div>{score}</div>
              <div style={{ fontSize: '8px', fontWeight: 'normal' }}>
                {getScoreText(score)}
              </div>
            </Button>
          </Col>
        ))}
      </Row>
      
      {value > 0 && (
        <div style={{ textAlign: 'center', marginTop: 6 }}>
          <Text style={{ color: getScoreColor(value), fontSize: '12px' }}>
            当前得分: {value}分 ({getScoreText(value)})
          </Text>
        </div>
      )}
    </Card>
  );
};

export default ScoreSelector;
