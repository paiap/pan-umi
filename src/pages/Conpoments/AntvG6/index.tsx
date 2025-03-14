/*
 * @creater: panan
 * @message: AntvG6
 * @since: 2024-12-05 10:53:30
 * @LastAuthor: panan panan2001@outlook.com
 * @lastTime: 2024-12-17 20:56:37
 * @文件相对于项目的路径: /pan-umi/src/pages/Conpoments/AntvG6/index.tsx
 */
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';
import React, { FC, useEffect, useRef } from 'react';
import NodeInfo from './components/NodeInfo';


register(ExtensionCategory.NODE, 'react', ReactNode);

const Node = (props: any) => {
  const { data } = props
  return (
    <NodeInfo type={data?.data?.type} />
  );
};

interface Props {
  [key: string]: any
}

const AntvG6: FC<Props> = () => {
  const containerRef = useRef<any>();

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      data: {
        nodes: [
          {
            id: 'model-0',
            data: { type: 'model' },
          },
          {
            id: 'tpc-0',
            data: { type: 'tpc' },
          },
          {
            id: 'cki-0',
            data: { type: 'cki' },
          },
          {
            id: 'cki-1',
            data: { type: 'cki' },
          },
          {
            id: 'train-0',
            data: { type: 'train-result' },
          },
          {
            id: 'train-1',
            data: { type: 'train-result' },
          },
        ],
        edges: [
          { source: 'model-0', target: 'tpc-0' },
          { source: 'tpc-0', target: 'cki-0' },
          { source: 'tpc-0', target: 'cki-1' },
          { source: 'cki-0', target: 'train-0' },
          { source: 'cki-1', target: 'train-1' },
        ],
      },
      node: {
        type: 'react',
        style: {
          // size: [250, 100],
          component: (data: any) => <Node data={data} />,
        },
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#F6BD16',
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 400,
        getHeight: () => 200,
      },
      behaviors: ['drag-element', 'zoom-canvas', 'drag-canvas'],
    });
    graph.render();
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef}></div>;
}

export default AntvG6
