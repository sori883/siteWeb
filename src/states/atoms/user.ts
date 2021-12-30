import { atom } from 'recoil';
import { CurrentUser } from 'types/user';
import { AtomKeys } from 'states/recoilKeys';

// undefined : まだログイン確認が完了していない状態とする
// null : ログイン確認をした結果、ログインしていなかった状態とする
export const currentUserState  = atom<undefined | null | CurrentUser>({
  key: AtomKeys.USER_STATE,
  default: undefined,
});