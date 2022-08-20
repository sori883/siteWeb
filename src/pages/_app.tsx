import 'nprogress/nprogress.css';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { NormalizeCSS, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import NextHeadSeo from 'next-head-seo';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { currentUserState } from 'states/atoms/user';
import { useUser } from 'features/auth/api/fetchUser';
import nprogress from 'nprogress';

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

function AppInit():null {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const { user, error } = useUser();

  // 画面遷移プログレス開始
  if (process.browser) {
    nprogress.start();
  }
  // 画面遷移プログレス終了
  useEffect(() => {
    nprogress.done();
  });

  useEffect(() => {
    ((): void => {
      if (error && !user) {
        setCurrentUser(null);
        return;
      }
      const currentUser = user;
      setCurrentUser(currentUser);
    })();
  },[user]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <RecoilRoot>
      <NormalizeCSS />
      <NextHeadSeo
        og={{
          image: "https://example.com/default-og.png",
          type: 'article',
          siteName: 'site',
        }}
        twitter={{
          card: "summary"
        }}
      />
      <MantineProvider>
        <SWRConfig
          value={{
            errorRetryCount: 0,
            revalidateOnFocus: false
          }}
        >
          <div id='root'>
            <Component {...pageProps} />
          </div>
          <AppInit />
        </SWRConfig>
      </MantineProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        style={{ fontSize: 14, fontWeight: 'bold' }}
      />
    </RecoilRoot>
  );
}
export default MyApp;
