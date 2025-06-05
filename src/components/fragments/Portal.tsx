// components/fragments/Portal.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  wrapperId?: string;
}

export default function Portal({
  children,
  wrapperId = 'portal-wrapper',
}: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    // Jika element tidak ada, buat baru
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      // Hapus element jika kita yang membuatnya
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // Jika wrapperElement belum siap, return null
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  wrapperElement.style.position = 'fixed';
  wrapperElement.style.top = '0';
  wrapperElement.style.left = '0';
  wrapperElement.style.zIndex = '9999';
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
