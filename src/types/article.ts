// マークダウンプレビューのState
export type Markdown = string;

export type ArticlesList = [ArticlesItem];

export type ArticlesItem = {
  id: number | null,
  title: string,
  permalink: string,
  publish_at: string,
};

// tags-inputを除く投稿フォーム
export type ArticlePost = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
}

// tags-inputを除く投稿フォーム
export type ArticlePostReqest = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
  image_id: null | number;
  tags: string;
}

export type ArticlePostHook = {
  articlePost: (req: ArticlePostReqest) => Promise<void>;
};

