import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';

const Home: NextPage = () => {
  useRequireLogin();
  return (
    <LayoutManage>
      <h1>home</h1>

    </LayoutManage>
  );
};

export default Home;
