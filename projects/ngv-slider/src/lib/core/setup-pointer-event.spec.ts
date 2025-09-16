import { TestBed } from '@angular/core/testing';
import { setupPointerEvent } from './setup-pointer-event';

describe('setupPointerEvent', () => {
  let target: HTMLElement;
  let onStart: jasmine.Spy;
  let onMove: jasmine.Spy;
  let onEnd: jasmine.Spy;
  let moduleReset: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    moduleReset = false;
    target = document.createElement('div');
    document.body.appendChild(target);
    onStart = jasmine.createSpy('onStart');
    onMove = jasmine.createSpy('onMove');
    onEnd = jasmine.createSpy('onEnd');

    TestBed.runInInjectionContext(() =>
      setupPointerEvent(target, document, { onStart, onMove, onEnd })
    );
  });

  afterEach(() => {
    target.remove();
    if (!moduleReset) {
      TestBed.resetTestingModule();
    }
    onStart.calls.reset();
    onMove.calls.reset();
    onEnd.calls.reset();
  });

  it('invokes onStart when pointerdown fires on the target', () => {
    target.dispatchEvent(new PointerEvent('pointerdown'));

    expect(onStart).toHaveBeenCalledWith(jasmine.any(PointerEvent));
  });

  it('invokes onMove when pointermove fires on the document after pointerdown', () => {
    target.dispatchEvent(new PointerEvent('pointerdown'));
    document.dispatchEvent(new PointerEvent('pointermove'));

    expect(onMove).toHaveBeenCalledWith(jasmine.any(PointerEvent));
  });

  it('invokes onEnd when pointerup fires on the document after pointerdown', () => {
    target.dispatchEvent(new PointerEvent('pointerdown'));
    document.dispatchEvent(new PointerEvent('pointerup'));

    expect(onEnd).toHaveBeenCalledWith(jasmine.any(PointerEvent));
  });

  it('invokes onEnd when pointercancel fires on the document after pointerdown', () => {
    target.dispatchEvent(new PointerEvent('pointerdown'));
    document.dispatchEvent(new PointerEvent('pointercancel'));

    expect(onEnd).toHaveBeenCalledWith(jasmine.any(PointerEvent));
  });

  it('removes listeners when the injection context is destroyed', () => {
    TestBed.resetTestingModule();
    moduleReset = true;

    target.dispatchEvent(new PointerEvent('pointerdown'));
    document.dispatchEvent(new PointerEvent('pointermove'));
    document.dispatchEvent(new PointerEvent('pointerup'));

    expect(onStart).not.toHaveBeenCalled();
    expect(onMove).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();
  });
});
