import { Store } from 'redux';

import { IApplicationStore } from '../../../state/root-store';

export const init = (store: Store<IApplicationStore>) => {
  // TODO: socket lisetner
  console.log(store);
};
