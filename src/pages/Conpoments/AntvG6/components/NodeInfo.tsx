/*
 * @creater: panan
 * @message: NodeInfo
 * @since: 2024-12-05 11:18:50
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-05 14:46:47
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/AntvG6/components/NodeInfo.tsx
 */

import { Badge, Progress, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  type: string
}

const titleMap = {
  model: '模型',
  tpc: '项目组',
  cki: 'CKI',
  'train-result': '训练结果',
}

const NodeInfo: FC<Props> = ({ type }) => {

  return (
    <div style={{
      width: '300px',
      minHeight: '100px',
      background: '#fff',
      borderRadius: 5,
      border: '1px solid #5F73A3',
    }}>
      <Badge.Ribbon text={titleMap[type as keyof typeof titleMap]}></Badge.Ribbon>
      {
        (type === 'model' || type === 'tpc') && (
          <div style={{
            margin: 'auto',
            lineHeight: '100px',
            padding: '0 20px',
            fontSize: '18px',
          }}>
            <a onClick={() => {
              alert('跳转到Hipilot-33B-Chat')
            }}>
              {
                type === 'model' ? 'Hipilot-33B-Chat' : '[Hipilot-CDG]代码生成组'
              }
            </a>
          </div>
        )
      }
      {
        type === 'cki' && (
          <div style={{
            padding: '10px',
            color: 'grey'
          }}>
            <Space direction='vertical'>
              <div style={{ color: '#000', fontSize: '16px' }}>Hipilot编程插件深度使用人数</div>
              <div>完成值： 256人</div>
              <div>目标值：800人</div>
              <div>模型对比cki贡献占比：15%</div>
              <div><Progress percent={27.47} /></div>
            </Space>
          </div>
        )
      }
      {
        type === 'train-result' && (
          <div style={{
            padding: '10px',
            color: 'grey'
          }}>
            <Space direction='vertical'>
              <div>需求名称：金融策略代码理解生成</div>
              <div>业务测试集：Hipilot-MulChat</div>
              <div>初始评分：0.1（目标0.8）</div>
              <div>最优评分：0.72</div>
              <div>个人在本次训练中贡献占比：20%</div>
              <div><Progress percent={89} /></div>
            </Space>
          </div>
        )
      }
    </div>
  )
}

export default NodeInfo