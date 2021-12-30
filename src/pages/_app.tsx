import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import NextHeadSeo from 'next-head-seo';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { currentUserState } from 'states/atoms/user';
import { fetchCurrentUser } from 'requests/auth/currentUser';

function AppInit():null {
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    (async function (): Promise<void> {
      try {
        const currentUser = await fetchCurrentUser();
        setCurrentUser(currentUser);
      } catch {
        setCurrentUser(null);
      }
    })();
  },[])

  return null;
}

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
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
      <Component {...pageProps} />
      <AppInit />
    </RecoilRoot>
  )
}
export default MyApp
