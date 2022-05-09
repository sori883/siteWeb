export type ImageItem = {
  id: number | null,
  title: string,
  path: string,
};

export type ImagesList = [ImageItem];

/* fetchAllImage Response */
export type FetchImagesList = {
  data: ImagesList;
  lastPage: number;
  links: unknown;
  meta: unknown;
};

export type CreateActionParam = File[];
export type CreateAction = (images: CreateActionParam) => Promise<void>;
export type DeleteAction = (images: ImageItem) => Promise<void>;

// return
export type ImageLibraryHook = {
  images: FetchImagesList | undefined;
  error: Error | undefined;
  createAction: CreateAction;
  deleteAction: DeleteAction;
};

/* image loder */
export type paramLoader = {
  src: string;
  width: number;
  quality?: number | undefined;
}