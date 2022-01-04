import { RegisterHook, RegisterParam } from 'types/user'
import apiClient from 'lib/apiClient';
import { useCurrentUser } from 'hooks/auth/useCurrentUser';
import { useRouter } from 'next/router';

export const useRegist= ():RegisterHook  => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  const regist = async (req: RegisterParam):Promise<void> => {
    // ログイン済みの場合はhomeに遷移
    if(currentUser) router.push('/user/home')

    try {
      await apiClient.get('/sanctum/csrf-cookie')
      await apiClient.post('/register', req)
    } catch(e) {
      console.log(e)
    }
  };

  return {
    regist,
  };
};