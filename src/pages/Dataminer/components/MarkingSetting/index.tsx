/*
 * @creater: panan
 * @message: 多样性打标配置
 * @since: 2024-10-22 21:40:52
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-23 13:55:09
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/components/MarkingSetting/index.tsx
 */

import { QuestionCircleOutlined } from '@ant-design/icons';
import { Card, Space, Switch, Tooltip } from 'antd';
import React, { FC, useState } from 'react'
interface Props {
  data: {
    key: string;
    name: string;
    description: string;
  }[];
  title: string;
  description: string;
  defaultValue: boolean;
  onChange: (value: string[] | boolean) => void;
  disabled?: boolean;
}

const MarkingSetting: FC<Props> = ({ title, description, data, defaultValue, onChange, disabled }) => {
  const [status, setStatus] = useState<boolean>(defaultValue)
  const [selectTags, setSelectTags] = useState<string[]>([])
  return (
    <Space direction='vertical' style={{ width: '280px' }}>
      <Card
        title={
          <Space>
            <span>{title}</span>
            {
              description && (
                <Tooltip title={description}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )
            }
          </Space>
        }
        styles={{
          body: {
            margin: '0',
            padding: '0'
          },
          header: {
            padding: '8px'
          }
        }}
        bordered={false}
        extra={
          <>
            {
              !disabled && (
                <Switch
                  value={status}
                  checkedChildren='开'
                  unCheckedChildren='关'
                  onChange={(openStatus: boolean) => {
                    setStatus(openStatus)
                    if (openStatus) {
                      onChange(selectTags)
                    } else {
                      onChange(false)
                    }
                  }} />
              )
            }
          </>
        }
      />
      {
        data.map((item, index: number) => {
          return (
            <Card
              key={index}
              title={item.name}
              bordered
              styles={{
                body: {
                  margin: '0',
                  padding: '8px'
                },
                header: {
                  padding: '8px'
                }
              }}
              extra={
                <>
                  {
                    !disabled && (
                      <Switch
                        disabled={!status}
                        checkedChildren='开'
                        unCheckedChildren='关'
                        onChange={(openStatus: boolean) => {
                          if (!status) {
                            onChange(false)
                            return
                          }
                          if (openStatus) {
                            setSelectTags([...selectTags, item.key])
                            onChange([...selectTags, item.key])
                          } else {
                            setSelectTags(selectTags.filter((tag) => tag !== item.key))
                            onChange(selectTags.filter((tag) => tag !== item.key))
                          }
                        }} />
                    )
                  }
                </>
              }
            >
              <p style={{ margin: '0' }}>{item.description}</p>
            </Card>
          )
        })
      }
    </Space>
  )
}

export default MarkingSetting
