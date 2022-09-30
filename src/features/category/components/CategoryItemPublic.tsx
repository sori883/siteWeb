import { CategoryPublic } from 'features/category/types/categoryPublic';
import Link from 'next/link';
import { pagesPath } from 'lib/$path';

export function CategoryItemPublic(props: {
  category: CategoryPublic[],
}): JSX.Element {
  const { category } = props;

  return (
    <>
      <ul className='menu bg-base-100 w-full rounded-none'>
        <li className='bg-primary text-black'>
          <span>Category</span>
        </li>
        {
          category.map((item: CategoryPublic) => (
            <li key={item.id}>
              <Link href={pagesPath._slug(item.slug).$url()}>
                <a>
                  {item.name}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}