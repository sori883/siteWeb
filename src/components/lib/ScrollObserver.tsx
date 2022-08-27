import { memo, useEffect, useRef } from "react";
import { Spinner } from 'components/elements/spinner';

export const ScrollObserver = memo((props: {
  onIntersect: () => void,
  interval: number,
  isActiveObserver: boolean
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if(ref.current === null) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].intersectionRatio >= .8 && props.interval > 0) {
          observer.disconnect();
          props.onIntersect();
        }
      },
      {
        threshold: .8,
      }
    );
    observer.observe(ref.current);
  }, [props.interval]);

  return (
    <>
      {!props.isActiveObserver ? (
        <div ref={ref}>
          <Spinner size='xl' className='mx-auto' />
        </div>
      ) : null} 
    </>
  );
});