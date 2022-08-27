import { ImageItem } from 'features/imageLibrary/types/imageLibrary';
import { imageLoader } from 'components/lib/ImageLoader';
import Image from 'next/image';

export function ThumbnailView(props: {
  image: ImageItem | null,
}): JSX.Element {
  return (
    <>
      { props.image ? 
        <>
          <p>{props.image.title}</p>
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image
              loader={imageLoader}
              src={props.image.path}
              layout='fill'
              objectFit='contain'
            />
          </div>
        </>
        :
        <>アイキャッチが選択されていません</>
      }
    </>
  );
}