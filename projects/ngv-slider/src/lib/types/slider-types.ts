export type SliderValueType =
  | number
  | { from: number; to: number }
  | null
  | undefined;

export type SliderHandleType = 'from' | 'to';

export type SliderValueMode = 'single' | 'range';
