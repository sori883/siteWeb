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
      {/* <Link href=''>
        記事管理
      </Link><br />
      <Link href=''>
        画像管理
      </Link><br />
      <Link href=''>
        コメント管理
      </Link><br /> */}
    </div>
  )
}