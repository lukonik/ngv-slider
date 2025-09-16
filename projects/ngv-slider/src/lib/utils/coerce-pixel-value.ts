export function coercePixelValue(
  value: string | number | null | undefined
): string {
  if (value === null || value === undefined) {
    return '';
  }

  return typeof value === 'string' ? value : `${value}px`;
}
