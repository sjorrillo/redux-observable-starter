import { of } from 'rxjs';

const obs$ = of(1, 2, 3, 4, 5, 6);

console.log('Start sequence');
obs$.subscribe(
  value => console.log('value:', value),
  null,
  () => console.log('sequence completed')
);

console.log('End sequence');
