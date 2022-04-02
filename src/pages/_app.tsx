import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { NormalizeCSS, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import NextHeadSeo from 'next-head-seo';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { currentUserState } from 'states/atoms/user';
import { useAuth } from 'hooks/auth';


function AppInit():null {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const { user, error } = useAuth();

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
            // エラー時リトライ回数
            errorRetryCount: 0,
            // windowフォーカス時再取得しない
            revalidateOnFocus: false
          }}
        >
          <Component {...pageProps} />
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
