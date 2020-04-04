import { interval, merge, of } from 'rxjs';
import { take } from 'rxjs/operators';

const interval1$ = interval(1000).pipe(take(3));
const letras$ = of('a', 'b');

/**
 * merge observables and emit the values as they are received
 */
merge(interval1$, letras$).subscribe(console.log);
