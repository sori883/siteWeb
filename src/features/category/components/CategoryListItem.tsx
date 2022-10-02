import { useState } from 'react';
import { Form, InputField } from 'components/form';
import { Button } from 'components/elements/button';
import { Card } from 'components/elements/card';
import {
  Category,
  CategoryItem,
  CategoryActionParam,
} from 'features/category/types/category';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(1, '必ず入力してください').max(20, { message: '20文字以内で入力してください' }),
  slug: z.string()
    .min(1, { message: '必ず入力してください' })
    .max(20, { message: '20文字以内で入力してください' })
    .regex(/^[0-9a-zA-Z_-]+$/, { message: '使用出来ない文字が含まれています' })
});

export function CategoryListItem(props: {
  category: CategoryItem,
  updateAction: (category: Category) => Promise<void>,
  deleteAction: (category: CategoryItem) => Promise<void>
}): JSX.Element {
  // 編集フォーム切り替え用ステート
  const [toggle, setToggle] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCategoryDelete = async ():Promise<void> => {
    setIsLoading(true);
    await props.deleteAction(props.category).finally(() => {
      setIsLoading(false);
    });
  };

  const handleToggleElement = ():void => {
    setToggle(!toggle);
  };
  
  const submit = async (data: CategoryActionParam): Promise<void> => {
    const updateData = {
      ...props.category,
      ...data
    };
    
    setToggle(!toggle);
    return props.updateAction(updateData);
  };

  return (
    <Card>
      { toggle ? 
        <>
          <h2 className='card-title'>{props.category.name}</h2>
          <p>{props.category.slug}</p>
        </>
        : 
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
                defaultValue={props.category.name}
                error={formState.errors['name']}
                registration={register('name')}
              />
              <InputField
                type='text'
                label='スラッグ'
                defaultValue={props.category.slug}
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
      }
      <div className='card-actions justify-end'>
        <Button
          variant='primary'
          size='sm'
          onClick={handleToggleElement}>
          {toggle ? '編集' : '中止'}
        </Button>
        <Button
          variant='danger'
          size='sm'
          isLoading={isLoading}
          onClick={handleCategoryDelete}>
            削除
        </Button>
      </div>
    </Card>
  );
}