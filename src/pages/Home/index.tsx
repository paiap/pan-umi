import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { useEffect, useState } from 'react';
import { routes } from '../route';
import { Card } from 'antd';

const HomePage: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    const data = routes.filter(c => !c?.redirect && c?.path !== '/access' && c?.path !== '/home')
    console.log(data)
    setDataSource(data)
  }, [])

  const handleClick = (item: any) => {
    console.log(item)
    window.open(`${window.location.origin}/panan${item?.path}`)
  }

  const generateRandomGradient = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    const color1 = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    const color2 = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '根据路由、权限渲染出所有目录页面卡片: 百变小工具',
      }}
    >
      <div className={styles.cardContainer}>
        {dataSource.map((item) => (
          <div className={styles.card} key={item?.path}>
            <Card
              hoverable
              className={styles.cardContent}
              style={{ background: generateRandomGradient() }}
              onClick={() => handleClick(item)}
            >
              <p className={styles.cardName}>{item?.name}</p>
            </Card>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default HomePage;

export const clientLoader = async () => {
  return {
    name: 'panan-clientLoader',
  }
}