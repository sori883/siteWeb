import { pagesPath } from 'lib/$path';
import Link from 'next/link';

export function Navbar(): JSX.Element {
  return (
    <div className={'h-16 flex items-center'}>
      <div className={'navbar'}>
        <div className={'flex-none'}>
        </div>
        <div className={'flex-1'}>
          <Link href={pagesPath.$url()}>
            <a className={'btn btn-ghost normal-case text-xl'}>
              Blog Titles
            </a>
          </Link>
        </div>
        <div className={'flex-none'}>
          <ul className={'menu menu-horizontal p-0'}>
          </ul>
        </div>
      </div>
    </div>
  );
}