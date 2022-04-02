import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'hooks/auth/useCurrentUser';

export function useAlreadyLogin():void {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();
  
  useEffect(() => {
    if(isAuthChecking) return; // まだ確認中
    if(currentUser) router.push("/user/home"); // ログイン済みのためホームに遷移
  },[isAuthChecking, currentUser]);
}