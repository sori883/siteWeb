import { ImageItem } from 'types/image/imageLibrary';
import { ImgSelectItem } from 'components/imageLibrary/ImgSelectItem';
import { ScrollObserver } from 'components/lib/ScrollObserver';
import { setImageInput } from 'types/selector/imageSelector';


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