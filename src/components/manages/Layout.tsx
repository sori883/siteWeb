import { ReactNode } from 'react';
import { DrawerManage } from 'components/manages/Drawer';
import { Navbar } from 'components/manages/Navbar';
import { Footer } from 'components/manages/Footer';

type Props = {
  children: ReactNode;
}

export function LayoutManage({ children }: Props): JSX.Element {
  return (
    <>
      <DrawerManage>
        <Navbar />
        <div className='container mx-auto'>
          { children }
        </div>
        <Footer />
      </DrawerManage>
    </>
  );
}