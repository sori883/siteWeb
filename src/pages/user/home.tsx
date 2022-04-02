import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';

const Home: NextPage = () => {
  useRequireLogin();
  return (
    <LayoutManage>
      <h1>home</h1>
      <SidebarManage />

    </LayoutManage>
  );
};

export default Home;
