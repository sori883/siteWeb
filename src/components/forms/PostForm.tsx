import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArticlePost, Markdown} from 'types/article';
import { InputTagsForm } from 'types/tag';
import { useForm } from "react-hook-form";
import { PostPreview } from 'components/articles/PostPreview'
import { CategorySelect } from 'components/forms/CategorySelect';
import type ReactTagsInput from 'components/forms/TagsInput';
import { useArticlePost } from 'hooks/article/useArticlePost';
import { CategoryInput } from 'types/category';

// onKeyDownが動作しないので、SSR無効にして読み込み
// ! arrow-body-styleに沿ってしまうとError: .then undefinedになるため無効化
const TagsInput = dynamic(
  () => import('components/forms/TagsInput'), // eslint-disable-line arrow-body-style
  {ssr: false}
) as typeof ReactTagsInput;

// 記事登録用フック
const { articlePost } = useArticlePost();

export function PostForm(): JSX.Element {
  // Markdownプレビュー用に入力値を取得
  const [md, setMd] = useState<Markdown>('');

  // タグ保管用に全てのタグを取得する
  const [tagsInput, setTagsInput] = useState<InputTagsForm>([
    { id: '', text: '' },
  ]);

  // カテゴリ用
  const [categoryInput, setCategoryInput] = useState<CategoryInput>(null);


  const setData = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    e.preventDefault();
    setMd(e.target.value);
  };
    
  const { register, getValues, handleSubmit } = useForm<ArticlePost>();
  const postHandle = (): void => {
    const param = getValues();
    const tags = JSON.stringify(tagsInput);

    articlePost({
      ...param,
      image_id: null,
      tags,
      category_id: categoryInput
    });
  };


  return (
    <>
      <h1>new post</h1>
      <form onSubmit={handleSubmit(postHandle)}>
        <label>permalink</label>
        <input {...register('permalink')} />
        <label>title</label>
        <input {...register('title')} />
        <label>entry</label>
        <textarea
          {...register('entry')}
          onChange={setData} 
        />
        <label>公開する</label>
        <input type="checkbox" {...register('publish_at')}  />
        <CategorySelect
          setCategoryInput = {setCategoryInput}
        />
        <TagsInput
          tagsInput = {tagsInput}
          setTagsInput = {setTagsInput}
        />
        <input type="submit" />
      </form>
      <PostPreview markdown={md} />
    </>
  );
}