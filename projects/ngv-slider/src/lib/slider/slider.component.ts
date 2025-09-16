import { Component, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SliderValueType } from '../types/slider-types';

@Component({
  selector: 'ngv-slider',
  standalone: true,
  imports: [],
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
  protected value = signal<SliderValueType>(undefined);

  private _onTouched!: () => unknown | undefined;
  private _onChange!: () => unknown | undefined;
  protected disabled = signal<boolean | undefined>(undefined);

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
