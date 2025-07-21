/*
 * @Author: 潘安 panan2001@outlook.com
 * @Date: 2025-07-10 21:05:29
 * @LastEditors: 潘安 panan2001@outlook.com
 * @LastEditTime: 2025-07-21 20:06:01
 * @FilePath: /pan-umi/src/pages/ManualAssessment/components/ScoreRow.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

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
    <Row gutter={[8, 8]} align="middle">
      <Col span={4}>
        <Text strong style={{ fontSize: '14px' }}>
          {title}:
        </Text>
      </Col>
      <Col span={20}>
        <Row gutter={10}>
          {scores.map((score) => (
            <Col key={score}>
              <Button
                type={value === score ? 'primary' : 'default'}
                disabled={disabled}
                onClick={() => onChange(score)}
                style={{
                  width: 100, // 恢复宽度
                  height: 36,
                  borderColor:
                    value === score ? getScoreColor(score) : undefined,
                  backgroundColor:
                    value === score ? getScoreColor(score) : undefined,
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
