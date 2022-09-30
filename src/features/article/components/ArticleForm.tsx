import { useState } from 'react';
import { SubmitHandler } from "react-hook-form";
import { ArticlePreview } from 'components/MarkdownPreview';
import { CategorySelect } from 'features/category/components/CategorySelect';
import { TagsSelect } from 'features/tag/components/TagsSelect';
import { useSelectCategories } from 'features/category/api/select';
import { useSelectTags } from 'features/tag/api/select';
import { Article, ArticleCreateParam, ArticlePostParam } from 'features/article/types/article';
import { useSelectImages } from 'features/imageLibrary/api/select';
import { Form, InputField, CheckBoxField, TextAreaField } from 'components/form';
import { Button } from 'components/elements/button';
import * as z from 'zod';
import { ImgSelectModal } from 'features/imageLibrary/components/imgSelectModal';
import { ThumbnailView } from 'features/article/components/ThumbnailView';
import { Spinner } from 'components/elements/spinner';

type SubmitAction = (article: ArticlePostParam, slug: string | undefined) => Promise<void>;

const schema = z.object({
  permalink: z.string().min(1, { message: 'パーマリンクを入力してください' })
    .max(20, { message:  '20文字以内で入力してください' })
    .regex(/^[0-9a-zA-Z_-]+$/, { message: '20文字以内で入力してください'}),
  title: z.string().min(1, { message: 'タイトルを入力してください' })
    .max(100, { message: '100文字以内で入力してください' }),
  entry: z.string().min(1, { message: '本文を入力してください' })
    .max(30000, { message:  '30000文字以内で入力してください' }),
  publish_at: z.boolean(),
});

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
  } = useSelectImages({}, props.article.image);

  // 登録処理
  const action: SubmitHandler<ArticlePostParam> = (data) => {
    const InputData = {
      ...data,
      category_id: categoryInput,
      image_id: imageInput?.id ?? null,
      tags: createInputTag(tagsInput)
    };
  
    const updateData: ArticlePostParam = {...props.article, ...InputData};
    console.log(categoryInput);
    console.log(selectCategories?.data.filter((category) => category.value === categoryInput)[0]);
    const slug =  selectCategories ? 
      selectCategories.data.filter((category) => category.value === categoryInput)[0].slug
      :
      undefined;
    return props.submitAction(updateData, slug);
  };
  return (
    <div className='h-screen grid grid-cols-1 xl:grid-cols-4 gap-3'>
      <div className='col-span-3'>
        <Form<ArticlePostParam, typeof schema>
          onSubmit={(data):void => {
            action(data);
          }}
          schema={schema}
        >
          {({ register, formState }): JSX.Element => (
            <>
              <InputField
                type='text'
                placeholder='タイトルを入力してください'
                error={formState.errors['title']}
                registration={register('title')}
                defaultValue={props.article.title}
                className={'mb-3'}
              />
              <InputField
                type='text'
                placeholder='パーマリンクを入力してください'
                error={formState.errors['permalink']}
                registration={register('permalink')}
                defaultValue={props.article.permalink}
                className={'mb-3'}
              />
              <TextAreaField
                placeholder='記事本文を入力してください'
                className='h-[40rem] mb-3'
                error={formState.errors['entry']}
                registration={register('entry')}
                defaultValue={props.article.entry}
                onChange={setData}
              />
              <CheckBoxField
                label='公開する'
                error={formState.errors['publish_at']}
                registration={register('publish_at')}
                defaultChecked={props.article.publish_at ? true : false}
              />
              <Button
                size='md'
                className='mt-5'
                type='submit'
              >
                記事登録
              </Button>
              <ArticlePreview markdown={md} />
            </>
          )}
        </Form>
      </div>
      <div className='col-span-1'>
        <div className='mb-3'>
          {
            selectTags ?
              <TagsSelect
                initVal={props.article.tags}
                value={tagsInput}
                setTagsInput={setTagsInput}
                tags={selectTags}
              />
              :
              <div><Spinner size='sm' className='mx-auto' /></div>
          }
        </div>
        <div className='mb-3'>
          {
            selectCategories ?
              <CategorySelect
                categories={selectCategories}
                initVal={props.article.category}
                setCategoryInput={setCategoryInput}
              />
              :
              <div><Spinner size='sm' className='mx-auto' /></div>
          }
        </div>
        <div className='mb-3'>
          {
            images ?
              <ImgSelectModal
                images={images}
                setImageInput={setImageInput}
                interval={interval}
                isLast={isLast}
                loadMoreImages={loadMoreImages}
              />
              :
              <div><Spinner size='sm' className='mx-auto' /></div>
          }
        </div>
        <div className='h-52'>
          <ThumbnailView
            image={imageInput}
          />
        </div>
      </div>
    </div>
  );
}