import { Observable, Observer } from 'rxjs';

const observer: Observer<string> = {
  next: value => console.log('Next:', value),
  error: error => console.warn('Error:', error),
  complete: () => console.info('Complteted'),
};

const obs$ = new Observable<string>(subs => {
  subs.next('Hello');
  subs.next('World');

  const a = undefined;
  a.nombre = 'Javier';

  subs.complete();
  subs.next('another message');
});

obs$.subscribe(observer);
