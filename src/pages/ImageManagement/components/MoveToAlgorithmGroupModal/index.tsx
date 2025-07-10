import React, { useEffect } from 'react';
import { Modal, Form, Select, Input } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface MoveToAlgorithmGroupModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  initialValues?: any;
}

const MoveToAlgorithmGroupModal: React.FC<MoveToAlgorithmGroupModalProps> = ({ visible, onCancel, onOk, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      // 如果有初始值，可以设置表单字段
      if (initialValues) {
        // form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      onOk(values);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <Modal
      title="移入算法组"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="move_to_algorithm_group_form"
      >
        <Form.Item
          name="algorithmGroups"
          label="所属算法组"
          rules={[{ required: true, message: '请选择所属算法组!' }]}
        >
          <Select mode="multiple" placeholder="请选择算法组">
            <Option value="算法组A">算法组A</Option>
            <Option value="算法组B">算法组B</Option>
            <Option value="算法组C">算法组C</Option>
            <Option value="算法组D">算法组D</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="remark"
          label="备注说明"
          rules={[{ required: true, message: '请输入备注说明!' }]}
        >
          <TextArea rows={4} placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MoveToAlgorithmGroupModal;