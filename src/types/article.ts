// マークダウンプレビューのState
export type Markdown = string;

export type ArticlesList = [ArticlesItem];

// 記事一覧
export type ArticlesItem = {
  id: number | null,
  title: string,
  permalink: string,
  publish_at: string,
};

export type ArticlesItemId = number;

// PostFromのsubmitHandleの型
export type ArticleSubmit = (req: ArticlePostReqest) => Promise<void>;

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

export type ArticleStoreHook = {
  articleStore: (req: ArticlePostReqest) => Promise<void>;
};

export type ArticleUpdateHook = {
  articleUpdate: (req: ArticlePostReqest) => Promise<void>;
};

export type ArticleDeleteHook = {
  articleDelete: (req: ArticlesItemId) => Promise<void>;
};

export type ArticleSingle = {
  id: number,
  permalink: string;
  title: string;
  entry: string;
  publish_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags: [{
    id: number;
    text: string;
  }]
};
