/*
 * @creater: panan
 * @message: 
 * @since: 2025-03-07 15:26:36
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-07 16:12:25
 * @文件相对于项目的路径: /pan-umi/src/pages/MonacoEditor/index.tsx
 */

import React from 'react';
import BaseMonacoEditor from './BaseMonacoEditor';

const jsonData = {
  "name": "更新后的JSON数据",
  "description": "这是更新后的JSON数据结构",
  "version": 2.0,
  "features": [
    "语法高亮",
    "主题切换",
    "代码格式化",
    "数据对比",
    "实时预览"
  ],
  "settings": {
    "theme": "vs-light",
    "language": "json",
    "autoFormat": true,
    "diffView": true
  },
  "metadata": {
    "created": "2024-03-08",
    "author": "panan",
    "isActive": true,
    "lastModified": "2024-03-08"
  }
};

const oldJson = {
  "name": "示例JSON数据",
  "description": "这是一个示例JSON数据结构",
  "version": 1.0,
  "features": [
    "语法高亮",
    "主题切换",
    "代码格式化"
  ],
  "settings": {
    "theme": "vs-dark",
    "language": "json",
    "autoFormat": true
  },
  "metadata": {
    "created": "2024-03-07",
    "author": "panan",
    "isActive": true
  }
};

const MonacoEditorPage: React.FC = () => {
  return (
    <div style={{ height:'100%', overflow: 'auto' }}>
      <BaseMonacoEditor
        mode="edit"
        defaultValue={JSON.stringify(jsonData, null, 2)}
        language="json"
        height="450px"
        readOnly
      />
      <BaseMonacoEditor
        mode="diff"
        language="json"
        height="450px"
        original={JSON.stringify(oldJson, null, 2)}
        modified={JSON.stringify(jsonData, null, 2)}
      />
    </div>
  );
};

export default MonacoEditorPage;
