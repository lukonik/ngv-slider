import { DestroyRef, inject } from '@angular/core';

interface PointerEventHandlers {
  onStart?: (event: PointerEvent) => void;
  onMove?: (event: PointerEvent) => void;
  onEnd?: (event: PointerEvent) => void;
}

/**
 * Sets up pointer interactions for the provided `target` using the document as the event host.
 */
export function setupPointerEvent(
  target: HTMLElement,
  document: Document,
  handlers: PointerEventHandlers
) {
  const { onStart, onMove, onEnd } = handlers;
  const destroyRef = inject(DestroyRef);

  const handlePointerEnd = (event: PointerEvent) => {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerEnd);
    document.removeEventListener('pointercancel', handlePointerEnd);
    onEnd?.(event);
  };

  const handlePointerMove = (event: PointerEvent) => {
    onMove?.(event);
  };

  const handlePointerStart = (event: PointerEvent) => {
    document.addEventListener('pointermove', handlePointerMove, { once: false });
    document.addEventListener('pointerup', handlePointerEnd, { once: false });
    document.addEventListener('pointercancel', handlePointerEnd, {
      once: false,
    });
    onStart?.(event);
  };

  destroyRef.onDestroy(() => {
    target.removeEventListener('pointerdown', handlePointerStart);
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerEnd);
    document.removeEventListener('pointercancel', handlePointerEnd);
  });

  target.addEventListener('pointerdown', handlePointerStart);
}
