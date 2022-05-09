import Image from 'next/image';
import {
  ImageItem,
  DeleteAction
} from 'types/image/imageLibrary';
import { imageLoader } from 'components/lib/ImageLoader';

export function ImgListItem(props: {
  image: ImageItem,
  deleteAction: DeleteAction 
}): JSX.Element {
  const handleDelete = ():void => {
    props.deleteAction(props.image);
  };

  return (
    <>
      <p>{props.image.id}</p>
      <p>{props.image.title}</p>
      <div style={{position: 'relative', width: '100px', height: '100px'}} >
        <Image
          loader={imageLoader}
          src={props.image.path}
          alt='a picture'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <button onClick={handleDelete}>削除</button>
      <p>{props.image.path}</p>
    </>
  );
}