import { interval } from 'rxjs';
import { take, reduce, tap } from 'rxjs/operators';

interval(500)
  .pipe(
    take(3),
    tap(console.log),
    reduce((acc, it) => acc + it, 5)
  )
  .subscribe(console.log);
