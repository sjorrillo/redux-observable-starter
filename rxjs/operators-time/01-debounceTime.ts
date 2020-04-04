import { fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * debounceTime: emit a value after specific time.
 */
const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');

input$
  .pipe(pluck('target', 'value'), debounceTime(1000), distinctUntilChanged())
  .subscribe(console.log);
