import { ArticlePublic } from 'features/article/types/articlePublic';
import { ArticleItemPublic } from 'features/article/components/ArticleItemPublic';

type Props = {
  fallbackArticle: ArticlePublic[];
}

export function ArticleListPublic({ fallbackArticle }: Props): JSX.Element {

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-5 py-5'>
        {
          fallbackArticle.map((item: ArticlePublic) => (
            <ArticleItemPublic
              key={item.id}
              article={item}
            />
          ))
        }
      </div>
    </>
  );
}