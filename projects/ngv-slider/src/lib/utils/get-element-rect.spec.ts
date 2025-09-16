import { getElementRect } from './get-element-rect';

describe('getElementRect', () => {
  const createRect = (x: number, y: number, width: number, height: number) =>
    new DOMRect(x, y, width, height);

  it('returns the DOMRect provided by getBoundingClientRect', () => {
    const element = document.createElement('div');
    const rect = createRect(10, 15, 120, 45);
    spyOn(element, 'getBoundingClientRect').and.returnValue(rect);

    expect(getElementRect(element)).toBe(rect);
  });
});
