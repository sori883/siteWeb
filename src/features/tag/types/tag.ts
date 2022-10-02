/* list */
export type FetchAllTagList = {
  data: [TagItem];
  lastPage: number;
  links: unknown;
  meta: unknown;
}

export type TagItem = {
  id: number,
  text: string,
};

/* tag */
export type Tag = {
  id: number,
  text: string,
};

/* tag hook */
export type TagActionParam = {
  text: string,
};

/* tagをpostするときのinput */
export type TagsInput = {
  id: string,
  text: string, 
}[];