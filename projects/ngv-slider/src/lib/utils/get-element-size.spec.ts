import { getElementSize } from './get-element-size';

describe('getElementSize', () => {
  const createRect = (width: number, height: number) =>
    new DOMRect(0, 0, width, height);

  it('returns width and height for an HTMLElement', () => {
    const element = document.createElement('div');
    spyOn(element, 'getBoundingClientRect').and.returnValue(
      createRect(120, 45)
    );

    const size = getElementSize(element);

    expect(size).toEqual({ width: 120, height: 45 });
  });
});
