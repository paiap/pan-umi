import React, { useState, useEffect } from 'react';
import { Input, Drawer, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ImageTable from '../ImageTable';

interface ImageSelectFormItemProps {
  onSelect: (imagemirrorUrl: string) => void;
  value?: string; // 镜像地址
  onChange?: (value: string) => void;
}

const ImageSelectFormItem: React.FC<ImageSelectFormItemProps> = ({ value, onChange, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('all'); // 默认选中全部镜像
  const [selectedImageItem, setSelectedImageItem] = useState<any | undefined>(undefined); // 用于存储选中的镜像对象

  useEffect(() => {
    // value变化时，直接以地址字符串为准，选中项由ImageTable的onRowClick控制
    if (!value) {
      setSelectedImageItem(undefined);
    }
  }, [value]);

  const handleInputClick = () => {
    setModalVisible(true);
    // 打开抽屉时，选中项由ImageTable的selectedImagemirrorUrl控制
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    // 取消时重置 selectedImageItem，避免下次打开时保留旧的选中状态
    setSelectedImageItem(undefined);
  };

  const renderImageTable = (imageType: 'all' | 'official' | 'algorithm' | 'private') => {
    // ImageTable 需要修改以支持行点击选中和初始搜索值
    // 这里暂时传入 onEditImage 作为选中回调，后续会调整 ImageTable
    return (
      <ImageTable
        imageType={imageType} // 'all' 暂时映射到 'official'，实际需要 ImageTable 内部处理 'all'
        onAddImage={() => { /* do nothing */ }}
        onEditImage={() => {}} // 不再使用 onEditImage 模拟选中
        selectedImageAddress={selectedImageItem?.mirrorUrl} // 传递当前选中的镜像地址
        onRowClick={(record) => {
          setSelectedImageItem(record);
          onChange?.(record.mirrorUrl);
          onSelect(record.mirrorUrl);
          setModalVisible(false);
          // message.success(`已选择镜像: ${record.alias}`);
        }}
        isSelectionMode={true} // 传递已选中的镜像地址
      />
    );
  };

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: '全部镜像',
      children: renderImageTable('all'),
    },
    {
      key: 'official',
      label: '官方镜像',
      children: renderImageTable('official'),
    },
    {
      key: 'algorithm',
      label: '算法组镜像',
      children: renderImageTable('algorithm'),
    },
    {
      key: 'private',
      label: '私人镜像',
      children: renderImageTable('private'),
    },
  ];
  return (
    <>
      <Input
        value={value} // 直接使用 props 传入的 value
        onClick={handleInputClick}
        placeholder="请选择镜像"
        readOnly
      />
      <Drawer
        title="镜像选择"
        open={modalVisible}
        onClose={handleModalCancel}
        destroyOnClose
        width={1500}

      >
        <Tabs activeKey={activeTabKey} items={items} onChange={setActiveTabKey} />
      </Drawer>
    </>
  );
}

export default ImageSelectFormItem;