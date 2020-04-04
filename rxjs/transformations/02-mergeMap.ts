import { from, interval, fromEvent } from 'rxjs';
import { mergeMap, take, map, takeUntil } from 'rxjs/operators';

const letras$ = from(['a', 'b', 'c']);

letras$
  .pipe(
    mergeMap(letra =>
      interval(1000).pipe(
        take(3),
        map(idx => `${letra}${idx}`)
      )
    )
  )
  .subscribe(console.log);

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval(1);

mousedown$.pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$)))).subscribe(console.log);
