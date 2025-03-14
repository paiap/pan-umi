// 查询标签
// GET /label/tree?business=4

export const getMockData = [
  {
    "id": 93,
    "name": "Data Engineering",
    "business": 4,
    "parent_id": 0,
    "disabled": true,
    "children": [
      {
        "id": 94,
        "name": "Data Augmentation",
        "business": 4,
        "parent_id": 93,
        "disabled": false,
        "children": []
      },
      {
        "id": 95,
        "name": "Data Curation",
        "business": 4,
        "parent_id": 93,
        "disabled": false,
        "children": []
      },
      {
        "id": 96,
        "name": "Data deduplication",
        "business": 4,
        "parent_id": 93,
        "disabled": false,
        "children": []
      }
    ],
  },
]

// 保存任务标签配置信息
// POST /train/label/save
// {
//     "train_id": 100,
//     "dataset_id": 123,
//     "detail": "string",
//     "label": {
//         "inference": {
//             "top-k": "",
//             "top-p": ""
//         },
//         "data_engineering": {
//             "data augmentation": "",
//             "rejection sampling": ""
//         },
//         "prompt_engineering": {
//             "rag": "",
//             "in-context learning": ""
//         }
//     }
// }


// 任务id查询标签配置
export const findTagSettingData = {
  "train_id": 100,
  "label": {
    "Data Engineering": {
      "Data Augmentation": "111",
      "Data Curation": "222",
      "Data deduplication": "333"
    }
  },
  "detail": "string",
  "dataset_id": 123,
  "creator": "zhouziyang@myhexin.com",
  "editor": "zhouziyang@myhexin.com",
  "content": null
}