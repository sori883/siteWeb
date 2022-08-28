export type ImageItem = {
  id: number,
  title: string,
  path: string,
};

/* fetchAllImage Response */
export type FetchImagesList = {
  data: ImageItem[];
  lastPage: number;
  links: unknown;
  meta: unknown;
};

export type CreateActionParam = File[];
