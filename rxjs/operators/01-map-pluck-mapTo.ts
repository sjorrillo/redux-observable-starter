import { range, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// const obs1$ = range(1, 5).pipe(map(it => it * 10));

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

const keyupMap$ = keyup$.pipe(map(it => it.code));
const keyupPluck$ = keyup$.pipe(pluck('target', 'baseURI'));
const keyupMapTo$ = keyup$.pipe(mapTo('Tecla presionada'));

keyup$.subscribe(console.log);
keyupMap$.subscribe(value => console.log('Map', value));
keyupPluck$.subscribe(value => console.log('Pluck', value));
keyupMapTo$.subscribe(value => console.log('MapTo', value));
