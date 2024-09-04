/*
 * @creater: panan
 * @message: PanSelectCard
 * @since: 2024-07-16 15:49:04
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-08-19 10:21:19
 * @文件相对于项目的路径: /pan-umi/src/pages/InteractiveModel/OpenInteractive/PanSelectCard/index.tsx
 */

import { CheckOutlined } from '@ant-design/icons'
import React, { FC, useState, useEffect, useRef } from 'react'
interface Props {
  data: any[],
  value?: number,
  onChange?: (value: number) => void,
  [key: string]: any
}

const PanSelectCard: FC<Props> = ({ data, value, onChange }) => {

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    }}>
      {
        data.map((item) => (
          <div
            key={item.id}
            onClick={() => onChange && onChange(item.id)}
            style={{
              position: 'relative',
              width: '300px',
              height: '120px',
              padding: '16px',
              margin: '5px',
              borderRadius: '10px',
              border: value === item.id ? '1px solid #2568f3' : '1px solid #efefef',
              backgroundColor: value === item.id ? '#eff3ff' : 'white',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '12px' }}>{item.name}</div>
            <div style={{ color: '#AAABAF' }}>{item.description}</div>
            {
              value === item.id && (
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  borderTopRightRadius: '9px',
                  borderRight: '30px solid blue',
                  borderBottom: '30px solid transparent',
                }}>
                  <span style={{
                    position: 'absolute',
                    color: '#fff',
                    left: '14px',
                  }}>
                    <CheckOutlined />
                  </span>
                </div>
              )
            }
          </div>
        ))
      }
    </div>
  )
}

export default PanSelectCard
