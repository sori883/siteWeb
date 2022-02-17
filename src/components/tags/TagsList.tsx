import { useState, useEffect } from 'react';
import { Tag, Tags } from 'types/tag';
import { fetchAllTags } from 'requests/tag/allTags';
import { TagsListItem  } from 'components/tags/TagsListItem';

export function TagList(): JSX.Element {
  const [tags, SetTags] = useState<Tags>([{ 
    id: 0,
    text: ''
  }]);

  // 記事を取得
  useEffect(() => {
    (async function (): Promise<void> {
      try {
        const fetchTags = await fetchAllTags();
        SetTags(fetchTags);
      }catch(e){
        console.log(e)
      }
    })();
  },[]);

  return (
    <>
      {
        tags.map((item: Tag) => {
          return (
            <TagsListItem
              tag={item}
              key={item.id}
            />
          )
        })
      }
    </>
  )
}