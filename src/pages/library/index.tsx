import type { NextPage } from 'next';
import { LayoutManage } from 'components/manages/Layout';
import { ImgUpload } from 'features/imageLibrary/components/ImgUpload';
import { ImgList } from 'features/imageLibrary/components/ImgList';
import { useRequireLogin } from 'features/auth/api/useRequireLogin';


const LibraryIndex: NextPage = () => {
  useRequireLogin();
  
  return (
    <>
      <LayoutManage>
        <h2>画像アップロード</h2>
        <ImgUpload />
        <ImgList />
      </LayoutManage>
    </>
  );
};

export default LibraryIndex;