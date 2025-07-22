/*
 * @creater: panan
 * @message: 创建/编辑人工评估任务页面
 * @since: 2025-07-15 00:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-07-15 17:33:31
 * @文件相对于项目的路径: /pan-umi/src/pages/ManualAssessment/pages/CreateEvaluationTask.tsx
 */

import {
  ArrowLeftOutlined,
  CheckOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Space,
  Spin,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'umi';
import {
  createEvaluationTask,
  CreateTaskParams,
  DatasetVersion,
  getDatasetVersions,
  getEvaluationTaskDetail,
  searchTestDatasets,
  TaskDetail,
  TestDataset,
  updateEvaluationTask,
} from '../api';
import MetricFormItem from '../components/EvaluationMetrics/MetricFormItem';
import TaskTypeCardSelect from '../components/TaskTypeCardSelect';
import UnifiedObjectConfig from '../components/UnifiedObjectConfig';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const CreateEvaluationTask: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const copyId = searchParams.get('copyId');

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [datasets, setDatasets] = useState<TestDataset[]>([]);
  const [datasetVersions, setDatasetVersions] = useState<DatasetVersion[]>([]);
  const [loadingDatasets, setLoadingDatasets] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(false);

  // 判断是否为编辑模式
  const isEditMode = !!id;
  const isCopyMode = !!copyId;
  const pageTitle = isEditMode ? '编辑人工评估任务' : '创建人工评估任务';

  // 获取测试集列表
  const fetchDatasets = async (name?: string) => {
    setLoadingDatasets(true);
    try {
      const response: any = await searchTestDatasets({ name });
      if (response.code === 0) {
        setDatasets(response.data.list);
      }
    } catch (error) {
      message.error('获取测试集列表失败');
    } finally {
      setLoadingDatasets(false);
    }
  };

  // 获取测试集版本列表
  const fetchDatasetVersions = async (datasetId: string) => {
    setLoadingVersions(true);
    try {
      const response: any = await getDatasetVersions(datasetId);
      if (response.code === 0) {
        setDatasetVersions(response.data);
        return response.data; // 返回数据以便调用者使用
      }
      return [];
    } catch (error) {
      message.error('获取测试集版本失败');
      return [];
    } finally {
      setLoadingVersions(false);
    }
  };

  // 监听任务类型变化，重置对比对象
  const taskType = Form.useWatch('taskType', form);
  useEffect(() => {
    if (taskType === 'single') {
      form.setFieldValue('comparisonTarget', undefined);
    }
  }, [taskType, form]);

  // 监听测试集变化，获取版本列表
  const datasetId = Form.useWatch('datasetId', form);
  useEffect(() => {
    if (datasetId && !isEditMode && !isCopyMode) {
      // 只有在非编辑模式和非复制模式下才清空版本选择
      fetchDatasetVersions(datasetId);
      form.setFieldValue('datasetVersionId', undefined);
    } else if (datasetId && (isEditMode || isCopyMode)) {
      // 编辑模式或复制模式下，只获取版本列表，不清空选择
      fetchDatasetVersions(datasetId);
    }
  }, [datasetId, form, isEditMode, isCopyMode]);

  // 加载任务详情（编辑模式或复制模式）
  const loadTaskDetail = async (taskId: string) => {
    setLoading(true);
    try {
      const response: any = await getEvaluationTaskDetail(taskId);
      if (response.code === 0) {
        const data: TaskDetail = response.data;

        // 先加载测试集版本数据
        if (data.datasetId) {
          await fetchDatasetVersions(data.datasetId);
        }

        // 延迟一下确保状态更新完成
        setTimeout(() => {
          // 然后设置表单值
          if (isCopyMode) {
            form.setFieldsValue({
              taskName: `${data.taskName}_copy`,
              taskDescription: data.taskDescription,
              datasetId: data.datasetId,
              datasetVersionId: data.datasetVersionId,
              taskType: data.taskType,
              evaluationTarget: data.evaluationTarget,
              comparisonTarget: data.comparisonTarget,
              evaluationMetrics: data.evaluationMetrics,
            });
          } else {
            form.setFieldsValue(data);
          }
        }, 100);
      }
    } catch (error) {
      message.error('获取任务详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchDatasets();

    if (isEditMode && id) {
      loadTaskDetail(id);
    } else if (isCopyMode && copyId) {
      loadTaskDetail(copyId);
    } else {
      // 设置默认值
      form.setFieldsValue({
        taskType: 'dual',
        evaluationTarget: {
          objectType: 'checkpoint',
          inferenceType: 'existing_data',
        },
        evaluationMetrics: [],
      });
    }
  }, []);

  /**
   * 处理评估对象数据变更
   * @param value 新的评估对象数据
   */
  const handleEvaluationChange = (value: any) => {
    form.setFieldValue('evaluationTarget', value);
    // 可以在此处添加额外的数据处理逻辑
  };

  /**
   * 处理对比对象数据变更
   * @param value 新的对比对象数据
   */
  const handleComparisonChange = (value: any) => {
    form.setFieldValue('comparisonTarget', value);
    // 可以在此处添加额外的数据处理逻辑
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const params: CreateTaskParams = {
        taskName: values.taskName,
        taskDescription: values.taskDescription,
        datasetId: values.datasetId,
        datasetVersionId: values.datasetVersionId,
        taskType: values.taskType,
        evaluationTarget: values.evaluationTarget,
        comparisonTarget: values.comparisonTarget,
        evaluationMetrics: values.evaluationMetrics,
      };

      if (isEditMode && id) {
        await updateEvaluationTask(id, params);
        message.success('评估任务更新成功');
      } else {
        await createEvaluationTask(params);
        message.success('评估任务创建成功');
      }

      navigate('/ManualAssessment');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        {/* 页面头部 */}
        <div
          style={{
            marginBottom: 24,
            padding: '16px 24px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <Space>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/ManualAssessment')}
            >
              返回
            </Button>
            <Title level={4} style={{ margin: 0 }}>
              {pageTitle}
            </Title>
          </Space>
        </div>

        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleSubmit}
          autoComplete="off"
          // colon={false}
          // size="large"
        >
          <div>
            {/* 基本信息 */}
            <Card
              title={
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    style={{
                      width: '4px',
                      height: '16px',
                      background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
                      borderRadius: '2px',
                    }}
                  />
                  基本信息
                </div>
              }
              style={{
                marginBottom: 16,
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <Form.Item
                label="评估任务名称"
                name="taskName"
                rules={[{ required: true, message: '请输入评估任务名称' }]}
              >
                <Input placeholder="请输入评估任务名称" />
              </Form.Item>

              <Form.Item
                label="评估任务描述"
                name="taskDescription"
                rules={[{ required: true, message: '请输入评估任务描述' }]}
              >
                <TextArea
                  placeholder="请输入评估任务描述"
                  rows={2}
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              <Form.Item
                label="选择测试集"
                name="datasetId"
                rules={[{ required: true, message: '请选择测试集' }]}
              >
                <Select
                  placeholder="请选择测试集"
                  loading={loadingDatasets}
                  showSearch
                  filterOption={false}
                  onSearch={fetchDatasets}
                  onDropdownVisibleChange={(open) => {
                    if (open) fetchDatasets();
                  }}
                  optionLabelProp="label"
                >
                  {datasets.map((dataset) => (
                    <Option
                      key={dataset.id}
                      value={dataset.id}
                      label={dataset.name}
                    >
                      <div>
                        <div>{dataset.name}</div>
                        {dataset.description && (
                          <div style={{ fontSize: 12, color: '#666' }}>
                            {dataset.description}
                          </div>
                        )}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="测试集版本"
                name="datasetVersionId"
                rules={[{ required: true, message: '请选择测试集版本' }]}
              >
                <Select
                  placeholder="请选择测试集版本"
                  loading={loadingVersions}
                  disabled={!datasetId}
                  optionLabelProp="label"
                >
                  {datasetVersions.map((version) => (
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

              <Form.Item
                label="评估任务类型"
                name="taskType"
                rules={[{ required: true, message: '请选择评估任务类型' }]}
                valuePropName="value"
                trigger="onChange"
              >
                {/* 卡片式选择组件替换原Radio.Group */}
                <TaskTypeCardSelect
                  options={[
                    {
                      value: 'dual',
                      title: '两个对象对比',
                      description:
                        '即两个对象进行比对，从中选择最好的一个。适用于不同模型版本的优劣比较，或同一版本的推理结果与标准答案比对。',
                    },
                    {
                      value: 'single',
                      title: '单个对象评估',
                      description:
                        '即对单个对象进行评估，适用于模型单独评测等场景。',
                    },
                  ]}
                  value={form.getFieldValue('taskType') || 'dual'}
                  onChange={(val) => form.setFieldValue('taskType', val)}
                />
              </Form.Item>
            </Card>

            {/* 评估对象配置 */}
            <Form.Item
              name="evaluationTarget"
              rules={[{ required: true, message: '请配置评估对象' }]}
              style={{ width: '100%' }}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              noStyle
            >
              <UnifiedObjectConfig
                style={{ width: '100%' }}
                objectType="evaluation"
                value={form.getFieldValue('evaluationTarget')}
                onChange={handleEvaluationChange}
                bordered={true}
                title="评估对象"
              />
            </Form.Item>

            {/* 对比对象配置 */}
            {taskType === 'dual' && (
              <Form.Item
                name="comparisonTarget"
                rules={[{ required: true, message: '请配置对比对象' }]}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                noStyle
              >
                <UnifiedObjectConfig
                  objectType="comparison"
                  style={{ width: '100%' }}
                  value={form.getFieldValue('comparisonTarget')}
                  onChange={handleComparisonChange}
                  bordered={true}
                  title="对比对象"
                />
              </Form.Item>
            )}

            {/* 评估指标配置 */}
            <Card
              title={
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    style={{
                      width: '4px',
                      height: '16px',
                      background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                      borderRadius: '2px',
                    }}
                  />
                  评估指标
                </div>
              }
              style={{
                marginBottom: 16,
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <Form.Item
                name="evaluationMetrics"
                rules={[
                  { required: true, message: '请添加评估指标' },
                  {
                    validator: (_, value) => {
                      if (!value || value.length === 0) {
                        return Promise.reject(
                          new Error('至少需要添加一个评估指标'),
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                label="评估指标"
              >
                <MetricFormItem placeholder="请点击上方按钮选择评估指标" />
              </Form.Item>
            </Card>

            {/* 操作按钮 */}
            <Card
              style={{
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Space size="large">
                  <Button
                    size="large"
                    onClick={() => navigate('/ManualAssessment')}
                  >
                    取消
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    icon={isEditMode ? <SaveOutlined /> : <CheckOutlined />}
                    loading={submitting}
                    onClick={handleSubmit}
                    style={{ borderRadius: '6px', minWidth: '120px' }}
                  >
                    {isEditMode ? '保存修改' : '创建任务'}
                  </Button>
                </Space>
              </div>
            </Card>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateEvaluationTask;
