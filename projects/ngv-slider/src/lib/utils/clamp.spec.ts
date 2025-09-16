import { clamp } from './clamp';

describe('clamp', () => {
  it('returns the original value when it is within the range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
  });

  it('returns the minimum when the value is lower than the range', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
  });

  it('returns the maximum when the value exceeds the range', () => {
    expect(clamp(25, 0, 20)).toBe(20);
  });

  it('handles values exactly equal to the boundaries', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
