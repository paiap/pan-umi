/*
 * @creater: panan
 * @message: 最大版本号 MaxVersion
 * @since: 2025-04-23 16:21:51
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-23 16:58:49
 * @文件相对于项目的路径: /pan-umi/src/pages/LlmEvalComponent/MaxVersion/index.tsx
 */

import { Form, Radio, Space, Tooltip } from 'antd';
import React, { FC, useEffect, useState } from 'react';

interface MaxVersionProps {
  value?: string;
  onChange?: (value: string) => void;
  currentVersion: string; // 当前最大版本号，例如：2.3.4
}

/**
 * 版本号选择组件
 * 根据语义化版本规范(Semantic Versioning)，版本格式为：主版本号.次版本号.修订号
 * - 主版本号：当你做了不兼容的API修改
 * - 次版本号：当你做了向下兼容的功能性新增
 * - 修订号：当你做了向下兼容的问题修正
 */
const MaxVersion: FC<MaxVersionProps> = ({ value, onChange, currentVersion }) => {
  const [versionOptions, setVersionOptions] = useState<any[]>([])
  // 解析当前版本号
  const parseVersion = (version: string) => {
    const parts = version.split('.');
    return {
      major: parseInt(parts[0]) || 0,
      minor: parseInt(parts[1]) || 0,
      patch: parseInt(parts[2]) || 0,
    };
  };

  // 计算下一个版本号选项
  const calculateNextVersions = (version: string) => {
    const { major, minor, patch } = parseVersion(version);
    return {
      patch: `${major}.${minor}.${patch + 1}`, // 修订版本号迭代
      minor: `${major}.${minor + 1}.0`, // 次版本号迭代，修订版本号重置
      major: `${major + 1}.0.0`, // 主版本号迭代，次版本号和修订版本号重置
    };
  };

  // 处理版本选择变化
  const handleVersionChange = (e: any) => {
    const newVersion = e.target.value;
    if (onChange) {
      onChange(newVersion);
    }
  };

  useEffect(() => {
    const nextVersions = calculateNextVersions(currentVersion || '1.0.0');
    // 版本号选项
    const curVersionOptions = [
      {
        label: `${nextVersions.patch} (修订版本迭代)`,
        value: nextVersions.patch,
        tooltip: '修复错误选择修订版本迭代',
      },
      {
        label: `${nextVersions.minor} (次版本迭代)`,
        value: nextVersions.minor,
        tooltip: '添加新功能选择次版本迭代',
      },
      {
        label: `${nextVersions.major} (主版本迭代)`,
        value: nextVersions.major,
        tooltip: '重大变更时选择主版本迭代',
      },
    ];
    setVersionOptions(curVersionOptions)
  }, [currentVersion])

  useEffect(() => {
    if (versionOptions.length === 0) return
    if (onChange) {
      onChange(versionOptions[0].value);
    }
  }, [versionOptions])

  return (
    <div>
      <Radio.Group
        value={value}
        onChange={handleVersionChange}
        style={{ width: '100%' }}
      >
        <Space style={{ width: '100%' }}>
          {versionOptions.map((option) => (
            <Tooltip key={option.value} title={option.tooltip}>
              <Radio value={option.value}>{option.label}</Radio>
            </Tooltip>
          ))}
        </Space>
      </Radio.Group>
      <div style={{ marginTop: 8, color: '#999', fontSize: 12 }}>
        当前最大版本号: {currentVersion}
      </div>
      <div style={{ color: '#999', fontSize: 12 }}>
        版本编码规则: 重大变更时选择主版本迭代，添加新功能选择次版本迭代，修复错误选择修订版本迭代。
      </div>
    </div>
  );
};

export default MaxVersion;
