import { ReactNode } from 'react';
import clsx from 'clsx';

export type CardProps = {
  className?: string;
  children: ReactNode;
};

export const Card = ({className = '', children }: CardProps): JSX.Element  => (
  <>
    <div className={clsx(
      'card bg-neutral text-neutral-content rounded-none',
      className
    )}>
      <div className='card-body py-3'>
        { children }
      </div>
    </div>
  </>
);