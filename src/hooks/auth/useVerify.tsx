import { VerifyHook, VerifyParam } from 'types/user'
import apiClient from 'lib/apiClient';
import { useCurrentUser } from 'hooks/auth/useCurrentUser';
import { useRouter } from 'next/router';
import { currentUserState } from 'states/atoms/user';
import { useSetRecoilState } from 'recoil';

export const useVerify= ():VerifyHook  => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const verify = async (req: VerifyParam):Promise<void> => {
    // ログイン済みの場合はhomeに遷移
    if(currentUser) router.push('/home')

    try {
      await apiClient.get('/sanctum/csrf-cookie')
      const verify = await apiClient.post('/verify', { token: req});
      setCurrentUser(verify.data)
      router.push('/home')
    } catch(e) {
      console.log(e)
    }
  };

  return {
    verify,
  };
};