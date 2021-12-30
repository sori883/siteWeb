import { useRecoilValue } from 'recoil';
import { currentUserState } from 'states/atoms/user'
import { CurrentUserHook } from 'types/user'

export function useCurrentUser():CurrentUserHook {
  const currentUser = useRecoilValue(currentUserState);
  // ログイン情報を取得中かどうか
  const isAuthChecking = currentUser === undefined;

  return {
    currentUser,
    isAuthChecking
  };
}