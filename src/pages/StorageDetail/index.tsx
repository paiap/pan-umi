/*
 * @creater: panan
 * @message: StorageDetail-存储详情
 * @since: 2025-05-13 14:31:23
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-05-14 17:34:25
 * @文件相对于项目的路径: /pan-umi/src/pages/StorageDetail/index.tsx
 */

import React from 'react';
import { Row, Col, Card, Space } from 'antd';
import StorageHeader from './components/StorageHeader';
import DataDirectory from './components/DataDirectory';
import SpaceManagement from './components/SpaceManagement';

const mockDetail = {
  "id": 183,
  "createTime": "2025-04-16 16:56:26",
  "updateTime": "2025-04-16 16:56:26",
  "name": "ftp-test",
  "tenantId": 160,
  "proCode": "793",
  "mountPath": "/mnt/data/ftptest",
  "storagePathId": 61952,
  "clusterCode": "ucwlcc",
  "quota": 1073741824,
  "description": "ftp-测试",
  "creator": "liukejie@myhexin.com",
  "tenantName": "devinfra",
  "proName": "代码生成",
  "storageId": 19,
  "filepath": "/sharestorage/devinfra/ftptest",
  "quotaShow": "1 GB",
  "usedShow": null,
  "creatorName": "刘科杰",
  //----------------  以上都是原先得数据 ----------------
  "usedSize": 100000, //对应上边进度条得全部，减去下边三个为 其他
  "datasetSize": 20000, // 数据目录
  "teamWorkSpaceSize": 30000, //团队
  "userWorkSpaceSize": 40000 //个人
}

const mockDirectoryData = [
  {
    "id": 183,
    "createTime": "2025-04-16 16:56:26",
    "updateTime": "2025-04-16 16:56:26",
    "description": "存储图片",
    "shareStorageId": 180,
    "path": "img",
    "size": 1073741824,
    "creator": "刘科杰",
    "username": "刘科杰",
    "owner": "负责人"
  },
  {
    "id": 183,
    "createTime": "2025-04-16 16:56:26",
    "updateTime": "2025-04-16 16:56:26",
    "description": "存储图片",
    "shareStorageId": 180,
    "path": "img",
    "size": 1073741824,
    "creator": "刘科杰",
    "username": "刘科杰",
    "owner": "负责人"
  },
  {
    "id": 183,
    "createTime": "2025-04-16 16:56:26",
    "updateTime": "2025-04-16 16:56:26",
    "description": "存储图片",
    "shareStorageId": 180,
    "path": "img",
    "size": 1073741824,
    "creator": "刘科杰",
    "username": "刘科杰",
    "owner": "负责人"
  }
];

const StorageDetail: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Card>
            <StorageHeader storageInfo={mockDetail} />
          </Card>
          <Card>
            <DataDirectory directoryData={mockDirectoryData} />
          </Card>
        </Space>
      </Col>
      <Col span={6}>
        <Card>
          <SpaceManagement users={mockDirectoryData} />
        </Card>
      </Col>
    </Row>
  );
};

export default StorageDetail;
