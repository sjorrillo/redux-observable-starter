import { of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { pluck, catchError } from 'rxjs/operators';

const url = 'https://api.github.com/userXs?per_page=5';

const request$ = ajax(url);

request$
  .pipe(
    pluck('response'),
    catchError((err: AjaxError) => {
      console.log(err.message);
      return of([]);
    })
  )
  .subscribe(console.log);
