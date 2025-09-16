import { getElementRect } from './get-element-rect';

export function getEventPositionX(e: PointerEvent, target: HTMLElement) {
  const { left } = getElementRect(target);
  const { clientX } = e;
  return clientX - left;
}
