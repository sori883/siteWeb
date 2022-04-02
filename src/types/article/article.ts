import { SWRResponse } from "swr/dist/types";

/*
  fetchArticle Response 
  Edit Param
*/
export type Article = {
  id: number;
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image_id: null | number;
  category: null | {
    id: number;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    text: string;
  }[];
};

/* article form */
export type ArticleForm = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
}

/* article form submit function */
export type SubmitAction = UpdateAction;

/* article list */
export type ArticleItem = {
  id: number | null,
  title: string,
  permalink: string,
  publish_at: string,
};

export type ArticlesList = [ArticleItem];

/* fetchAllArticles Response */
export type FetchArticlesList = {
  data: ArticlesList;
  lastPage: number;
  links: unknown;
  meta: unknown;
};

/* actions */
export type ArticleCreateParam = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image_id: null | number;
  category: null | {
    id: number;
    name: string;
    slug: string;
  };
  tags: undefined;
};

export type CreateAction = (article: Article) => Promise<void>;
export type UpdateAction = (article: Article) => Promise<void>;
export type DeleteAction = (article: ArticleItem) => Promise<void>;
export type VisibleAction = (article: ArticleItem) => Promise<void>;

/* article hook return */
export type ArticleActionHook = {
  getItem: (id: number) => SWRResponse<Article>;
  createAction: CreateAction;
  updateAction: UpdateAction;
};

/* articles hook */
export type ArticlesHook = {
  articles: FetchArticlesList | undefined;
  error: Error | undefined;
  deleteAction: DeleteAction;
  visibleAction: VisibleAction;
};