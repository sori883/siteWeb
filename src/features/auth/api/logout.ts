import axios from 'lib/axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'features/auth/api/useCurrentUser';
import { currentUserState } from 'states/atoms/user';
import { useSetRecoilState } from 'recoil';
import { pagesPath } from 'lib/$path';

type HookReturn = {
  logout: () => Promise<void>;
}

export const useLogout = (): HookReturn => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const logout = async (): Promise<void> => {
    if(!currentUser) toast.error('既にログアウトしています');

    await axios.post('/api/logout')
      .then(() => {
        setCurrentUser(undefined);
        router.push(pagesPath.$url());
      })
      .catch(() => {
        toast.error('ログアウトに失敗しました');
      });
  };

  return {
    logout
  };
};