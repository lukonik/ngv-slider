import { DOCUMENT } from '@angular/common';
import { Component, inject, output, ViewEncapsulation } from '@angular/core';
import { setupPointerEvent } from '../core/setup-pointer-event';
import { provideHost } from '../utils/provide-host';

@Component({
  selector: 'ngv-slider-track-handle',
  standalone: true,
  imports: [],
  templateUrl: './slider-track-handle.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ngv-slider-track-handle',
    '[tabIndex]': '0',
    '(keydown)': 'onKeydown($event)',
  },
})
export class SliderTrackHandleComponent {
  private _el = provideHost();

  start = output<PointerEvent>();
  end = output<PointerEvent>();
  move = output<PointerEvent>();
  decrease = output<void>();
  increase = output<void>();

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
}
