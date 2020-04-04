import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { tap, exhaustMap, map, pluck, catchError } from 'rxjs/operators';

const form = document.createElement('form');
const email = document.createElement('input');
const password = document.createElement('input');
const subtmitBtn = document.createElement('input');

email.type = 'text';
email.placeholder = 'user name';
email.value = 'eve.holt@reqres.in';

password.type = 'password';
password.placeholder = 'password';
password.value = 'cityslicka';

subtmitBtn.type = 'submit';
subtmitBtn.value = 'Login';

form.append(email, password, subtmitBtn);
document.querySelector('body').append(form);

const loginForm$ = fromEvent(form, 'submit').pipe(
  tap(evt => evt.preventDefault()),
  map(evt => ({
    email: evt.target.elements[0].value,
    password: evt.target.elements[1].value,
  })),
  exhaustMap(payload =>
    ajax.post('https://reqres.in/api/login?delay=1', payload).pipe(catchError(() => 'XYZ'))
  ),
  pluck('response', 'token')
);

loginForm$.subscribe(console.log);
