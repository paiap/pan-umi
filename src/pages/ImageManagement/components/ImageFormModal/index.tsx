import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Select, Radio, Button, Space } from 'antd';
import { fetchAllLabels } from '../../service';

interface ImageFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  initialValues?: any; // 用于编辑时传入初始值
  isAlgorithmGroup?: boolean; // 是否为算法组镜像
  algorithmGroupOptions?: string[]; // 算法组下拉选项
}

const ImageFormModal: React.FC<ImageFormModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  isAlgorithmGroup,
  algorithmGroupOptions = [],
}) => {
  const [form] = Form.useForm();
  const [sceneLabelOptions, setSceneLabelOptions] = useState<{ label: string; value: string }[]>([]);
  const [fieldLabelOptions, setFieldLabelOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        // 编辑时只回填需要的字段
        const fields: any = {
          mirrorAlias: initialValues?.mirrorAlias,
          fieldLabels: initialValues?.fieldLabels,
          sceneLabels: initialValues?.sceneLabels,
          mirrorDesc: initialValues?.mirrorDesc,
        };
        form.setFieldsValue(fields);
      } else {
        // 新增时回填全部初始值
        form.setFieldsValue(initialValues);
      }
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);


  // 获取全量镜像标签接口
  const getAllLabels = async () => {
    try {
      const data = await fetchAllLabels()
      setSceneLabelOptions((data?.data?.sceneLabels || []).map((item: string) => ({ label: item, value: item })));
      setFieldLabelOptions((data?.data?.fieldLabels || []).map((item: string) => ({ label: item, value: item })));
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    // 仅在弹窗打开时请求标签
    if (visible) {
      getAllLabels()
    }
  }, [visible]);

  // 失焦时自动解析开源镜像地址并回填目标镜像名、tag、仓库、目标地址预览
  const handleOpenSourceUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    // 解析格式：取最后一个/到:中间的字符为镜像名，:后为tag
    // 例如 abc/def/imagename:tag => imagename, tag
    const match = value.match(/([^/]+):([^:]+)$/);
    if (match) {
      const [, imageName, imageTag] = match;
      if (imageName && imageTag) {
        form.setFieldsValue({
          mirrorRepositoryName: imageName,
          mirrorTag: imageTag,
          targetAddressPreview: `alvahub.hexin.cn:9081/hithink-gallery/${imageName}:${imageTag}`,
        });
      }
    }
  };

  /**
   * 处理表单提交
   * @param values 表单值
   */
  const handleOk = () => {
    form.validateFields().then(values => {
      // 保证source字段为数字
      const submitValues = { ...values, source: Number(values.source) };
      onOk(submitValues);
    });
  };

  const isEdit = !!initialValues;

  // 切换到开源镜像时自动设置目标项目名称
  // useEffect(() => {
  //   const source = form.getFieldValue('source');
  //   if (source === 1) {
  //     form.setFieldsValue({
  //       mirrorProjectName: 'hithink-gallery'
  //     });
  //   }
  // }, [form.getFieldValue('source')]);

  return (
    <Drawer
      title={initialValues ? '编辑镜像' : '新增镜像'}
      open={visible}
      onClose={onCancel}
      width={900}
      destroyOnClose
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={handleOk} type="primary">
            提交
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        name="image_form"
        initialValues={initialValues}
        labelCol={{
          span: 4
        }}
      >
        {/* 编辑时只展示镜像别名、镜像标签、镜像描述 */}
        {isEdit ? (
          <>
            <Form.Item label="镜像别名" name="mirrorAlias" rules={[{ required: true, message: '请输入镜像别名!' }]}> 
              <Input placeholder="请输入镜像别名" disabled={false} />
            </Form.Item>
            <Form.Item label="镜像标签" style={{ marginBottom: 0 }}>
              <Space align="baseline">
                <Form.Item
                  name="fieldLabels"
                  rules={[{ required: true, message: '请选择镜像标签' }]}
                >
                  <Select
                    placeholder="请选择"
                    style={{ width: 320 }}
                    options={fieldLabelOptions}
                    disabled={false}
                    mode='multiple'
                  />
                </Form.Item>
                <Form.Item
                  name="sceneLabels"
                  rules={[{ required: true, message: '请选择镜像标签' }]}
                >
                  <Select
                    placeholder="请选择"
                    style={{ width: 320 }}
                    options={sceneLabelOptions}
                    disabled={false}
                    mode='multiple'
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              name="mirrorDesc"
              label="镜像描述"
            >
              <Input.TextArea rows={4} placeholder="请输入镜像描述" disabled={false} />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="镜像来源"
              name="source"
              initialValue={0}
              rules={[{ required: true, message: '请选择镜像来源!' }]}
            >
              <Radio.Group disabled={isEdit} onChange={(e) => {
                if (e.target.value === 1) {
                  form.setFieldsValue({
                    mirrorProjectName: 'hithink-gallery'
                  });
                }
              }}>
                <Radio value={0}>内部镜像</Radio>
                <Radio value={1}>开源镜像</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="镜像别名" name="mirrorAlias" rules={[{ required: true, message: '请输入镜像别名!' }]}> 
              <Input placeholder="请输入镜像别名" disabled={false} />
            </Form.Item>
            {isAlgorithmGroup && (
              <Form.Item
                label="算法组"
                name="tpcCodeList"
                rules={[{ required: true, message: '请选择算法组!' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择算法组"
                  options={algorithmGroupOptions.map(g => ({ label: g, value: g }))}
                  style={{ width: '100%' }}
                  disabled={!isEdit ? false : false}
                />
              </Form.Item>
            )}
            <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.source !== curValues.source}>
              {({ getFieldValue }) => {
                const source = getFieldValue('source');
                if (source === 0) {
                  return (
                    <>
                      <Form.Item label="镜像仓库" name="mirrorWarehouseId" rules={[{ required: true, message: '请输入镜像仓库!' }]}> 
                        <Input placeholder="请输入镜像仓库" disabled={isEdit} />
                      </Form.Item>
                      <Form.Item label="项目名称" name="mirrorProjectName" rules={[{ required: true, message: '请输入项目名称!' }]}> 
                        <Input placeholder="请输入项目名称" disabled={isEdit} />
                      </Form.Item>
                      <Form.Item label="镜像名称" name="mirrorRepositoryName" rules={[{ required: true, message: '请输入镜像名称!' }]}> 
                        <Input placeholder="请输入镜像名称" disabled={isEdit} />
                      </Form.Item>
                      <Form.Item label="镜像tag" name="mirrorTag" rules={[{ required: true, message: '请输入镜像版本!' }]}> 
                        <Input placeholder="请输入镜像版本" disabled={isEdit} />
                      </Form.Item>
                    </>
                  );
                } else if (source === 1) {
                  return (
                    <>
                      <Form.Item label="开源镜像地址" name="openSourceUrl" rules={[{ required: true, message: '请输入开源镜像地址!' }]}> 
                        <Input placeholder="请输入开源镜像地址" disabled={isEdit} onBlur={handleOpenSourceUrlBlur} />
                      </Form.Item>
                      {/* <Form.Item label="同步镜像目标仓库" name="syncTargetRepository" rules={[{ required: true, message: '请选择同步镜像目标仓库!' }]}> */}
                      {/*   <Input placeholder="请选择同步镜像目标仓库" disabled={isEdit} /> */}
                      {/* </Form.Item> */}
                      <Form.Item label="目标镜像仓库" name="mirrorWarehouseId" rules={[{ required: true, message: '请输入镜像仓库!' }]}> 
                        <Input placeholder="请输入镜像仓库" disabled={isEdit} />
                      </Form.Item>
                      <Form.Item label="目标项目名称" name="mirrorProjectName" rules={[{ required: true, message: '请输入项目名称!' }]}> 
                        <Input placeholder="请输入项目名称" disabled value={'hithink-gallery'} />
                      </Form.Item>
                      <Form.Item label="目标镜像名称" name="mirrorRepositoryName" rules={[{ required: true, message: '请输入镜像名称!' }]}> 
                        <Input placeholder="请输入镜像名称" disabled={isEdit} />
                      </Form.Item>
                      <Form.Item label="目标镜像tag" name="mirrorTag" rules={[{ required: true, message: '请输入镜像版本!' }]}> 
                        <Input placeholder="请输入镜像版本" disabled={isEdit} />
                      </Form.Item>
                      <Form.Item label="目标地址预览" name="targetAddressPreview">
                        <Input placeholder="alvahub.hexin.cn:9081/hithink-gallery/vllm-ascend:v0.8.5rc1" disabled />
                      </Form.Item>
                    </>
                  );
                }
                return null;
              }}
            </Form.Item>
            <Form.Item label="镜像标签" style={{ marginBottom: 0 }}>
              <Space align="baseline">
                <Form.Item
                  name="fieldLabels"
                  rules={[{ required: true, message: '请选择镜像标签' }]}
                >
                  <Select
                  mode='multiple'
                    placeholder="请选择"
                    style={{ width: 320 }}
                    options={fieldLabelOptions}
                    disabled={false}
                  />
                </Form.Item>
                <Form.Item
                  name="sceneLabels"
                  rules={[{ required: true, message: '请选择镜像标签' }]}
                >
                  <Select
                    mode='multiple'
                    placeholder="请选择"
                    style={{ width: 320 }}
                    options={sceneLabelOptions}
                    disabled={false}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              name="mirrorDesc"
              label="镜像描述"
            >
              <Input.TextArea rows={4} placeholder="请输入镜像描述" disabled={false} />
            </Form.Item>
          </>
        )}
      </Form>
    </Drawer>
  );
};

export default ImageFormModal;