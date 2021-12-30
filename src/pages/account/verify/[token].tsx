import { useEffect } from 'react';
import type { NextPage } from 'next'
import { useAlreadyLogin } from 'hooks/auth/useAlreadyLogin';
import { useRouter } from 'next/router';
import { useVerify } from 'hooks/auth/useVerify';


const Verrify: NextPage = () => {
  useAlreadyLogin();
  const router = useRouter();
  const { token } = router.query;
  const { verify } = useVerify();

  useEffect(() => {
    if(router.isReady) verify(token)
  },[token, router]);


  return (
    <>
    特になし
    </>
  );
};

export default Verrify;