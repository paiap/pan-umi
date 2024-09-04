/*
 * @creater: panan
 * @message: PanProgress
 * @since: 2024-07-16 16:59:22
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-07-16 19:44:20
 * @文件相对于项目的路径: /pan-umi/src/pages/Test/ProcessSummary/PanProgress/index.tsx
 */

import { Button, Image, Space } from 'antd'
import React, { FC, useState, useEffect, useRef } from 'react'

import png1 from '@/assets/1.png'
import png2 from '@/assets/2.png'
import { CheckCircleOutlined, RightOutlined, WarningOutlined } from '@ant-design/icons'
interface Props {
  data: any[]
  [key: string]: any
}

const PanProgress: FC<Props> = ({ data }) => {
  const [selectId, setSelected] = useState<number | null>(null)

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }}>
      {
        data.map((item, index: number) => {
          if (!item.id) {
            return (
              <div
                key={index + 1}
                style={{
                  width: '60px',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center', // Center the content vertically
                  alignItems: 'center', // Center the content horizontally
                }}>
                <RightOutlined style={{ fontSize: '25px', color:'#bfbfbf' }} />
              </div>
            )
          }
          return (
            <div
              key={index + 1}
              onClick={() => setSelected(item.id)}
              style={{
                position: 'relative',
                width: '600px',
                height: '250px',
                padding: '0 16px',
                margin: 'auto',
                borderRadius: '10px',
                border: selectId === item.id ? '5px solid #d6f1fd' : '1px solid #efefef',
                backgroundColor: 'white',
                // backgroundColor: selectId === item.id ? '#eff3ff' : 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center the content vertically
                alignItems: 'center', // Center the content horizontally
              }}
            >
              <Space>
                <Image src={index === 0 ? png1 : png2} height={150} preview={false} />
                {
                  item?.id === 1 && <Button disabled style={{ color: 'green' }} icon={<CheckCircleOutlined />}>已配置</Button>
                }
                {
                  item?.id === 2 && <Button disabled style={{ color: 'red' }} icon={<WarningOutlined />}>未配置</Button>
                }
              </Space>
              <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>{item.name}</div>
              <div style={{ color: '#AAABAF', width: '500px' }}>{item.description}</div>
              <div style={{
                display: 'absolute',
                top: '0'
              }}>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PanProgress