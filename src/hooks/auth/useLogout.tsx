import { LogoutHook } from 'types/user'
import apiClient from 'lib/apiClient';
import { useCurrentUser } from 'hooks/auth/useCurrentUser';
import { useRouter } from 'next/router';
import { currentUserState } from 'states/atoms/user';
import { useSetRecoilState } from 'recoil';

export const useLogout= ():LogoutHook  => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const logout = async (): Promise<void> => {
    // ログアウト済みの場合はトップに遷移
    if(!currentUser) router.push('/')

    try {
      await apiClient.post('/api/logout')
      setCurrentUser(null)
      router.push("/");
    } catch(e) {
      console.log(e)
    }
  };

  return {
    logout,
  };
};