import {
  ImageItem,
} from 'features/imageLibrary/types/imageLibrary';
import { setImageInput } from 'features/imageLibrary/types/select';
import { useModal } from 'components/modal';
import { ScrollObserver } from 'components/lib/ScrollObserver';
import { ImgSelectItem } from 'features/imageLibrary/components/ImgSelectItem';
import { Button } from 'components/elements/button';

export function ImgSelectModal(
  props: {
    images: ImageItem[],
    setImageInput: setImageInput,
    interval: number,
    isLast: boolean,
    loadMoreImages: () => void,
  }
): JSX.Element {
  const [Modal, open] = useModal('__next', {
    preventScroll: false
  }, 'md');

  return (
    <>
      <div>
        <Button size='sm' onClick={open}>アイキャッチを選択する</Button>
        <Modal>
          <div className='grid grid-cols-2'>
            {
              props.images.map((item: ImageItem) => (
                <ImgSelectItem
                  image={item}
                  key={item.id}
                  setter={props.setImageInput}
                />
              ))
            }
          </div>
          <ScrollObserver
            onIntersect={props.loadMoreImages}
            interval={props.interval}
            isActiveObserver={props.isLast}
          />
        </Modal>
      </div>
    </>
  );
}