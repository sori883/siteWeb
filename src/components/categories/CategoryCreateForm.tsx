import { useForm, SubmitHandler  } from "react-hook-form";
import { useCategories } from 'hooks/category';
import { CategoryActionParam } from 'types/category/category';
import { getUrlParam } from 'lib/libs';

export function CategoryCreateForm(): JSX.Element {
  // ページを取得
  const defaultPage: number = Number(getUrlParam('page')) || 1;
  const { createAction } = useCategories(defaultPage);

  const {  register, handleSubmit, formState: { errors } } = useForm<CategoryActionParam>();

  const onSubmit: SubmitHandler<CategoryActionParam> = (data) => createAction(data);

  return (
    <>
      <h1>カテゴリ作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>name</label>
        <input
          {...register('name', {
            required: '必ず入力してください',
            maxLength: {
              value: 20,
              message: '20文字以内で入力してください'
            },
          })}
        />
        { errors.name?.message }
        <label>slug</label>
        <input
          {...register('slug', {
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
        { errors.slug?.message }
        <input type="submit" />
      </form>
    </>
  );
}