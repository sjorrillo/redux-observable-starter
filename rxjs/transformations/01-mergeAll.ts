import { fromEvent, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { pluck, debounceTime, map, mergeAll } from 'rxjs/operators';

interface GithubUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}

interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}

const input = document.createElement('input');
const ol = document.createElement('ol');
document.querySelector('body').append(input, ol);

const renderItems = (users: GithubUser[]) =>
  users.forEach(user => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = user.avatar_url;

    const a = document.createElement('a');
    a.href = user.html_url;
    a.text = 'Ver página';
    a.target = '_blank';

    li.append(img);
    li.append(`${user.login}: `);
    li.append(a);
    ol.append(li);
  });

const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$
  .pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target', 'value'),
    map<string, Observable<GithubUsersResponse>>(value =>
      ajax.getJSON(`https://api.github.com/search/users?q=${value}`)
    ),
    mergeAll(),
    pluck<GithubUsersResponse, GithubUser[]>('items')
  )
  .subscribe(renderItems);
