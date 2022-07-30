import { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { imageLoader } from 'components/lib/ImageLoader';

export type FigureCardProps = {
  path: string;
  alt?: string;
  className?: string;
  children: ReactNode;
};

export const FigureCard = ({
  path,
  alt='picture',
  className = '',
  children
}: FigureCardProps): JSX.Element  => (
  <>
    <div className={clsx(
      'card card-compact w-80 rounded-none',
      className
    )}
    >
      <figure>
        <div className='relative h-40 w-full'>
          <Image
            loader={imageLoader}
            src={path}
            alt={alt}
            layout='fill'
            objectFit='cover'
          />
        </div>
      </figure>
      <div className="bg-neutral text-neutral-content p-1">
        { children }
      </div>
    </div>
  </>
);