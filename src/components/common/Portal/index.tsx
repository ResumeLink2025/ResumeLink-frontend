import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Portal = ({ isOpen, children }: PortalProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById('portal-root');
    setElement(element);
  }, []);

  if (typeof window == 'undefined' || !element) {
    return null;
  }

  return isOpen ? createPortal(children, element) : null;
};

export default Portal;
