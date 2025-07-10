/*
 * @creater: panan
 * @message: StorageHeader-存储详情顶部信息栏
 * @since: 2025-05-13 15:30:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 15:41:45
 */

import React from 'react';
import { Row, Col, Typography, Space, Tag } from 'antd';
import { CiCircleOutlined } from '@ant-design/icons';
import styles from './StorageHeader.less';
import AuthRecord from './AuthRecord';

const { Title, Text } = Typography;

interface StorageHeaderProps {
  storageInfo: any;
}

const StorageHeader: React.FC<StorageHeaderProps> = ({ storageInfo }) => {
  const { name, description, quotaShow, creatorName, updateTime, filepath, proName } = storageInfo;

  return (
    <div className={styles.storageHeader}>
      <Row justify="space-between" align="middle" className={styles.headerContent}>
        <Col>
          <div className={styles.titleSection}>
            <Space>
              <Title level={4} className={styles.title}>{name}</Title>
              <Text type="secondary" className={styles.description}>{description}</Text>
            </Space>
          </div>
          <div className={styles.infoSection}>
            <Space>
              <Tag>
                <CiCircleOutlined />
                <Text type="secondary">{quotaShow}</Text>
              </Tag>
              <Tag>
                <CiCircleOutlined />
                <Text type="secondary">{proName}</Text>
              </Tag>
              <Tag>
                <CiCircleOutlined />
                <Text type="secondary">{creatorName}-{updateTime}更新</Text>
              </Tag>
              <Tag>
                <CiCircleOutlined />
                <Text type="secondary">{filepath}</Text>
              </Tag>
            </Space>
          </div>
        </Col>
        <Col>
          <Space>
            <AuthRecord />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default StorageHeader;