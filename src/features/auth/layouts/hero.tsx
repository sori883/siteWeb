import { ReactNode } from 'react';

type Props = {
  title: string;
  description: string;
  children: ReactNode;
}

export function Hero({ 
  title,
  description,
  children
}: Props): JSX.Element {
  return (
    <>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>{ title }</h1>
            <p className='py-6'>
              { description }
            </p>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <div className='card-body'>
              { children }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}