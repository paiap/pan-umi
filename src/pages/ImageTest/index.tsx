/*
 * @creater: panan
 * @message: ImageTest
 * @since: 2025-04-16 10:09:28
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-17 21:51:03
 * @文件相对于项目的路径: /pan-umi/src/pages/ImageTest/index.tsx
 */

// 操作系统： system
// CUDA: cuda
// 框架：frameworks 【torch: 2.5.1】
// Python版本： 【V1】【V2】
// 使用场景： usages 【SSH】
// Python 
//   version V1      path:
//   requirements: 
// 系统包： system_packages

import { Button, Descriptions, Modal, Space, Tag } from 'antd'
import React, { FC, useState } from 'react'
import { mockData } from './mock'
import RequirementShow from './RequirementShow'
interface Props {
  imageItem: any
}

const ImageTest: FC<Props> = ({ imageItem = mockData }) => {
  const [open, setOpen] = useState<boolean>(false)

  // 打开抽屉
  const openDrawer = () => {
    setOpen(true)
    console.log(mockData)
  }
  // 关闭抽屉
  const cancelDrawer = () => {
    setOpen(false)
  }
  return (
    <>
      <Button type='link' disabled={!imageItem} onClick={openDrawer}>详情</Button>
      <Modal
        open={open}
        title="镜像详情"
        onClose={cancelDrawer}
        width={800}
      >
        <Descriptions bordered size='small' labelStyle={{ width: '150px', textAlign: 'right' }}>
          <Descriptions.Item key={'操作系统'} label={'操作系统'} span={3}>
            {imageItem?.system || '-'}
          </Descriptions.Item>
          <Descriptions.Item key={'CUDA'} label={'CUDA'} span={3}>
            {imageItem?.cuda || '-'}
          </Descriptions.Item>
          <Descriptions.Item key={'框架'} label={'框架'} span={3}>
            <Space>
              {
                (imageItem?.frameworks || []).map((item: any, index: number) => {
                  const name = item.split('==')[0]
                  const version = item.split('==')[1]
                  return (
                    <Tag key={index} color='cyan'>{name}:{version}</Tag>
                  )
                })
              }
            </Space>
          </Descriptions.Item>
          <Descriptions.Item key={'Python版本'} label={'Python版本'} span={3}>
            <Space>
              {
                (imageItem?.pythonVersion || []).map((item: any, index: number) => {
                  return (
                    <Tag key={index} color='blue'>{item}</Tag>
                  )
                })
              }
            </Space>
          </Descriptions.Item>
          <Descriptions.Item key={'使用场景'} label={'使用场景'} span={3}>
            <Space>
              {
                (imageItem?.usages || []).map((item: any, index: number) => {
                  return (
                    <Tag key={index} color='green'>{item}</Tag>
                  )
                })
              }
            </Space>
          </Descriptions.Item>
          <Descriptions.Item key={'Python'} label={'Python'} span={3}>
            {/* {imageItem?.python || '-'} */}
            <Space direction='vertical'>
              {
                (imageItem?.python || []).map((item: any, index: number) => {
                  return (
                    <Space key={index}>
                      <Tag color='lime'>version: {item?.version}</Tag>
                      <Tag color='geekblue'>path: {item?.path}</Tag>
                      {
                        item?.requirements?.length > 0 ? (
                          <>
                            <RequirementShow data={item?.requirements} title={`python${item?.version}依赖`} />
                          </>
                        ) : (
                          <Button disabled type='link'>暂无依赖</Button>
                        )
                      }
                    </Space>
                  )
                })
              }
            </Space>
          </Descriptions.Item>
          <Descriptions.Item key={'系统包'} label={'系统包'} span={3}>
            {
              imageItem?.systemPackages?.length > 0 ? (
                // <Collapse items={[
                //   {
                //     key: '1',
                //     label: '展开查看',
                //     children: <RequirementShow  data={imageItem?.systemPackages} title='系统包依赖' showEditor/>,
                //   }
                // ]} />
                <RequirementShow data={imageItem?.systemPackages} title='系统包依赖' />
              ) : (
                <Button disabled type='link'>暂无依赖</Button>
              )
            }
            <span></span>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}

export default ImageTest

