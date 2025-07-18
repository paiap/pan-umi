/*
 * @creater: panan
 * @message: 简化的评分行组件
 * @since: 2025-07-10 13:05:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-11 11:01:45
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/ScoreRow.tsx
 */

import React from 'react';
import { Row, Col, Button, Typography } from 'antd';

const { Text } = Typography;

interface ScoreRowProps {
  title: string;
  value?: number; // 支持undefined
  onChange: (value: number) => void;
  disabled?: boolean;
}

const ScoreRow: React.FC<ScoreRowProps> = ({
  title,
  value,
  onChange,
  disabled = false,
}) => {
  const scores = [-2, -1, 0, 1, 2];

  const getScoreColor = (score: number) => {
    switch (score) {
      case -2:
        return '#ff4d4f'; // 红色
      case -1:
        return '#ff7a45'; // 橙红
      case 0:
        return '#faad14'; // 橙色
      case 1:
        return '#a0d911'; // 黄绿
      case 2:
        return '#52c41a'; // 绿色
      default:
        return '#d9d9d9'; // 默认灰色
    }
  };

  return (
    <Row gutter={[8, 8]} align="middle" style={{ marginBottom: '12px' }}>
      <Col span={6}>
        <Text strong style={{ fontSize: '14px' }}>{title}:</Text>
      </Col>
      <Col span={18}>
        <Row gutter={[8, 8]}>
          {scores.map((score) => (
            <Col key={score}>
              <Button
                type={value === score ? 'primary' : 'default'}
                size="small"
                disabled={disabled}
                onClick={() => onChange(score)}
                style={{
                  width: 90, // 减小宽度以适应更多按钮
                  height: 36,
                  borderColor: value === score ? getScoreColor(score) : undefined,
                  backgroundColor: value === score ? getScoreColor(score) : undefined,
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {score}分
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ScoreRow;
