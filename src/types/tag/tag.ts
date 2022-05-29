import { Dispatch, SetStateAction } from "react";
import { Option } from 'types/selector/reactSelect';

/* list */
export type fetchAllTagList = {
  data: TagList;
  lastPage: number;
  links: unknown;
  meta: unknown;
}

export type TagList = [TagItem];

export type TagItem = {
  id: number,
  text: string,
};

/* tag */
export type Tag = {
  id: number,
  text: string,
};

export type Tags = Tag[];

/* tag hook */
// param
export type TagActionParam = {
  text: string,
};

// actions
export type UpdateAction = (tag: Tag) => Promise<void>;
export type DeleteAction = (tag: Tag) => Promise<void>;

export type TagsHook = {
  tags: fetchAllTagList | undefined;
  error: Error | undefined;
  deleteAction: DeleteAction;
  updateAction: UpdateAction;
};

/* tagをpostするときのinput */
export type TagsInput = {
  id: string,
  text: string, 
}[];

// inputのsetter
export type TagInputSetter = Dispatch<SetStateAction<Option[] | undefined>>;