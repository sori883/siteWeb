import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAlreadyLogin } from 'features/auth/api/useAlreadyLogin';
import { useRouter } from 'next/router';
import { useVerify } from 'features/auth/api/verify';


const Verrify: NextPage = () => {
  useAlreadyLogin();
  const router = useRouter();
  const { token } = router.query;
  const { verify } = useVerify();

  useEffect(() => {
    if(router.isReady) verify(token);
  },[token, router]);

  return (
    <>
    特になし
    </>
  );
};

export default Verrify;