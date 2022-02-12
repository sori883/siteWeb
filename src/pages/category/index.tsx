import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { CategoryList } from 'components/categories/CategoryList';
import { CategoryCreateForm } from 'components/categories/CategoryCreateForm';


const CategoryIndex: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <h1>LIST</h1>
      <SidebarManage />
      <CategoryCreateForm />
      <CategoryList />

    </LayoutManage>
  );
};

export default CategoryIndex;
