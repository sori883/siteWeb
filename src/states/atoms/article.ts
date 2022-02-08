import { atom } from 'recoil';
import { AtomKeys } from 'states/recoilKeys';


export const currentArticleId = atom<number | undefined>({
  key: AtomKeys.ARTICLE_STATE,
  default: undefined,
});