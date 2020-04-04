import { from } from 'rxjs';
import { distinct } from 'rxjs/operators';

const numeros$ = from([1, 2, 3, 4, 5, 1, 2, 3, 4, '1']);

numeros$.pipe(distinct()).subscribe(console.log);

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
heroes$.pipe(distinct(it => it.name)).subscribe(console.log);
