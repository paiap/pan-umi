import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useClientLoaderData, useModel } from '@umijs/max';
import styles from './index.less';
import { useEffect } from 'react';
import { Button } from 'antd';
import Guide from '@/components/Guide';

const HomePage: React.FC = () => {
  const { name, setName } = useModel('global');
  const { initialState, setInitialState }: any = useModel('@@initialState');
  const { data } = useClientLoaderData()
  console.log(data)

  useEffect(() => {
    setName(initialState?.user)
  }, [initialState])

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
      </div>
      <Button onClick={() => setInitialState({ ...initialState, user: initialState?.user === 'panan' ? 'other' : 'panan' })}>更新</Button>
    </PageContainer>
  );
};

export default HomePage;

export const clientLoader = async () => {
  return {
    name: 'panan-clientLoader',
  }
}