import axios from 'lib/axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'features/auth/api/useCurrentUser';
import { pagesPath } from 'lib/$path';
import { RegisterParam } from 'features/auth/types/auth';

type HookReturn = {
  regist: (req: RegisterParam) => Promise<void>;
  isLoading: boolean;
}

export const useRegist = (): HookReturn => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const regist = async (req: RegisterParam): Promise<void> => {
    setIsLoading(true);
    if(currentUser) router.push(pagesPath.user.home.$url());
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/register', req)
      .then(() => {
        toast.info('認証メールを送信しました');
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return {
    regist,
    isLoading
  };
};