import React, { FC, useEffect, useState } from 'react'
import MonacoEditor from '@monaco-editor/react';

import { Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
interface Props {
  [key: string]: any
}

const ReactEditor: FC<Props> = () => {

  const [content, setContent] = useState('');
  const [formattedContent, setFormattedContent] = useState('');

  useEffect(() => {
    setContent('{"name":"John","age":30,"city":"New York"}')
  }, [])

  const parseAndFormatJson = (content: any) => {
    let position = 0;
    const formattedJsonObjects = [];

    while (position < content.length) {
      let found = false;
      for (let end = position + 1; end <= content.length; end++) {
        try {
          // 提取子字符串
          let substring = content.substring(position, end);

          // 将最外层的单引号转换为双引号
          substring = substring.replace(/'([^']*)'(?=:)|(?<=:)'([^']*)'/g, '"$1$2"');

          // 尝试解析 JSON
          const json = JSON.parse(substring);

          // 确保 JSON 对象是完整的
          if (end < content.length && content[end] !== ',' && content[end] !== ']' && content[end] !== '}') {
            continue;
          }

          // 将 JSON 对象转换为单行字符串
          formattedJsonObjects.push(JSON.stringify(json));
          position = end;
          found = true;
          break; // 成功解析，跳出循环
        } catch (e) {
          // 解析失败，尝试更长的字符串
        }
      }
      if (!found) {
        // 如果在当前位置无法解析出有效的 JSON，可能是非 JSON 内容，跳过一个字符
        position++;
      }
    }
    return formattedJsonObjects.join('\n');
  }

  useEffect(() => {
    if (!content) return
    try {
      const formattedJsonObjects = [];
      let buffer = '';

      const lines = content.split('\n');
      for (let line of lines) {
        buffer += line;

        try {
          // 将最外层的单引号转换为双引号
          const doubleQuotedBuffer = buffer.replace(/'([^']*)'(?=:)|(?<=:)'([^']*)'/g, '"$1$2"');
          // 尝试解析 JSON
          const jsonObject = JSON.parse(doubleQuotedBuffer);
          // 将 JSON 对象转换为单行字符串
          formattedJsonObjects.push(JSON.stringify(jsonObject));
          // 清空缓冲区
          buffer = '';
        } catch (e) {
          // 如果解析失败，继续累积缓冲区
          buffer += '\n';
        }
      }

      if (buffer.trim() !== '') {
        throw new Error('Invalid JSON string');
      }

      // 将所有格式化后的 JSON 对象合并为多行字符串
      setFormattedContent(formattedJsonObjects.join('\n'));
    } catch (e) {
      // 如果解析或转换失败，设置错误信息
      setFormattedContent('Invalid JSON string');
    }
    // try {
    //   const jsonObject = JSON.parse(content);
    //   const formatted = JSON.stringify(jsonObject, null, 4);
    //   setFormattedContent(formatted);
    // } catch (e) {
    //   setFormattedContent('Invalid JSON string');
    // }

    // try {
    //   // 直接解析content字符串为JSON对象
    //   const jsonObject = JSON.parse(content);
    //   // 将JSON对象转换为单行字符串
    //   const formatted = JSON.stringify(jsonObject);
    //   // 设置转换后的内容
    //   setFormattedContent(formatted);
    // } catch (e) {
    //   // 如果解析或转换失败，设置错误信息
    //   setFormattedContent('Invalid JSON string');
    // }

    // try {
    //   // 将单引号替换为双引号，但不替换值内部的单引号
    //   const doubleQuotedContent = content.replace(/'([^']*)'(?=:)|(?<=:)'([^']*)'/g, '"$1$2"');
    //   // 直接解析替换后的content字符串为JSON对象
    //   const jsonObject = JSON.parse(doubleQuotedContent);
    //   // 将JSON对象转换为单行字符串
    //   const formatted = JSON.stringify(jsonObject);
    //   // 设置转换后的内容
    //   setFormattedContent(formatted);
    // } catch (e) {
    //   // 如果解析或转换失败，设置错误信息
    //   setFormattedContent('Invalid JSON string');
    // }

  }, [content])

  const handleEditorChange = (value: any) => {
    setContent(value);
  };

  return (
    <PageContainer ghost header={{
      title: 'json格式化校验——vscode代码编辑器',
    }}>
      <Row>
        <Col span={12}>
          <MonacoEditor
            height="800px"
            defaultLanguage="json"
            theme="vs-dark"
            defaultValue={content}
            onChange={handleEditorChange}
          />
        </Col>
        <Col span={12}>
          <MonacoEditor
            height="800px"
            defaultLanguage="json"
            theme="vs-dark"
            options={{
              readOnly: true,
            }}
            value={formattedContent}
            onChange={handleEditorChange}
          />
        </Col>

      </Row>
    </PageContainer>

  )
}

export default ReactEditor

{/* <MonacoEditor
  height="400px" // 编辑器高度
  width="800px" // 编辑器宽度
  defaultValue="// some comment" // 编辑器初始显示的内容
  defaultLanguage="javascript" // 编辑器初始语言
  language="javascript" // 编辑器语言
  theme="vs-dark" // 编辑器主题
  value={code} // 编辑器显示的内容
  options={options} // 编辑器的选项（如上所述）
  onChange={handleEditorChange} // 内容更改时的回调函数
  onMount={handleEditorDidMount} // 编辑器挂载时的回调函数
  loading={<div>Loading...</div>} // 自定义加载组件
  path="file:///index.js" // 编辑器路径（用于多文件编辑）
  saveViewState={true} // 保存视图状态
/> */}

// const options = {
//   value: 'your initial code', // 初始显示的代码内容
//   language: 'javascript', // 代码语言
//   theme: 'vs-dark', // 编辑器主题（例如 'vs', 'vs-dark', 'hc-black'）
//   readOnly: false, // 是否只读
//   fontSize: 14, // 字体大小
//   minimap: { enabled: true }, // 是否显示小地图
//   lineNumbers: 'on', // 行号显示方式 ('on', 'off', 'relative', 'interval')
//   wordWrap: 'off', // 代码自动换行 ('off', 'on', 'wordWrapColumn', 'bounded')
//   tabSize: 4, // Tab 键宽度
//   insertSpaces: true, // 插入空格而不是 Tab
//   automaticLayout: true, // 自动布局（编辑器大小随容器变化）
//   scrollBeyondLastLine: false, // 是否允许滚动到最后一行之后
//   smoothScrolling: true, // 平滑滚动
//   contextmenu: true, // 是否启用右键菜单
//   autoClosingBrackets: 'always', // 自动闭合括号 ('always', 'languageDefined', 'beforeWhitespace', 'never')
//   autoIndent: 'full', // 自动缩进 ('none', 'keep', 'brackets', 'advanced', 'full')
//   formatOnType: true, // 输入时自动格式化
//   formatOnPaste: true, // 粘贴时自动格式化
//   renderWhitespace: 'all', // 显示空白字符 ('none', 'boundary', 'selection', 'all')
//   cursorStyle: 'line', // 光标样式 ('block', 'block-outline', 'line', 'line-thin', 'underline', 'underline-thin')
//   cursorBlinking: 'blink', // 光标闪烁样式 ('blink', 'smooth', 'phase', 'expand', 'solid')
//   highlightActiveIndentGuide: true, // 高亮活动的缩进指南
//   renderLineHighlight: 'all', // 行高亮显示 ('none', 'gutter', 'line', 'all')
//   folding: true, // 是否启用代码折叠
//   foldingStrategy: 'auto', // 代码折叠策略 ('auto', 'indentation')
//   renderIndentGuides: true, // 显示缩进指南
//   matchBrackets: 'always', // 括号匹配 ('never', 'near', 'always')
//   mouseWheelZoom: true, // 允许通过鼠标滚轮缩放
//   links: true, // 启用链接检测
//   quickSuggestions: true, // 启用快速建议
//   suggestOnTriggerCharacters: true, // 启用触发字符建议
//   acceptSuggestionOnEnter: 'on', // 按 Enter 键接受建议 ('on', 'smart', 'off')
//   tabCompletion: 'on', // 启用 Tab 补全 ('on', 'off', 'onlySnippets')
//   codeLens: true, // 启用 CodeLens
//   colorDecorators: true, // 启用颜色装饰器
//   foldingHighlight: true, // 启用折叠高亮
//   hover: { enabled: true }, // 启用悬停提示
//   lightbulb: { enabled: true }, // 启用代码修复提示
//   scrollbar: {
//     vertical: 'auto', // 垂直滚动条 ('auto', 'visible', 'hidden')
//     horizontal: 'auto', // 水平滚动条 ('auto', 'visible', 'hidden')
//   },
//   glyphMargin: true, // 启用字形边距
//   renderFinalNewline: true, // 显示最后一行的换行符
//   scrollBeyondLastColumn: 5, // 滚动超过最后一列的列数
//   useTabStops: true, // 使用 Tab 停止位
//   accessibilitySupport: 'auto', // 辅助功能支持 ('auto', 'on', 'off')
//   selectionClipboard: true, // 启用选择剪贴板
//   copyWithSyntaxHighlighting: true, // 启用语法高亮复制
// };