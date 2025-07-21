/*
 * @creater: panan
 * @message: 评估指标表单组件
 * @since: 2025-07-15 15:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-18 19:41:51
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationMetrics/MetricForm.tsx
 */

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Row,
  Col
} from 'antd';
import {
  EvaluationMetric,
  AddMetricParams,
  UpdateMetricParams,
  addMetric,
  updateMetric,
  checkMetricNameUnique
} from './api';

const { TextArea } = Input;
const { Option } = Select;

interface MetricFormProps {
  initialValues?: EvaluationMetric | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface MetricFormRef {
  submit: () => void;
  reset: () => void;
}

const MetricForm = forwardRef<MetricFormRef, MetricFormProps>((
  { initialValues, onSuccess, onCancel },
  ref
) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checkingUnique, setCheckingUnique] = useState<{
    metricNameCn: boolean;
    metricNameEn: boolean;
    precisionMatchKey: boolean;
  }>({
    metricNameCn: false,
    metricNameEn: false,
    precisionMatchKey: false,
  });

  const isEdit = !!initialValues;

  // 评判标准选项
  const evaluationStandardOptions = [
    { value: 'higher_better', label: '越大越好' },
    { value: 'lower_better', label: '越小越好' },
  ];

  // 检查唯一性的防抖函数
  const debounceCheckUnique = (() => {
    const timers: { [key: string]: NodeJS.Timeout } = {};

    return (type: 'cn' | 'en' | 'key', value: string, field: string) => {
      if (timers[field]) {
        clearTimeout(timers[field]);
      }

      timers[field] = setTimeout(async () => {
        if (!value || value.trim() === '') return;

        setCheckingUnique(prev => ({ ...prev, [field]: true }));

        try {
          const response = await checkMetricNameUnique(type, value.trim(), initialValues?.id);
          if (response.code === 0 && !response.data) {
            // 不唯一，设置错误
            const errorMessages: { [key: string]: string } = {
              metricNameCn: '指标中文名已存在',
              metricNameEn: '指标英文名已存在',
              precisionMatchKey: '精准匹配键已存在',
            };
            const errorMessage = errorMessages[field];

            form.setFields([{
              name: field,
              errors: [errorMessage],
            }]);
          } else {
            // 唯一，清除错误
            form.setFields([{
              name: field,
              errors: [],
            }]);
          }
        } catch (error) {
          console.error('检查唯一性失败:', error);
        } finally {
          setCheckingUnique(prev => ({ ...prev, [field]: false }));
        }
      }, 500);
    };
  })();

  // 表单提交
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const params = {
        metricNameCn: values.metricNameCn.trim(),
        metricNameEn: values.metricNameEn.trim(),
        metricDescription: values.metricDescription?.trim() || '',
        category: values.category?.trim() || '',
        evaluationStandard: values.evaluationStandard,
        valueRangeMin: values.valueRangeMin,
        valueRangeMax: values.valueRangeMax,
        precisionMatchKey: values.precisionMatchKey.trim(),
      };

      let response;
      if (isEdit) {
        const updateParams: UpdateMetricParams = {
          ...params,
          id: initialValues!.id,
        };
        response = await updateMetric(updateParams);
      } else {
        const addParams: AddMetricParams = params;
        response = await addMetric(addParams);
      }

