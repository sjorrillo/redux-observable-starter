import { fromEvent, interval } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');
const interval$ = interval(1000).pipe(take(3));

/**
 * exhaustMap: keep only un subscription and if the receive another one
 * it is ignored if the current one is not completed
 */
click$.pipe(exhaustMap(() => interval$)).subscribe(console.log);
