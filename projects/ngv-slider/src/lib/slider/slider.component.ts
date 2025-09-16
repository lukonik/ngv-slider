import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderValueType } from '../types/slider-types';
import { SliderTrackComponent } from '../slider-track/slider-track.component';
import { SliderTrackHandleComponent } from '../slider-track-handle/slider-track-handle.component';
import { scaleRange } from '../utils/scale-range';
import { getElementSize } from '../utils/get-element-size';
import { coercePixelValue } from '../utils/coerce-pixel-value';
import { provideHost } from '../utils/provide-host';
import { getEventPositionX } from '../utils/get-event-position-x';
import { clamp } from '../utils/clamp';
import { setupPointerEvent } from '../core/setup-pointer-event';
import { DOCUMENT } from '@angular/common';

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
  private _dragStart = signal<boolean>(false);

  protected value = signal<number>(0);

  private _onTouched!: () => unknown | undefined;
  private _onChange!: () => unknown | undefined;
  protected disabled = signal<boolean | undefined>(undefined);

  private _el = provideHost();

  private eventPos = signal<number>(0);

  position = computed(() => {
    return coercePixelValue(
      scaleRange(0, 50, this.value(), 0, getElementSize(this._el).width)
    );
  });

  pointerEvent = setupPointerEvent(this._el, inject(DOCUMENT), {
    onStart: this.onPointerdown.bind(this),
    onEnd: this.onPointerStop.bind(this),
    onMove: this.onPointermove.bind(this),
  });

  constructor() {
    // setInterval(() => {
    //   this.value.update((v) => v + 1);
    // }, 100);
  }

  onPointerStop($event: PointerEvent) {
    console.log('STOP');
    this._dragStart.set(false);
  }

  onPointerdown($event: PointerEvent) {
    console.log('START');
    this._dragStart.set(true);
  }

  onPointermove($event: PointerEvent) {
    console.log('MOVING ', this._dragStart());
    if (this._dragStart()) {
      const positionValue = clamp(
        getEventPositionX($event, this._el),
        0,
        getElementSize(this._el).width
      );

      const scale = scaleRange(0, this._el.clientWidth, positionValue, 0, 50);
      this.value.set(scale);
    }
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
