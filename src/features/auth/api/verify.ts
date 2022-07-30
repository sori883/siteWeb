import axios from 'lib/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'features/auth/api/useCurrentUser';
import { pagesPath } from 'lib/$path';
import { VerifyParam } from 'features/auth/types/auth';

type HookReturn = {
  verify: (req: VerifyParam) => Promise<void>;
}

export const useVerify = (): HookReturn => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();


  const verify = async (req: VerifyParam): Promise<void> => {
    if(currentUser) router.push(pagesPath.user.home.$url());
    await axios.get('/sanctum/csrf-cookie');

    await axios.post('/api/verify', req)
      .then(() => {
        router.push(pagesPath.user.home.$url());
      })
      .catch(() => {
        toast.error('認証に失敗しました');
      });
  };

  return {
    verify,
  };
};