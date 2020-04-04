import { from } from 'rxjs';
import { reduce, scan, map } from 'rxjs/operators';

/**
 * scan emit each result and aggregate it
 * reduce just emit the final result
 */

const numeros = [1, 2, 3, 4, 5];

from(numeros)
  .pipe(reduce((acc, it) => acc + it, 0))
  .subscribe(console.log);

from(numeros)
  .pipe(scan((acc, it) => acc + it, 0))
  .subscribe(console.log);

interface IUser {
  id?: string;
  authenticated?: boolean;
  token?: string;
  edad?: number;
}

const users: IUser[] = [
  {
    id: 'sjo',
    authenticated: false,
    token: null,
  },
  {
    id: 'sjo',
    authenticated: true,
    token: 'token2',
  },
  {
    id: 'sjo',
    authenticated: false,
    token: 'token2',
  },
];

const state$ = from(users).pipe(
  scan<IUser>((acc, user) => ({ ...acc, ...user }), { edad: 18 })
);

state$.pipe(map(it => it)).subscribe(console.log);
