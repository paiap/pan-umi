/*
 * @creater: panan
 * @message: 新增指标按钮组件
 * @since: 2025-07-16 09:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16 09:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/AddMetricButton.tsx
 */

import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MetricForm from './MetricForm';

interface AddMetricButtonProps {
  onSuccess?: () => void;
  children?: React.ReactNode;
  // 按钮的其他属性
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean; // 添加disabled属性
}

const AddMetricButton: React.FC<AddMetricButtonProps> = ({
  onSuccess,
  children = '新增指标',
  type = 'primary',
  size = 'middle',
  icon = <PlusOutlined />,
  block = false,
  className,
  style,
  disabled = false, // 添加disabled参数解构
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = useRef<any>(null);

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleFormSuccess = () => {
    setModalVisible(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button
        type={type}
        size={size}
        icon={icon}
        block={block}
        className={className}
        style={style}
        disabled={disabled} // 添加disabled属性
        onClick={handleAdd}
      >
        {children}
      </Button>

      <Modal
        title="新增指标"
        open={modalVisible}
        onCancel={handleCancel}
        onOk={() => {
          formRef.current?.submit();
        }}
        okText="确认"
        cancelText="取消"
        width={900}
        destroyOnClose
      >
        <MetricForm
          ref={formRef}
          initialValues={null}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default AddMetricButton;
