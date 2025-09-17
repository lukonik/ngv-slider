export function getEventPositionX(e: PointerEvent, targetLeft: number) {
  const { clientX } = e;
  return clientX - targetLeft;
}
