import axios from 'lib/axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'features/auth/api/useCurrentUser';
import { pagesPath } from 'lib/$path';
import {
  LoginParam
} from 'features/auth/types/auth';

type HookReturn = {
  login: (req: LoginParam) => Promise<void>;
  isLoading: boolean;
}

export const useLogin = (): HookReturn => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (req: LoginParam): Promise<void> => {
    setIsLoading(true);
    // ログイン済みの場合はホームに遷移
    if(currentUser) router.push(pagesPath.user.home.$url());
    // token
    await axios.get('/sanctum/csrf-cookie');

    await axios
      .post('/api/login', req)
      .then(() => {
        router.push(pagesPath.user.home.$url());
      })
      .catch(() => {
        toast.error('ログインに失敗しました');
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return {
    login,
    isLoading
  };
};