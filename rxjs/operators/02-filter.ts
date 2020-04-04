import { range, from, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// const items$ = range(20, 30).pipe(filter(it => it % 2 !== 0));

const data = [
  {
    type: 'heroe',
    name: 'Batman',
  },
  {
    type: 'heroe',
    name: 'Robin',
  },
  {
    type: 'villano',
    name: 'jocker',
  },
];

const items$ = from(data).pipe(filter(it => it.type === 'heroe'));

const keyupEvent$ = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
  map(it => it.key),
  filter(key => key === 'Enter')
);

items$.subscribe(console.log);
keyupEvent$.subscribe(console.log);
