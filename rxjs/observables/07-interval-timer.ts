import { timer, interval } from 'rxjs';

const observer = {
  next: value => console.log('Next:', value),
  complete: () => console.log('Completed'),
};

// const interval$ = interval(1000);
// const timer$ = timer(2000);
// const timer$ = timer(2000, 1000);

const hoyEn5 = new Date();
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);
const timer$ = timer(hoyEn5);

console.log('Start');
// interval$.subscribe(observer);
timer$.subscribe(observer);
console.log('End');
