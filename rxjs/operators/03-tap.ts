import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const numeros$ = range(1, 5)
  .pipe(
    tap(it => console.log('Valor antes:', it)),
    map(it => it * 10),
    tap(
      it => console.log('valor despues', it),
      null,
      () => console.log('completado tap 2')
    )
  )
  .subscribe(console.log);
