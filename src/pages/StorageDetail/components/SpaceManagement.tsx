/*
 * @creater: panan
 * @message: SpaceManagement-空间管理面板
 * @since: 2025-05-13 15:40:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 17:40:35
 */

import React from 'react';
import { List, Avatar, Button, Typography, Badge, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './SpaceManagement.less';
import AddPersonalSpace from './AddPersonalSpace';

const { Text } = Typography;

interface SpaceManagementProps {
  users: any[];
}

const SpaceManagement: React.FC<SpaceManagementProps> = ({ users }) => {
  return (
    <div className={styles.spaceContainer}>
      {/* 团队空间 */}
      <div className={styles.spaceSection}>
        <div className={styles.spaceHeader}>
          <Text strong>团队空间</Text>
        </div>
        <div className={styles.spaceDescription}>
          <Text type="secondary">100G，共享存储内容不限，通常为软件安装包、团队公共文档</Text>
        </div>
        <div className={styles.previewButton}>
          <Button type="link" size="small">文件预览</Button>
        </div>
      </div>

      {/* 个人空间 */}
      <div className={styles.spaceSection}>
        <div className={styles.spaceHeader}>
          <Text strong>个人空间</Text>
        </div>
        <div className={styles.spaceDescription}>
          <Text type="secondary">每人50G，共享存储内容不限，通常为个人代码、文档</Text>
        </div>
        <List
          dataSource={users}
          renderItem={(item: any) => (
            <List.Item
              style={{ margin: '0', padding: '0', height: '50px' }}
              actions={[
                <Button key={'1'} type="link" size="small">文件预览</Button>,
                <Popconfirm key={'2'} title='确定要删除该用户吗？'>
                  <Button type="link" size="small" danger><DeleteOutlined /></Button>
                </Popconfirm>,
              ]}
              // 设置actions的样式
              extra={<Space style={{ width: '100%' }}></Space>}
            >
              <List.Item.Meta
                avatar={<Space>
                  <Badge status="success" size='small'>
                    <Avatar>{item.username.charAt(0)}</Avatar>
                  </Badge>
                  <span style={{ lineHeight: '32px' }}>{item.username}</span>
                </Space>}
              />
            </List.Item>
          )}
        />
        <div className={styles.addUserButton}>
          <AddPersonalSpace />
        </div>
      </div>
    </div>
  );
};

export default SpaceManagement;