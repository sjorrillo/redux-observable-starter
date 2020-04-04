import { fromEvent } from 'rxjs';
import { pluck, sampleTime } from 'rxjs/operators';

/**
 * SampleTime: emit the latest value of the observable after X time.
 */
const click$ = fromEvent(document, 'click');

click$.pipe(sampleTime(1000), pluck('x')).subscribe(console.log);
