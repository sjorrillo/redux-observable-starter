import { range, asyncScheduler } from 'rxjs';

// const obs$ = of(1, 2, 3, 4, 5, asyncScheduler);
const obs$ = range(1, 5, asyncScheduler);

console.log('start');
obs$.subscribe(console.log);
console.log('end');
