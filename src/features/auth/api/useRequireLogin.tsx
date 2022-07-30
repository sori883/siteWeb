import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'features/auth/api/useCurrentUser';

export function useRequireLogin():void {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();
  
  useEffect(() => {
    if(isAuthChecking) return; // まだ確認中
    if(!currentUser) router.push("/account/login"); // 未ログインだったのでリダイレクト
  },[isAuthChecking, currentUser]);
}