import { fromEvent } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { pluck, throttleTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * throttleTime: listen an emition and them wait the time you set.
 * with the setting you can configure it to have different behaviors
 */
const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');

input$
  .pipe(
    pluck('target', 'value'),
    throttleTime(1000, async, {
      leading: false,
      trailing: true,
    }),
    distinctUntilChanged()
  )
  .subscribe(console.log);
