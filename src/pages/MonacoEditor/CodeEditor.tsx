/*
 * @creater: panan
 * @message: CodeEditor
 * @since: 2025-03-07 15:36:48
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-07 15:36:49
 * @文件相对于项目的路径: /pan-umi/src/pages/MonacoEditor/CodeEditor.tsx
 */

import React, { FC, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { PageContainer } from '@ant-design/pro-components';
import { Select, Space } from 'antd';

interface MonacoEditorProps {
  defaultValue?: string;
  language?: string;
  theme?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  height?: string;
  width?: string;
}

const CodeEditor: FC<MonacoEditorProps> = ({
  defaultValue = '// 在此输入代码',
  language = 'javascript',
  theme = 'vs-dark',
  onChange,
  readOnly = false,
  height = '500px',
  width = '100%'
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
  ];

  const themeOptions = [
    { label: '深色', value: 'vs-dark' },
    { label: '浅色', value: 'vs-light' },
    { label: '高对比度', value: 'hc-black' },
  ];

  const editorOptions = {
    readOnly,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastColumn: 5,
    automaticLayout: true,
    wordWrap: 'on',
    renderLineHighlight: 'all',
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'smart',
    tabCompletion: 'on',
    folding: true,
    renderIndentGuides: true,
    matchBrackets: 'always',
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <PageContainer ghost header={{
      title: '代码编辑器',
      extra: [
        <Space key="controls">
          <Select
            value={currentLanguage}
            onChange={setCurrentLanguage}
            options={languageOptions}
            style={{ width: 120 }}
            placeholder="选择语言"
          />
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
      <MonacoEditor
        height={height}
        width={width}
        language={currentLanguage}
        theme={currentTheme}
        defaultValue={defaultValue}
        options={editorOptions}
        onChange={handleEditorChange}
      />
    </PageContainer>
  );
};

export default CodeEditor;
