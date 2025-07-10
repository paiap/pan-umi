/*
 * @creater: panan
 * @message: CardList
 * @since: 2025-05-13 13:51:42
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-13 20:24:19
 * @文件相对于项目的路径: /pan-umi/src/pages/StorageComponent/component/CardList.tsx
 */

import React, { FC } from 'react'
import { Card, Button, Space, Tag, Typography, Popconfirm } from 'antd';
import { SyncOutlined, FileTextOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../index.less'
import TagsProgress from '@/components/TagsProgress';
interface Props {
  item: any
}
const { Text } = Typography;
const CardList: FC<Props> = ({ item }) => {

  // 编辑卡片标题的处理函数
  const handleEditTitle = (id: number) => {
    console.log('编辑卡片标题:', id);
    // 这里可以添加编辑标题的逻辑，例如打开一个模态框
  };

  const getTags = (item: any) => {
    const tags = [
      { name: '数据目录', count: item.datasetSize },
      { name: '团队', count: item.teamWorkSpaceSize },
      { name: '个人', count: item.userWorkSpaceSize },
      { name: '其他', count: item.usedSize - (item.datasetSize + item.teamWorkSpaceSize + item.userWorkSpaceSize) },
    ];
    return tags;
  };

  return (
    <Card
      key={item.id}
      hoverable
      size="small"
      title={
        <div className={styles.cardTitle}>
          <div className={styles.titleLeft}>
            <Text strong>{item.name}</Text>
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditTitle(item.id)}
              style={{ marginRight: '4px' }}
            />
          </div>
          <div>
            <Popconfirm
              title="确定删除吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={() => console.log('确认删除该共享存储吗?', item)}
            >
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </div>
        </div>
      }
      className={styles.storageCard}
    >
      <div className={styles.storagePath}>{item.description}</div>
      {/* 翻译与文本生成图标 */}
      <div className={styles.functionButton}>
        <Tag>
          <Space>
            <FileTextOutlined />
            <span>{item?.proName}</span>
          </Space>
        </Tag>
      </div>
      {/* ucwicc-乌兰察布-人工智能 */}
      <div className={styles.storageTag}>
        <Tag>
          <Space>
            <FileTextOutlined />
            <span>{item?.tenantName}</span>
          </Space>
        </Tag>
      </div>
      {/* 数据容量可视化 */}
      <div className={styles.capacityInfo}>
        <div className={styles.capacityHeader}>
          <span>数据容量</span>
          <span className={styles.capacityValue}>{item?.quotaShow}</span>
        </div>
      </div>
      {/* 标签 */}
      <div className={styles.tagList}>
        <TagsProgress
          tags={getTags(item)}
          height={6}
          defaultColors={['#E5C1CD', '#B8D8BA', '#A4C2F4', '#FFD966']}
        />
      </div>
      {/* 更新时间 */}
      <div className={styles.updateTime}>
        <SyncOutlined className={styles.syncIcon} />
        {item.creatorName} {item.updateTime} 更新
      </div>
    </Card>
  )
}

export default CardList
