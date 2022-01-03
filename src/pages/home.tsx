import type { NextPage } from 'next'
import Link from 'next/link';
import { Layout } from 'components/layouts/LayoutManage'
import { useRequireLogin } from 'hooks/auth/useRequireLogin'

const Home: NextPage = () => {
  useRequireLogin();
  return (
    <Layout>
      <h1>home</h1>

    </Layout>
  );
};

export default Home;
