import { coercePixelValue } from './coerce-pixel-value';

describe('coerceCssPixelValue', () => {
  it('should add pixel units to a number value', () => {
    expect(coercePixelValue(1337)).toBe('1337px');
  });

  it('should ignore string values', () => {
    expect(coercePixelValue('1337rem')).toBe('1337rem');
  });

  it('should return an empty string for null', () => {
    expect(coercePixelValue(null)).toBe('');
  });

  it('should return an empty string for undefined', () => {
    expect(coercePixelValue(undefined)).toBe('');
  });
});
