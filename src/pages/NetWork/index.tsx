import React, { FC, useState, useEffect, useRef } from 'react'
import G6, { ExtensionCategory, Graph, NodeEvent, EdgeEvent, Cubic, register } from '@antv/g6';
import { mock } from './mock'
import { createRoot } from 'react-dom/client';
import normalHost from '@/assets/正常主机.png'
import warnningHost from '@/assets/告警主机.png'
import errorHost from '@/assets/异常主机.png'
import normalSwitch from '@/assets/交换机-正常.png'
import warnningSwitch from '@/assets/交换机-警告.png'
import errorSwitch from '@/assets/交换机-出错.png'
import TooltipDetail from './TooltipDetail';
import { Button, Spin } from 'antd';

const networkMap = {
  "存储网络": '#EEDEB6',
  "数据/PAAS网络": '#C0AF81',
  "出口网络": '#B7BED2',
  "带外管理网络": '#B6E800',
  "计算机网络": '#D6C3E1',
  "监控网络": '#EEDEB6',
  "服务器": '#EEDEB6'
}

export const nodeMap = {
  normalHost: '正常',
  warnningHost: '警告',
  errorHost: '出错',
  normalSwitch: '正常',
  warnningSwitch: '警告',
  errorSwitch: '出错',
  normal: '正常',
  warnning: '警告',
  error: '出错',
}

export const colorMap = {
  normalHost: 'green',
  warnningHost: '#f0a30a',
  errorHost: 'red',
  normalSwitch: 'green',
  warnningSwitch: '#f0a30a',
  errorSwitch: 'red',
  normal: 'green',
  warnning: '#f0a30a',
  error: 'red',
}

export const edgeNameMap = {
  normal: '',
  warnning: '告警',
  error: '出错',
}

export const nameMap = {
  normalHost: '主机',
  warnningHost: '主机',
  errorHost: '主机',
  normalSwitch: '交换机',
  warnningSwitch: '交换机',
  errorSwitch: '交换机',
  normal: '边',
  warnning: '边',
  error: '边',
}