      if (response.code === 0) {
        message.success(isEdit ? '更新成功' : '添加成功');
        onSuccess();
      } else {
        message.error(response.msg || '操作失败');
      }
    } catch (error) {
      message.error('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 数值范围验证
  const validateValueRange = (_: any, value: number) => {
    if (value === undefined || value === null) {
      return Promise.reject(new Error('请输入数值'));
    }
    if (value < 0) {
      return Promise.reject(new Error('数值不能小于0'));
    }
    return Promise.resolve();
  };

  // 最大值验证
  const validateMaxValue = (_: any, value: number) => {
    const minValue = form.getFieldValue('valueRangeMin');
    if (value === undefined || value === null) {
      return Promise.reject(new Error('请输入最大值'));
    }
    if (value < 0) {
      return Promise.reject(new Error('数值不能小于0'));
    }
    if (minValue !== undefined && value <= minValue) {
      return Promise.reject(new Error('最大值必须大于最小值'));
    }
    return Promise.resolve();
  };

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
    },
    reset: () => {
      form.resetFields();
    },
  }));

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        metricNameCn: initialValues.metricNameCn,
        metricNameEn: initialValues.metricNameEn,
        metricDescription: initialValues.metricDescription,
        category: initialValues.category,
        evaluationStandard: initialValues.evaluationStandard,
        valueRangeMin: initialValues.valueRangeMin,
        valueRangeMax: initialValues.valueRangeMax,
        precisionMatchKey: initialValues.precisionMatchKey,
      });
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      onFinish={handleSubmit}
      initialValues={{
        evaluationStandard: 'higher_better',
        valueRangeMin: 0,
        valueRangeMax: 1,
      }}
    >
      <Form.Item
        label="指标中文名"
        name="metricNameCn"
        rules={[
          { required: true, message: '请输入指标中文名' },
          { max: 50, message: '指标中文名不能超过50个字符' },
        ]}
        hasFeedback
        validateStatus={checkingUnique.metricNameCn ? 'validating' : undefined}
      >
        <Input
          placeholder="请输入指标中文名"
          onChange={(e) => {
            debounceCheckUnique('cn', e.target.value, 'metricNameCn');
          }}
        />
      </Form.Item>

      <Form.Item
        label="指标英文名"
        name="metricNameEn"
        rules={[
          { required: true, message: '请输入指标英文名' },
          { max: 50, message: '指标英文名不能超过50个字符' },
          { pattern: /^[a-zA-Z0-9_-]+$/, message: '指标英文名只能包含字母、数字、下划线和短横线' },
        ]}
        hasFeedback
        validateStatus={checkingUnique.metricNameEn ? 'validating' : undefined}
      >
        <Input
          placeholder="请输入指标英文名"
          onChange={(e) => {
            debounceCheckUnique('en', e.target.value, 'metricNameEn');
          }}
        />
      </Form.Item>

      <Form.Item
        label="指标类别"
        name="category"
        rules={[{ required: true, message: '请输入指标类别' }]}
      >
        <Input placeholder="请输入指标类别，如：准确率、完整性等" />
      </Form.Item>

      <Form.Item
        label="评判标准"
        name="evaluationStandard"
        rules={[{ required: true, message: '请选择评判标准' }]}
      >
        <Select placeholder="请选择评判标准">
          {evaluationStandardOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="数值范围">
        <Row gutter={8} align="middle">
          <Col flex="1">
            <Form.Item
              name="valueRangeMin"
              rules={[
                { required: true, message: '请输入最小值' },
                { validator: validateValueRange },
              ]}
              style={{ marginBottom: 0 }}
            >
              <InputNumber
                placeholder="0"
                style={{ width: '100%' }}
                min={0}
                precision={2}
                onChange={() => {
                  // 当最小值改变时，重新验证最大值
                  form.validateFields(['valueRangeMax']);
                }}
              />
            </Form.Item>
          </Col>
          <Col style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>~</Col>
          <Col flex="1">
            <Form.Item
              name="valueRangeMax"
              rules={[
                { required: true, message: '请输入最大值' },
                { validator: validateMaxValue },
              ]}
              style={{ marginBottom: 0 }}
            >
              <InputNumber
                placeholder="1"
                style={{ width: '100%' }}
                min={0}
                precision={2}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        label="精准匹配键"
        name="precisionMatchKey"
        rules={[
          { required: true, message: '请输入精准匹配键' },
          { max: 50, message: '精准匹配键不能超过50个字符' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '精准匹配键只能包含字母、数字和下划线' },
        ]}
        hasFeedback
        validateStatus={checkingUnique.precisionMatchKey ? 'validating' : undefined}
        extra="用于系统内部标识该指标，建议使用英文下划线格式，如：f1_score"
      >
        <Input
          placeholder="请输入精准匹配键"
          onChange={(e) => {
            debounceCheckUnique('key', e.target.value, 'precisionMatchKey');
          }}
        />
      </Form.Item>

      <Form.Item
        label="指标描述"
        name="metricDescription"
        rules={[
          { max: 500, message: '指标描述不能超过500个字符' },
        ]}
      >
        <TextArea
          placeholder="请输入指标描述"
          rows={4}
          showCount
          maxLength={500}
        />
      </Form.Item>
    </Form>
  );
});

export default MetricForm;
export type { MetricFormRef };
