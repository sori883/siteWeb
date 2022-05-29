import { memo, useEffect, useRef } from "react";

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
        <div ref={ref} style={{ height: "50px", backgroundColor: "red" }}>
          <p>読み込み中...</p>
        </div>
      ) : null} 
    </>
  );
});