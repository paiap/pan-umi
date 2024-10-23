/*
 * @creater: panan
 * @message: 多样性打标
 * @since: 2024-10-22 17:15:28
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-10-23 11:26:24
 * @文件相对于项目的路径: /pan-umi/src/pages/Dataminer/Config/DiversityMarking/index.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react'
import MarkingSetting from '../../components/MarkingSetting'
import { Button, Card, Space } from 'antd'
interface Props {
  [key: string]: any
}

const mockData = [
  {
    key: 'julei',
    name: '聚类标签',
    description: '聚类描述'
  },
  {
    key: 'yitu',
    name: '意图标签',
    description: '意图描述'
  },
  {
    key: 'zhuti',
    name: '主题标签',
    description: '主题描述'
  }, {
    key: 'inputLength',
    name: '输入长度',
    description: '输入长度描述'
  },
  {
    key: 'outputLength',
    name: '输出长度',
    description: '输出长度描述'
  },
  {
    key: 'inputType',
    name: '输入类型',
    description: '输入类型描述'
  },
  {
    key: 'outputType',
    name: '输出类型',
    description: '输出类型描述'
  }
]

const createText = '卡梅隆峰(Cameron Peak)和东部(East Troublesome)山火在周日(10月25日)和周壹(10月26日)被寒冷天气所控制，风暴带来的暂停使消防员和其他紧急反应人员得以进入禁区进行结构破坏评估。'

const DiversityMarking: FC<Props> = () => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [selectTgs, setSelectTags] = useState<string[] | boolean>(false)

  useEffect(() => {
    setDataSource(mockData)
  }, [])

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div id='setting' style={{ width: '300px', overflow: 'auto' }}>
        <MarkingSetting
          title='多样性打标配置'
          description='配置关闭后，将不会对数据进行多样性打标'
          data={dataSource}
          defaultValue={false}
          onChange={(val: string[] | boolean) => {
            console.log(val)
            if (val === false) {
              setSelectTags(false)
              return
            }
            setSelectTags(val)
          }} />
      </div>
      <div id='content' style={{ flex: 1 }}>
        <Space direction='vertical'>
          <Card
            title={
              <Space>
                <span>打标效果预览</span>
                <span style={{ fontSize: '14px', color: 'grey' }}>温馨提示：为快速预览效果，以下为内置数据</span>
              </Space>
            }
            bordered={false}
            style={{ width: 'calc(100vw - 720px)' }}
            styles={{
              body: {
                margin: '0',
                padding: '0'
              },
            }}
          />
          <Card
            title={
              <Space>
                <span>用户问句</span>
              </Space>
            }
            style={{ width: 'calc(100vw - 720px)' }}
          >
            <span>{createText}</span>
          </Card>
          <Card
            style={{ width: 'calc(100vw - 720px)' }}
          >
            <Space direction='vertical'>
              <Button type='primary'>打标测试</Button>
              <h4>打标结果:</h4>
              {
                typeof selectTgs !== 'boolean' && selectTgs?.length > 0 && selectTgs.map((item: string) => {
                  const findTagName = mockData.find((tag) => tag.key === item)
                  return (
                    <div key={findTagName?.key} style={{ marginLeft: '18px' }}>
                      <span>{findTagName?.name}:</span>
                    </div>
                  )
                })
              }
            </Space>
          </Card>
        </Space>
      </div>
    </div>
  )
}

export default DiversityMarking