import { ReactNode } from 'react';
import { Sidebar } from 'components/manages/Sidebar';

type Props = {
  children: ReactNode;
}

export function DrawerManage({ children }: Props): JSX.Element {
  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {children}
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer' className='drawer-overlay'></label>
        <Sidebar />
      </div>
    </div>
  );
}