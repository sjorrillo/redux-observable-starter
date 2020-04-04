import { fromEvent, combineLatest } from 'rxjs';
import { pluck } from 'rxjs/operators';

const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.type = 'text';
input1.placeholder = 'user';

input2.type = 'password';

document.querySelector('body').append(input1, input2);

const input1$ = fromEvent(input1, 'keyup').pipe(pluck('target', 'value'));
const input2$ = fromEvent(input2, 'keyup').pipe(pluck('target', 'value'));

/**
 * combineLatest emit the latest value of all the subscriptions as an array of values
 * but only when all the observers have emited at least one value each one
 */
combineLatest(input1$, input2$).subscribe(console.log);
