import { scaleRange } from './scale-range';

describe('scaleRange', () => {
  it('maps a value inside the range to the target range', () => {
    expect(scaleRange(0, 10, 5, 0, 100)).toBe(50);
  });

  it('clamps values below the range to the target minimum', () => {
    expect(scaleRange(0, 10, -5, 0, 100)).toBe(0);
  });

  it('clamps values above the range to the target maximum', () => {
    expect(scaleRange(0, 10, 20, 0, 100)).toBe(100);
  });

  it('supports inverted input ranges', () => {
    expect(scaleRange(10, 0, 5, 0, 100)).toBe(50);
  });

  it('supports inverted target ranges', () => {
    expect(scaleRange(0, 10, 2.5, 100, 0)).toBe(75);
  });

  it('returns the target minimum when the source range collapses', () => {
    expect(scaleRange(5, 5, 5, 0, 100)).toBe(0);
  });
});
