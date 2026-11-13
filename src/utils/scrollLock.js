import { useEffect } from 'react';

// Shared page-scroll lock. Several overlays can be open at once (modal, then
// video on top), so we count them and only restore scrolling when the last one closes.
let locks = 0;
let savedOverflow = '';

export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return;
    if (locks === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    locks += 1;
    return () => {
      locks -= 1;
      if (locks === 0) document.body.style.overflow = savedOverflow;
    };
  }, [active]);
}
