import { useLogout } from 'features/auth/api/logout';
import { pagesPath } from 'lib/$path';
import Link from 'next/link';

export function Navbar(): JSX.Element {
  const { logout } = useLogout();

  const handleLogout = ():void => {
    logout();
  };

  return (
    <div className={'h-16 flex items-center md:max-w-screen-md md:mx-auto'}>
      <div className={'navbar bg-base-100'}>
        <div className={'flex-none'}>
          <label htmlFor='my-drawer' className={'drawer-button btn btn-secondry'}>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className={'inline-block w-5 h-5 stroke-current'}>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
            </svg>
          </label>
        </div>
        <div className={'flex-1'}>
          <Link href={pagesPath.user.home.$url()}>
            <a className={'btn btn-ghost normal-case text-xl'}>
              home
            </a>
          </Link>
        </div>
        <div className={'flex-none'}>
          <ul className={'menu menu-horizontal p-0'}>
          </ul>
        </div>
        <div className={'flex-none'}>
          <ul className={'menu menu-horizontal p-0'}>
            <li><a onClick={handleLogout}>ログアウト</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}