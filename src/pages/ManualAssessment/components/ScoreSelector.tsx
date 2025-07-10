import React from 'react';
import { Rate } from 'antd';

/**
 * 评估效果打分组件
 * @param {object} value 当前分数
 * @param {function} onChange 分数变化回调
 */
export interface ScoreValue {
  truth: number;
  usability: number;
  consistency: number;
}

interface ScoreSelectorProps {
  value: ScoreValue;
  onChange: (val: ScoreValue) => void;
}

const ScoreSelector: React.FC<ScoreSelectorProps> = ({ value, onChange }) => {
  /**
   * 处理分数变化
   */
  const handleChange = (key: keyof ScoreValue, score: number) => {
    onChange({ ...value, [key]: score });
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ marginRight: 8 }}>真实性：</span>
        <Rate value={value.truth} onChange={(v) => handleChange('truth', v)} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ marginRight: 8 }}>可用性：</span>
        <Rate value={value.usability} onChange={(v) => handleChange('usability', v)} />
      </div>
      <div>
        <span style={{ marginRight: 8 }}>一致性：</span>
        <Rate value={value.consistency} onChange={(v) => handleChange('consistency', v)} />
      </div>
    </div>
  );
};

export default ScoreSelector;