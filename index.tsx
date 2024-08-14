myChart.showLoading();
$.get(ROOT_PATH + '/data/asset/data/energy.json', function (data) {
  console.log(data)
  myChart.hideLoading();
  myChart.setOption(
    (option = {
      title: {
        text: 'Sankey Diagram'
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series: [
        {
          type: 'sankey',
      data: [
{name: "coresite-纽约二-通用"},
{name: "equnix-纽约七-aivnest"},
{name: "equnix-纽约七-Dreamface"},
{name: "NVIDIA A10"},
{name: "NVIDIA A40"},
{name: "NVIDIA GeForce RTX 3090"},
{name: "NVIDIA GeForce RTX 4090"},
{name: "NVIDIA L20"},
{name: "Tesla T4"},
{name: "阿里云-北京-通用"},
{name: "待治理集群"},
{name: "待治理模型"},
{name: "待治理项目组"},
{name: "华为云-新加坡-通用"},
{name: "集群: AiFinD-2024"},
{name: "集群: AI-Incubator2024 智能工具"},
{name: "集群: AIME"},
{name: "集群: AINVEST-GROUP"},
{name: "集群: AI写代码"},
{name: "集群: B2B"},
{name: "集群: DA数据智能"},
{name: "集群: Dreamface"},
{name: "集群: 人工智能CLUB"},
{name: "集群: 数据中心"},
{name: "集群: 数字人"},
{name: "集群: 新B2C集群"},
{name: "模型: AIME大模型NLU-国内"},
{name: "模型: AIME大模型NLU-海外"},
{name: "模型:  AIME大模型-国内"},
{name: "模型: AIME大模型-海外"},
{name: "模型: AInvestNews原创文章写作"},
{name: "模型: DeepSeek-Coder-V2-16b-Instruct"},
{name: "模型: dreamface-海外业务"},
{name: "模型: HiPilot-16B-HiHarbor"},
{name: "模型: HithinkGPT-70B-Instruct"},
{name: "模型: HithinkGPT-Agent-70B"},
{name: "模型: HithinkGPT-Multi-Modal"},
{name: "模型: ifind研报写作"},
{name: "模型: ifind业绩点评模型"},
{name: "模型: photo-alive"},
{name: "模型: Qwen-72B-Instruct"},
{name: "模型: 接听宝大模型"},
{name: "模型: 客户运营大模型"},
{name: "模型: 其他"},
{name: "模型: 通用事件抽取大模型13B"},
{name: "模型: 研报智读"},
{name: "模型: 语音驱动人脸"},
{name: "同花顺-五常-CBAS"},
{name: "同花顺-五常-算力中心"},
{name: "同花顺-五常-通用"},
{name: "同花顺-五常-同信征信"},
{name: "武当云谷-丹江口-人工智能"},
{name: "项目组: AIGC社区"},
{name: "项目组: AIHR"},
{name: "项目组: AIME-多模态与虚拟人"},
{name: "项目组: AInvest-AIGC资讯"},
{name: "项目组: Ainvest-ALL"},
{name: "项目组: AI法律"},
{name: "项目组: AI协同通信"},
{name: "项目组: AI质检与安全合规"},
{name: "项目组: B2B信创"},
{name: "项目组: B2B智能应用组"},
{name: "项目组: B2C AI应用"},
{name: "项目组: Dreamface"},
{name: "项目组: Dreampic"},
{name: "项目组: F 10"},
{name: "项目组: P C"},
{name: "项目组: UI交互设计组"},
{name: "项目组: 北美融合创新与增长运营"},
{name: "项目组: 北美智能客服"},
{name: "项目组: 产品运营中台"},
{name: "项目组: 大语言模型基座"},
{name: "项目组: 代码生成组"},
{name: "项目组: 翻译与文本生成算法组"},
{name: "项目组: 高级应用"},
{name: "项目组: 工程测试与运维"},
{name: "项目组: 国内融合创新与增长运营"},
{name: "项目组: 海外业务"},
{name: "项目组: 基础服务-技术平台组"},
{name: "项目组: 基础功能-宏观行业"},
{name: "项目组: 基础功能-资讯"},
{name: "项目组: 基础支持"},
{name: "项目组: 结果页可视化与富媒体"},
{name: "项目组: 解析查数子项目"},
{name: "项目组: 金融取数子项目"},
{name: "项目组: 客服子项目"},
{name: "项目组: 快查"},
{name: "项目组: 企业库"},
{name: "项目组: 企业库爬虫"},
{name: "项目组: 社区"},
{name: "项目组: 事件驱动"},
{name: "项目组: 视觉组"},
{name: "项目组: 收费软件"},
{name: "项目组: 手 机"},
{name: "项目组: 书本逻辑推理"},
{name: "项目组: 数据智能"},
{name: "项目组: 数据中心整体"},
{name: "项目组: 数据抓取"},
{name: "项目组: 数字人短视频直播（2.5D&3D）"},
{name: "项目组: 搜索项目"},
{name: "项目组: 投 顾"},
{name: "项目组: 投教百科子项目"},
{name: "项目组: 图形图像视觉算法部"},
{name: "项目组: 图形组"},
{name: "项目组: 虚拟人应用"},
{name: "项目组: 虚拟永生"},
{name: "项目组: 一般应用-基金&理财"},
{name: "项目组: 舆情系统"},
{name: "项目组: 语音音频部"},
{name: "项目组: 智能效率工具"},
{name: "项目组: 智能中控子项目"},
{name: "项目组: 资 讯"},
{name: "优刻得-乌兰察布-人工智能"},
{name: "总成本"},
      ],
      links: [
{
source: "NVIDIA A10",
target: "阿里云-北京-通用",
value: 1.4
},
{
source: "NVIDIA L20",
target: "阿里云-北京-通用",
value: 20.9055
},
{
source: "NVIDIA GeForce RTX 4090",
target: "同花顺-五常-算力中心",
value: 2.0848
},
{
source: "NVIDIA GeForce RTX 3090",
target: "coresite-纽约二-通用",
value: 0.23
},
{
source: "NVIDIA A10",
target: "equnix-纽约七-aivnest",
value: 8.7742
},
{
source: "NVIDIA A10",
target: "同花顺-五常-CBAS",
value: 0.2236
},
{
source: "NVIDIA A10",
target: "武当云谷-丹江口-人工智能",
value: 6.7284
},
{
source: "NVIDIA GeForce RTX 3090",
target: "同花顺-五常-同信征信",
value: 0.1925
},
{
source: "NVIDIA GeForce RTX 3090",
target: "同花顺-五常-通用",
value: 7.6025
},
{
source: "NVIDIA A10",
target: "同花顺-五常-通用",
value: 10.7311
},
{
source: "NVIDIA A40",
target: "同花顺-五常-通用",
value: 0.4453
},
{
source: "NVIDIA A10",
target: "equnix-纽约七-Dreamface",
value: 4.3871
},
{
source: "NVIDIA A40",
target: "equnix-纽约七-Dreamface",
value: 2.0404
},
{
source: "NVIDIA A10",
target: "优刻得-乌兰察布-人工智能",
value: 29.9269
},
{
source: "NVIDIA GeForce RTX 3090",
target: "优刻得-乌兰察布-人工智能",
value: 0.7013
},
{
source: "NVIDIA GeForce RTX 4090",
target: "优刻得-乌兰察布-人工智能",
value: 0.4241
},
{
source: "Tesla T4",
target: "华为云-新加坡-通用",
value: 0.17
},
{
source: "equnix-纽约七-aivnest",
target: "总成本",
value: 8.7742
},
{
source: "equnix-纽约七-Dreamface",
target: "总成本",
value: 6.4275
},
{
source: "华为云-新加坡-通用",
target: "总成本",
value: 0.17
},
{
source: "同花顺-五常-算力中心",
target: "总成本",
value: 2.0848
},
{
source: "同花顺-五常-同信征信",
target: "总成本",
value: 0.1925
},
{
source: "同花顺-五常-CBAS",
target: "总成本",
value: 0.2236
},
{
source: "同花顺-五常-通用",
target: "总成本",
value: 18.7789
},
{
source: "武当云谷-丹江口-人工智能",
target: "总成本",
value: 6.7284
},
{
source: "优刻得-乌兰察布-人工智能",
target: "总成本",
value: 31.0523
},
{
source: "阿里云-北京-通用",
target: "总成本",
value: 22.3055
},
{
source: "coresite-纽约二-通用",
target: "总成本",
value: 0.23
},
{
source: "总成本",
target: "待治理模型",
value: 18.1811
},
{
source: "总成本",
target: "模型:  AIME大模型-国内",
value: 20.1194
},
{
source: "总成本",
target: "模型: 客户运营大模型",
value: 7.5386
},
{
source: "总成本",
target: "模型: AIME大模型NLU-国内",
value: 7.2587
},
{
source: "总成本",
target: "模型: 研报智读",
value: 3.2527
},
{
source: "总成本",
target: "模型: photo-alive",
value: 2.987
},
{
source: "总成本",
target: "模型: AIME大模型-海外",
value: 2.7801
},
{
source: "总成本",
target: "模型: dreamface-海外业务",
value: 2.3764
},
{
source: "总成本",
target: "模型: ifind研报写作",
value: 2.3655
},
{
source: "总成本",
target: "模型: ifind业绩点评模型",
value: 1.5952
},
{
source: "总成本",
target: "模型: HiPilot-16B-HiHarbor",
value: 1.5897
},
{
source: "总成本",
target: "模型: HithinkGPT-70B-Instruct",
value: 1.4243
},
{
source: "总成本",
target: "模型: 通用事件抽取大模型13B",
value: 1.2566
},
{
source: "总成本",
target: "模型: HithinkGPT-Agent-70B",
value: 1.1066
},
{
source: "总成本",
target: "模型: AInvestNews原创文章写作",
value: 0.9929
},
{
source: "总成本",
target: "模型: Qwen-72B-Instruct",
value: 0.9906
},
{
source: "总成本",
target: "模型: HithinkGPT-Multi-Modal",
value: 0.9623
},
{
source: "总成本",
target: "模型: 接听宝大模型",
value: 0.9249
},
{
source: "总成本",
target: "模型: DeepSeek-Coder-V2-16b-Instruct",
value: 0.8865
},
{
source: "总成本",
target: "模型: AIME大模型NLU-海外",
value: 0.8452
},
{
source: "总成本",
target: "模型: 语音驱动人脸",
value: 0.8392
},
{
source: "总成本",
target: "模型: 其他",
value: 16.5244
},
{
source: "模型: 其他",
target: "项目组: 社区",
value: 0
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0125
},
{
source: "模型: Qwen-72B-Instruct",
target: "待治理项目组",
value: 0.9906
},
{
source: "模型: 语音驱动人脸",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.2098
},
{
source: "模型: 语音驱动人脸",
target: "项目组: 结果页可视化与富媒体",
value: 0.2098
},
{
source: "模型: 语音驱动人脸",
target: "项目组: 翻译与文本生成算法组",
value: 0.2098
},
{
source: "模型: 语音驱动人脸",
target: "项目组: Dreamface",
value: 0.2098
},
{
source: "模型: 客户运营大模型",
target: "项目组: 北美融合创新与增长运营",
value: 1.1256
},
{
source: "模型: 客户运营大模型",
target: "项目组: 国内融合创新与增长运营",
value: 6.413
},
{
source: "模型: ifind研报写作",
target: "项目组: 高级应用",
value: 2.3655
},
{
source: "模型: 通用事件抽取大模型13B",
target: "项目组: 事件驱动",
value: 1.2566
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0166
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0616
},
{
source: "模型: HiPilot-16B-HiHarbor",
target: "项目组: 代码生成组",
value: 0.9915
},
{
source: "模型: HiPilot-16B-HiHarbor",
target: "项目组: 基础功能-宏观行业",
value: 0.5982
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.0884
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0221
},
{
source: "模型: 其他",
target: "项目组: 投教百科子项目",
value: 0.0471
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 金融取数子项目",
value: 0.0471
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.1076
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.0276
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.4327
},
{
source: "模型: 其他",
target: "项目组: AI协同通信",
value: 0.0139
},
{
source: "模型: 其他",
target: "项目组: Dreamface",
value: 0.126
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.1002
},
{
source: "模型: 接听宝大模型",
target: "项目组: 金融取数子项目",
value: 0.9249
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.2818
},
{
source: "模型: 其他",
target: "项目组: 搜索项目",
value: 0.0662
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.1543
},
{
source: "模型: 其他",
target: "项目组: 虚拟永生",
value: 0.0485
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.2482
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.102
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0442
},
{
source: "模型: 其他",
target: "项目组: AI质检与安全合规",
value: 0.4979
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.011
},
{
source: "模型: 其他",
target: "项目组: 投 顾",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 数据抓取",
value: 0.0883
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0331
},
{
source: "模型: 其他",
target: "项目组: 社区",
value: 0.0355
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.3403
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0609
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.1868
},
{
source: "模型: 其他",
target: "项目组: 基础功能-宏观行业",
value: 0.3988
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0221
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0386
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.1543
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0497
},
{
source: "模型: AIME大模型-海外",
target: "项目组: 金融取数子项目",
value: 0.8441
},
{
source: "模型: AIME大模型-海外",
target: "项目组: 客服子项目",
value: 0.8441
},
{
source: "模型: AIME大模型-海外",
target: "项目组: 投教百科子项目",
value: 0.8441
},
{
source: "模型: AIME大模型-海外",
target: "项目组: 资 讯",
value: 0.2478
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0221
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.1294
},
{
source: "模型: 其他",
target: "项目组: 虚拟永生",
value: 0.0266
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.0997
},
{
source: "模型: 其他",
target: "项目组: Dreamface",
value: 0.0623
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0623
},
{
source: "模型: 其他",
target: "项目组: 翻译与文本生成算法组",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 虚拟人应用",
value: 0.0875
},
{
source: "模型: 其他",
target: "项目组: F 10",
value: 0.0875
},
{
source: "模型: 其他",
target: "项目组: UI交互设计组",
value: 0.2991
},
{
source: "模型: 其他",
target: "项目组: 手 机",
value: 0.0875
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.2249
},
{
source: "模型: AIME大模型NLU-海外",
target: "项目组: 智能中控子项目",
value: 0.4226
},
{
source: "模型: AIME大模型NLU-海外",
target: "项目组: 解析查数子项目",
value: 0.4226
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.0884
},
{
source: "模型: 其他",
target: "项目组: 图形组",
value: 0.0662
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0125
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.1437
},
{
source: "模型: 其他",
target: "项目组: AIGC社区",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: Ainvest-ALL",
value: 0.1409
},
{
source: "模型: 其他",
target: "项目组: AI协同通信",
value: 0.0139
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.1739
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0662
},
{
source: "模型: 其他",
target: "项目组: 工程测试与运维",
value: 0.4472
},
{
source: "模型: 其他",
target: "项目组: 收费软件",
value: 0.0067
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0067
},
{
source: "模型: 其他",
target: "项目组: 智能效率工具",
value: 0.1495
},
{
source: "模型:  AIME大模型-国内",
target: "项目组: AI质检与安全合规",
value: 0.4959
},
{
source: "模型:  AIME大模型-国内",
target: "项目组: 客服子项目",
value: 6.5412
},
{
source: "模型:  AIME大模型-国内",
target: "项目组: 投教百科子项目",
value: 6.5412
},
{
source: "模型:  AIME大模型-国内",
target: "项目组: 金融取数子项目",
value: 6.5412
},
{
source: "模型: 其他",
target: "项目组: Dreamface",
value: 0.1625
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.1993
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0662
},
{
source: "模型: 其他",
target: "项目组: 智能效率工具",
value: 0.0332
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: AIME大模型NLU-国内",
target: "项目组: 智能中控子项目",
value: 3.6294
},
{
source: "模型: AIME大模型NLU-国内",
target: "项目组: 解析查数子项目",
value: 3.6294
},
{
source: "模型: 其他",
target: "项目组: 社区",
value: 0.1101
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0
},
{
source: "模型: 研报智读",
target: "项目组: 高级应用",
value: 3.1438
},
{
source: "模型: 研报智读",
target: "待治理项目组",
value: 0.1088
},
{
source: "模型: 其他",
target: "项目组: B2C AI应用",
value: 0.0805
},
{
source: "模型: 其他",
target: "项目组: UI交互设计组",
value: 0.3424
},
{
source: "模型: 其他",
target: "项目组: 产品运营中台",
value: 0.1193
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.1215
},
{
source: "模型: 其他",
target: "项目组: AIHR",
value: 0.1418
},
{
source: "模型: 其他",
target: "项目组: AI法律",
value: 0.2477
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0441
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0442
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.0165
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0007
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0696
},
{
source: "模型: DeepSeek-Coder-V2-16b-Instruct",
target: "项目组: 搜索项目",
value: 0.8865
},
{
source: "模型: ifind业绩点评模型",
target: "项目组: 高级应用",
value: 1.5952
},
{
source: "模型: 其他",
target: "项目组: AIHR",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 北美智能客服",
value: 0.0887
},
{
source: "模型: 其他",
target: "项目组: 智能中控子项目",
value: 0.0263
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0263
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0552
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0478
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0177
},
{
source: "待治理模型",
target: "项目组: 社区",
value: 0.196
},
{
source: "待治理模型",
target: "项目组: 一般应用-基金&理财",
value: 0.2095
},
{
source: "待治理模型",
target: "项目组: 北美智能客服",
value: 0
},
{
source: "待治理模型",
target: "项目组: 基础功能-资讯",
value: 1.838
},
{
source: "待治理模型",
target: "项目组: 数据智能",
value: 0.0828
},
{
source: "待治理模型",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0544
},
{
source: "待治理模型",
target: "项目组: 数据中心整体",
value: 0.0559
},
{
source: "待治理模型",
target: "项目组: AIHR",
value: 0.1433
},
{
source: "待治理模型",
target: "项目组: AI法律",
value: 0.5296
},
{
source: "待治理模型",
target: "项目组: 企业库",
value: 0.1125
},
{
source: "待治理模型",
target: "项目组: 客服子项目",
value: 0
},
{
source: "待治理模型",
target: "项目组: 高级应用",
value: 0.6425
},
{
source: "待治理模型",
target: "项目组: 书本逻辑推理",
value: 0.0441
},
{
source: "待治理模型",
target: "项目组: 国内融合创新与增长运营",
value: 0.1446
},
{
source: "待治理模型",
target: "项目组: 翻译与文本生成算法组",
value: 0.12
},
{
source: "待治理模型",
target: "项目组: 舆情系统",
value: 0.0773
},
{
source: "待治理模型",
target: "项目组: AI质检与安全合规",
value: 0.2427
},
{
source: "待治理模型",
target: "项目组: Dreampic",
value: 0.3637
},
{
source: "待治理模型",
target: "项目组: 大语言模型基座",
value: 0.7705
},
{
source: "待治理模型",
target: "项目组: 搜索项目",
value: 0.7411
},
{
source: "待治理模型",
target: "项目组: 金融取数子项目",
value: 0
},
{
source: "待治理模型",
target: "项目组: 资 讯",
value: 0.0774
},
{
source: "待治理模型",
target: "项目组: Dreamface",
value: 0.3782
},
{
source: "待治理模型",
target: "项目组: 快查",
value: 0.4964
},
{
source: "待治理模型",
target: "项目组: 投教百科子项目",
value: 0
},
{
source: "待治理模型",
target: "项目组: 海外业务",
value: 0.3422
},
{
source: "待治理模型",
target: "待治理项目组",
value: 7.8211
},
{
source: "待治理模型",
target: "项目组: Ainvest-ALL",
value: 0.0704
},
{
source: "待治理模型",
target: "项目组: B2B智能应用组",
value: 0.0276
},
{
source: "待治理模型",
target: "项目组: 数据抓取",
value: 2.0039
},
{
source: "待治理模型",
target: "项目组: AInvest-AIGC资讯",
value: 0.0704
},
{
source: "待治理模型",
target: "项目组: 图形图像视觉算法部",
value: 0.0221
},
{
source: "待治理模型",
target: "项目组: 智能效率工具",
value: 0.3374
},
{
source: "待治理模型",
target: "项目组: 解析查数子项目",
value: 0.1656
},
{
source: "模型: 其他",
target: "项目组: 投 顾",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 搜索项目",
value: 0.0434
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 基础功能-资讯",
value: 0.0709
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0709
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0221
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: AI协同通信",
value: 0.0139
},
{
source: "模型: 其他",
target: "项目组: AI协同通信",
value: 0.0266
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0266
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.0276
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 搜索项目",
value: 0.0441
},
{
source: "模型: HithinkGPT-Multi-Modal",
target: "项目组: AIME-多模态与虚拟人",
value: 0.9623
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0125
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: photo-alive",
target: "项目组: 翻译与文本生成算法组",
value: 0.009
},
{
source: "模型: photo-alive",
target: "待治理项目组",
value: 0
},
{
source: "模型: photo-alive",
target: "项目组: Dreamface",
value: 2.9449
},
{
source: "模型: photo-alive",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0331
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.1768
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0133
},
{
source: "模型: 其他",
target: "项目组: 智能效率工具",
value: 0.0663
},
{
source: "模型: 其他",
target: "项目组: 智能效率工具",
value: 0.0221
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0125
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0094
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.2739
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0166
},
{
source: "模型: 其他",
target: "项目组: 工程测试与运维",
value: 0.2446
},
{
source: "模型: 其他",
target: "项目组: 数据智能",
value: 0.011
},
{
source: "模型: 其他",
target: "项目组: 基础支持",
value: 0.011
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0165
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0443
},
{
source: "模型: 其他",
target: "项目组: 搜索项目",
value: 0.0636
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.1545
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.1104
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.1178
},
{
source: "模型: AInvestNews原创文章写作",
target: "项目组: 基础功能-资讯",
value: 0.9929
},
{
source: "模型: 其他",
target: "项目组: 基础功能-资讯",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.2676
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0125
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.1468
},
{
source: "模型: 其他",
target: "项目组: AInvest-AIGC资讯",
value: 0.0662
},
{
source: "模型: 其他",
target: "项目组: Ainvest-ALL",
value: 0.0662
},
{
source: "模型: dreamface-海外业务",
target: "项目组: Dreamface",
value: 2.3068
},
{
source: "模型: dreamface-海外业务",
target: "项目组: Dreampic",
value: 0
},
{
source: "模型: dreamface-海外业务",
target: "项目组: 语音音频部",
value: 0.0696
},
{
source: "模型: 其他",
target: "项目组: Dreamface",
value: 0.0954
},
{
source: "模型: 其他",
target: "项目组: 智能效率工具",
value: 0.0441
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0997
},
{
source: "模型: 其他",
target: "项目组: Dreamface",
value: 0.2031
},
{
source: "模型: 其他",
target: "项目组: Dreamface",
value: 0.1354
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0386
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0575
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0083
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.3537
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.0276
},
{
source: "模型: 其他",
target: "项目组: AI协同通信",
value: 0.0139
},
{
source: "模型: 其他",
target: "项目组: B2C AI应用",
value: 0.0684
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.011
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0007
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0251
},
{
source: "模型: HithinkGPT-70B-Instruct",
target: "项目组: 大语言模型基座",
value: 1.4243
},
{
source: "模型: 其他",
target: "项目组: 数据智能",
value: 0.0165
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0353
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0125
},
{
source: "模型: 其他",
target: "项目组: 语音音频部",
value: 0.0007
},
{
source: "模型: 其他",
target: "项目组: 资 讯",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: P C",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 图形组",
value: 0.0165
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 代码生成组",
value: 0.0829
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.011
},
{
source: "模型: 其他",
target: "项目组: 基础功能-资讯",
value: 0.1491
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0165
},
{
source: "模型: 其他",
target: "项目组: 虚拟永生",
value: 0.0177
},
{
source: "模型: 其他",
target: "项目组: AInvest-AIGC资讯",
value: 0.02
},
{
source: "模型: 其他",
target: "项目组: 基础服务-技术平台组",
value: 0.0164
},
{
source: "模型: 其他",
target: "项目组: 收费软件",
value: 0.0164
},
{
source: "模型: 其他",
target: "项目组: 视觉组",
value: 0.0552
},
{
source: "模型: 其他",
target: "项目组: Ainvest-ALL",
value: 0.0164
},
{
source: "模型: 其他",
target: "项目组: AI协同通信",
value: 0.0139
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.0442
},
{
source: "模型: 其他",
target: "项目组: 高级应用",
value: 0.1994
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0166
},
{
source: "模型: 其他",
target: "项目组: 数字人短视频直播（2.5D&3D）",
value: 0.0443
},
{
source: "模型: 其他",
target: "项目组: 解析查数子项目",
value: 0.0088
},
{
source: "模型: 其他",
target: "项目组: 产品运营中台",
value: 0.2387
},
{
source: "模型: 其他",
target: "项目组: 企业库爬虫",
value: 0.0221
},
{
source: "模型: 其他",
target: "项目组: 数据抓取",
value: 0.0748
},
{
source: "模型: 其他",
target: "待治理项目组",
value: 0.492
},
{
source: "模型: HithinkGPT-Agent-70B",
target: "待治理项目组",
value: 1.1066
},
{
source: "模型: 其他",
target: "项目组: B2B信创",
value: 0.248
},
{
source: "模型: 其他",
target: "项目组: 大语言模型基座",
value: 0.2648
},
{
source: "项目组: 书本逻辑推理",
target: "集群: AIME",
value: 0.0441
},
{
source: "项目组: 大语言模型基座",
target: "集群: AIME",
value: 2.4596
},
{
source: "项目组: AI质检与安全合规",
target: "集群: AIME",
value: 1.2365
},
{
source: "项目组: 快查",
target: "集群: DA数据智能",
value: 0.4964
},
{
source: "项目组: 智能中控子项目",
target: "集群: AIME",
value: 4.0782
},
{
source: "项目组: 解析查数子项目",
target: "集群: AIME",
value: 4.8602
},
{
source: "项目组: 企业库爬虫",
target: "集群: 数据中心",
value: 0.2759
},
{
source: "项目组: 国内融合创新与增长运营",
target: "集群: AIME",
value: 6.5576
},
{
source: "项目组: 数字人短视频直播（2.5D&3D）",
target: "集群: 数字人",
value: 1.1637
},
{
source: "待治理项目组",
target: "待治理集群",
value: 11.3172
},
{
source: "项目组: 客服子项目",
target: "集群: AIME",
value: 7.3853
},
{
source: "项目组: 手 机",
target: "集群: 新B2C集群",
value: 0.0875
},
{
source: "项目组: 翻译与文本生成算法组",
target: "集群: 人工智能CLUB",
value: 0.5382
},
{
source: "项目组: Ainvest-ALL",
target: "集群: AINVEST-GROUP",
value: 0.2939
},
{
source: "项目组: 代码生成组",
target: "集群: AI写代码",
value: 2.8616
},
{
source: "项目组: 基础功能-宏观行业",
target: "集群: AiFinD-2024",
value: 0.997
},
{
source: "项目组: 投 顾",
target: "集群: 新B2C集群",
value: 0.3988
},
{
source: "项目组: 图形图像视觉算法部",
target: "集群: 人工智能CLUB",
value: 0.0221
},
{
source: "项目组: 图形组",
target: "集群: 人工智能CLUB",
value: 0.0828
},
{
source: "项目组: 基础服务-技术平台组",
target: "集群: AiFinD-2024",
value: 0.0164
},
{
source: "项目组: 工程测试与运维",
target: "集群: AIME",
value: 0.6918
},
{
source: "项目组: 数据智能",
target: "集群: DA数据智能",
value: 0.1104
},
{
source: "项目组: 舆情系统",
target: "集群: DA数据智能",
value: 0.0773
},
{
source: "项目组: AIHR",
target: "集群: AI-Incubator2024 智能工具",
value: 0.4845
},
{
source: "项目组: AI法律",
target: "集群: DA数据智能",
value: 0.7773
},
{
source: "项目组: 结果页可视化与富媒体",
target: "集群: AIME",
value: 0.2098
},
{
source: "项目组: 虚拟人应用",
target: "集群: 新B2C集群",
value: 0.0875
},
{
source: "项目组: P C",
target: "集群: 新B2C集群",
value: 0.1994
},
{
source: "项目组: 事件驱动",
target: "集群: AIME",
value: 1.2566
},
{
source: "项目组: 基础支持",
target: "集群: DA数据智能",
value: 0.011
},
{
source: "项目组: 资 讯",
target: "集群: 新B2C集群",
value: 1.6281
},
{
source: "项目组: AIGC社区",
target: "集群: 新B2C集群",
value: 0.1994
},
{
source: "项目组: Dreampic",
target: "集群: Dreamface",
value: 0.3637
},
{
source: "项目组: 数据中心整体",
target: "集群: 数据中心",
value: 0.0559
},
{
source: "项目组: 社区",
target: "集群: 新B2C集群",
value: 0.3416
},
{
source: "项目组: AIME-多模态与虚拟人",
target: "集群: AIME",
value: 0.9623
},
{
source: "项目组: Dreamface",
target: "集群: Dreamface",
value: 6.6243
},
{
source: "项目组: 投教百科子项目",
target: "集群: AIME",
value: 7.4324
},
{
source: "项目组: 收费软件",
target: "集群: 新B2C集群",
value: 0.0231
},
{
source: "项目组: B2B信创",
target: "集群: B2B",
value: 0.248
},
{
source: "项目组: 一般应用-基金&理财",
target: "集群: AiFinD-2024",
value: 0.2095
},
{
source: "项目组: 产品运营中台",
target: "集群: 新B2C集群",
value: 0.3579
},
{
source: "项目组: 北美融合创新与增长运营",
target: "集群: AIME",
value: 1.1256
},
{
source: "项目组: 基础功能-资讯",
target: "集群: AiFinD-2024",
value: 3.2503
},
{
source: "项目组: AI协同通信",
target: "集群: AI-Incubator2024 智能工具",
value: 0.0961
},
{
source: "项目组: B2C AI应用",
target: "集群: 新B2C集群",
value: 0.1488
},
{
source: "项目组: 北美智能客服",
target: "集群: AINVEST-GROUP",
value: 0.0887
},
{
source: "项目组: 数据抓取",
target: "集群: 数据中心",
value: 2.167
},
{
source: "项目组: 智能效率工具",
target: "集群: AI-Incubator2024 智能工具",
value: 0.6525
},
{
source: "项目组: 海外业务",
target: "集群: AiFinD-2024",
value: 0.3422
},
{
source: "项目组: 视觉组",
target: "集群: 人工智能CLUB",
value: 0.2239
},
{
source: "项目组: F 10",
target: "集群: 新B2C集群",
value: 0.0875
},
{
source: "项目组: UI交互设计组",
target: "集群: AiFinD-2024",
value: 0.6415
},
{
source: "项目组: 语音音频部",
target: "集群: 人工智能CLUB",
value: 0.9774
},
{
source: "项目组: 搜索项目",
target: "集群: AIME",
value: 1.8448
},
{
source: "项目组: 虚拟永生",
target: "集群: 数字人",
value: 0.0929
},
{
source: "项目组: 金融取数子项目",
target: "集群: AIME",
value: 8.3573
},
{
source: "项目组: AInvest-AIGC资讯",
target: "集群: AINVEST-GROUP",
value: 0.1566
},
{
source: "项目组: B2B智能应用组",
target: "集群: B2B",
value: 0.0276
},
{
source: "项目组: 企业库",
target: "集群: DA数据智能",
value: 0.1125
},
{
source: "项目组: 高级应用",
target: "集群: AiFinD-2024",
value: 8.8798
}
      ],
          emphasis: {
            focus: 'adjacency'
          },
          lineStyle: {
            color: 'gradient',
            curveness: 0.5
          }
        }
      ]
    })
  );
});