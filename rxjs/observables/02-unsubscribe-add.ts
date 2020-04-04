import { Observable, Observer } from 'rxjs';

const observer: Observer<number> = {
  next: value => console.log('Next:', value),
  error: error => console.warn('Error:', error),
  complete: () => console.info('Complteted'),
};

const intervalo$ = new Observable<number>(subs => {
  let seed = 0;
  const interval = setInterval(() => {
    seed++;
    subs.next(seed);
    console.log(`internal value: ${seed}`);
  }, 1000);

  setTimeout(() => {
    // when you call complete internally it call unsubscribe
    subs.complete();
  }, 2500);

  return () => {
    clearInterval(interval);
  };
});

const subscription1 = intervalo$.subscribe(observer);
const subscription2 = intervalo$.subscribe(observer);
const subscription3 = intervalo$.subscribe(observer);

subscription1.add(subscription2).add(subscription3);

setTimeout(() => {
  subscription1.unsubscribe();
  console.log('unsubscribe for timeout');
}, 6000);
