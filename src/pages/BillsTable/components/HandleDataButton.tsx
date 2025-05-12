/*
 * @creater: panan
 * @message: HandleDataButton
 * @since: 2025-03-26 16:15:18
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-03-26 19:34:54
 * @文件相对于项目的路径: /pan-umi/src/pages/BillsTable/components/HandleDataButton.tsx
 */
import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';

interface HandleDataButtonProps {
  record?: any;
  type: 'single' | 'multiple'
  selectIds?: React.Key[];
  refresh: () => void;
}

const HandleDataButton: React.FC<HandleDataButtonProps> = ({
  record,
  type,
  selectIds,
  refresh
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (status: 1 | 2) => {
    if (status === 2 && !comment) {
      message.warning('请输入确认意见');
      return;
    }

    const ids = type === 'single' ? [record.id] : selectIds;

    const params = {
      ids,
      status,
      comment
    };
    // TODO: 调用接口
    console.log('提交参数：', params);
    setOpen(false);
    setComment('');
    refresh();
  };

  return (
    <>
      <Button
        type={type === 'multiple' ? 'primary' : 'link'}
        onClick={() => setOpen(true)}
        variant="filled"
        disabled={type === 'single' && record?.status === 3}
      >
        {
          type === 'multiple' && '批量确认账单'
        }
        {
          type === 'single' && (record?.status === 0 ? '确认账单' : record?.status === 3 ? '无需确认' : '重新确认账单')
        }
      </Button>
      <Modal
        title="账单确认"
        open={open}
        onCancel={() => {
          setOpen(false);
          setComment('');
        }}
        footer={[
          <Button
            key="error"
            onClick={() => handleSubmit(2)}
          >
            确认有误
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={() => handleSubmit(1)}
          >
            确认无误
          </Button>
        ]}
      >
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="备注，确认有误需填写内容"
        />
      </Modal>
    </>
  );
};

export default HandleDataButton;
