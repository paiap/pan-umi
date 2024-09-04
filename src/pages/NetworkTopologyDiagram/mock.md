# 网络拓扑图-可视化

## 节点、边的type定义：

```plain
节点 {
  normalHost: '正常主机',
  warnningHost: '警告主机',
  errorHost: '出错主机',
  normalSwitch: '正常交换机',
  warnningSwitch: '警告交换机',
  errorSwitch: '出错交换机',
}

边 {
  normal: '正常',
  warnning: '警告',
  error: '出错',
}
```


## 返回格式要求

**包含node（节点），edge（边）两个，**

* **每条数据里有一个唯一id和对应的type**
* **边或节点需要展示的内容信息，全部放到properties里**
* **边：source为起始节点id，target为指向目标节点id**

```plain
const data = {
  nodes: [
    {
      "type": 'normalHost',
      "id": "0",
      "properties": {
        "name": "主机1",
        ...
      }
    },
    {
      "type": 'warnningHost',
      "id": "1",
      "properties": {
        "name": "主机2"
      }
    },
    {
      "type": 'errorHost',
      "id": "2",
      "properties": {
        "name": "主机3"
      }
    },
    {
      "type": 'normalSwitch',
      "id": "3",
      "properties": {
        "name": "交换机1"
      }
    },
    {
      "type": 'warnningSwitch',
      "id": "4",
      "properties": {
        "name": "交换机2"
      }
    },
    {
      "type": 'errorSwitch',
      "id": "5",
      "properties": {
        "name": "交换机3"
      }
    },
  ],
  edges: [
    {
      "id": "e1",
      "type": 'normal',
      "source": "0",
      "target": "3",
      "properties":{
  
      }
    },
    {
      "id": "e2",
      "type": 'normal',
      "source": "0",
      "target": "4"
    },
    {
      "id": "e3",
      "type": 'error',
      "source": "1",
      "target": "4"
    },
    {
      "id": "e4",
      "type": 'error',
      "source": "1",
      "target": "5"
    },
    {
      "id": "e5",
      "type": 'warnning',
      "source": "2",
      "target": "3"
    },
    {
      "id": "e6",
      "type": 'warnning',
      "source": "2",
      "target": "5"
    },
  ]
}
```

## 展示效果

![](https://cdn.nlark.com/yuque/0/2024/png/35335363/1724902349223-c7b660d1-de44-47ec-a5be-82076d045c58.png)

![](https://cdn.nlark.com/yuque/0/2024/png/35335363/1724902330406-d9d4068c-14a7-4aa6-b015-c89df2fa6d35.png)
