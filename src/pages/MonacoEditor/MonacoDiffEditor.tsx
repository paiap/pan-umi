/*
 * @creater: panan
 * @message: MonacoEditorPage
 * @since: 2025-03-07 15:50:03
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-07 16:08:55
 * @文件相对于项目的路径: /pan-umi/src/pages/MonacoEditor/MonacoDiffEditor.tsx
 */

import React, { useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { PageContainer } from '@ant-design/pro-components';
import { Select, Space } from 'antd';

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

const newJson = {
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

const MonacoDiffEditor: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('vs-dark');

  const themeOptions = [
    { label: '深色', value: 'vs-dark' },
    { label: '浅色', value: 'vs-light' },
    { label: '高对比度', value: 'hc-black' },
  ];

  const editorOptions = {
    readOnly: true,
    renderSideBySide: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    wordWrap: 'on',
    renderLineHighlight: 'all',
    folding: true,
    renderIndentGuides: true,
    matchBrackets: 'always',
  };

  return (
    <PageContainer ghost header={{
      title: 'JSON数据对比',
      extra: [
        <Space key="controls">
          <Select
            value={currentTheme}
            onChange={setCurrentTheme}
            options={themeOptions}
            style={{ width: 120 }}
            placeholder="选择主题"
          />
        </Space>
      ],
    }}>
      <DiffEditor
        height="450px"
        language="json"
        theme={currentTheme}
        original={JSON.stringify(oldJson, null, 2)}
        modified={JSON.stringify(newJson, null, 2)}
        options={editorOptions}
      />
    </PageContainer>
  );
};

export default MonacoDiffEditor;