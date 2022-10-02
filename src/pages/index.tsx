import type { NextPage, GetStaticProps  } from 'next';
import { ArticlePublic } from 'features/article/types/articlePublic';
import { CategoryPublic } from 'features/category/types/categoryPublic';
import { fetcharticleIndex } from 'features/article/api/articlePublic';
import { fetchCategoryIndex } from 'features/category/api/categoryPublic';
import { LayoutPublic } from 'components/publicLayout/Layout';
import { DoubleColLayout } from 'components/publicLayout/DoubleColLayout';
import { ArticleListPublic } from 'features/article/components/ArticleListPublic';
import { CategoryItemPublic } from 'features/category/components/CategoryItemPublic';

type Props = {
  fallbackArticle: ArticlePublic[];
  fallbackCategory: CategoryPublic[];
}

export const getStaticProps: GetStaticProps = async () => {
  const articleData = (await fetcharticleIndex()).data;
  const categoryData = await fetchCategoryIndex();

  return {
    props: {
      fallbackArticle: articleData,
      fallbackCategory: categoryData,
    },
    revalidate: false,
  };
};

const Home: NextPage<Props> = ({
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

export default Home;
