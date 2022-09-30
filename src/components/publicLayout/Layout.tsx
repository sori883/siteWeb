import { ReactNode } from 'react';
import { Navbar } from 'components/publicLayout/Navbar';
import { Footer } from 'components/publicLayout/Footer';

type Props = {
  children: ReactNode;
}

export function LayoutPublic({ children }: Props): JSX.Element {
  return (
    <>
      <div className='grid grid-rows-[auto_1fr_auto] grid-cols-[100%] min-h-screen'>
        <Navbar />
        <div>
          { children }
        </div>
        <Footer />
      </div>
    </>
  );
}