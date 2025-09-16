import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderTrackHandleComponent } from './slider-track-handle.component';

describe('SliderTrackHandleComponent', () => {
  let component: SliderTrackHandleComponent;
  let fixture: ComponentFixture<SliderTrackHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderTrackHandleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SliderTrackHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
