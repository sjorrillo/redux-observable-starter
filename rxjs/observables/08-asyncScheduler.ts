import { asyncScheduler } from 'rxjs';

/**
 * do the setTimeout and setInternal, but clear them internally
 */

//  const saludar = () => console.log('Hello World');
const saludar = nombre => console.log(`Hello ${nombre}`);

asyncScheduler.schedule(saludar, 2000, 'Javier');

asyncScheduler.schedule(
  function(value) {
    console.log(value);

    this.schedule(value + 1, 1000);
  },
  2000,
  0
);
