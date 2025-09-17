import { DOCUMENT } from '@angular/common';
import { Component, inject, output, ViewEncapsulation } from '@angular/core';
import { setupPointerEvent } from '../core/setup-pointer-event';
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
  },
})
export class SliderThumbComponent {
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
