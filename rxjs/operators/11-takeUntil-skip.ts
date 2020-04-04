import { fromEvent, interval } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';

const button = document.createElement('button');
button.textContent = 'Stop';

const body = document.querySelector('body');
body.append(button);

const buttonClick$ = fromEvent(button, 'click').pipe(skip(1));

const interval$ = interval(1000);

interval$
  .pipe(takeUntil(buttonClick$))
  .subscribe(console.log, null, () => console.log('completed'));
