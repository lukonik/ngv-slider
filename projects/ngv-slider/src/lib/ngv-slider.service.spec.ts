import { TestBed } from '@angular/core/testing';

import { NgvSliderService } from './ngv-slider.service';

describe('NgvSliderService', () => {
  let service: NgvSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgvSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
