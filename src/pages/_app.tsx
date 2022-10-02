import 'nprogress/nprogress.css';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import NextHeadSeo from 'next-head-seo';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import nprogress from 'nprogress';

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

function AppInit():null {
  // 画面遷移プログレス開始
  if (process.browser) {
    nprogress.start();
  }
  // 画面遷移プログレス終了
  useEffect(() => {
    nprogress.done();
  });

  return null;
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
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
