import { createContext } from 'react';

const defaultValue = {
  user: '',
};
const Context = createContext({} as any);

export default Context;
