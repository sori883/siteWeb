import { ReactNode } from 'react';
import { useAuth } from 'hooks/auth';

type Props = {
  children: ReactNode;
}

export function LayoutManage({ children, ...props }: Props): JSX.Element {
  const { logout } = useAuth();

  const handleLogout = ():void => {
    logout();
  };

  return (
    <div {...props}>
      <button onClick={handleLogout}>ログアウト</button>
      {children}
    </div>
  );
}