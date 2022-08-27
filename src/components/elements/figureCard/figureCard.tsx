import { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { imageLoader } from 'components/lib/ImageLoader';

const sizes = {
  sm: 'w-60',
  md: 'w-80',
};

export type FigureCardProps = {
  path: string;
  alt?: string;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export const FigureCard = ({
  path,
  alt='picture',
  className = '',
  size = 'md',
  children
}: FigureCardProps): JSX.Element  => (
  <>
    <div className={clsx(
      'card card-compact rounded-none',
      sizes[size],
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