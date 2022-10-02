import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';
import { CategoryList } from 'features/category/components/CategoryList';
import { CategoryCreateForm } from 'features/category/components/CategoryCreateForm';


const CategoryIndex: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <h1>LIST</h1>
      <CategoryCreateForm />
      <CategoryList />

    </LayoutManage>
  );
};

export default CategoryIndex;
