import axios from 'lib/axios';
import { useState } from 'react';
import { toast } from 'react-toastify';;
import { ResetParam } from 'features/auth/types/auth';

type HookReturn = {
  reset: (req: ResetParam) => Promise<void>;
  isLoading: boolean;
}

export const useReset = (): HookReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reset = async (req: ResetParam): Promise<void> => {
    setIsLoading(true);
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/reset', req)
      .then(() => {
        toast.info('パスワードをリセットしました');
      })
      .catch(() => {
        toast.error('パスワードリセットメールを送信出来ませんでした。');
      }).finally(() => {
        setIsLoading(false);
      });
  };

  return {
    reset,
    isLoading
  };
};