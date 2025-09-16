import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgvSliderComponent } from './ngv-slider.component';

describe('NgvSliderComponent', () => {
  let component: NgvSliderComponent;
  let fixture: ComponentFixture<NgvSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgvSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgvSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
