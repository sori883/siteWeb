/*
  fetchArticle Response 
  Edit Param
*/
export type CategoryPublic = {
  id: number;
  name: string;
  slug: string;
};

/* fetchAllArticles Response */
export type FetchCategoryListPublic = {
  data: CategoryPublic[];
} 
