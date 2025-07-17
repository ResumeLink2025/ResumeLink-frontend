'use client';

import type { HTMLAttributes } from 'react';
import { useEffect } from 'react';

import Portal from '../Portal';

type ModalProps = {
  isOpen: boolean;
  close?: () => void;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Modal = ({ isOpen, close, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Portal isOpen={isOpen}>
      <div
        onClick={close}
        className="fixed flex items-center justify-center size-full top-0 left-0 z-[1000] bg-black/50"
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
