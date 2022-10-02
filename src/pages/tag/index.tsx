import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';
import { TagList } from 'features/tag/components/TagsList';


const TagIndex: NextPage = () => {
  useRequireLogin();

  return (
    <LayoutManage>
      <h1>LIST</h1>
      <TagList />

    </LayoutManage>
  );
};

export default TagIndex;
