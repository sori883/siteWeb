import type { NextPage } from 'next';
import { SidebarManage } from 'components/layouts/SidebarManage';
import { LayoutManage } from 'components/layouts/LayoutManage';
import { ImgUpload } from 'components/imageLibrary/ImgUpload';
import { ImgList } from 'components/imageLibrary/ImgList';


const LibraryIndex: NextPage = () => (
  <>
    <LayoutManage>
      <h2>画像アップロード</h2>
      <SidebarManage />
      <ImgUpload />
      <ImgList />
    </LayoutManage>
  </>
);

export default LibraryIndex;