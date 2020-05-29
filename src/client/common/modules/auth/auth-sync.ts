import { differenceInSeconds, subMilliseconds } from 'date-fns';
import { Store } from 'redux';
import { interval, Observable, Subject } from 'rxjs';

import { now, parseDate } from '../../../../common/utils/date';
import { IApplicationStore } from '../../../state/root-store';
import { refreshToken } from '../../../state/stores/auth/auth-action';
import { removeFromStorage } from '../../utilities/storage';
import { LOGIN_STORAGE_KEY } from './utils';

interface IAuthArgs {}
interface IInMemoryToken {
  token: string;
  tokenExpiry: string;
}

export default class AuthSync {
  private static instance;
  private subject$: Subject<IAuthArgs>;
  private interval$: Observable<number>;
  private inMemoryToken: IInMemoryToken;
  private store: Store<IApplicationStore>;

  constructor(store: Store<IApplicationStore>) {
    this.store = store;
  }

  static create(store: Store<IApplicationStore>): AuthSync {
    if (this.instance) return this.instance;

    this.instance = new AuthSync(store);
    return this.instance;
  }

  syncLogout = (event: StorageEvent) => {
    console.log('storage event!');
    if (event.key === 'logout') {
      console.log('logged out from storage!');
      // Router.push('/login')
    }
  };

  startLoginMode = ({ token, tokenExpiry }: IInMemoryToken) => {
    const intervalFrequency = 1000 * 15; // runs every minure
    this.interval$ = interval(intervalFrequency);
    this.subject$ = new Subject<IAuthArgs>();
    this.interval$.subscribe(this.subject$);
    this.hydrateToken({ token, tokenExpiry });

    console.log('startLoginModestartLoginMode:', { token, tokenExpiry }, this.inMemoryToken);

    this.subject$.subscribe({
      next: () => {
        console.log('1.next');
        if (this.inMemoryToken) {
          const milli = subMilliseconds(parseDate(this.inMemoryToken.tokenExpiry), 60 * 1000 * 3);
          console.log('2.next', {
            expire: parseDate(this.inMemoryToken.tokenExpiry),
            milli,
            diff: differenceInSeconds(milli, now()),
            now: now(),
          });
          if (
            differenceInSeconds(
              subMilliseconds(parseDate(this.inMemoryToken.tokenExpiry), 60 * 1000 * 3),
              now()
            ) <= 150
          ) {
            console.log('3.next');
            this.inMemoryToken = null;
          }
        }

        if (!this.inMemoryToken) {
          console.log('4.next');
          this.store.dispatch(refreshToken() as any);
        }
      },
      error: (error) => {
        this.inMemoryToken = null;
        console.log('Error on auth sync:', error.message);
      },
      complete: () => {
        this.inMemoryToken = null;
      },
    });

    window.addEventListener('storage', this.syncLogout);
  };

  endLoginMode = () => {
    this.subject$.unsubscribe();
    window.removeEventListener('storage', this.syncLogout);
    removeFromStorage(LOGIN_STORAGE_KEY);
  };

  hydrateToken = ({ token, tokenExpiry }: IInMemoryToken) => {
    this.inMemoryToken = {
      token,
      tokenExpiry,
    };
  };

  getToken = (): IInMemoryToken => this.inMemoryToken;
}
