/*
 * @creater: panan
 * @message: 统一化对象配置组件 - 用于评估和对比对象的配置
 * @since: 2025-01-24 12:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-01-24 12:00:00
 * @文件相对于项目的路径: /pan-umi/src/components/UnifiedObjectConfig/index.tsx
 */

import { Card, Form, message, Radio, Select } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getInferenceResultSets,
  getModelVersions,
  getTrainingTasks,
} from '../../api';
import {
  FieldValidationConfig,
  InferenceResultSet,
  Model,
  ModelVersion,
  ObjectConfigData,
  TrainingTask,
  UnifiedObjectConfigProps,
  WorkloadData,
} from './types';

const { Option } = Select;

/**
 * 统一化对象配置组件
 *
 * 功能特点：
 * 1. 支持评估对象和对比对象两种模式
 * 2. 统一的数据结构和状态管理
 * 3. 自动数据加载和联动更新
 * 4. 完整的表单验证和错误处理
 * 5. 支持自定义样式和尺寸
 *
 * 使用场景：
 * - 创建评估任务时的对象配置
 * - 多对象对比评估的配置
 * - 任何需要配置模型版本或checkpoint的场景
 */
const UnifiedObjectConfig: React.FC<UnifiedObjectConfigProps> = ({
  objectType,
  value = {
    objectType: 'checkpoint',
    inferenceType: 'existing_data',
  },
  onChange,
  disabled = false,
  showModelName = false,
  modelName = '',
  onModelNameChange,
  title,
  bordered = true,
  size = 'middle',
  className,
  style,
}) => {
  // 状态管理
  const [models, setModels] = useState<Model[]>([]);
  const [modelVersions, setModelVersions] = useState<ModelVersion[]>([]);
  const [trainingTasks, setTrainingTasks] = useState<TrainingTask[]>([]);
  const [workloadPaths, setWorkloadPaths] = useState<WorkloadData[]>([]);
  const [inferenceResultSets, setInferenceResultSets] = useState<
    InferenceResultSet[]
  >([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingResultSets, setLoadingResultSets] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // 验证规则配置
  const validationConfig: FieldValidationConfig = useMemo(
    () => ({
      objectType: {
        required: true,
        validator: (val) => {
          if (!val) return '请选择对象类型';
          if (!['model_version', 'checkpoint'].includes(val))
            return '对象类型无效';
          return null;
        },
      },
      modelId: {
        required: true,
        validator: (val) => {
          if (!val) return '请选择模型';
          return null;
        },
      },
      modelVersionId: {
        required: value.objectType === 'model_version',
        validator: (val) => {
          if (value.objectType === 'model_version' && !val)
            return '请选择模型版本';
          return null;
        },
      },
      trainingTaskId: {
        required: value.objectType === 'checkpoint',
        validator: (val) => {
          if (value.objectType === 'checkpoint' && !val)
            return '请选择训练任务';
          return null;
        },
      },
      workloadPath: {
        required: false,
        validator: (val) => {
          // 工作负载路径为可选
          return null;
        },
      },
      inferenceType: {
        required: true,
        validator: (val) => {
          if (!val) return '请选择推理类型';
          if (!['new_data', 'existing_data'].includes(val))
            return '推理类型无效';
          return null;
        },
      },
      inferenceResultSetId: {
        required: value.inferenceType === 'existing_data',
        validator: (val) => {
          if (value.inferenceType === 'existing_data' && !val)
            return '请选择推理结果集';
          return null;
        },
      },
    }),
    [value.objectType, value.inferenceType],
  );

  /**
   * 验证单个字段
   * @param field 字段名
   * @param fieldValue 字段值
   * @returns 错误信息或null
   */
  const validateField = useCallback(
    (field: string, fieldValue: any): string | null => {
      const config = validationConfig[field as keyof FieldValidationConfig];
      if (!config) return null;

      if (
        config.required &&
        (!fieldValue || (typeof fieldValue === 'string' && !fieldValue.trim()))
      ) {
        return `${getFieldLabel(field)}不能为空`;
      }

      if (config.validator) {
        return config.validator(fieldValue);
      }

      return null;
    },
    [validationConfig],
  );

  /**
   * 验证所有字段
   * @returns 验证结果
   */
  const validateAllFields = useCallback(() => {
    const errors: Record<string, string> = {};

    // 验证对象配置数据
    Object.keys(value).forEach((key) => {
      const error = validateField(key, value[key as keyof ObjectConfigData]);
      if (error) {
        errors[key] = error;
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [value, validateField]);

  /**
   * 获取字段显示名称
   * @param field 字段名
   * @returns 显示名称
   */
  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      objectType: '对象类型',
      modelVersionId: '模型版本',
      checkpointId: 'Checkpoint ID',
      inferenceType: '推理类型',
      inferenceResultSetId: '推理结果集',
      modelName: '模型名称',
    };
    return labels[field] || field;
  };

  /**
   * 获取模型列表（优化的异步函数）
   */
  const fetchModels = useCallback(
    async (keyword?: string) => {
      setLoadingModels(true);
      try {
        // ManualAssessment API 没有 getModels，使用静态模型列表
        const mockModels = [
          { id: '123', name: '默认评估模型', description: '评估对象专用模型' },
          {
            id: '1',
            name: 'qwen-chat-v2.5',
            description: 'Qwen对话模型v2.5版本',
          },
          {
            id: '2',
            name: 'llama-3-8b-instruct',
            description: 'Meta Llama 3 8B指令模型',
          },
          {
            id: '3',
            name: 'baichuan2-13b-chat',
            description: '百川2 13B对话模型',
          },
        ];

        let modelList = mockModels;

        // 关键字过滤
        if (keyword) {
          modelList = mockModels.filter(
            (model) =>
              model.name.toLowerCase().includes(keyword.toLowerCase()) ||
              (model.description &&
                model.description
                  .toLowerCase()
                  .includes(keyword.toLowerCase())),
          );
        }

        // 评估对象默认模型ID为"123"且禁用
        if (objectType === 'evaluation') {
          const defaultModel = {
            id: '123',
            name: '默认评估模型',
            description: '评估对象专用模型',
          };
          setModels([defaultModel]);
        } else {
          setModels(modelList);
        }
        // 清除相关字段的验证错误
        setValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.modelId;
          return newErrors;
        });
      } catch (error) {
        message.error('获取模型列表失败');
        console.error('[UnifiedObjectConfig] fetchModels error:', error);
      } finally {
        setLoadingModels(false);
      }
    },
    [objectType],
  );

  /**
   * 获取模型版本列表（优化的异步函数）
   */
  const fetchModelVersions = useCallback(
    async (modelId?: string, keyword?: string) => {
      if (!modelId || value.objectType !== 'model_version') return;

      setLoadingVersions(true);
      try {
        const response: any = await getModelVersions({ modelId, keyword });
        if (response.code === 0) {
          setModelVersions(Array.isArray(response.data) ? response.data : []);
          // 清除相关字段的验证错误
          setValidationErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.modelVersionId;
            return newErrors;
          });
        } else {
          message.error(response.msg || '获取模型版本失败');
        }
      } catch (error) {
        message.error('获取模型版本失败');
        console.error('[UnifiedObjectConfig] fetchModelVersions error:', error);
      } finally {
        setLoadingVersions(false);
      }
    },
    [value.objectType],
  );

  /**
   * 获取训练任务列表（优化的异步函数）
   */
  const fetchTrainingTasks = useCallback(
    async (modelId?: string, keyword?: string) => {
      if (!modelId || value.objectType !== 'checkpoint') return;

      setLoadingTasks(true);
      try {
        const response: any = await getTrainingTasks({ modelId, keyword });
        if (response.code === 0) {
          setTrainingTasks(Array.isArray(response.data) ? response.data : []);
          // 清除相关字段的验证错误
          setValidationErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.trainingTaskId;
            return newErrors;
          });
        } else {
          message.error(response.msg || '获取训练任务失败');
        }
      } catch (error) {
        message.error('获取训练任务失败');
        console.error('[UnifiedObjectConfig] fetchTrainingTasks error:', error);
      } finally {
        setLoadingTasks(false);
      }
    },
    [value.objectType],
  );

  /**
   * 获取推理结果集列表（优化的异步函数）
   */
  const fetchInferenceResultSets = useCallback(
    async (keyword?: string) => {
      if (value.inferenceType !== 'existing_data') return;

      setLoadingResultSets(true);
      try {
        const params: any = { keyword };
        if (value.modelId) {
          params.modelId = value.modelId;
        }
        if (value.objectType === 'model_version' && value.modelVersionId) {
          params.modelVersionId = value.modelVersionId;
        }
        if (value.objectType === 'checkpoint') {
          if (value.trainingTaskId) {
            params.trainingTaskId = value.trainingTaskId;
          }
          if (value.workloadPath) {
            params.workloadPath = value.workloadPath;
          }
        }

        const response: any = await getInferenceResultSets(params);
        if (response.code === 0) {
          // ManualAssessment API 返回的数据格式是 {data: {list: [...]}}
          const resultSets = response.data?.list || response.data || [];
          setInferenceResultSets(resultSets);
          console.log(
            '🔍 [UnifiedObjectConfig] 获取到的推理结果集:',
            resultSets,
          );
          // 清除相关字段的验证错误
          setValidationErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.inferenceResultSetId;
            return newErrors;
          });
        } else {
          message.error(response.msg || '获取推理结果集失败');
        }
      } catch (error) {
        message.error('获取推理结果集失败');
        console.error(
          '[UnifiedObjectConfig] fetchInferenceResultSets error:',
          error,
        );
      } finally {
        setLoadingResultSets(false);
      }
    },
    [
      value.inferenceType,
      value.objectType,
      value.modelId,
      value.modelVersionId,
      value.trainingTaskId,
      value.workloadPath,
    ],
  );

  /**
   * 处理配置项变更
   * @param key 配置项键名
   * @param val 新值
   */
  const handleChange = (key: keyof ObjectConfigData, val: any) => {
    const newValue = { ...value, [key]: val };

    // 数据唯一性处理：切换对象类型时清空相关字段
    if (key === 'objectType') {
      if (val === 'model_version') {
        // 切换到模型版本，清除checkpoint相关数据
        delete newValue.trainingTaskId;
        delete newValue.workloadPath;
        // 清空训练任务列表和工作负载路径选项
        setTrainingTasks([]);
        setWorkloadPaths([]);
      } else {
        // 切换到checkpoint，清除模型版本相关数据
        delete newValue.modelVersionId;
        // 清空模型版本列表
        setModelVersions([]);
      }
      // 无论切换到哪种类型，都要清空推理结果集
      delete newValue.inferenceResultSetId;
      setInferenceResultSets([]);
    }

    // 联动更新：切换模型时清空下游数据
    if (key === 'modelId') {
      // 清空模型版本和训练任务相关数据
      delete newValue.modelVersionId;
      delete newValue.trainingTaskId;
      delete newValue.workloadPath;
      delete newValue.inferenceResultSetId;
      // 清空相关列表
      setModelVersions([]);
      setTrainingTasks([]);
      setWorkloadPaths([]);
      setInferenceResultSets([]);
    }

    // 联动更新：切换推理类型时清空推理结果集
    if (key === 'inferenceType') {
      delete newValue.inferenceResultSetId;
      setInferenceResultSets([]);
    }

    // 联动更新：切换训练任务时清空推理结果集（工作负载路径的清理由useEffect处理）
    if (key === 'trainingTaskId') {
      delete newValue.inferenceResultSetId;
      setInferenceResultSets([]);
    }

    // 联动更新：切换模型版本或工作负载路径时清空推理结果集
    if (key === 'modelVersionId' || key === 'workloadPath') {
      delete newValue.inferenceResultSetId;
      setInferenceResultSets([]);
    }

    onChange?.(newValue);
  };

  // 初始化加载模型列表
  useEffect(() => {
    fetchModels();
  }, [objectType]); // 只依赖objectType，避免循环依赖

  // 单独处理评估对象的默认模型设置
  useEffect(() => {
    if (objectType === 'evaluation' && !value.modelId) {
      const newValue = { ...value, modelId: '123' };
      onChange?.(newValue);
    }
  }, [objectType, value.modelId, onChange]);

  // 监听模型ID变化，加载相应数据
  useEffect(() => {
    if (value.modelId) {
      if (value.objectType === 'model_version') {
        fetchModelVersions(value.modelId);
      } else if (value.objectType === 'checkpoint') {
        fetchTrainingTasks(value.modelId);
      }
    }
  }, [value.modelId, value.objectType, fetchModelVersions, fetchTrainingTasks]);

  // 监听训练任务变化，更新工作负载路径选项
  useEffect(() => {
    if (value.trainingTaskId && trainingTasks.length > 0) {
      const task = trainingTasks.find((t) => t.id === value.trainingTaskId);
      if (task && task.workload) {
        setWorkloadPaths(task.workload);
        // 只有当前选择的工作负载路径不在新的选项中时才清除
        if (
          value.workloadPath &&
          !task.workload.some((w) => w.path === value.workloadPath)
        ) {
          const newValue = { ...value };
          delete newValue.workloadPath;
          onChange?.(newValue);
        }
      } else {
        setWorkloadPaths([]);
        // 当训练任务没有工作负载时，清除工作负载路径选择
        if (value.workloadPath) {
          const newValue = { ...value };
          delete newValue.workloadPath;
          onChange?.(newValue);
        }
      }
    } else {
      setWorkloadPaths([]);
      // 当没有训练任务时，清除工作负载路径
      if (value.workloadPath) {
        const newValue = { ...value };
        delete newValue.workloadPath;
        onChange?.(newValue);
      }
    }
  }, [value.trainingTaskId, trainingTasks, onChange]);

  // 监听推理类型和相关参数变化，加载推理结果集
  useEffect(() => {
    fetchInferenceResultSets();
  }, [fetchInferenceResultSets]);

  // 获取组件标题
  const getTitle = () => {
    if (title) return title;
    return objectType === 'evaluation' ? '评估对象配置' : '对比对象配置';
  };

  // 组件样式类名
  const containerClassName = useMemo(() => {
    const classes = ['pan-unified-object-config'];

    if (disabled) classes.push('pan-disabled');
    if (size) classes.push(`pan-size-${size}`);
    if (objectType === 'evaluation') classes.push('pan-evaluation-mode');
    if (objectType === 'comparison') classes.push('pan-comparison-mode');
    if (className) classes.push(className);

    return classes.join(' ');
  }, [disabled, size, objectType, className]);

  // 暴露验证方法给父组件
  useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      // 在组件实例上添加验证方法
      (onChange as any).validate = validateAllFields;
      (onChange as any).getValidationErrors = () => validationErrors;
    }
  }, [onChange, validateAllFields, validationErrors]);

  // 渲染表单内容
  const renderFormContent = () => (
    <>
      {/* 模型选择 */}
      <Form.Item label="选择模型" required>
        <Select
          value={value.modelId}
          onChange={(val) => handleChange('modelId', val)}
          placeholder="请选择模型"
          loading={loadingModels}
          disabled={disabled || objectType === 'evaluation'}
          showSearch
          size={size}
          optionLabelProp="label"
          filterOption={(input, option) =>
            (option?.label as string)
              ?.toLowerCase()
              .includes(input.toLowerCase())
          }
        >
          {models.map((model) => (
            <Option key={model.id} value={model.id} label={model.name}>
              <div>
                <div>{model.name}</div>
                {model.description && (
                  <div style={{ fontSize: 12, color: '#666' }}>
                    {model.description}
                  </div>
                )}
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* 对象类型选择 */}
      <Form.Item label="对象类型" required>
        <Radio.Group
          value={value.objectType}
          onChange={(e) => handleChange('objectType', e.target.value)}
          disabled={disabled}
          optionType="button"
          size={size}
        >
          <Radio value="model_version">模型版本</Radio>
          <Radio value="checkpoint">Checkpoint</Radio>
        </Radio.Group>
      </Form.Item>

      {/* 模型版本选择或训练任务选择 */}
      {value.objectType === 'model_version' ? (
        <Form.Item label="模型版本号" required>
          <Select
            value={value.modelVersionId}
            onChange={(val) => handleChange('modelVersionId', val)}
            placeholder="请选择模型版本"
            loading={loadingVersions}
            disabled={disabled}
            showSearch
            size={size}
            optionLabelProp="label"
            filterOption={(input, option) =>
              (option?.label as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {modelVersions.map((version) => (
              <Option
                key={version.id}
                value={version.id}
                label={version.version}
              >
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
        <>
          {/* 训练任务选择 */}
          <Form.Item label="训练任务" required>
            <Select
              value={value.trainingTaskId}
              onChange={(val) => handleChange('trainingTaskId', val)}
              placeholder="请选择训练任务"
              loading={loadingTasks}
              disabled={disabled}
              showSearch
              size={size}
              optionLabelProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {trainingTasks.map((task) => (
                <Option key={task.id} value={task.id} label={task.name}>
                  <div>
                    <div>{task.name}</div>
                    {task.description && (
                      <div style={{ fontSize: 12, color: '#666' }}>
                        {task.description}
                      </div>
                    )}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 工作负载路径选择 */}
          {value.trainingTaskId && (
            <Form.Item
              label="工作负载路径"
              help={
                workloadPaths.length === 0
                  ? '该训练任务暂无可用工作负载路径'
                  : undefined
              }
            >
              <Select
                value={value.workloadPath}
                onChange={(val) => handleChange('workloadPath', val)}
                placeholder={
                  workloadPaths.length > 0
                    ? '请选择工作负载路径（可选）'
                    : '暂无可用工作负载路径'
                }
                disabled={disabled || workloadPaths.length === 0}
                size={size}
                allowClear
                optionLabelProp="label"
              >
                {workloadPaths.map((workload) => (
                  <Option
                    key={workload.path}
                    value={workload.path}
                    label={workload.name || workload.path}
                  >
                    <div>
                      <div>{workload.name || workload.path}</div>
                      {workload.description && (
                        <div style={{ fontSize: 12, color: '#666' }}>
                          {workload.description}
                        </div>
                      )}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </>
      )}

      {/* 推理结果集配置 */}
      <Form.Item label="推理结果集" required>
        <Radio.Group
          value={value.inferenceType}
          onChange={(e) => handleChange('inferenceType', e.target.value)}
          disabled={disabled}
          optionType="button"
          size={size}
          style={{ display: 'flex', gap: '8px' }}
        >
          <Radio.Button value="new_data" disabled>
            新数据（暂不支持）
          </Radio.Button>
          <Radio.Button value="existing_data">已有数据</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {/* 推理结果集选择 */}
      {value.inferenceType === 'existing_data' && (
        <Form.Item label="选择推理结果集" required>
          <Select
            value={value.inferenceResultSetId}
            onChange={(val) => handleChange('inferenceResultSetId', val)}
            placeholder="请选择推理结果集"
            loading={loadingResultSets}
            disabled={disabled}
            showSearch
            size={size}
            optionLabelProp="label"
            filterOption={(input, option) =>
              (option?.label as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {inferenceResultSets.map((resultSet) => (
              <Option
                key={resultSet.id}
                value={resultSet.id}
                label={resultSet.name}
              >
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
    </>
  );

  // 根据是否需要边框决定渲染方式
  if (bordered) {
    return (
      <div className={containerClassName} style={style}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '4px',
                  height: '16px',
                  background:
                    objectType === 'evaluation'
                      ? 'linear-gradient(135deg, #fa8c16, #ffa940)' // 橙色渐变 - 评估对象
                      : 'linear-gradient(135deg, #722ed1, #9254de)', // 紫色渐变 - 对比对象
                  borderRadius: '2px',
                }}
              />
              {getTitle()}
            </div>
          }
          size={size}
          className="pan-unified-object-config-card"
          style={{ marginBottom: 16 }}
        >
          {renderFormContent()}
        </Card>
      </div>
    );
  }

  return (
    <div className={containerClassName} style={{ marginBottom: 16, ...style }}>
      <div className="pan-unified-object-config-title">{getTitle()}</div>
      <div className="pan-unified-object-config-fade-in">
        {renderFormContent()}
      </div>
    </div>
  );
};

// 同时导出类型定义供外部使用
export type {
  ComponentSize,
  ConfigMode,
  InferenceResultSet,
  InferenceType,
  ModelVersion,
  ObjectConfigData,
  ObjectType,
  UnifiedObjectConfigProps,
} from './types';

export default UnifiedObjectConfig;
