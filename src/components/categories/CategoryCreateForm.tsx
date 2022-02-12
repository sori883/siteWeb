import { useForm } from "react-hook-form";
import { CategoryCreateForm } from 'types/category';
import { useCategoryStore } from 'hooks/category/useCategoryStore';

export function CategoryCreateForm(): JSX.Element {
  const { categoryStore } = useCategoryStore();

  const { register, getValues, handleSubmit } = useForm<CategoryCreateForm>();

  const submitHandle = (): void => {
    categoryStore(getValues());
  };

  return (
    <>
      <h1>カテゴリ作成</h1>
      <form onSubmit={handleSubmit(submitHandle)}>
        <label>name</label>
        <input {...register('name')} />
        <label>slug</label>
        <input {...register('slug')} />
        <input type="submit" />
      </form>
    </>
  );
}