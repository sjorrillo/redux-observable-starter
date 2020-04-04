import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { pluck, switchMap } from 'rxjs/operators';

// switch map cancel any previous emited value
// it keeps only an active subscription and the mergemap keeps all the subscriptions

const input = document.createElement('input');
const ol = document.createElement('ol');
document.querySelector('body').append(input, ol);

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$
  .pipe(
    pluck<KeyboardEvent, string>('target', 'value'),
    switchMap(value => ajax.getJSON(`https://httpbin.org/delay/1?arg=${value}`))
  )
  .subscribe(console.log);
