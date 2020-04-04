import { interval } from 'rxjs';
import { auditTime } from 'rxjs/operators';

/**
 * auditTime: after the observable emit a value it start waiting and specifict amount
 * of time to emit the latest value
 */
const interval$ = interval(1000);

interval$.pipe(auditTime(5000)).subscribe(console.log);
