import { Component, computed, input, ViewEncapsulation } from '@angular/core';

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
  min = input<number>(0);
  max = input<number>(100);
  step = input<number>(1);
  showTicks = input(false);

  ticks = computed(() => {
    if (!this.showTicks()) {
      return [] as { position: string }[];
    }

    const min = this.min();
    const max = this.max();
    const step = this.step();

    if (!Number.isFinite(step) || step <= 0 || max <= min) {
      return [] as { position: string }[];
    }

    const range = max - min;
    const tickValues: number[] = [];
    const totalSteps = Math.max(0, Math.floor((max - min) / step));

    for (let i = 0; i <= totalSteps; i++) {
      tickValues.push(min + i * step);
    }

    const lastTick = tickValues[tickValues.length - 1];
    if (lastTick < max) {
      tickValues.push(max);
    }

    return tickValues.map((value) => ({
      position: `${((value - min) / range) * 100}%`,
    }));
  });
}
