import {
  booleanAttribute,
  Directive,
  input,
  Signal,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { SliderRangeValueType, SliderThumbAlign } from '../types/slider-types';
import { clamp } from '../utils/clamp';
import { getElementRect } from '../utils/get-element-rect';
import { getEventPositionX } from '../utils/get-event-position-x';
import { provideHost } from '../utils/provide-host';
import { resizeObserverStream } from '../utils/resize-observer-stream';
import { scaleRange } from '../utils/scale-range';
const MIN_VALUE = 0;
const MAX_VALUE = 100;

@Directive()
export abstract class BaseSlider<T extends number | SliderRangeValueType>
  implements ControlValueAccessor
{
  abstract initValue(): T;

  protected value = signal<T>(this.initValue());

  protected onTouched!: (() => unknown) | undefined;
  protected onChange!: ((value: T | null) => unknown) | undefined;
  protected disabled = signal<boolean | undefined>(undefined);
  protected el = provideHost();

  /**
   * get the rect of the element,
   * the rect is only recalculated when the element is resized
   * we get performance improvement by that
   */
  protected elRect = toSignal<DOMRect>(
    resizeObserverStream(this.el).pipe(
      map(() => getElementRect(this.el)),
      startWith(getElementRect(this.el))
    )
  ) as Signal<DOMRect>;

  min = input<number>(MIN_VALUE);

  max = input<number>(MAX_VALUE);

  thumbAlign = input<SliderThumbAlign>('middle');
  showThumbLabel = input(false, { transform: booleanAttribute });

  registerOnChange(fn: unknown): void {
    this.onChange = fn as () => unknown;
  }
  registerOnTouched(fn: unknown): void {
    this.onTouched = fn as () => unknown;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  updateValue(value: T) {
    if (this.value() === value) {
      return;
    }
    this.value.set(value);
    this.onChange?.(this.value());
  }

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  eventPosToValue(event: PointerEvent) {
    const positionValue = clamp(
      getEventPositionX(event, this.elRect().left),
      0,
      this.elRect().width
    );

    const scale = scaleRange(
      0,
      this.el.clientWidth,
      positionValue,
      this.min(),
      this.max()
    );
    return scale;
  }
}
