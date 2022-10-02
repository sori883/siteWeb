import { ArticlePublic } from 'features/article/types/articlePublic';
import { ArticlePreview } from 'components/MarkdownPreview';
import Image from 'next/image';
import { imageLoader } from 'components/lib/ImageLoader';

export function ArticleViewPublic(props: {
  article: ArticlePublic,
}): JSX.Element {
  const { article } = props;
  console.log(article);

  return (
    <>
      <div className='relative h-96 card w-full bg-base-100 rounded-none text-white px-10 py-5'>
        <h2 className='text-3xl font-bold'>{article.title}</h2>
        <div className='flex justify-between bg-base-300 my-1'>
          <div>
            {article.category ? article.category.name : '未分類'}
          </div>
          <div>
            {article.publish_at}
          </div>
        </div>
        <figure className='relative w-full min-h-[20rem]'>
          <Image
            loader={imageLoader}
            src={article.image ? article.image.path : ''}
            alt='a picture'
            layout='fill'
            objectFit='cover'
          />
        </figure>
        <ArticlePreview
          markdown={article.entry}
        />
      </div>
    </>
  );
}