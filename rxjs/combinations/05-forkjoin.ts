import { from, interval, forkJoin } from 'rxjs';
import { take, delay } from 'rxjs/operators';

const numeros$ = from([1, 2, 3, 4]);
const interval$ = interval(1000).pipe(take(3));
const letras$ = from(['a', 'b', 'c']).pipe(delay(3000));

// forkJoin(numeros$, interval$, letras$).subscribe(console.log);

/**
 * forkJoin emite the result of the all of the observables when each of them have completed
 * The use case of this is when we need to execute async operations and emit the result
 * when all of them have completed
 */
forkJoin({ numeros$, interval$, letras$ }).subscribe(console.log);
