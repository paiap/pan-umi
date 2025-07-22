/*
 * @creater: panan
 * @message: 统一化对象配置组件 - 数据转换层
 * @since: 2025-01-24 12:00:00
 * @LastAuthor: 潘安 panan2001@outlook.com
 * @lastTime: 2025-01-24 12:00:00
 * @文件相对于项目的路径: /pan-umi/src/components/UnifiedObjectConfig/dataTransform.ts
 */

import { ObjectConfigData, ConfigMode } from './types';

/**
 * 数据键值管理类
 * 基于对象类型实现数据唯一性保证机制
 */
class ObjectDataManager {
  private static instance: ObjectDataManager;
  private dataStore: Map<string, ObjectConfigData> = new Map();

  private constructor() {}

  /**
   * 获取单例实例
   */
  public static getInstance(): ObjectDataManager {
    if (!ObjectDataManager.instance) {
      ObjectDataManager.instance = new ObjectDataManager();
    }
    return ObjectDataManager.instance;
  }

  /**
   * 生成数据键值
   * @param configMode 配置模式
   * @param taskId 任务ID（可选，用于区分不同任务）
   * @returns 数据键值
   */
  private generateDataKey(configMode: ConfigMode, taskId?: string): string {
    return taskId ? `${configMode}_${taskId}` : configMode;
  }

  /**
   * 设置对象配置数据
   * @param configMode 配置模式
   * @param data 对象配置数据
   * @param taskId 任务ID（可选）
   */
  public setData(configMode: ConfigMode, data: ObjectConfigData, taskId?: string): void {
    const key = this.generateDataKey(configMode, taskId);
    this.dataStore.set(key, { ...data });
  }

  /**
   * 获取对象配置数据
   * @param configMode 配置模式
   * @param taskId 任务ID（可选）
   * @returns 对象配置数据
   */
  public getData(configMode: ConfigMode, taskId?: string): ObjectConfigData | null {
    const key = this.generateDataKey(configMode, taskId);
    const data = this.dataStore.get(key);
    return data ? { ...data } : null;
  }

  /**
   * 清除对象配置数据
   * @param configMode 配置模式
   * @param taskId 任务ID（可选）
   */
  public clearData(configMode: ConfigMode, taskId?: string): void {
    const key = this.generateDataKey(configMode, taskId);
    this.dataStore.delete(key);
  }

  /**
   * 清除所有数据
   */
  public clearAllData(): void {
    this.dataStore.clear();
  }

  /**
   * 检查数据是否存在
   * @param configMode 配置模式
   * @param taskId 任务ID（可选）
   * @returns 是否存在数据
   */
  public hasData(configMode: ConfigMode, taskId?: string): boolean {
    const key = this.generateDataKey(configMode, taskId);
    return this.dataStore.has(key);
  }
}

/**
 * 数据转换工具类
 */
export class ObjectDataTransformer {
  private dataManager: ObjectDataManager;

  constructor() {
    this.dataManager = ObjectDataManager.getInstance();
  }

  /**
   * 转换输入数据为标准格式
   * @param input 输入数据
   * @param configMode 配置模式
   * @returns 标准格式的对象配置数据
   */
  public transformInput(input: any, configMode: ConfigMode): ObjectConfigData {
    // 设置默认值
    const defaultData: ObjectConfigData = {
      objectType: 'checkpoint',
      inferenceType: 'existing_data',
    };

    if (!input || typeof input !== 'object') {
      return defaultData;
    }

    // 数据清洗和转换
    const transformedData: ObjectConfigData = {
      objectType: this.validateObjectType(input.objectType) ? input.objectType : defaultData.objectType,
      inferenceType: this.validateInferenceType(input.inferenceType) ? input.inferenceType : defaultData.inferenceType,
    };

    // 根据对象类型设置相应字段
    if (transformedData.objectType === 'model_version') {
      if (input.modelVersionId) {
        transformedData.modelVersionId = String(input.modelVersionId);
      }
      // 清除checkpoint相关字段
      delete input.checkpointId;
    } else if (transformedData.objectType === 'checkpoint') {
      if (input.checkpointId) {
        transformedData.checkpointId = String(input.checkpointId);
      }
      // 清除model_version相关字段
      delete input.modelVersionId;
    }

    // 设置推理结果集ID
    if (transformedData.inferenceType === 'existing_data' && input.inferenceResultSetId) {
      transformedData.inferenceResultSetId = String(input.inferenceResultSetId);
    }

    return transformedData;
  }

  /**
   * 转换输出数据为提交格式
   * @param data 对象配置数据
   * @param configMode 配置模式
   * @param modelName 模型名称（对比对象需要）
   * @returns 提交格式的数据
   */
  public transformOutput(data: ObjectConfigData, configMode: ConfigMode, modelName?: string): any {
    if (!data) return null;

    const outputData: any = {
      objectType: data.objectType,
      inferenceType: data.inferenceType,
    };

    // 根据对象类型设置相应字段
    if (data.objectType === 'model_version' && data.modelVersionId) {
      outputData.modelVersionId = data.modelVersionId;
    } else if (data.objectType === 'checkpoint' && data.checkpointId) {
      outputData.checkpointId = data.checkpointId;
    }

    // 设置推理结果集ID
    if (data.inferenceType === 'existing_data' && data.inferenceResultSetId) {
      outputData.inferenceResultSetId = data.inferenceResultSetId;
    }

    // 对比对象需要设置模型名称
    if (configMode === 'comparison' && modelName) {
      outputData.modelName = modelName.trim();
    }

    return outputData;
  }

