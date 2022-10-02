import { ArticlePublic } from 'features/article/types/articlePublic';
import Image from 'next/image';
import { imageLoader } from 'components/lib/ImageLoader';
import Link from 'next/link';
import { pagesPath } from 'lib/$path';

export function ArticleItemPublic(props: {
  article: ArticlePublic,
}): JSX.Element {
  const { article } = props;

  return (
    <>
      <div className='relative card w-full bg-base-100 shadow-xl rounded-none'>
        <Link href={pagesPath.post._permalink(article.permalink).$url()}>
          <a>
            <figure className='relative w-full min-h-[12rem]'>
              <Image
                loader={imageLoader}
                src={article.image ? article.image.path : ''}
                alt='a picture'
                layout='fill'
                objectFit='cover'
              />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>
                {article.title}
              </h2>
              <div className='card-actions justify-end'>
                <div className='badge badge-outline'>
                  {article.category ? article.category.name : '未分類'}
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}