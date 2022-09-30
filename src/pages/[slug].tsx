import type { NextPage, GetStaticPaths, GetStaticProps  } from 'next';
import { ArticlePublic } from 'features/article/types/articlePublic';
import { CategoryPublic } from 'features/category/types/categoryPublic';
import { fetchCategoryIndex } from 'features/category/api/categoryPublic';
import { fetchArticleCategory } from 'features/article/api/articleCategoryPublic';
import { LayoutPublic } from 'components/publicLayout/Layout';
import { DoubleColLayout } from 'components/publicLayout/DoubleColLayout';
import { ArticleListPublic } from 'features/article/components/ArticleListPublic';
import { CategoryItemPublic } from 'features/category/components/CategoryItemPublic';

type Props =  {
  fallbackArticle: ArticlePublic[];
  slug: string;
  fallbackCategory: CategoryPublic[];
}

export const getStaticPaths: GetStaticPaths  = async () => {
  const res = await fetchCategoryIndex();
  const paths = res.map((item: CategoryPublic) => ({ params: {slug: `${item.slug}`}}));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params
}) => {
  if (typeof params?.slug !== 'string') {
    return { notFound: true };
  }
  const res = (await fetchArticleCategory(params.slug));
  const articleData = res.data;
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
        <div className='w-full lg:w-9/12 bg-blue-700'>
          <ArticleListPublic
            fallbackArticle={fallbackArticle}
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
