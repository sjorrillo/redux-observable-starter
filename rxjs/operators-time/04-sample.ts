import { fromEvent, interval } from 'rxjs';
import { sample } from 'rxjs/operators';

/**
 * sample: emit the latest value of the observable after other observable emit a value
 */
const click$ = fromEvent(document, 'click');

const interval$ = interval(1000);

interval$.pipe(sample(click$)).subscribe(console.log);
