import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ArticlePost, Markdown, ArticleSingle, ArticleSubmit } from 'types/article';
import { useForm } from "react-hook-form";
import { PostPreview } from 'components/articles/PostPreview'
import { CategorySelect } from 'components/forms/CategorySelect';
import type ReactTagsInput from 'components/forms/TagsInput';
import { CategoryInput } from 'types/category';
import { Tag, RHFTags } from 'types/tag';

// onKeyDownが動作しないので、SSR無効にして読み込み
// ! arrow-body-styleに沿ってしまうとError: .then undefinedになるため無効化
const TagsInput = dynamic(
  () => import('components/forms/TagsInput'), // eslint-disable-line arrow-body-style
  {ssr: false}
) as typeof ReactTagsInput;

export function PostForm(props: {article: ArticleSingle | null, submitHandle: ArticleSubmit} ): JSX.Element {

  // Markdownプレビュー用に入力値を取得
  const [md, setMd] = useState<Markdown>('');

  // タグ保管用に全てのタグを取得する
  const [tagsInput, setTagsInput] = useState<RHFTags>([
    { id:'', text: '' },
  ]);

  // カテゴリ用
  const [categoryInput, setCategoryInput] = useState<CategoryInput>(null);

  const setData = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    e.preventDefault();
    setMd(e.target.value);
  };

  const { register, getValues, handleSubmit, setValue } = useForm<ArticlePost>();

  const postHandle = (): void => {
    const param = getValues();
    const tags = JSON.stringify(tagsInput);
    props.submitHandle({
      ...param,
      image_id: null,
      tags,
      category_id: categoryInput
    });
  };

  // 初期値があった場合は設定する
  useEffect(() => {
    if (props.article) {
      setValue('permalink', props.article.permalink);
      setValue('title', props.article.title);
      setValue('entry', props.article.entry);
      setValue('publish_at', props.article.publish_at ? true : false);
      setMd(props.article.entry);
      // TagsInPutに合わせて設定する
      setTagsInput(props.article.tags.map((item: Tag) => {
        return {
          id: `${item.id}`,
          text: item.text,
        } 
      }));
    };
  }, [props.article]);


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