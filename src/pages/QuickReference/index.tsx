/*
 * @creater: panan
 * @message: QuickReference
 * @since: 2024-06-05 16:07:59
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-06-05 16:08:00
 * @文件相对于项目的路径: /pan-umi/src/pages/QuickReference/index.tsx
 */
import React, { FC, useEffect, useRef } from 'react'
type Props = Record<string, any>;

const QuickReference: FC<Props> = () => {
  // 使用useRef来获取iframe元素，方便后续操作
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 使用useEffect来设置iframe的src属性
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "http://ref.laoleng.vip/";
    }
  }, []); // 空数组作为依赖项，确保只在组件挂载时执行一次

  return (
    <div>
      {/* 添加iframe */}
      <iframe ref={iframeRef} title="Neumorphism Design Tool" frameBorder="0" width="100%" height="1000"></iframe>
    </div>
  );
}

export default QuickReference