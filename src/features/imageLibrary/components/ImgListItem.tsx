import { useState } from 'react';
import { ImageItem } from 'features/imageLibrary/types/imageLibrary';
import { Button } from 'components/elements/button';
import { FigureCard } from 'components/elements/figureCard';



export function ImgListItem(props: {
  image: ImageItem,
  deleteAction: (images: ImageItem) => Promise<void>; 
}): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async ():Promise<void> => {
    setIsLoading(true);
    await props.deleteAction(props.image).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <FigureCard
        path={props.image.path}
        alt='pictureeeeee'
      >
        <h2 className="card-title">{props.image.title}</h2>
        <div className="card-actions justify-end">
          <Button
            variant='primary'
            size='sm'
            className='mx-1 mb-1'
            isLoading={isLoading}
            onClick={handleDelete}>
            削除
          </Button>
        </div>
      </FigureCard>
    </>
  );
}