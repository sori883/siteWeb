import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Link href='/account/login'>
      <a>Login画面に遷移</a>
    </Link>
  </div>
);

export default Home;
