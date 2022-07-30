export type Category = {
  id: number;
  name: string;
  slug: string;
}

/* list */
export type fetchAllCategoryList = {
  data: [CategoryItem];
  lastPage: number;
  links: unknown;
  meta: unknown;
}

export type CategoryItem = {
  id: number,
  name: string,
  slug: string,
};

/* param */
export type CategoryActionParam = {
  name: string;
  slug: string;
}