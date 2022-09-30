import { ReactNode, useEffect } from 'react';
import { DrawerManage } from 'components/manages/Drawer';
import { Navbar } from 'components/manages/Navbar';
import { useUser } from 'features/auth/api/fetchUser';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from 'states/atoms/user';


type Props = {
  children: ReactNode;
}

export function LayoutManage({ children }: Props): JSX.Element {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const { user, error } = useUser();

  useEffect(() => {
    ((): void => {
      if (error && !user) {
        setCurrentUser(null);
        return;
      }
      const currentUser = user;
      setCurrentUser(currentUser);
    })();
  },[user]);

  return (
    <>
      <DrawerManage>
        <Navbar />
        <div className='container mx-auto'>
          { children }
        </div>
      </DrawerManage>
    </>
  );
}