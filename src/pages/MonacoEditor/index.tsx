/*
 * @creater: panan
 * @message: 
 * @since: 2025-03-07 15:26:36
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2025-04-15 23:29:54
 * @文件相对于项目的路径: /pan-umi/src/pages/MonacoEditor/index.tsx
 */

import React from 'react';
import BaseMonacoEditor from './BaseMonacoEditor';

const jsonData = {
  "name": "James",
  "age": 30,
  "waterType": 40,
  "grassType": 20,
  "fireType": 30,
  "lostWater": 8,
  "info": {
    "id": 18675,
    "model_folder_id": 52,
    "name": "law_sft_250402_deepseekdistil",
    "description": "law_sft_250402_deepseekdistil",
    "train_type": 2,
    "executor_type": 2,
    "status": "ERROR",
    "cluster_code": "csva2ai",
    "resource_pool": "nlp-sft-h100",
    "resource_pool_alias": "nlp-sft-h100",
    "deploy_model_id": null,
    "creator": "shaochenjie@myhexin.com",
    "create_time": "2025-04-02 19:13:01",
    "begin_time": "2025-04-02 19:18:51",
    "end_time": "2025-04-02 19:18:51",
    "creator_name": "邵陈杰",
    "deploy_model_version": null,
    "run_time": 0,
    "sum_resource": {
      "sum_node_count": 1,
      "sum_cpu_count": 16,
      "sum_memory_count": 64,
      "sum_gpu_count": 8
    },
    "model_folder_name": "法律意图模型",
    "exist_label": false,
    "train_labels": null,
    "train_datasets": null,
    "commit_url": "https://git-cc.myhexin.com:6443/10jqka/llm/aime-ai-llm/llm-general/-/commit/9b8ee0452f3fc5532a8c0d2d43e99b5faa96a92b",
    "spec": {
      "train_id": 18675,
      "image": "alvahub.hexin.cn:9081/hithink-gallery/llm:241101a",
      "framework": "PyTorchJob",
      "command": "cd /data/code/\ncd /data/workspace/shaochenjie/fazhi/llm-general\nsh run.sh config/law/config_law_intent.yaml",
      "priority": 7,
      "gpu_model": "H100",
      "disable_reclaim": true,
      "train_storage_path_id": 56295,
      "train_mount_path": "/mnt/workspace",
      "train_env_var": "",
      "error_msg": "[com.hexin.asset.market.facade.paas.tunnel.PaasTunnelUtil.exception(PaasTunnelUtil.java:297), com.hexin.asset.market.facade.paas.tunnel.PaasTunnelUtil.getForEntity(PaasTunnelUtil.java:116), com.hexin.asset.market.core.dataset.service.TaggingDatasetServiceImpl.datasetOrgList(TaggingDatasetServiceImpl.java:546), com.hexin.asset.market.core.train.service.TrainSpecServiceImpl.getOrgSampleInfo(TrainSpecServiceImpl.java:210), com.hexin.asset.market.core.train.service.TrainSpecServiceImpl.getByTrainId(TrainSpecServiceImpl.java:199), com.hexin.asset.market.core.train.service.TrainSpecServiceImpl$$FastClassBySpringCGLIB$$6debc867.invoke(<generated>), org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218), org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684), com.hexin.asset.market.core.train.service.TrainSpecServiceImpl$$EnhancerBySpringCGLIB$$815d6f6c.getByTrainId(<generated>), com.hexin.asset.market.core.train.service.TrainServiceImpl.getInfoById(TrainServiceImpl.java:196), com.hexin.asset.market.core.train.service.TrainServiceImpl$$FastClassBySpringCGLIB$$388a09a2.invoke(<generated>), org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218), org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:749), org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163), org.springframework.validation.beanvalidation.MethodValidationInterceptor.invoke(MethodValidationInterceptor.java:119), org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186), org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:688), com.hexin.asset.market.core.train.service.TrainServiceImpl$$EnhancerBySpringCGLIB$$76814ffd.getInfoById(<generated>), com.hexin.asset.market.core.train.service.TrainScheduleServiceImpl.execute(TrainScheduleServiceImpl.java:147), com.hexin.asset.market.core.workflow.service.WorkflowSchedulerServiceImpl.callBackExecute(WorkflowSchedulerServiceImpl.java:72), com.hexin.asset.market.core.workflow.service.WorkflowSchedulerServiceImpl.scheduleInstance(WorkflowSchedulerServiceImpl.java:61), java.util.ArrayList.forEach(ArrayList.java:1257), com.hexin.asset.market.core.workflow.service.WorkflowSchedulerServiceImpl.schedule(WorkflowSchedulerServiceImpl.java:46), com.hexin.asset.market.web.controller.workflow.WorkflowController.schedule(WorkflowController.java:58), com.hexin.asset.market.web.controller.workflow.WorkflowController$$FastClassBySpringCGLIB$$7d2474b.invoke(<generated>), org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218), org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:749), org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163), org.springframework.aop.framework.adapter.MethodBeforeAdviceInterceptor.invoke(MethodBeforeAdviceInterceptor.java:56), org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186), org.springframework.aop.interceptor.ExposeInvocationInterceptor.invoke(ExposeInvocationInterceptor.java:93), org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:186), org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:688), com.hexin.asset.market.web.controller.workflow.WorkflowController$$EnhancerBySpringCGLIB$$31bf8c79.schedule(<generated>), sun.reflect.GeneratedMethodAccessor2076.invoke(Unknown Source), sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43), java.lang.reflect.Method.invoke(Method.java:498), com.xxl.job.core.handler.impl.MethodJobHandler.execute(MethodJobHandler.java:29), com.xxl.job.core.thread.JobThread.run(JobThread.java:166)]",
      "code_info": {
        "gitlab_source": "git-cc",
        "repository": "https://git-cc.myhexin.com:6443/10jqka/llm/aime-ai-llm/llm-general.git",
        "branch": "law",
        "commit_id": "9b8ee0452f3fc5532a8c0d2d43e99b5faa96a92b",
        "commit_url": "https://git-cc.myhexin.com:6443/10jqka/llm/aime-ai-llm/llm-general/-/commit/9b8ee0452f3fc5532a8c0d2d43e99b5faa96a92b",
        "storage_path_id": 56296,
        "mount_path": "/data/code",
        "env_var": "",
        "workflow_instance_id": "104576099284561923"
      },
      "node_info": [
        {
          "node_type": "worker",
          "node_count": 1,
          "cpu": 16,
          "memory": 64,
          "gpu_count": 8,
          "share_memory": null
        }
      ],
      "base_model_info": null,
      "sample_info": [
        {
          "sample_folder_id": 751,
          "sample_id": 7921,
          "sample_copy_id": 9832,
          "mount_path": "/sft/data/",
          "env_var": ""
        }
      ],
      "org_sample_info": [],
      "sum_resource": {
        "sum_node_count": 1,
        "sum_cpu_count": 16,
        "sum_memory_count": 64,
        "sum_gpu_count": 8
      },
      "train_storage_path": {
        "id": 56295,
        "storage_id": 15,
        "path": "/train/52/18675/workspace",
        "sub_path": "/train/52/18675/workspace"
      },
      "share_info": [
        {
          "id": 20535,
          "train_id": 18675,
          "share_storage_id": 23,
          "share_storage_info": {
            "id": 23,
            "create_time": "2024-09-03 02:59:32",
            "update_time": "2024-09-03 16:10:36",
            "name": "弗吉尼亚二-人工智能-共享存储",
            "tenant_id": 14,
            "pro_code": "793",
            "mount_path": "/mnt/data/",
            "storage_path_id": 3484,
            "cluster_code": "csva2ai",
            "quota": 1073741824,
            "description": "弗吉尼亚二-人工智能-共享存储",
            "creator": null,
            "tenant_name": "iwc",
            "pro_name": "代码生成",
            "storage_id": 15,
            "filepath": "/sharestorage/iwc/share",
            "quota_show": "1 GB",
            "used_show": null,
            "creator_name": null
          },
          "mount_path": "/mnt/data",
          "env_var": ""
        },
        {
          "id": 20536,
          "train_id": 18675,
          "share_storage_id": 26,
          "share_storage_info": {
            "id": 26,
            "create_time": "2024-09-10 02:25:25",
            "update_time": "2024-09-10 15:36:45",
            "name": "kangming-standardSQL",
            "tenant_id": 14,
            "pro_code": "AI1-NLP-PD",
            "mount_path": "/mnt/data/",
            "storage_path_id": 3989,
            "cluster_code": "csva2ai",
            "quota": 16492674416640,
            "description": "AIME-大模型-standardSQL",
            "creator": "chenkangming@myhexin.com",
            "tenant_name": "iwc",
            "pro_name": "解析与对话算法组",
            "storage_id": 15,
            "filepath": "/sharestorage/iwc/data/",
            "quota_show": "15 TB",
            "used_show": null,
            "creator_name": "陈康明"
          },
          "mount_path": "/data/workspace",
          "env_var": ""
        }
      ],
      "advanced_setting": {
        "expose_metrics": null
      },
      "file_info": [
        {
          "path": "/data/config/config.yaml",
          "content": null
        }
      ]
    },
    "cluster_info": {
      "cluster_code": "csva2ai",
      "alias": "弗吉尼亚二-人工智能",
      "executor_type": 2,
      "resource_pools": null,
      "self_build": 1,
      "storage_id": 15
    },
    "resource_pool_info": null,
    "framework_info": {
      "name": "PyTorchJob",
      "node_types": [
        "worker"
      ]
    },
    "executor_detail": {},
    "train_workspace": {
      "id": 56295,
      "storage_id": 15,
      "path": "/train/52/18675/workspace",
      "sub_path": "/train/52/18675/workspace"
    }
  }
}

const oldJson = `[{"result": "James originally had 40 water type cards. After losing 8, he has 40 - 8 = 32 water type cards. After buying 14 grass type cards, he has 20 + 14 = 34 grass type cards. The total number of cards he has now is 30 fire type + 32 water type + 34 grass type = 96 cards. The percentage chance that a randomly picked card will be a water type is (32 / 96) * 100% = 33.33%. Rounding to the nearest integer gives 33%. The answer is 33.","a":"dcisv"}]`
const MonacoEditorPage: React.FC = () => {
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <BaseMonacoEditor
        mode="edit"
        defaultValue={JSON.stringify(jsonData, null, 2)}
        language="json"
        height="450px"
        readOnly
      />
      <BaseMonacoEditor
        mode="diff"
        language="json"
        height="450px"
        original={JSON.stringify(JSON.parse(oldJson), null, 2)}
        modified={JSON.stringify(jsonData, null, 2)}
      />
    </div>
  );
};

export default MonacoEditorPage;
