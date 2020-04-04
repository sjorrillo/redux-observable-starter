import { range } from 'rxjs';
import { take } from 'rxjs/operators';

const numeros$ = range(1, 5);

numeros$.pipe(take(3)).subscribe(console.log);
