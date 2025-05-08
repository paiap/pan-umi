import React from 'react';
import DetailButton from './DetailButton';
import { Table } from 'antd';

interface DataType {
  key: string;
  taskName: string;
  tags: string[];
  status: string;
}

const BaseTable: React.FC = () => {
  const data: DataType[] = [
    {
      key: '1',
      taskName: JSON.stringify({
        projectInfo: {
          name: '大型企业管理系统重构项目',
          version: '2.0.0',
          description: '对现有的企业管理系统进行全面重构，提升系统性能和用户体验',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          budget: 1500000,
          team: {
            leader: '张三',
            members: [
              { name: '李四', role: '前端开发', experience: '5年' },
              { name: '王五', role: '后端开发', experience: '7年' },
              { name: '赵六', role: '数据库专家', experience: '6年' },
              { name: '孙七', role: 'UI设计师', experience: '4年' },
              { name: '周八', role: '测试工程师', experience: '3年' }
            ]
          },
          technologies: {
            frontend: ['React', 'TypeScript', 'Ant Design', 'Redux'],
            backend: ['Node.js', 'Express', 'MongoDB', 'Redis'],
            devops: ['Docker', 'Kubernetes', 'Jenkins', 'AWS']
          },
          milestones: [
            { phase: '需求分析', duration: '2个月', status: '已完成' },
            { phase: '系统设计', duration: '3个月', status: '进行中' },
            { phase: '开发实现', duration: '5个月', status: '未开始' },
            { phase: '测试部署', duration: '2个月', status: '未开始' }
          ],
          risks: [
            { type: '技术风险', level: '中等', mitigation: '提前进行技术验证和原型开发' },
            { type: '进度风险', level: '高', mitigation: '增加人力资源和优化项目管理方法' },
            { type: '成本风险', level: '低', mitigation: '制定详细的预算控制计划' }
          ]
        }
      }),
      tags: ['重要', '紧急', '开发'],
      status: '进行中',
    },
    {
      key: '2',
      taskName: '测试任务2',
      tags: ['普通', '设计', '测试'],
      status: '出大V河粉v塑复合VB花洒滚吧VS刚发v很大不咋v出发VB发v发大V发VB发大V发上吧VS吧v鹅湖VR额发VR月u全额问哈富婆饿饿二狗哦去漂白粉胡大V把部分呢阿发不哈恶妇饿哦人AV跑去不饿会VB',
    },
  ];

  const renderCell = (text: string, field: string) => {
    return <DetailButton text={text} field={field} />;
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'taskName',
      key: 'taskName',
      minWidth: 200,
      render: (text: string) => renderCell(text, '任务名称'),
    },
    {
      title: '任务标签',
      dataIndex: 'tags',
      key: 'tags',
      minWidth: 200,
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <span key={tag} style={{ marginRight: 8 }}>
              {tag}
            </span>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      minWidth: 200,
      render: (text: string) => renderCell(text, '状态'),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: true }}
        // onChange={handleTableChange}
        style={{ maxHeight: '500px' }}
      />
    </>
  );
};

export default BaseTable;
