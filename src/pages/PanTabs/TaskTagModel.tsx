import React, { FC, useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, Space, TreeSelect } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { findTagSettingData, getMockData } from './mock';

interface Props {
  record: any;
  refresh: () => void;
}

const TaskTagModal: FC<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [labelOptions, setLabelOptions] = useState<any[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if(!getMockData) return
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setLabelOptions(transformToTreeSelectData(getMockData))
  },[getMockData])

  const extractLabelDescription = (obj: any): any[] => {
    const result: any[] = [];
  
    const traverse = (currentObj: any): void => {
      for (const key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          const value = currentObj[key];
  
          if (typeof value === 'object' && value !== null) {
            traverse(value);
          } else {
            result.push({ label: key, description: value });
          }
        }
      }
    };
  
    traverse(obj);
    return result;
  };

  useEffect(() => {
    if (!findTagSettingData || !visible || !labelOptions) return
    const label = findTagSettingData?.label || {}
    const curLabels = extractLabelDescription(label);
    console.log(curLabels)
    form.setFieldsValue({
      label: curLabels,
    });
  }, [findTagSettingData, visible,visible, labelOptions ])

  const transformToTreeSelectData = (data: any[]): any[] => {
    return data.map(item => ({
      ...item,
      title: item.name,
      value: item.name,
      key: item.id.toString(),
      children: item.children ? transformToTreeSelectData(item.children) : [],
    }));
  };

  const generateUpdatedObject = (data: any[], name: string, value: string): any => {
    const result: any = {};
    const updateNode = (nodes: any[], path: string[]): void => {
      for (const node of nodes) {
        const currentPath = [...path, node.name];
        if (node.name === name) {
          let temp = result;
          for (let i = 0; i < currentPath.length - 1; i++) {
            if (!temp[currentPath[i]]) {
              temp[currentPath[i]] = {};
            }
            temp = temp[currentPath[i]];
          }
          temp[name] = value;
          return;
        }
        if (node.children) {
          updateNode(node.children, currentPath);
        }
      }
    };

    updateNode(data, []);
    return result;
  };

  const handleOpen = () => {
    setVisible(true);
    form.setFieldsValue({
      label: [{ label: undefined, description: '' }],
    });
  };

  const handleClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const copyNestedProperty = (source: any, target: any): void => {
    const copy = (src: any, tgt: any): void => {
      for (const key in src) {
        if (src.hasOwnProperty(key)) {
          if (typeof src[key] === 'object' && src[key] !== null) {
            if (!tgt[key]) {
              tgt[key] = {};
            }
            copy(src[key], tgt[key]);
          } else {
            tgt[key] = src[key];
          }
        }
      }
    };

    copy(source, target);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      console.log('Form values:', values);
      let labels = {} as any
      values?.label?.forEach((tag: any) => {
        const { label, description } = tag;
        const curObj = generateUpdatedObject(labelOptions, label, description);
        copyNestedProperty(curObj, labels);
      });
      console.log('Labels:', labels);
      handleClose();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <>
      <Button type="link" onClick={handleOpen}>
        任务标签
      </Button>
      <Modal
        title="任务标签"
        visible={visible}
        open={visible}
        onCancel={handleClose}
        onOk={handleSubmit}
        okText="确定"
        cancelText="取消"
        width={700}
      >
        <Form form={form} layout="vertical" name="task_form">
          <Form.Item
            label="标签名称 & 描述"
            style={{ marginBottom: 0, height: '32px', overflow: 'hidden' }}
            required
          />
          {/* 动态表单列表 */}
          <Form.List
            name="label"
            rules={[
              {
                validator: async (_, label) => {
                  if (!label || label.length < 1) {
                    return Promise.reject(new Error('至少需要一个标签项'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                  <Space
                    key={key}
                    style={{ display: 'flex' }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'label']}
                      fieldKey={[fieldKey, 'label']}
                      required
                      rules={[
                        { required: true, message: '请选择标签名称' },
                      ]}
                    >
                      <TreeSelect
                        placeholder="选择标签" style={{ width: '150px' }}
                        treeData={labelOptions}
                        dropdownStyle={{ width: '350px', maxWidth: '500px', overflow: 'auto' }}
                        treeDefaultExpandAll
                        onChange={(value) => {
                          console.log(value)
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      fieldKey={[fieldKey, 'description']}
                    >
                      <Input placeholder="请输入描述（可选）" style={{ width: '450px' }} />
                    </Form.Item>
                    {fields.length > 1 && (
                      <DeleteOutlined
                        onClick={() => remove(name)}
                        style={{ color: 'red' }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ width: '100%' }}
                  >
                    添加标签
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* 输入任务执行过程 */}
          <Form.Item
            name="detail"
            label="任务执行过程"
            rules={[{ required: true, message: '请输入任务执行过程' }]}
          >
            <Input.TextArea placeholder="请输入任务执行过程" />
          </Form.Item>

          {/* 关联训练集 */}
          <Form.Item
            name="dataset_id"
            label="关联训练集"
            rules={[{ required: true, message: '请选择关联训练集' }]}
          >
            <Select placeholder="请选择训练集">
              <Select.Option value="训练集A">训练集A</Select.Option>
              <Select.Option value="训练集B">训练集B</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TaskTagModal;