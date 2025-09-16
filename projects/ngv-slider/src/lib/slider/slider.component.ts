import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderValueType } from '../types/slider-types';
import { SliderTrackComponent } from '../slider-track/slider-track.component';
import { SliderTrackHandleComponent } from '../slider-track-handle/slider-track-handle.component';
import { scaleRange } from '../utils/scale-range';
import { getElementSize } from '../utils/get-element-size';
import { coercePixelValue } from '../utils/coerce-pixel-value';
import { provideHost } from '../utils/provide-host';

@Component({
  selector: 'ngv-slider',
  standalone: true,
  imports: [SliderTrackComponent, SliderTrackHandleComponent],
  templateUrl: './slider.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SliderComponent,
    },
  ],
  host: {
    class: 'ngv-slider',
  },
})
export class SliderComponent implements ControlValueAccessor {
  protected value = signal<number>(0);

  private _onTouched!: () => unknown | undefined;
  private _onChange!: () => unknown | undefined;
  protected disabled = signal<boolean | undefined>(undefined);

  private _el = provideHost();

  position = computed(() => {
    return coercePixelValue(
      scaleRange(0, 100, this.value(), 0, this._el.clientWidth)
    );
  });

  constructor() {
    // setInterval(() => {
    //   this.value.update((v) => v + 1);
    // }, 100);
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: unknown): void {
    this._onChange = fn as () => unknown;
  }
  registerOnTouched(fn: unknown): void {
    this._onTouched = fn as () => unknown;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
