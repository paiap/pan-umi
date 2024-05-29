import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  return (
    <PageContainer
      ghost
      header={{
        title: '只有 Admin 可以看到这个页面',
      }}
    >
    </PageContainer>
  );
};

export default AccessPage;
