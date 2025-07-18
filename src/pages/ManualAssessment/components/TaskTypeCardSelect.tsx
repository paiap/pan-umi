/*
 * @creater: AI助手
 * @message: 评估任务类型卡片选择组件
 * @description: 用于人工评估任务创建页，支持两个选项卡片切换，受控组件
 */
import React, { useRef } from 'react';

export interface TaskTypeOption {
  value: 'dual' | 'single';
  title: string;
  description: string;
}

export interface TaskTypeCardSelectProps {
  value: 'dual' | 'single';
  options: TaskTypeOption[];
  onChange: (value: 'dual' | 'single') => void;
}

/**
 * 评估任务类型卡片选择组件
 * @param value 当前选中的类型
 * @param options 选项配置
 * @param onChange 切换回调
 */
const TaskTypeCardSelect: React.FC<TaskTypeCardSelectProps> = ({ value, options, onChange }) => {
  // refs 用于 hover 动态样式
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 卡片最大宽度，防止超大屏太宽
  const CARD_MAX_WIDTH = 700;
  const CARD_HEIGHT = 100;

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: -2,
      }}
    >
      {options.map((item, idx) => {
        const selected = value === item.value;
        return (
          <div
            key={item.value}
            ref={el => (cardRefs.current[idx] = el)}
            onClick={() => onChange(item.value)}
            style={{
              flex: 1,
              minWidth: 220,
              maxWidth: CARD_MAX_WIDTH,
              height: CARD_HEIGHT,
              cursor: 'pointer',
              border: selected ? '2px solid #2568f3' : '1.5px solid #e5e6eb',
              background: selected ? '#f6faff' : '#fff',
              borderRadius: 12,
              boxShadow: selected
                ? '0 2px 8px rgba(37,104,243,0.06)'
                : '0 1px 4px rgba(0,0,0,0.02)',
              transition: 'all 0.16s',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 18px',
              boxSizing: 'border-box',
              userSelect: 'none',
            }}
            onMouseEnter={e => {
              if (!selected) {
                (e.currentTarget as HTMLDivElement).style.border = '2px solidrgb(72, 127, 236)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(72, 129, 241, 0.5)';
                (e.currentTarget as HTMLDivElement).style.background = '#f0f6ff'; // 浅蓝色hover
              }
            }}
            onMouseLeave={e => {
              if (!selected) {
                (e.currentTarget as HTMLDivElement).style.border = '1.5px solid #e5e6eb';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.02)';
                (e.currentTarget as HTMLDivElement).style.background = '#fff';
              }
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 17, color: selected ? '#2568f3' : '#222', marginBottom: 8 }}>{item.title}</div>
            <div style={{ color: '#666', fontSize: 13.5, lineHeight: 1.7 }}>{item.description}</div>
            {/* 选中角标更小更圆润 */}
            {selected && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 0,
                height: 0,
                borderTop: '18px solidrgb(75, 127, 233)',
                borderLeft: '18px solid transparent',
                borderRadius: '0 10px 0 0',
                zIndex: 1,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskTypeCardSelect; 