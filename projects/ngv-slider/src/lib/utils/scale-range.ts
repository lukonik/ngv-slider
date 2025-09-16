import { clamp } from './clamp';

/**
 * Scales a value from a source range to a target range.
 * @param min The minimum value of the source range.
 * @param max The maximum value of the source range.
 * @param value The value to be scaled from the source range.
 * @param toMin The minimum value of the target range.
 * @param toMax The maximum value of the target range.
 * @returns The scaled value.
 */
export function scaleRange(
  min: number,
  max: number,
  value: number,
  toMin: number,
  toMax: number
) {
  const lowerBound = Math.min(min, max);
  const upperBound = Math.max(min, max);

  if (lowerBound === upperBound) {
    return toMin;
  }

  const clampedValue = clamp(value, lowerBound, upperBound);
  const ratio = (clampedValue - lowerBound) / (upperBound - lowerBound);

  return toMin + ratio * (toMax - toMin);
}
