import Image from 'next/image';
import {
  ImageItem,
} from 'types/image/imageLibrary';
import { imageLoader } from 'components/lib/ImageLoader';
import { setImageInput } from 'types/selector/imageSelector';

export function ImgSelectItem(props: {
  image: ImageItem,
  setter: setImageInput
}): JSX.Element {
  const handleClick = ():void => {
    props.setter(props.image.id);
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
      <button onClick={handleClick}>選択</button>
      <p>{props.image.path}</p>
    </>
  );
}