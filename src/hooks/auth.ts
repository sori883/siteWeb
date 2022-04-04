import axios from 'lib/axios';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'hooks/auth/useCurrentUser';
import { currentUserState } from 'states/atoms/user';
import { useSetRecoilState } from 'recoil';
import { pagesPath } from 'lib/$path';
import {
  User,
  RegisterParam,
  LoginParam,
  VerifyParam,
  ForgotParam,
  ResetParam,
  AuthHook
} from 'types/auth';

export const useAuth = (): AuthHook => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const { data: user, error } = useSWR<User, Error>('/api/me', async () => 
    await axios
      .get<User>('/api/me')
      .then((res) => res.data)
      .catch((error) => {
        throw error.response;
      })
  );

  const regist = async (req: RegisterParam): Promise<void> => {
    if(currentUser) router.push(pagesPath.user.home.$url());
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/register', req)
      .then(() => {
        toast.info('認証メールを送信しました');
      })
      .catch(() => {
        toast.error('登録に失敗しました');
      });
  };

  const verify = async (req: VerifyParam): Promise<void> => {
    if(currentUser) router.push(pagesPath.user.home.$url());
    await axios.get('/sanctum/csrf-cookie');

    await axios.post('/api/verify', req)
      .then(() => {
        router.push(pagesPath.user.home.$url());
      })
      .catch(() => {
        toast.error('認証に失敗しました');
      });
  };

  const login = async (req: LoginParam): Promise<void> => {
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
      });
  };

  const forgot = async (req: ForgotParam): Promise<void> => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/forgot', req)
      .then(() => {
        router.push(pagesPath.user.home.$url());
      })
      .catch(() => {
        toast.error('パスワードリセットメールを送信出来ませんでした。');
      });
  };

  const reset = async (req: ResetParam): Promise<void> => {
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/api/reset', req)
      .then(() => {
        toast.info('パスワードをリセットしました');
      })
      .catch(() => {
        toast.error('パスワードリセットメールを送信出来ませんでした。');
      });
  };

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
    user,
    error,
    regist,
    verify,
    login,
    forgot,
    reset,
    logout
  };
};