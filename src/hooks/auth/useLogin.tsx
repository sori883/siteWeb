import { LoginHook, LoginParam } from 'types/user'
import apiClient from 'lib/apiClient';
import { useCurrentUser } from 'hooks/auth/useCurrentUser';
import { useRouter } from 'next/router';

export const useLogin = ():LoginHook  => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
    
  const login = async (req: LoginParam):Promise<void> => {
    // ログイン済みの場合はhomeに遷移
    if(currentUser) router.push('/user/home')

    try {
      await apiClient.get('/sanctum/csrf-cookie');
      await apiClient.post('/login', req);
      router.push('/user/home');
    } catch(e) {
      console.log(e);
    };
  };

  return {
    login,
  };
};