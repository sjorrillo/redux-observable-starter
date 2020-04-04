import { Observable, Observer, Subject } from 'rxjs';

const observer: Observer<number> = {
  next: value => console.log('Next:', value),
  error: error => console.warn('Error:', error),
  complete: () => console.info('Complteted'),
};

const obs$ = new Observable(subs => {
  const interval = setInterval(() => {
    subs.next(Math.random());
  }, 1000);

  return () => {
    clearInterval(interval);
    console.log('interval destroyed');
  };
});

const subject$ = new Subject();
const subjectSubscription = obs$.subscribe(subject$);

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
  subject$.complete();
  subjectSubscription.unsubscribe();
  console.log('unsubscribe for timeout');
}, 3000);
