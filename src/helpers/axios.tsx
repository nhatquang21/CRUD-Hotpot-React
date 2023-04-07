import axios from 'axios';
import { useContext } from 'react';
import Context from '../store/Context';

axios.defaults.baseURL = 'http://localhost:3000/';

const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}

export default axios;
