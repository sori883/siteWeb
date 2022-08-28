import Image from 'next/image';
import {
  ImageItem,
} from 'features/imageLibrary/types/imageLibrary';
import { imageLoader } from 'components/lib/ImageLoader';
import { setImageInput } from 'features/imageLibrary/types/select';
import { Button } from 'components/elements/button';

export function ImgSelectItem(props: {
  image: ImageItem,
  setter: setImageInput
}): JSX.Element {
  const handleClick = ():void => {
    props.setter(props.image);
  };

  return (
    <div>
      <p>{props.image.title}</p>
      <div style={{position: 'relative', width: '150px', height: '100px'}} >
        <Image
          loader={imageLoader}
          src={props.image.path}
          width='150px'
          alt='a picture'
          layout='fill'
          objectFit='contain'
        />
      </div>
      <Button size='sm' onClick={handleClick}>選択</Button>
    </div>
  );
}