class AntLine extends Cubic {
  onCreate() {
    const shape = this.shapeMap.key;
    shape.animate([{ lineDashOffset: + 100 }, { lineDashOffset: 0 }], {
      duration: 5000,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'ant-line', AntLine);

interface Props {
  [key: string]: any
}

const outDiv = document.createElement('div');
let root: any = null;


const Network: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const mountNodeRef = useRef<any>(null)

  useEffect(() => {
    const container = document.getElementById('NetworkTopologyDiagram2');
    if (!container) return
    const width = container.offsetWidth;
    const height = window.innerHeight - 100;
    console.log(width, height)

    setLoading(true)

    if (mountNodeRef.current) {
      setTimeout(() => {
        setLoading(false);
        mountNodeRef.current.updateData(mock)
        mountNodeRef.current.render()
      }, 2000)
      return
    }

    const graph = new Graph({
      // div的dom节点
      container: 'NetworkTopologyDiagram2',
      // 数据源
      data: mock,
      // 宽度
      width: width,
      // 高度
      height: height,
      // 动画
      // animation: false,
      // 是否自动适应
      // autoFit: 'center',
      // 主题
      // theme:'dark',
      layout: {
        type: 'combo-combined',
        comboPadding: 2,
        nodeSize: 40,
        center: [0, 0],
        innerLayout: {
          type: 'grid'
        },
        // linkDistance: 700,//边长度
        // maxIteration: 1000,//停止迭代到最大迭代数
        // preventOverlap: true,//开启防止重叠
      },
      transforms: [
        {
          key: 'process-parallel-edges',
          type: 'ant-line',
        }
      ],//处理平行边
      combo: {
        type: 'rect',
        style: (data: any) => {
          const name = data?.data.label
          const color = networkMap[data?.data.label as keyof typeof networkMap]
          return {
            radius: 10,
            // collapsedLineDash: [5, 5],
            lineDash: [15, 5],
            labelText: name,
            stroke: color,
            fill: color,
            lineWidth: 2,
          }
        },
        state: {
          inactive: {
            fillOpacity: 0.5,
          },
          disabled: {
            fillOpacity: 0.2,
          }
        }
      },
      node: {
        // 边类型
        type: 'image',
        palette: {
          type: 'group',
          field: (d: any) => d.combo,
        },
        // 渲染样式
        style: (data: any) => {
          const baseStyle = {
            size: nameMap[data?.type as keyof typeof nameMap] === '主机' ? 45 : 25,
            labelText: data?.properties?.name,
            // + ': ' + nodeMap[data?.type as keyof typeof nodeMap]
            labelFill: colorMap[data?.type as keyof typeof colorMap],
          };
          switch (data.type) {
            case 'normalHost':
              return { ...baseStyle, src: normalHost };
            case 'warnningHost':
              return { ...baseStyle, src: warnningHost };
            case 'errorHost':
              return { ...baseStyle, src: errorHost };
            case 'normalSwitch':
              return { ...baseStyle, src: normalSwitch };
            case 'warnningSwitch':
              return { ...baseStyle, src: warnningSwitch };
            default:
              return { ...baseStyle, src: errorSwitch };
          }
        },
        // 初始值
        state: {
          inactive: {
            fillOpacity: 0.5,
          },
          disabled: {
            fillOpacity: 0.2,
          },
        },
      },
      edge: {
        // type: 'ant-line',
        style: (data: any) => {
          const baseStyle = {
            lineDash: [10, 4],
            lineWidth: 1,
            labelBackground: true,
            labelBackgroundFill: '#ccc',
            // endArrow: true,
            labelText: edgeNameMap[data?.status as keyof typeof edgeNameMap],
            labelFill: colorMap[data?.status as keyof typeof colorMap],
          };
          switch (data.status) {
            case 'normal':
              return { ...baseStyle, stroke: '#03C300' };
            case 'error':
              return { ...baseStyle, stroke: 'red' };
            case 'warnning':
              return { ...baseStyle, stroke: '#f0a30a' };
            default:
              return { ...baseStyle, stroke: '#e0e0e0' };
          }
        },
      },
      // 插件
      plugins: [
        {
          type: "minimap"
        },
        {
          key: 'tooltip',
          type: 'tooltip',
          trigger: 'click',//默认为hover
          enterable: true,//指针是否可进入
          // showDelay: 60,//指定延迟显示的毫秒数，默认为 60ms
          style: {
            '.tooltip': {
              padding: 0,
            },
          },
          enable: (e: any) => e.targetType === 'node' || e.targetType === 'edge' || e.targetType === 'canvas',
          contentKey: 'tooltips',
          getContent: (e: any, items: any) => {
            const targetType = e?.targetType
            const item = items?.[0];
            const name = nameMap[item?.type as keyof typeof nameMap] || nameMap[item?.status as keyof typeof nameMap]
            const status = nodeMap[item?.type as keyof typeof nodeMap]
            if (!root) {
              root = createRoot(outDiv);
            }
            // 挂载弹窗组件，需要区分节点类型和边类型
            root.render(<TooltipDetail item={item} graph={graph} targetType={targetType} name={name} status={status} />)
            return outDiv;
          },
        },
        {
          key: 'background',
          type: 'background',
          width: width + 'px',
          height: height + 'px',
          backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          opacity: 0.2,
        },
      ],
      behaviors: [
        'drag-element',
        'drag-canvas',
        'zoom-canvas',
        {
          key: 'hover-activate',
          type: 'hover-activate',
          degree: 1,
        },
      ],
    });
    mountNodeRef.current = graph
    graph.render();

    setTimeout(() => {
      setLoading(false);
      graph.fitView();
    }, 2000)

    // graph.on(NodeEvent.POINTER_UP, (e: any) => {
    //   const { id, style } = e?.target?.config || {}
    //   const { x, y } = style || {}
    //   if (!id || !x || !y) return
    //   const [oldX, oldY] = graph.getViewportCenter()
    //   graph.translateBy([oldX - x, oldY - y])
    // })

    // graph.on(EdgeEvent.POINTER_UP, (e: any) => {
    //   console.log(e)
    //   const { id } = e?.target?.config || {}
    //   const point = e?.canvas
    //   if (!id) return
    //   const [oldX, oldY] = graph.getViewportCenter()
    //   graph.translateBy([oldX - point.x, oldY - point.y])
    // })

    // 监听视口宽度变化
    window.addEventListener("resize", () => {
      const container = document.getElementById('NetworkTopologyDiagram2');
      if (!container) return
      const width = container.offsetWidth;
      const height = window.innerHeight - 100;
      graph.resize(width, height)
      graph.updatePlugin({
        key: 'background',
        type: 'background',
        width: width + 'px',
        height: height + 'px',
        backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: 0.2,
      })
    })

  }, [])

  return (
    <Spin spinning={loading}>
      <div id='NetworkTopologyDiagram2'></div>
      <Button onClick={() => {
        const data = mountNodeRef.current.getData()
        console.log(data)
      }}>获取图数据</Button>
    </Spin>
  )
}

export default Network