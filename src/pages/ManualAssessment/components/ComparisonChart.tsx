import React, { useState, useEffect, useRef } from 'react';
import { Table, Row, Col, Card } from 'antd';
import { Column } from '@antv/g2plot';
import type { ColumnsType } from 'antd/es/table';
import { DimensionData } from '../api';
import ProgressCircle from './ProgressCircle';
import './ComparisonChart.css';

interface ComparisonChartProps {
  data: DimensionData[];
  progress: number;
  onDimensionClick?: (dimensionKey: string, version?: string) => void;
}

interface TableDataType {
  key: string;
  序号: number;
  维度名称: string;
  平均实时得分: number;
  [key: string]: any;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  data,
  progress,
  onDimensionClick,
}) => {
  const [tableHeight, setTableHeight] = useState(170);
  const chartRef = useRef<HTMLDivElement>(null);
  const columnPlotRef = useRef<Column | null>(null);

  useEffect(() => {
    const calculateTableHeight = () => {
      // 表格容器Card的高度是240px
      const cardHeight = 240;
      // 计算表格可用高度
      const availableHeight = cardHeight - 60;
      setTableHeight(availableHeight);
    };

    calculateTableHeight();
    window.addEventListener('resize', calculateTableHeight);
    return () => window.removeEventListener('resize', calculateTableHeight);
  }, [data]); // 添加data依赖，数据变化时重新计算

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (chartRef.current && data?.length && chartRef.current.parentNode) {
      // 安全地销毁现有图表
      if (columnPlotRef.current) {
        try {
          columnPlotRef.current.destroy();
        } catch (error) {
          console.warn('Chart destroy error:', error);
        }
        columnPlotRef.current = null;
      }

      // 准备分组柱状图数据 - 每个维度的每个版本作为一个数据点
      const chartData: any[] = [];
      data.forEach(item => {
        item.versions.forEach(version => {
          chartData.push({
            dimension: item.name,
            version: version.version,
            winCount: version.winCount,
            totalCount: version.totalCount,
            winRate: version.winRate
          });
        });
      });

      // 使用 setTimeout 确保 DOM 完全准备好
      timer = setTimeout(() => {
        if (!chartRef.current || !chartRef.current.parentNode) return;
        
        const columnPlot = new Column(chartRef.current, {
        data: chartData,
        xField: 'dimension',
        yField: 'winCount',
        seriesField: 'version', // 分组字段
        isGroup: true, // 明确指定为分组模式，不是堆叠
        isStack: false, // 明确不使用堆叠
        height: 180,
        color: ['#5B9BD5', '#F4B183', '#70AD47'], // V260蓝色，V261橙色，V262绿色
        columnWidthRatio: 0.6,
        dodgePadding: 4, // 分组内柱子间距
        marginRatio: 0.3, // 分组间距
        groupField: 'version', // 确保分组字段正确
        meta: {
          winCount: {
            alias: '胜利数量',
            min: 0
          },
          dimension: {
            alias: '维度'
          },
          version: {
            alias: '版本'
          }
        },
        label: {
          position: 'middle',
          style: {
            fill: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'center'
          },
          formatter: (datum: any) => `${datum.winCount}`
        },
        tooltip: {
          showTitle: true,
          title: (datum: any) => `${datum.dimension}`,
          formatter: (datum: any) => {
            return {
              name: `${datum.version}`,
              value: `${datum.winCount}`
            };
          }
        },
        legend: {
          position: 'top-right',
          itemName: {
            style: {
              fontSize: 12
            }
          }
        },
        interactions: [
          {
            type: 'element-active'
          }
        ]
      });

      columnPlot.on('element:click', (evt: any) => {
        const { data: clickData } = evt.data;
        if (clickData && onDimensionClick) {
          // 传递维度和版本信息
          onDimensionClick(clickData.dimension, clickData.version);
        }
      });

      columnPlot.render();
      columnPlotRef.current = columnPlot;
      }, 0); // 延迟 0ms 确保 DOM 准备就绪
    }

    return () => {
      // 清理定时器
      if (timer) {
        clearTimeout(timer);
      }
      if (columnPlotRef.current) {
        try {
          columnPlotRef.current.destroy();
        } catch (error) {
          console.warn('Chart cleanup error:', error);
        }
        columnPlotRef.current = null;
      }
    };
  }, [data, onDimensionClick]);

  const allVersions = Array.from(new Set(
    data.flatMap(dimension => dimension.versions.map(v => v.version))
  ));

  const tableData: TableDataType[] = data.map((dimension, index) => {
    const row: TableDataType = {
      key: dimension.name,
      序号: index + 1,
      维度名称: dimension.name,
      平均实时得分: dimension.averageScore,
    };

    dimension.versions.forEach(version => {
      row[`${version.version}胜率`] = `${version.winRate.toFixed(1)}% (${version.winCount}/${version.totalCount})`;
      row[`${version.version}败率`] = `${version.loseRate.toFixed(1)}% (${version.loseCount}/${version.totalCount})`;
      row[`${version.version}平局率`] = `${version.tieRate.toFixed(1)}% (${version.tieCount}/${version.totalCount})`;
    });

    return row;
  });

  const columns: ColumnsType<TableDataType> = [
    {
      title: '序号',
      dataIndex: '序号',
      key: '序号',
      width: 60,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '维度名称',
      dataIndex: '维度名称',
      key: '维度名称',
      width: 120,
      ellipsis: true,
      fixed: 'left',
    },
    {
      title: '平均实时得分',
      dataIndex: '平均实时得分',
      key: '平均实时得分',
      width: 120,
      align: 'center',
      render: (value: number) => value.toFixed(1),
    },
  ];

  allVersions.forEach(version => {
    columns.push(
      {
        title: `${version}胜率`,
        dataIndex: `${version}胜率`,
        key: `${version}胜率`,
        width: 120,
        align: 'center',
      },
      {
        title: `${version}败率`,
        dataIndex: `${version}败率`,
        key: `${version}败率`,
        width: 120,
        align: 'center',
      },
      {
        title: `${version}平局率`,
        dataIndex: `${version}平局率`,
        key: `${version}平局率`,
        width: 120,
        align: 'center',
      }
    );
  });

  return (
    <Row gutter={[8, 8]} style={{ marginBottom: 8 }}>
      <Col span={5}>
        <Card 
          style={{ height: 240 }}
          bodyStyle={{ padding: '16px' }}
        >
          <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        </Card>
      </Col>

      <Col span={14}>
        <Card 
          style={{ height: 240 }} 
          bodyStyle={{ padding: '0' }}
        >
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            scroll={{ 
              x: 'max-content', 
              y: tableHeight,
              scrollToFirstRowOnChange: true
            }}
            style={{ height: '100%' }}
            className="comparison-table"
          />
        </Card>
      </Col>

      <Col span={5}>
        <Card style={{ height: 240, textAlign: 'center' }}>
          <ProgressCircle percent={progress} size={100} />
        </Card>
      </Col>
    </Row>
  );
};

export default ComparisonChart;
