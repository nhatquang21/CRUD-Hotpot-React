import { GridRowId } from '@mui/x-data-grid/models/gridRows';
import {
  DELETE_SUCCESSFUL,
  DELETE_FAILED,
  UPDATE_FAILED,
  UPDATE_SUCCESSFUL,
  ADD_SUCCESSFUL,
  ADD_FAILED,
  AUTHENTICATE_REQUIRED,
  ITEM_EXIST,
} from '../constants/messages';

import axios from '../helpers/axios';

// const deleteItem = async (
//   id: GridRowId,
//   tableName: string,
//   data: any[],
//   setData: Function,
//   setMessage: Function,
//   setOpen: Function
// ) => {
//   const response: Response = await fetch(
//     `http://localhost:3000/${tableName}/${id}`,
//     {
//       method: 'DELETE',
//     }
//   );
//   const checkResponse = response.ok;
//   if (checkResponse) {
//     const newData = [...data];
//     const index = newData.findIndex((row) => row['id'] === id);
//     newData.splice(index, 1);
//     setData(newData);
//     setMessage(DELETE_SUCCESSFUL(`${tableName}`));
//     setOpen(true);
//   } else {
//     setMessage(DELETE_FAILED(`${tableName}`));
//     setOpen(true);
//   }
// };

const deleteItem = async (
  id: GridRowId,
  tableName: string,
  data: any[],
  setData: Function,
  setMessage: Function,
  setOpen: Function
) => {
  try {
    const response: Response = await axios.delete(`${tableName}/${id}`);
    const status = response.status;
    console.log(status);
    if (status === 204) {
      const newData = [...data];
      const index = newData.findIndex((row) => row['id'] === id);
      newData.splice(index, 1);
      setData(newData);
      setMessage(DELETE_SUCCESSFUL(`${tableName}`));
      setOpen(true);
    }
  } catch (e: any) {
    const status = e.response.status;
    console.log(status);
    if (status === 500) {
      setMessage(DELETE_FAILED(`${tableName}`));
      setOpen(true);
    } else if (status === 401) {
      console.log('-----');
      setMessage(AUTHENTICATE_REQUIRED);
      setOpen(true);
    }
  }
};

const fetchItems = async (tableName: string, filter?: any) => {
  const query = filter
    ? `?${new URLSearchParams({ filter: JSON.stringify(filter) }).toString()}`
    : '';
  try {
    const response: any = await axios({
      url: `${tableName}${query}`,
      method: 'GET',
    });
    const status = response.status;
    if (status === 200) {
      const json = await response.data;
      return json;
    }
  } catch (e) {
    console.log('====', e);
  }
};

const fetchItemById = async (tableName: string, id: any, filter?: any) => {
  const query = filter
    ? `?${new URLSearchParams({ filter: JSON.stringify(filter) }).toString()}`
    : '';
  try {
    const response: any = await axios({
      url: `${tableName}/${id}${query}`,
      method: 'GET',
    });
    const status = response.status;
    if (status === 200) {
      const json = await response.data;
      return json;
    }
  } catch (e) {
    console.log('====', e);
  }
};

const editItem = async (
  tableName: string,
  id: number,
  setMessage: Function,
  setOpen: Function,
  data: any
) => {
  try {
    const response: Response = await axios({
      url: `${tableName}/${id}`,
      method: 'PATCH',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    });

    const status = response.status;
    console.log(status);
    if (status === 204) {
      setMessage(UPDATE_SUCCESSFUL(`${tableName}`));
      setOpen(true);
    }
    if (status === 200) {
      setMessage(UPDATE_SUCCESSFUL(`${tableName}`));
      setOpen(true);
    }
  } catch (e: any) {
    const status = e.response.status;
    console.log(status);
    if (status === 500) {
      setMessage(UPDATE_FAILED(`${tableName}`));
      setOpen(true);
    } else if (status === 401) {
      setMessage(AUTHENTICATE_REQUIRED);
      setOpen(true);
    } else if (status === 422) {
      setMessage(UPDATE_FAILED(`${tableName}`));
      setOpen(true);
    }
  }
};

const createItem = async (
  tableName: string,
  setMessage: Function,
  setOpen: Function,
  data: any
) => {
  try {
    const response: Response = await axios({
      url: `${tableName}`,
      method: 'POST',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    });

    const status = response.status;

    if (status === 201 || status === 200 || response) {
      setMessage(ADD_SUCCESSFUL(tableName));
      setOpen(true);
    } else {
      setMessage(ADD_FAILED(tableName));
      setOpen(true);
    }
  } catch (e: any) {
    const status = e.response.status;
    console.log(status);
    if (status === 500) {
      setMessage(UPDATE_FAILED(`${tableName}`));
      setOpen(true);
    } else if (status === 401) {
      setMessage(AUTHENTICATE_REQUIRED);
      setOpen(true);
    } else if (status === 400) {
      setMessage(ITEM_EXIST(`${tableName}`));
      setOpen(true);
    }
  }
};

const login = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

export { deleteItem, fetchItems, fetchItemById, editItem, createItem, login };
