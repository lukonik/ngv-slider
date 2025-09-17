import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngv-slider-track',
  standalone: true,
  imports: [],
  templateUrl: './slider-track.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngv-slider-track',
  },
})
export class SliderTrackComponent {
  startPosition = input.required<string>();
  endPosition = input.required<string>();
}
