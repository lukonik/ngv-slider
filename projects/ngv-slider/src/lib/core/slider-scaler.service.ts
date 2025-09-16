import { ElementRef, Injectable } from '@angular/core';
import {
  SliderHandleType,
  SliderValueMode,
  SliderValueType,
} from '../types/slider-types';
import { toElement } from './utils';

@Injectable({
  providedIn: 'root',
})
export class SliderScalerService {
  valueToPixel(
    value: SliderValueType,
    track: HTMLElement,
    handle: HTMLElement,
    handleType: SliderHandleType | null,
    mode: SliderValueMode,
    config: {
      min: number;
      max: number;
    }
  ) {
    const trackWidth = this.getTrackWidth(track);
    if (trackWidth <= 0) {
      return 0;
    }

    const handleWidth = this.getHandleWidth(handle);
    const numericValue = this.resolveNumericValue(
      value,
      handleType,
      mode,
      config.min
    );

    return this.mapValueToPixel(numericValue, trackWidth, handleWidth, config);
  }

  /**
   * Returns the size of the element in pixels.
   *
   * @param {HTMLElement | ElementRef<HTMLElement>} el The element to get the size of.
   * @returns {{ width: number, height: number }} The size of the element.
   */
  getSize(el: HTMLElement | ElementRef<HTMLElement>): {
    width: number;
    height: number;
  } {
    const _el = toElement(el);
    const rect = _el.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  getWidth(track: HTMLElement) {
    const rect = track.getBoundingClientRect();
    return rect.width;
  }

  private getTrackWidth(track: HTMLElement) {
    const rect = track.getBoundingClientRect();
    return rect.width;
  }

  private getHandleWidth(handle: HTMLElement) {
    const rect = handle.getBoundingClientRect();
    return rect.width;
  }

  private resolveNumericValue(
    value: SliderValueType,
    handleType: SliderHandleType | null,
    mode: SliderValueMode,
    fallback: number
  ) {
    // Single mode uses a single number, range mode expects a handle specific value.
    if (typeof value === 'number') {
      return value;
    }

    if (value && typeof value === 'object') {
      if (mode === 'range') {
        const key = handleType ?? 'from';
        const handleValue = value[key];
        return typeof handleValue === 'number' ? handleValue : fallback;
      }

      // Support single mode using an object value by preferring the "from" key.
      const singleValue = value.from ?? value.to;
      return typeof singleValue === 'number' ? singleValue : fallback;
    }

    return fallback;
  }

  private mapValueToPixel(
    value: number,
    trackWidth: number,
    handleWidth: number,
    config: { min: number; max: number }
  ) {
    const { min, max } = config;
    if (max <= min) {
      return 0;
    }

    // Clamp value inside bounds before mapping to pixel space.
    const clampedValue = this.clamp(value, min, max);
    const ratio = (clampedValue - min) / (max - min);

    // Offset by half the handle width to keep the handle centred.
    const idealPixel = ratio * trackWidth - handleWidth / 2;
    const maxPixel = Math.max(trackWidth - handleWidth, 0);

    return this.clamp(idealPixel, 0, maxPixel);
  }

  private clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }
}
