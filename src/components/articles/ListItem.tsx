import React from "react";
import { ArticlesItem } from 'types/article';

export function ArticleListItem(props: {article: ArticlesItem}): JSX.Element {
  return (
    <>
      <p>{props.article.id}</p>
      <p>{props.article.title}</p>
      <p>{props.article.permalink}</p>
      <p>{props.article.publish_at}</p>
    </>
  );
}