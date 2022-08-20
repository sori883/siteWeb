import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import disableScroll from 'disable-scroll';
import { useOverlay } from './useOverlay';
import clsx from 'clsx';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-3xl',
  lg: 'max-w-7xl',
};

const wrapperClassName = 
  'fixed inset-0 flex justify-center items-center z-[998] p-1';

const overlayClassName = 
  'fixed inset-0 bg-black/[.5] z-[999]';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
  close: () => void,
  elementId: '__next' | string;
  size?: keyof typeof sizes;
};

export interface ModalOptions {
  preventScroll?: boolean;
  closeOnOverlayClick?: boolean;
};

export type UseModal = (
  elementId: string,
  options?: ModalOptions,
  size?: keyof typeof sizes,
) => [
  ModalWrapper: React.FC<{ children: React.ReactNode }>,
  open: () => void,
  close: () => void,
  isOpen: boolean
];

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen = false,
  onOverlayClick,
  close,
  elementId = 'root',
  size = 'md'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOverlay(isOpen, close, ref);

  if (isOpen === false) {
    return null;
  }

  return createPortal(
    <div role='dialog' aria-modal className={wrapperClassName}>
      <div className={overlayClassName} onClick={onOverlayClick} />
      <div ref={ref}
        className={clsx(
          'relative overflow-y-auto z-[1000] max-h-[48rem] w-11/12 p-5 bg-neutral-focus drop-shadow-md',
          sizes[size],
        )}
      >
        <label onClick={close} className="btn btn-sm btn-circle absolute right-2 top-2 bg-neutral">✕</label>
        {children}
      </div>
    </div>,
    document.getElementById(elementId) as HTMLElement
  );
};

export const useModal: UseModal = (elementId = 'root', options = {}, size = 'md') => {
  const { preventScroll = false, closeOnOverlayClick = true } = options;
  const [isOpen, setOpen] = useState<boolean>(false);
  const open = useCallback(() => {
    setOpen(true);
    if (preventScroll) {
      disableScroll.on();
    }
  }, [setOpen, preventScroll]);
  const close = useCallback(() => {
    setOpen(false);
    if (preventScroll) {
      disableScroll.off();
    }
  }, [setOpen, preventScroll]);
  const onOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (closeOnOverlayClick) {
      close();
    }    
  }, [closeOnOverlayClick, close]);

  const ModalWrapper = useCallback(
    ({ children }: { children: React.ReactNode }) => (
      <Modal isOpen={isOpen} onOverlayClick={onOverlayClick} close={close} elementId={elementId} size={size}>
        {children}
      </Modal>
    ),
    [isOpen, close, elementId]
  );

  return [ModalWrapper, open, close, isOpen];
};