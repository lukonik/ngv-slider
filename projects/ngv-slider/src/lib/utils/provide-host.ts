import { ElementRef, inject } from '@angular/core';

/**
 * Provides the native HTML element associated with the injected ElementRef.
 * This can be useful when you need to access the underlying HTML element
 * for a specific operation.
 * @template T The type of the HTML element.
 * @returns The native HTML element.
 */
export function provideHost<T extends HTMLElement>() {
  return inject<ElementRef<T>>(ElementRef).nativeElement;
}
