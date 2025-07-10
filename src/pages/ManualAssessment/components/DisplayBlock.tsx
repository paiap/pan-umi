import React, { useState } from 'react';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import styles from './DisplayBlock.module.less';

/**
 * 通用展示区域组件
 * @param {string} title 区块标题
 * @param {React.ReactNode} children 展示内容
 * @param {number|string} width 宽度
 * @param {number|string} height 高度
 */
interface DisplayBlockProps {
  title: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

const DisplayBlock: React.FC<DisplayBlockProps> = ({ title, width = '100%', height = 200, children }) => {
  const [fullscreen, setFullscreen] = useState(false);

  /**
   * 切换全屏/退出全屏
   */
  const handleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  return (
    <div
      className={fullscreen ? styles.fullscreen : styles.displayBlock}
      style={{ width: fullscreen ? '100vw' : width, height: fullscreen ? '100vh' : height }}
    >
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} onClick={handleFullscreen}>
          {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DisplayBlock;