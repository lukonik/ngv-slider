import { Component, computed, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseSlider } from '../core/base-slider';
import { SliderThumbComponent } from '../slider-thumb/slider-thumb.component';
import { SliderTrackComponent } from '../slider-track/slider-track.component';
import { clamp } from '../utils/clamp';
import { coercePixelValue } from '../utils/coerce-pixel-value';
import { getElementSize } from '../utils/get-element-size';
import { scaleRange } from '../utils/scale-range';

@Component({
  selector: 'ngv-slider',
  standalone: true,
  imports: [SliderTrackComponent, SliderThumbComponent],
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
    '(click)': 'onClick($event)',
  },
})
export class SliderComponent extends BaseSlider<number> {
  override initValue(): number {
    return 20;
  }
  private handleIsStarted = signal<boolean>(false);

  position = computed(() => {
    return coercePixelValue(
      scaleRange(
        this.min(),
        this.max(),
        this.value(),
        0,
        getElementSize(this.el).width
      )
    );
  });

  onClick($event: PointerEvent) {
    this.updateValue(this.eventPosToValue($event));
  }

  handleStart() {
    this.handleIsStarted.set(true);
  }

  handleMove($event: PointerEvent) {
    if (this.handleIsStarted()) {
      this.updateValue(this.eventPosToValue($event));
    }
  }

  increase(incr: number) {
    this.updateValue(clamp(this.value() + incr, this.min(), this.max()));
    console.log(this.value());
  }

  handleEnd(e: PointerEvent) {
    this.handleIsStarted.set(false);
  }
}
