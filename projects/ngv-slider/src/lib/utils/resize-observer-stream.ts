import { Observable } from 'rxjs';

export function resizeObserverStream(el: HTMLElement) {
  return new Observable<ResizeObserverEntry>((observer) => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        observer.next(entry);
      });
    });
    resizeObserver.observe(el);
    return {
      unsubscribe: () => {
        resizeObserver.disconnect();
      },
    };
  });
}
