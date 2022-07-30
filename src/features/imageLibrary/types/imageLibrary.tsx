export type ImageItem = {
  id: number | null,
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
