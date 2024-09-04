import React, { FC, useState, useEffect, useRef } from 'react'
import G6, { ExtensionCategory, Graph, Line, register } from '@antv/g6';
import { data } from './mock'
import { createRoot } from 'react-dom/client';
import normalHost from '@/assets/正常主机.png'
import warnningHost from '@/assets/告警主机.png'
import errorHost from '@/assets/异常主机.png'
import normalSwitch from '@/assets/交换机-正常.png'
import warnningSwitch from '@/assets/交换机-警告.png'
import errorSwitch from '@/assets/交换机-出错.png'
import TooltipDetail from './TooltipDetail';
import { Spin } from 'antd';

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

class AntLine extends Line {
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


const NetworkTopologyDiagram: FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const mountNodeRef = useRef<any>(null)
  useEffect(() => {
    const container = document.getElementById('NetworkTopologyDiagram');
    if (!container) return
    const width = container.offsetWidth;
    const height = window.innerHeight - 100;
    console.log(width, height)
    setLoading(true)

    setTimeout(() => {
      if (mountNodeRef.current) {
        mountNodeRef.current.updateData(data)
        mountNodeRef.current.render()
        return
      }

      const graph = new Graph({
        // div的dom节点
        container: 'NetworkTopologyDiagram',
        // 数据源
        data,
        // 宽度
        width: width,
        // 高度
        height: height,
        // 动画
        animation: false,
        // 是否居中
        autoFit: 'center',
        // layout全局配置
        layout: {
          type: 'radial',
          // sortBy: 'id',//同层节点布局后相距远近的依据
          // sortStrength: 30,//同层节点根据 sortBy 排列的强度，数值越大，sortBy 指定的方式计算出距离越小的越靠近。sortBy 不为 undefined 时生效
          unitRadius: 200,//每一圈距离上一圈的距离。默认填充整个画布，即根据图的大小决定
          nodeSize: 48,//节点大小（直径）。用于防止节点重叠时的碰撞检测
          linkDistance: 700,//边长度
          maxIteration: 1000,//停止迭代到最大迭代数
          preventOverlap: true,//开启防止重叠
          nodeSpacing: 200,//防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距
          // strictRadial: true,//是否必须是严格的 radial 布局，及每一层的节点严格布局在一个环上。preventOverlap 为 true 时生效。
        },
        //  节点
        node: {
          // 边类型
          type: 'image',
          // 渲染样式
          style: (data: any) => {
            const baseStyle = {
              size: 48,
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
        // 边
        edge: {
          type: 'ant-line',
          style: (data: any) => {
            const baseStyle = {
              lineDash: [10, 4],
              lineWidth: 1.5,
              labelBackground: true,
              // endArrow: true,
              labelText: ' ' + data?.properties?.data?.length + ' ',
              labelFill: colorMap[data?.type as keyof typeof colorMap],
            };
            switch (data.type) {
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
        //  交互行为
        behaviors: [
          'drag-canvas',
          'drag-element',
          {
            key: 'hover-activate',
            type: 'hover-activate',
            degree: 1,
          },
        ],
        // 插件
        plugins: [
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
            // container: 'NetworkTopologyDiagram',

            contentKey: 'tooltips',

            getContent: (e: any, items: any) => {
              const targetType = e?.targetType
              const item = items?.[0];
              const name = nameMap[item?.type as keyof typeof nameMap]
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
            type: 'background',
            width: width + 'px',
            height: height + 'px',
            backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 0.2,
          },
        ],
      });
      mountNodeRef.current = graph
      setLoading(false)
      graph.render();
      graph.fitView();
    }, 1000)

  }, [])

  return (
    <Spin spinning={loading}>
      <div id='NetworkTopologyDiagram'></div>
    </Spin>

  )
}

export default NetworkTopologyDiagram