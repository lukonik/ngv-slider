/**
 * Returns the size of the element in pixels.
 *
 * @param {HTMLElement} el The element to get the size of.
 * @returns {{ width: number, height: number }} The size of the element.
 */
export function getElementSize(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}
