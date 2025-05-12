/*
 * @creater: panan
 * @message: BaseMonacoEditor
 * @since: 2025-03-07 16:30:00
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-16 11:42:42
 * @文件相对于项目的路径: /pan-umi/src/pages/MonacoEditor/BaseMonacoEditor.tsx
 */

import React, { FC, useState } from 'react';
import MonacoEditor, { DiffEditor, loader } from '@monaco-editor/react';
import { Card, Select, Space, Spin } from 'antd';

// 加载状态组件
const LoadingComponent = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Spin tip="加载中..." />
  </div>
)

interface BaseMonacoEditorProps {
  mode?: 'edit' | 'diff';
  defaultValue?: string;
  language?: string;
  theme?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  height?: string;
  width?: string;
  // 差异对比模式的属性
  original?: string;
  modified?: string;
  title?: string;
  showEditor?: boolean
}

const BaseMonacoEditor: FC<BaseMonacoEditorProps> = ({
  mode = 'edit',
  defaultValue = '// 在此输入代码',
  language = 'javascript',
  theme = 'vs-dark',
  onChange,
  readOnly = false,
  height = '500px',
  width = '100%',
  original,
  modified,
  showEditor = false,
  title = !showEditor && (mode === 'edit' ? '代码编辑器' : 'JSON数据对比'),
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentTheme, setCurrentTheme] = useState(theme);

  const languageOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JSON', value: 'json' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'SQL', value: 'sql' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'YAML', value: 'yaml' },
  ];

  const themeOptions = [
    { label: '深色', value: 'vs-dark' },
    { label: '浅色', value: 'vs-light' },
    { label: '高对比度', value: 'hc-black' },
  ];

  const baseEditorOptions = {
    readOnly,
    minimap: { enabled: mode === 'edit' },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    wordWrap: 'on',
    renderLineHighlight: 'all',
    folding: true,
    renderIndentGuides: true,
    matchBrackets: 'always',
    formatOnPaste: true,
    formatOnType: true,
  };

  const diffEditorOptions = {
    ...baseEditorOptions,
    renderSideBySide: true,
    minimap: { enabled: false },
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  const renderEditor = () => {
    if (mode === 'diff') {
      return (
        <DiffEditor
          height={height}
          width={width}
          language={currentLanguage}
          theme={currentTheme}
          original={original || ''}
          modified={modified || ''}
          options={diffEditorOptions}
          loading={<LoadingComponent />}
        />
      );
    }

    return (
      <MonacoEditor
        height={height}
        width={width}
        language={currentLanguage}
        theme={currentTheme}
        defaultValue={defaultValue}
        options={baseEditorOptions}
        onChange={handleEditorChange}
        loading={<LoadingComponent />}
      />
    );
  }

  return (
    <Card
      title={title}
      styles={{
        body: {
          padding: '0px',
          margin: '0px'
        }
      }}
      extra={showEditor ? undefined : (
        <Space key="controls">
          {mode === 'edit' && (
            <Select
              value={currentLanguage}
              onChange={setCurrentLanguage}
              options={languageOptions}
              style={{ width: 120 }}
              placeholder="选择语言"
            />
          )}
          <Select
            value={currentTheme}
            onChange={setCurrentTheme}
            options={themeOptions}
            style={{ width: 120 }}
            placeholder="选择主题"
          />
        </Space>
      )
      }>
      {renderEditor()}
    </Card>
  );
};

export default BaseMonacoEditor;