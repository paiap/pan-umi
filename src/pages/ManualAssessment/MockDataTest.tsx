/*
 * @creater: panan
 * @message: Mock数据测试页面
 * @since: 2025-07-14 17:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-14 17:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/MockDataTest.tsx
 */

import React from 'react';
import { Card, Button, Space, Typography, Divider } from 'antd';
import { history } from 'umi';

const { Title, Text, Paragraph } = Typography;

const MockDataTest: React.FC = () => {
  const testCases = [
    {
      title: '第一条数据 (没有上一条)',
      description: '测试当前是第1条数据时，上一条按钮应该被禁用',
      assessmentId: '123',
      contentId: '1',
      expectedBehavior: [
        '✅ "上一条" 按钮应该被禁用',
        '✅ "下一条" 按钮应该可用',
        '✅ 显示 "1 / 3"',
        '✅ 内容是关于AI医疗的分析'
      ]
    },
    {
      title: '最后一条数据 (没有下一条)',
      description: '测试当前是最后一条数据时，下一条按钮应该被禁用',
      assessmentId: '123',
      contentId: '3',
      expectedBehavior: [
        '✅ "上一条" 按钮应该可用',
        '✅ "下一条" 按钮应该被禁用',
        '✅ 显示 "3 / 3"',
        '✅ 内容是关于区块链金融的分析',
        '✅ "完成并下一条" 按钮点击后应该显示 "已完成所有对比任务" 并返回列表页'
      ]
    },
    {
      title: '只有一条数据',
      description: '测试只有一条数据的评估任务',
      assessmentId: '456',
      contentId: '1',
      expectedBehavior: [
        '✅ "上一条" 按钮应该被禁用',
        '✅ "下一条" 按钮应该被禁用',
        '✅ 显示 "1 / 1"',
        '✅ 内容是关于量子计算的分析',
        '✅ "完成并下一条" 按钮点击后应该显示 "已完成所有对比任务" 并返回列表页'
      ]
    },
    {
      title: '中间数据 (既有上一条也有下一条)',
      description: '测试正常的中间数据情况',
      assessmentId: '123',
      contentId: '2',
      expectedBehavior: [
        '✅ "上一条" 按钮应该可用',
        '✅ "下一条" 按钮应该可用',
        '✅ 显示 "5 / 30"',
        '✅ 内容是关于新能源汽车的投资分析'
      ]
    }
  ];

  const handleTest = (assessmentId: string, contentId: string) => {
    const url = `/ManualAssessment/multiCompareDetail/${assessmentId}/${contentId}`;
    history.push(url);
  };

  return (
    <div style={{ padding: 24, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <Title level={2}>多对比评估详情页 Mock 数据测试</Title>
        <Paragraph type="secondary">
          这个页面提供了不同边界情况的测试用例，帮助验证多对比评估详情页在各种数据状态下的表现。
          点击下面的测试按钮即可跳转到对应的页面进行测试。
        </Paragraph>
        
        <Divider />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {testCases.map((testCase, index) => (
            <Card 
              key={index}
              size="small"
              style={{ backgroundColor: '#fafafa' }}
              title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text strong>{testCase.title}</Text>
                  <Button 
                    type="primary" 
                    onClick={() => handleTest(testCase.assessmentId, testCase.contentId)}
                  >
                    测试这个场景
                  </Button>
                </div>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <Text>{testCase.description}</Text>
              </div>
              
              <div>
                <Text strong style={{ color: '#1890ff' }}>预期行为：</Text>
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  {testCase.expectedBehavior.map((behavior, idx) => (
                    <li key={idx} style={{ marginBottom: 4 }}>
                      <Text type="secondary">{behavior}</Text>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 12, padding: 8, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
                <Text code>
                  URL: /ManualAssessment/multiCompareDetail/{testCase.assessmentId}/{testCase.contentId}
                </Text>
              </div>
            </Card>
          ))}
        </Space>

        <Divider />

        <Card size="small" style={{ backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' }}>
          <Title level={4} style={{ color: '#1890ff', marginBottom: 16 }}>💡 测试说明</Title>
          <ul>
            <li><Text>每个测试场景都模拟了不同的数据边界情况</Text></li>
            <li><Text>注意观察导航按钮的启用/禁用状态</Text></li>
            <li><Text>检查页面计数器显示是否正确</Text></li>
            <li><Text>测试"完成并下一条"按钮在最后一条数据时的行为</Text></li>
            <li><Text>可以使用浏览器的前进/后退按钮测试路由是否正确</Text></li>
          </ul>
        </Card>
      </Card>
    </div>
  );
};

export default MockDataTest;
