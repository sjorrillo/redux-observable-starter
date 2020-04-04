import { from, of } from 'rxjs';

/**
 * of: create an observable from a list of arguments
 * from: create an observable from an array, promise, observable, iterable
 */

const observer = {
  next: value => console.log(value),
  complete: () => console.log('Completed'),
};

const myIterator = function*() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};
// const obs1$ = of(1, 2, 3, 4, 5);
// const obs1$ = from([1, 2, 3, 4, 5]);

// const obs1$ = from(fetch('https://api.github.com/users/sjorrillo'));

// obs1$.subscribe(async response => {
//   const data = await response.json();
//   console.log(data);
// });

const obs1$ = from(myIterator());
obs1$.subscribe(observer);
