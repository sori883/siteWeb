import { ReactNode } from 'react'
import { useLogout } from 'hooks/auth/useLogout'

type Props = {
  children: ReactNode;
}

export function Layout({ children, ...props }: Props): JSX.Element {
  const { logout } = useLogout();

  const handleLogout = ():void => {
    logout();
  };

  return (
    <div {...props}>
      <button onClick={handleLogout}>ログアウト</button>
      {children}
    </div>
  )
}