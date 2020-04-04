import { from } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';

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
heroes$.pipe(distinctUntilKeyChanged('name')).subscribe(console.log);
