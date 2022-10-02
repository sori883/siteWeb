import { pagesPath } from 'lib/$path';
import Link from 'next/link';


export function Sidebar(): JSX.Element {
  return (
    <ul className='menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content'>
      <li>
        <Link href={pagesPath.article.post.$url()}>
          記事投稿
        </Link>
      </li>
      <li>
        <Link href={pagesPath.article.$url()}>
          記事一覧
        </Link>
      </li>
      <li>
        <Link href={pagesPath.category.$url()}>
          カテゴリ一覧
        </Link>
      </li>
      <li>
        <Link href={pagesPath.tag.$url()}>
          タグ一覧
        </Link>
      </li>
      <li>
        <Link href={pagesPath.library.$url()}>
          画像一覧
        </Link>
      </li>
    </ul>
  );
}