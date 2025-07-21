/*
 * @creater: panan
 * @message: 评估对象配置组件
 * @since: 2025-07-15 00:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-15 00:00:00
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/components/EvaluationObjectConfig.tsx
 */

import React, { useState, useEffect } from 'react';
import { Form, Radio, Select, message, Input, Row, Col } from 'antd';
import { getModelVersions, getInferenceResultSets, ModelVersion, InferenceResultSet } from '../api';

const { Option } = Select;

interface EvaluationObjectValue {
  objectType: 'model_version' | 'checkpoint';
  modelVersionId?: string;
  checkpointId?: string;
  inferenceType: 'new_data' | 'existing_data';
  inferenceResultSetId?: string;
}

interface EvaluationObjectConfigProps {
  value?: EvaluationObjectValue;
  onChange?: (value: EvaluationObjectValue) => void;
  disabled?: boolean;
  showModelName?: boolean; // 是否显示模型名称字段（对比对象需要）
  modelName?: string;
  onModelNameChange?: (name: string) => void;
}

const EvaluationObjectConfig: React.FC<EvaluationObjectConfigProps> = ({
  value = {
    objectType: 'checkpoint',
    inferenceType: 'existing_data',
  },
  onChange,
  disabled = false,
  showModelName = false,
  modelName = '',
  onModelNameChange,
}) => {
  const [modelVersions, setModelVersions] = useState<ModelVersion[]>([]);
  const [inferenceResultSets, setInferenceResultSets] = useState<InferenceResultSet[]>([]);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const [loadingResultSets, setLoadingResultSets] = useState(false);

  // 获取模型版本列表
  useEffect(() => {
    if (value.objectType === 'model_version') {
      const fetchModelVersions = async () => {
        setLoadingVersions(true);
        try {
          const response: any = await getModelVersions({});
          if (response.code === 0) {
            setModelVersions(response.data);
          }
        } catch (error) {
          message.error('获取模型版本失败');
        } finally {
          setLoadingVersions(false);
        }
      };

      fetchModelVersions();
    }
  }, [value.objectType, modelName]);

  // 获取推理结果集列表
  useEffect(() => {
    if (value.inferenceType === 'existing_data') {
      const fetchResultSets = async () => {
        setLoadingResultSets(true);
        try {
          const response: any = await getInferenceResultSets({});
          if (response.code === 0) {
            setInferenceResultSets(response.data);
          }
        } catch (error) {
          message.error('获取推理结果集失败');
        } finally {
          setLoadingResultSets(false);
        }
      };

      fetchResultSets();
    }
  }, [value.inferenceType, value.objectType, value.modelVersionId, value.checkpointId]);

  // 更新值
  const handleChange = (key: keyof EvaluationObjectValue, val: any) => {
    const newValue = { ...value, [key]: val };
    
    // 切换对象类型时清空相关字段
    if (key === 'objectType') {
      if (val === 'model_version') {
        delete newValue.checkpointId;
      } else {
        delete newValue.modelVersionId;
      }
    }
    
    // 切换推理类型时清空推理结果集
    if (key === 'inferenceType') {
      delete newValue.inferenceResultSetId;
    }
    
    // 切换模型版本或checkpoint时清空推理结果集
    if (key === 'modelVersionId' || key === 'checkpointId') {
      delete newValue.inferenceResultSetId;
    }
    
    onChange?.(newValue);
  };

  return (
    <div>
      {showModelName && (
        <Form.Item
          label="模型名称"
          required
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ marginBottom: 16 }}
        >
          <Input
            value={modelName}
            onChange={(e) => onModelNameChange?.(e.target.value)}
            placeholder="请输入模型名称"
            disabled={disabled}
          />
        </Form.Item>
      )}

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="对象类型"
            required
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ marginBottom: 16 }}
          >
            <Radio.Group
              value={value.objectType}
              onChange={(e) => handleChange('objectType', e.target.value)}
              disabled={disabled}
              optionType="button"
            >
              <Radio value="model_version">模型版本</Radio>
              <Radio value="checkpoint">checkpoint</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          {value.objectType === 'model_version' ? (
            <Form.Item
              label="模型版本号"
              required
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 16 }}
            >
              <Select
                value={value.modelVersionId}
                onChange={(val) => handleChange('modelVersionId', val)}
                placeholder="请选择模型版本"
                loading={loadingVersions}
                disabled={disabled}
                showSearch
                optionLabelProp="label"
                filterOption={(input, option) =>
                  (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {modelVersions.map(version => (
                  <Option key={version.id} value={version.id} label={version.version}>
                    <div>
                      <div>{version.version}</div>
                      {version.description && (
                        <div style={{ fontSize: 12, color: '#666' }}>
                          {version.description}
                        </div>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              label="Checkpoint ID"
              required
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginBottom: 16 }}
            >
              <Input
                value={value.checkpointId}
                onChange={(e) => handleChange('checkpointId', e.target.value)}
                placeholder="请输入checkpoint ID"
                disabled={disabled}
              />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Form.Item
        label="推理结果集"
        required
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ marginBottom: 16 }}
      >
        <Radio.Group
          value={value.inferenceType}
          onChange={(e) => handleChange('inferenceType', e.target.value)}
          disabled={disabled}
          optionType="button"
          size="small"  // Adjust size to small
          style={{ display: 'flex', gap: '8px' }}  // Use flex for horizontal arrangement and adjust gap
        >
          <Radio.Button value="new_data" disabled>新数据（暂不支持）</Radio.Button>
          <Radio.Button value="existing_data">已有数据</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {value.inferenceType === 'existing_data' && (
        <Form.Item
          label="选择推理结果集"
          required
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ marginBottom: 0 }}
        >
          <Select
            value={value.inferenceResultSetId}
            onChange={(val) => handleChange('inferenceResultSetId', val)}
            placeholder="请选择推理结果集"
            loading={loadingResultSets}
            disabled={disabled}
            showSearch
            optionLabelProp="label"
            filterOption={(input, option) =>
              (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {inferenceResultSets.map(resultSet => (
              <Option key={resultSet.id} value={resultSet.id} label={resultSet.name}>
                <div>
                  <div>{resultSet.name}</div>
                  {resultSet.description && (
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                      {resultSet.description}
                    </div>
                  )}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </div>
  );
};

export default EvaluationObjectConfig;
