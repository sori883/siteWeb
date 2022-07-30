import { useState } from 'react';
import { useForm, SubmitHandler  } from "react-hook-form";
import { ArticlePreview } from 'components/MarkdownPreview';
import { CategorySelect } from 'features/category/components/CategorySelect';
import { TagsSelect } from 'features/tag/components/TagsSelect';
import { useSelectCategories } from 'features/category/api/select';
import { useSelectTags } from 'features/tag/api/select';
import { Article, ArticleCreateParam } from 'features/article/types/article';
import { ImgSelect } from 'features/imageLibrary/components/ImgSelect';
import { useSelectImages } from 'features/imageLibrary/api/select';

type SubmitAction = (article: Article) => Promise<void>;

type ArticleForm = {
  permalink: string;
  title: string;
  entry: string;
  publish_at: boolean;
}

export function ArticleForm(props: {article: Article | ArticleCreateParam, submitAction: SubmitAction} ): JSX.Element {

  // Markdownプレビュー用に入力値を取得
  const [md, setMd] = useState<string>(props.article.entry);
  // markdownのonChange
  const setData = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    e.preventDefault();
    setMd(e.target.value);
  };

  // タグ保管用に全てのタグを取得する
  const {
    selectTags,
    tagsInput,
    createInputTag,
    setTagsInput
  } = useSelectTags(props.article.tags);
 
  // カテゴリー選択用
  const {
    selectCategories,
    categoryInput,
    setCategoryInput,
  } = useSelectCategories(props.article.category?.id ?? null);

  // 画像セレクト
  const {
    imageInput,
    setImageInput,
    images,
    isLast,
    loadMoreImages,
    interval
  } = useSelectImages({}, props.article.image_id);

  // 記事本体のフォーム
  const { register, handleSubmit, formState: { errors } } = useForm<ArticleForm>();

  // 登録処理
  const onSubmit: SubmitHandler<Article> = (data) => {
    const InputData = {
      ...data,
      category_id: categoryInput,
      image_id: imageInput,
      tags: createInputTag(tagsInput)
    };
  
    const updateData: Article = {...props.article, ...InputData};
    return props.submitAction(updateData);
  };

  return (
    <>
      <p className="text-3xl font-bold underline text-sky-400/100">
        Hello world!
      </p>
      {
        selectTags ?
          <TagsSelect
            initVal={props.article.tags}
            value={tagsInput}
            setTagsInput={setTagsInput}
            tags={selectTags}
          />
          :
          <div>読込中</div>
      }
      <h1>new post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>permalink</label>
        <input
          defaultValue={props.article.permalink}
          {...register('permalink', {
            required: '必ず入力してください',
            maxLength: {
              value: 20,
              message: '20文字以内で入力してください'
            },
            pattern: {
              value: /^[0-9a-zA-Z_-]+$/,
              message: '使用出来ない文字が含まれています'
            }
          })}
        />
        { errors.permalink?.message }
        <label>title</label>
        <input
          defaultValue={props.article.title}
          {...register('title', {
            required: '必ず入力してください',
            maxLength: {
              value: 100,
              message: '100文字以内で入力してください'
            },
          })}
        />
        { errors.title?.message }
        <label>entry</label>
        <textarea
          defaultValue={props.article.entry}
          {...register('entry', {
            required: '必ず入力してください',
            maxLength: {
              value: 30000,
              message: '30000文字以内で入力してください'
            },
          })}
          onChange={setData} 
        />
        { errors.entry?.message }
        <label>公開する</label>
        <input type="checkbox"
          {...register('publish_at')} 
        />
        {
          selectCategories ?
            <CategorySelect
              categories={selectCategories}
              initVal={props.article.category}
              setCategoryInput={setCategoryInput}
            />
            :
            <div>読込中</div>
        }
        <input type="submit" />
      </form>
      <ArticlePreview markdown={md} />
      {
        images ?
          <ImgSelect
            images={images}
            setImageInput={setImageInput}
            interval={interval}
            isLast={isLast}
            loadMoreImages={loadMoreImages}
          />
          :
          <div>読込中</div>
      }
    </>
  );
}