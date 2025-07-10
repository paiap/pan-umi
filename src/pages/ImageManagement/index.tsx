/*
 * @creater: panan
 * @message: 
 * @since: 2025-06-24 10:46:06
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-06-25 14:58:55
 * @文件相对于项目的路径: /pan-umi/src/pages/ImageManagement/index.tsx
 */
import React, { useState } from 'react';
import { Card, Tabs, message, Form } from 'antd';
import type { TabsProps } from 'antd';
import ImageTable from './components/ImageTable';
import ImageFormModal from './components/ImageFormModal';
import ImageSelectFormItem from './components/ImageSelectFormItem';
import MoveToAlgorithmGroupModal from './components/MoveToAlgorithmGroupModal';

/** 镜像管理页面 */

const ImageManagement: React.FC = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(undefined);
  const [createType, setCreateType] = useState<number | undefined>(undefined);
  const [moveToAlgorithmGroupModalVisible, setMoveToAlgorithmGroupModalVisible] = useState(false);
  const [currentImageToMove, setCurrentImageToMove] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('official');
  const algorithmGroupOptions = ['算法组A', '算法组B', '算法组C'];

  /**
   * 处理新增镜像操作
   */
  const handleAddImage = () => {
    let type: number | undefined = undefined;
    if (activeTab === 'official') type = 1;
    if (activeTab === 'algorithm') type = 2;
    if (activeTab === 'private') type = 3;
    setCreateType(type);
    setInitialValues(undefined);
    setModalVisible(true);
  };

  /**
   * 处理编辑镜像操作
   * @param record 镜像数据
   */
  const handleEditImage = (record: any) => {
    setInitialValues(record);
    setModalVisible(true);
  };

  /**
   * 处理模态框提交
   * @param values 表单值
   */
  const handleModalOk = (values: any) => {
    // 新增时带上type
    const submitValues = initialValues ? values : { ...values, type: createType };
    // 1. 打印当前属于官方、算法组、还是私人镜像
    let typeText = '未知';
    if (!initialValues) {
      if (createType === 1) typeText = '官方镜像';
      else if (createType === 2) typeText = '算法组镜像';
      else if (createType === 3) typeText = '私人镜像';
    } else {
      if (initialValues.type === 1) typeText = '官方镜像';
      else if (initialValues.type === 2) typeText = '算法组镜像';
      else if (initialValues.type === 3) typeText = '私人镜像';
    }
    console.log('镜像类型：', typeText);
    // 2. 打印当前表单参数
    console.log('表单参数：', submitValues);
    // 3. 打印是编辑还是新建
    console.log('操作类型：', initialValues ? '编辑' : '新建');

    message.success(initialValues ? '编辑成功' : '新增成功');
    setModalVisible(false);
    // 这里可以添加刷新列表的逻辑
  };

  /**
   * 处理模态框取消
   */
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  /**
   * 处理移入算法组操作
   * @param record 镜像数据
   */
  const handleMoveToAlgorithmGroup = (record: any) => {
    setCurrentImageToMove(record);
    setMoveToAlgorithmGroupModalVisible(true);
  };

  /**
   * 处理移入算法组模态框提交
   * @param values 表单值
   */
  const handleMoveToAlgorithmGroupOk = (values: any) => {
    console.log('移入算法组:', currentImageToMove, values);
    message.success('移入算法组成功');
    setMoveToAlgorithmGroupModalVisible(false);
    // 刷新列表
  };

  /**
   * 处理移入算法组模态框取消
   */
  const handleMoveToAlgorithmGroupCancel = () => {
    setMoveToAlgorithmGroupModalVisible(false);
    setCurrentImageToMove(null);
  };
  const items: TabsProps['items'] = [
    {
      key: 'official',
      label: '官方镜像',
      children: (
        <ImageTable
          imageType="official"
          onAddImage={handleAddImage}
          onEditImage={handleEditImage}
          onMoveToAlgorithmGroup={handleMoveToAlgorithmGroup}
        />
      ),
    },
    {
      key: 'algorithm',
      label: '算法组镜像',
      children: (
        <ImageTable
          imageType="algorithm"
          onAddImage={handleAddImage}
          onEditImage={handleEditImage}
        />
      ),
    },
    {
      key: 'private',
      label: '私人镜像',
      children: (
        <ImageTable
          imageType="private"
          onAddImage={handleAddImage}
          onEditImage={handleEditImage}
          onMoveToAlgorithmGroup={handleMoveToAlgorithmGroup}
        />
      ),
    },
  ];

  const [form] = Form.useForm();

  return (
    <Card title='镜像管理' styles={{
      body: {
        marginTop: '0',
        padding: '10px'
      }
    }}>
      <Tabs
        defaultActiveKey="official"
        items={items}
        onChange={setActiveTab}
      />
      <ImageFormModal
        visible={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        initialValues={initialValues}
        isAlgorithmGroup={activeTab === 'algorithm'}
        algorithmGroupOptions={activeTab === 'algorithm' ? algorithmGroupOptions : []}
      />

      <Card title="ImageSelectFormItem 使用示例" style={{ marginTop: 20 }}>
        <Form form={form} layout="vertical">
          <Form.Item label="选择镜像 (无初始值)" name="image1" initialValue={'cdjvef'}>
            <ImageSelectFormItem onSelect={(address) => {
              console.log('Selected Image Address:', address);
              message.success(`已选择镜像: ${address}`);
            }} />
          </Form.Item>
          {/* <Form.Item label="选择镜像 (有初始值)" name="image2">
            <ImageSelectFormItem onSelect={(address) => {
              console.log('Selected Image Address:', address);
              message.success(`已选择镜像: ${address}`);
            }} />
          </Form.Item> */}
        </Form>
      </Card>
      <MoveToAlgorithmGroupModal
        visible={moveToAlgorithmGroupModalVisible}
        onCancel={handleMoveToAlgorithmGroupCancel}
        onOk={handleMoveToAlgorithmGroupOk}
        initialValues={currentImageToMove}
      />
    </Card>
  );
};

export default ImageManagement;