import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

export function DoubleColLayout({ children }: Props): JSX.Element {
  return (
    <>
      <div className='flex flex-wrap'>
        { children }
      </div>
    </>
  );
}