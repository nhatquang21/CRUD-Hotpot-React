import Context from './Context';
import { useEffect, useState } from 'react';

import axios from '../helpers/axios';

export default function Provider(props: any) {
  const [user, setUser] = useState('');
  let token = localStorage.getItem('token');

  const tokenChanged = () => {
    token = localStorage.getItem('token');
    console.log('token changed');
    if (token) {
      const getCurrentUser = async () => {
        const response: any = await axios({
          url: `/whoAmI`,
          method: 'GET',
        });
        const status = response.status;
        if (status === 200) {
          const json = await response.data;
          setUser(json);
        }
      };
      getCurrentUser();
      console.log('change user', user);
    }
  };

  useEffect(() => {
    console.log('token changed');
    const token = localStorage.getItem('token');
    if (token) {
      const getCurrentUser = async () => {
        const response: any = await axios({
          url: `/whoAmI`,
          method: 'GET',
        });
        const status = response.status;
        if (status === 200) {
          const json = await response.data;
          setUser(json);
        }
      };
      getCurrentUser();
      console.log('change user', user);
    }
  }, [token]);

  return (
    <Context.Provider value={[user, token, tokenChanged]}>
      {props.children}
    </Context.Provider>
  );
}
