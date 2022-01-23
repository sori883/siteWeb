// マークダウンプレビューのState
export type Markdown = string;

export type ArticlesList = [ArticlesItem];

export type ArticlesItem = {
  id: ArticlesItemId,
  title: string,
  permalink: string,
  publish_at: string,
};

export type ArticlesItemId = number | null;

// tags-inputを除く投稿フォーム
export type ArticlePost = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  category: number;
}

// tags-inputを除く投稿フォーム
export type ArticlePostReqest = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image_id: null | number;
  category_id: null | number;
  tags: string;
}

export type ArticlePostHook = {
  articlePost: (req: ArticlePostReqest) => Promise<void>;
};

export type ArticleDeleteHook = {
  articleDelete: (req: ArticlesItemId) => Promise<void>;
};
