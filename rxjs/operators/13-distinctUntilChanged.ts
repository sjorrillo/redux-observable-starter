import { from } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const numeros$ = from([1, 1, 2, 1, 3, 4, 5, 1, 2, 3, 4, '1']);

numeros$.pipe(distinctUntilChanged()).subscribe(console.log);

interface IHero {
  name: string;
}

const heroes: IHero[] = [
  {
    name: 'Batman',
  },
  {
    name: 'Robin',
  },
  {
    name: 'Robin',
  },
  {
    name: 'Superman',
  },
  {
    name: 'Spiderman',
  },
  {
    name: 'Robin',
  },
];

const heroes$ = from(heroes);
heroes$.pipe(distinctUntilChanged((a, b) => a.name === b.name)).subscribe(console.log);
