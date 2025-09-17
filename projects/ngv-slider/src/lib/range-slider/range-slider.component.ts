import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BaseSlider } from '../core/base-slider';
import { SliderThumbComponent } from '../slider-thumb/slider-thumb.component';
import { SliderTrackComponent } from '../slider-track/slider-track.component';
import { SliderRangeValueType } from '../types/slider-types';

@Component({
  selector: 'ngv-range-slider',
  standalone: true,
  imports: [SliderTrackComponent, SliderThumbComponent],
  templateUrl: './range-slider.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderComponent extends BaseSlider<SliderRangeValueType> {
  override initValue(): SliderRangeValueType {
    return { from: this.min(), to: this.max() };
  }
}
