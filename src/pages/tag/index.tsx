import type { NextPage } from 'next';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { useRequireLogin } from 'hooks/auth/useRequireLogin';
import { TagList } from 'components/tags/TagsList';


const TagIndex: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <h1>LIST</h1>
      <SidebarManage />
      <TagList />

    </LayoutManage>
  );
};

export default TagIndex;
