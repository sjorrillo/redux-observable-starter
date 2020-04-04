import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';

const numeros$ = fromEvent<MouseEvent>(document, 'click');

numeros$.pipe(first(({ x }) => x < 150)).subscribe(console.log);
