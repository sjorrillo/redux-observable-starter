import { concat, interval } from 'rxjs';
import { take } from 'rxjs/operators';

const interval1$ = interval(1000).pipe(take(3));
const interval2$ = interval(1000).pipe(take(2));

/**
 * concat each observable but using queues
 */
concat(interval1$, interval2$, ['a', 'b']).subscribe(console.log);
