/*
 * @creater: panan
 * @message: 编辑指标按钮组件
 * @since: 2025-07-16 09:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-16 09:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/EditMetricButton.tsx
 */

import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MetricForm from './MetricForm';
import { EvaluationMetric } from './api';

interface EditMetricButtonProps {
  metric: EvaluationMetric;
  onSuccess?: () => void;
  children?: React.ReactNode;
  // 按钮的其他属性
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  size?: 'small' | 'middle' | 'large';
  icon?: React.ReactNode;
  block?: boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  disabled?: boolean;
}

const EditMetricButton: React.FC<EditMetricButtonProps> = ({
  metric,
  onSuccess,
  children = '编辑',
  type = 'link',
  size = 'small',
  icon = <EditOutlined />,
  block = false,
  className,
  style,
  title = '编辑',
  disabled = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = useRef<any>(null);

  const handleEdit = () => {
    // TODO: 添加权限控制逻辑
    // const currentUser = getCurrentUser();
    // if (metric.creator !== currentUser.name && !currentUser.isAdmin) {
    //   message.error('您没有权限编辑此指标');
    //   return;
    // }
    
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
        title={title}
        disabled={disabled}
        onClick={handleEdit}
      >
        {children}
      </Button>

      <Modal
        title="编辑指标"
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
          initialValues={metric}
          onSuccess={handleFormSuccess}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default EditMetricButton;
