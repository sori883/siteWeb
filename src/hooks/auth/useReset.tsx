import { ResetHook, ResetParam } from 'types/user'
import apiClient from 'lib/apiClient';
import { useRouter } from 'next/router';

export const useReset= ():ResetHook  => {
  const router = useRouter();

  const reset = async (req: ResetParam):Promise<void> => {
    try {
      await apiClient.get('/sanctum/csrf-cookie')
      await apiClient.post('/api/reset', req);
      router.push('/user/home')
    } catch(e) {
      console.log(e)
    }
  };

  return {
    reset,
  };
};