import { useState, useEffect } from 'react';
import { ArticlesList, ArticlesItem } from 'types/article';
import { fetchAllArticles } from 'requests/article/allArticles';
import { ArticleListItem } from 'components/articles/ArticleListItem'

export function ArticleList(): JSX.Element {
  const [articles, SetArticles] = useState<ArticlesList>([{ 
    id: null,
    title: '',
    permalink: '',
    publish_at: '',
  }]);

  // 記事を取得
  useEffect(() => {
    (async function (): Promise<void> {
      try {
        const fetchArticles = await fetchAllArticles();
        SetArticles(fetchArticles);
      }catch(e){
        console.log(e)
      }
    })();
  },[]);

  return (
    <>
      {
        articles.map((item: ArticlesItem) => {
          return (
            <ArticleListItem
              article={item}
              key={item.id}
            />
          )
        })
      }
    </>
  )
}