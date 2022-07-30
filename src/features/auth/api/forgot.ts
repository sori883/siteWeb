import axios from 'lib/axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ForgotParam } from 'features/auth/types/auth';

type HookReturn = {
  forgot: (req: ForgotParam) => Promise<void>;
  isLoading: boolean;
}

export const useForgot= (): HookReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const forgot = async (req: ForgotParam): Promise<void> => {
    setIsLoading(true);
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/forgot', req)
      .then(() => {
        toast.info('パスワードリセットメールを送信しました。');
      })
      .catch(() => {
        toast.error('パスワードリセットメールを送信出来ませんでした。');
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return {
    forgot,
    isLoading
  };
};