  /**
   * 验证并保存数据
   * @param data 对象配置数据
   * @param configMode 配置模式
   * @param taskId 任务ID
   * @returns 验证结果
   */
  public validateAndSave(data: ObjectConfigData, configMode: ConfigMode, taskId?: string): {
    success: boolean;
    errors: string[];
    data?: ObjectConfigData;
  } {
    const errors: string[] = [];

    // 基础字段验证
    if (!this.validateObjectType(data.objectType)) {
      errors.push('对象类型无效');
    }

    if (!this.validateInferenceType(data.inferenceType)) {
      errors.push('推理类型无效');
    }

    // 对象特定字段验证
    if (data.objectType === 'model_version') {
      if (!data.modelVersionId?.trim()) {
        errors.push('请选择模型版本');
      }
    } else if (data.objectType === 'checkpoint') {
      if (!data.checkpointId?.trim()) {
        errors.push('请输入Checkpoint ID');
      } else if (data.checkpointId.length < 3) {
        errors.push('Checkpoint ID至少需要3个字符');
      }
    }

    // 推理结果集验证
    if (data.inferenceType === 'existing_data' && !data.inferenceResultSetId?.trim()) {
      errors.push('请选择推理结果集');
    }

    if (errors.length === 0) {
      const transformedData = this.transformInput(data, configMode);
      this.dataManager.setData(configMode, transformedData, taskId);
      return { success: true, errors: [], data: transformedData };
    }

    return { success: false, errors };
  }

  /**
   * 获取保存的数据
   * @param configMode 配置模式
   * @param taskId 任务ID
   * @returns 保存的数据
   */
  public getSavedData(configMode: ConfigMode, taskId?: string): ObjectConfigData | null {
    return this.dataManager.getData(configMode, taskId);
  }

  /**
   * 清除保存的数据
   * @param configMode 配置模式
   * @param taskId 任务ID
   */
  public clearSavedData(configMode: ConfigMode, taskId?: string): void {
    this.dataManager.clearData(configMode, taskId);
  }

  /**
   * 数据差异检测
   * @param oldData 旧数据
   * @param newData 新数据
   * @returns 是否有变化
   */
  public hasDataChanged(oldData?: ObjectConfigData | null, newData?: ObjectConfigData | null): boolean {
    if (!oldData && !newData) return false;
    if (!oldData || !newData) return true;

    return JSON.stringify(oldData) !== JSON.stringify(newData);
  }

  /**
   * 验证对象类型
   * @param objectType 对象类型
   * @returns 是否有效
   */
  private validateObjectType(objectType: any): objectType is 'model_version' | 'checkpoint' {
    return objectType === 'model_version' || objectType === 'checkpoint';
  }

  /**
   * 验证推理类型
   * @param inferenceType 推理类型
   * @returns 是否有效
   */
  private validateInferenceType(inferenceType: any): inferenceType is 'new_data' | 'existing_data' {
    return inferenceType === 'new_data' || inferenceType === 'existing_data';
  }
}

// 导出单例实例
export const objectDataTransformer = new ObjectDataTransformer();

/**
 * 数据唯一性保证工具函数
 */
export const DataUniquenessUtils = {
  /**
   * 生成对象配置的唯一标识符
   * @param data 对象配置数据
   * @returns 唯一标识符
   */
  generateUniqueId: (data: ObjectConfigData): string => {
    const parts = [data.objectType, data.inferenceType];
    
    if (data.objectType === 'model_version' && data.modelVersionId) {
      parts.push(`mv_${data.modelVersionId}`);
    } else if (data.objectType === 'checkpoint' && data.checkpointId) {
      parts.push(`cp_${data.checkpointId}`);
    }
    
    if (data.inferenceResultSetId) {
      parts.push(`rs_${data.inferenceResultSetId}`);
    }
    
    return parts.join('_');
  },

  /**
   * 检查两个配置是否冲突
   * @param config1 配置1
   * @param config2 配置2
   * @returns 是否冲突
   */
  hasConflict: (config1: ObjectConfigData, config2: ObjectConfigData): boolean => {
    const id1 = DataUniquenessUtils.generateUniqueId(config1);
    const id2 = DataUniquenessUtils.generateUniqueId(config2);
    return id1 === id2;
  },

  /**
   * 清理冲突数据
   * @param newData 新数据
   * @param existingData 现有数据列表
   * @returns 清理后的数据列表
   */
  resolveConflicts: (
    newData: ObjectConfigData, 
    existingData: ObjectConfigData[]
  ): ObjectConfigData[] => {
    const newId = DataUniquenessUtils.generateUniqueId(newData);
    return existingData.filter(data => {
      const existingId = DataUniquenessUtils.generateUniqueId(data);
      return existingId !== newId;
    });
  }
};
