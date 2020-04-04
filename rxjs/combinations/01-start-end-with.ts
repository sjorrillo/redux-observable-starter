import { of } from 'rxjs';
import { startWith, endWith } from 'rxjs/operators';

const numeros$ = of(1, 2, 3).pipe(startWith('a', 'b', 'c'), endWith('d', 'e', 'f'));

numeros$.subscribe(console.log);
