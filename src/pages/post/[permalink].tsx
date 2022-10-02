import type { NextPage, GetStaticPaths, GetStaticProps  } from 'next';
import { ArticlePublic } from 'features/article/types/articlePublic';
import { CategoryPublic } from 'features/category/types/categoryPublic';
import { fetcharticleIndex, fetchArticleSingle } from 'features/article/api/articlePublic';
import { LayoutPublic } from 'components/publicLayout/Layout';
import { DoubleColLayout } from 'components/publicLayout/DoubleColLayout';
import { CategoryItemPublic } from 'features/category/components/CategoryItemPublic';
import { fetchCategoryIndex } from 'features/category/api/categoryPublic';
import { ArticleViewPublic } from 'features/article/components/ArticleViewPublic';

type Props =  {
  fallbackArticle: ArticlePublic;
  slug: string;
  fallbackCategory: CategoryPublic[];
}

export const getStaticPaths: GetStaticPaths  = async () => {
  const res = await fetcharticleIndex();
  const paths = res.data.map((item: ArticlePublic) => ({ params: {permalink: `${item.permalink}`}}));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params
}) => {
  if (typeof params?.permalink !== 'string') {
    return { notFound: true };
  }
  const articleData = await fetchArticleSingle(params.permalink);
  const categoryData = await fetchCategoryIndex();


  return {
    props: {
      fallbackArticle: articleData,
      fallbackCategory: categoryData,
    },
  };
};

const Category: NextPage<Props> = ({
  fallbackArticle,
  fallbackCategory
}) => (
  <>
    <LayoutPublic>
      <DoubleColLayout>
        <div className='w-full lg:w-9/12'>
          <ArticleViewPublic
            article={fallbackArticle}
          />
        </div>
        <div className='w-full lg:w-3/12 bg-base-300'>
          <CategoryItemPublic
            category={fallbackCategory}
          />
        </div>
      </DoubleColLayout>
    </LayoutPublic>
  </>
);

export default Category;
