import { fromEvent, interval } from 'rxjs';
import { take, concatMap } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');
const interval$ = interval(1000).pipe(take(3));

/**
 * concatMap: concat subscriptions but put them in a queue and process it in sequence
 */
click$.pipe(concatMap(() => interval$)).subscribe(console.log);
