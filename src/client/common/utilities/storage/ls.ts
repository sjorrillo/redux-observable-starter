import tryParse from '../try-parse';

const { localStorage } = window;

export const save = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // console.tron.error('LocalStorage save error', key, value);
  }
};

export const get = (key: string, defVal: any) => {
  try {
    const value = localStorage.getItem(key);
    return tryParse(value, defVal);
  } catch (err) {
    // console.tron.error('LocalStorage get error', key, defVal);
    return defVal;
  }
};

export const clear = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // console.tron.error('LocalStorage remove item error', key);
  }
};

export const clearAll = () => {
  try {
    localStorage.clear();
  } catch (err) {
    // console.tron.error('LocalStorage clear error');
  }
};
