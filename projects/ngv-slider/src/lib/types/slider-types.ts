export type SliderValueType =
  | number
  | { from: number; to: number }
  | null
  | undefined;

export type SliderHandleType = 'from' | 'to';

export type SliderValueMode = 'single' | 'range';

export interface SliderRangeValueType {
  from: number;
  to: number;
}

export type SliderThumbAlign = 'start' | 'middle' | 'end';
