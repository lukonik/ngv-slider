import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHost } from './provide-host';

describe('provideHost', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('returns the native element provided via ElementRef', () => {
    const element = document.createElement('div');

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: new ElementRef(element) }],
    });

    const result = TestBed.runInInjectionContext(() =>
      provideHost<HTMLDivElement>()
    );

    expect(result).toBe(element);
  });

  it('throws when ElementRef is not provided in the injector', () => {
    expect(() =>
      TestBed.runInInjectionContext(() => provideHost<HTMLDivElement>())
    ).toThrowError();
  });
});
