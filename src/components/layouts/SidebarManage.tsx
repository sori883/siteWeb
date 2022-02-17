import Link from 'next/link';

export function SidebarManage(): JSX.Element {
  return (
    <div>
      <Link href='/article/post'>
        投稿
      </Link><br />
      <Link href='/article/'>
        一覧
      </Link><br />
      <Link href='/category/'>
        カテゴリ一覧
      </Link><br />
      <Link href='/tag/'>
        タグ一覧
      </Link><br />
    </div>
  )
}