import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from '../../../ngv-slider/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo';
}
