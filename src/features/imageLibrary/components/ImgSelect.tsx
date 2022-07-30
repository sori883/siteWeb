import { ImageItem } from 'features/imageLibrary/types/imageLibrary';
import { ScrollObserver } from 'components/lib/ScrollObserver';
import { ImgSelectItem } from 'features/imageLibrary/components/ImgSelectItem';
import { setImageInput } from 'features/imageLibrary/types/select';


export function ImgSelect(props: {
  images: ImageItem[],
  setImageInput: setImageInput,
  interval: number,
  isLast: boolean,
  loadMoreImages: () => void,
}): JSX.Element {

  return (
    <>
      {
        props.images.map((item: ImageItem) => (
          <ImgSelectItem
            image={item}
            key={item.id}
            setter={props.setImageInput}
          />
        ))
      }
      <ScrollObserver
        onIntersect={props.loadMoreImages}
        interval={props.interval}
        isActiveObserver={props.isLast}
      />
    </>
  );
}