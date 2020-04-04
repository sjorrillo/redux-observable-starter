import { fromEvent } from 'rxjs';
import { tap, takeWhile } from 'rxjs/operators';

const numeros$ = fromEvent<MouseEvent>(document, 'click');

numeros$
  .pipe(
    tap<MouseEvent>(({ x }) => console.log(x)),
    takeWhile(({ x }) => x < 150)
  )
  .subscribe(console.log);
