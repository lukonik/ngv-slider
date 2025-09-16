/**
 * Clamps a value between a minimum and maximum value.
 * @param value The value to be clamped.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number) {
  const minValue = Math.max(value, min);

  return Math.min(minValue, max);
}
