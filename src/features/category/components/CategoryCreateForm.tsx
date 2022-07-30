import { useState } from 'react';
import { useCategories } from 'features/category/api/category';
import { Button } from 'components/elements/button';
import { CategoryActionParam } from 'features/category/types/category';
import getUrlParam from 'util/getUrlParam';
import { Form, InputField } from 'components/form';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, '必ず入力してください').max(20, { message: '20文字以内で入力してください' }),
  slug: z.string()
    .min(1, { message: '必ず入力してください' })
    .max(20, { message: '20文字以内で入力してください' })
    .regex(/^[0-9a-zA-Z_-]+$/, { message: '使用出来ない文字が含まれています' })
});

export function CategoryCreateForm(): JSX.Element {
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  const { createAction } = useCategories(defaultPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit = async (data: CategoryActionParam): Promise<void> => {
    setIsLoading(true);

    return createAction(data).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <h1>カテゴリ作成</h1>
      <Form<CategoryActionParam, typeof schema>
        onSubmit={(data):void => {
          submit(data);
        }}
        schema={schema}
      >
        {({ register, formState }): JSX.Element => (
          <>
            <InputField
              type='text'
              label='カテゴリ名'
              error={formState.errors['name']}
              registration={register('name')}
            />
            <InputField
              type='text'
              label='スラッグ'
              error={formState.errors['slug']}
              registration={register('slug')}
            />
            <Button
              type='submit'
              className='mt-2'
              variant='primary'
              isLoading={isLoading}
              size='sm'
            >
              登録
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
