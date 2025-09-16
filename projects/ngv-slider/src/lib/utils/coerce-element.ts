import { ElementRef } from '@angular/core';

/**
 * Coerces an ElementRef or an HTMLElement into an HTMLElement.
 * If the input is an ElementRef, it returns the nativeElement.
 * If the input is an HTMLElement, it returns the input as is.
 * @template T The type of the HTML element.
 * @param el The element to coerce.
 * @returns The coerced HTML element.
 */
export function coerceElement<T extends HTMLElement>(el: T | ElementRef<T>) {
  if (el instanceof ElementRef) {
    return el.nativeElement;
  }
  return el;
}
