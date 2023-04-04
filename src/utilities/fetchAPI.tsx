import { GridRowId } from '@mui/x-data-grid/models/gridRows';
import {
  DELETE_SUCCESSFUL,
  DELETE_FAILED,
  UPDATE_FAILED,
  UPDATE_SUCCESSFUL,
  ADD_SUCCESSFUL,
  ADD_FAILED,
} from '../constants/messages';

const deleteItem = async (
  id: GridRowId,
  tableName: string,
  data: any[],
  setData: Function,
  setMessage: Function,
  setOpen: Function
) => {
  const response: Response = await fetch(
    `http://localhost:3000/${tableName}/${id}`,
    {
      method: 'DELETE',
    }
  );
  const checkResponse = response.ok;
  if (checkResponse) {
    const newData = [...data];
    const index = newData.findIndex((row) => row['id'] === id);
    newData.splice(index, 1);
    setData(newData);
    setMessage(DELETE_SUCCESSFUL(`${tableName}`));
    setOpen(true);
  } else {
    setMessage(DELETE_FAILED(`${tableName}`));
    setOpen(true);
  }
};

const fetchItems = async (
  tableName: string,
  setData: Function,
  filter?: any
) => {
  const query = filter
    ? `?${new URLSearchParams({ filter: JSON.stringify(filter) }).toString()}`
    : '';
  try {
    const response = await fetch(`http://localhost:3000/${tableName}${query}`);
    const json = (await response.json()) ?? [];
    setData(json);
  } catch (e) {
    console.log('====', e);
  }
};

const fetchItemById = async (tableName: string, id: any, filter?: any) => {
  const query = filter
    ? `?${new URLSearchParams({ filter: JSON.stringify(filter) }).toString()}`
    : '';
  const response = await fetch(
    `http://localhost:3000/${tableName}/${id}${query}`
  );
  const json = await response.json();
  return json;
};

const editItem = async (
  tableName: string,
  id: number,
  setMessage: Function,
  setOpen: Function,
  requestOptions: object
) => {
  try {
    const response: Response = await fetch(
      `http://localhost:3000/${tableName}/${id}`,
      requestOptions
    );
    console.log(response);
    if (response.ok) {
      setMessage(UPDATE_SUCCESSFUL(`${tableName}`));
      setOpen(true);
    } else {
      setMessage(UPDATE_FAILED(`${tableName}`));
      setOpen(true);
    }
  } catch (error) {
    console.log(error);
  }
};

const createItem = async (
  tableName: string,
  setMessage: Function,
  setOpen: Function,
  requestOptions: object
) => {
  try {
    const response: Response = await fetch(
      `http://localhost:3000/${tableName}/`,
      requestOptions
    );
    if (response.ok) {
      setMessage(ADD_SUCCESSFUL(tableName));
      setOpen(true);
    } else {
      setMessage(ADD_FAILED(tableName));
      setOpen(true);
    }
  } catch (error) {
    console.log(error);
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
