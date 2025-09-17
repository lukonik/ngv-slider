import { DOCUMENT } from '@angular/common';
import {
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { setupPointerEvent } from '../core/setup-pointer-event';
import { SliderThumbAlign } from '../types/slider-types';
import { provideHost } from '../utils/provide-host';

@Component({
  selector: 'ngv-slider-thumb',
  standalone: true,
  imports: [],
  templateUrl: './slider-thumb.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngv-slider-thumb',
    '[tabIndex]': '0',
    '(keydown)': 'onKeydown($event)',
    '[style.left]': 'position()',
    '[style.top]': 'top()'
  },
})
export class SliderThumbComponent {
  private _el = provideHost();

  start = output<PointerEvent>();
  end = output<PointerEvent>();
  move = output<PointerEvent>();
  decrease = output<void>();
  increase = output<void>();
  position = input.required<string>();
  align = input.required<SliderThumbAlign>();

  constructor() {
    setupPointerEvent(this._el, inject(DOCUMENT), {
      onStart: (e) => this.start.emit(e),
      onMove: (e) => this.move.emit(e),
      onEnd: (e) => this.end.emit(e),
    });
  }

  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        this.decrease.emit(undefined);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.increase.emit(undefined);
        break;
      default:
        break;
    }
  }

  /**
   * Computes vertical position based on `align`:
   * - 'start'  => top of the track (thumb sits above the track)
   * - 'middle' => centered on the track
   * - 'end'    => bottom of the track (thumb sits below the track)
   */
  top(): string {
    const trackH = 'var(--ngv-slider-track-height, 4px)';
    const thumbH = 'var(--ngv-slider-thumb-height, 16px)';
    switch (this.align()) {
      case 'start':
        return `calc(0px - ${thumbH})`;
      case 'end':
        return trackH;
      case 'middle':
      default:
        return `calc((${trackH} - ${thumbH}) / 2)`;
    }
  }
}
