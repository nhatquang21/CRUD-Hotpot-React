import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';

export const DISHES_TABLE = 'dishes';

const DISHES_COLUMNS: GridColDef[] = [
  { field: 'id', type: 'number', headerName: 'ID', width: 90 },
  {
    field: 'name',
    type: 'string',
    headerName: 'Dish',
    width: 400,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 300,
    editable: true,
  },
];
export const ORDERS_TABLE = 'orders';

const ORDERS_COLUMNS: GridColDef[] = [
  { field: 'id', type: 'number', headerName: 'ID', width: 90 },
  {
    field: 'totalBill',
    type: 'string',
    headerName: 'Total Bill',
    width: 100,
  },
  {
    field: 'createdOn',
    type: 'Date',
    headerName: 'Created On',
    valueFormatter: (params) => {
      let value = moment(params.value).format('DD/MM/YYYY HH:mm');
      return value;
    },
    width: 200,
  },
  {
    field: 'employee',
    type: 'number',
    headerName: 'Employee',
    formField: 'employeeId',
    width: 300,
    valueFormatter: (params: any) => {
      return params.value['name'];
    },
  } as any,
  {
    field: 'customer',
    type: 'number',
    headerName: 'Customer',
    formField: 'customerId',
    width: 300,
    valueFormatter: (params: any) => {
      if (params.value) return params.value['name'];
      console.log(params);
    },
  } as any,
];
const ORDERS_INCLUDES = {
  include: ['customer', 'employee', 'orderDishes'],
};

export const CUSTOMERS_TABLE = 'customers';

const CUSTOMERS_COLUMNS: GridColDef[] = [
  { field: 'id', type: 'number', headerName: 'ID', width: 90 },
  {
    field: 'name',
    type: 'string',
    headerName: 'Customer name',
    width: 200,
  },
  {
    field: 'address',
    type: 'string',
    headerName: 'Address',

    width: 200,
  },
  {
    field: 'phoneNumber',
    type: 'string',
    headerName: 'Phone',
    width: 300,
  },
];

export const USERS_TABLE = 'users';

const USERS_COLUMNS: GridColDef[] = [
  { field: 'id', type: 'number', headerName: 'ID', width: 90 },
  {
    field: 'username',
    type: 'string',
    headerName: 'Username',
    width: 100,
  },
  {
    field: 'createdOn',
    type: 'Date',
    headerName: 'Created On',
    valueFormatter: (params) => {
      let value = moment(params.value).format('DD/MM/YYYY HH:mm');
      return value;
    },
    width: 200,
  },
  {
    field: 'updatedOn',
    type: 'Date',
    headerName: 'Updated On',
    valueFormatter: (params) => {
      let value = moment(params.value).format('DD/MM/YYYY HH:mm');
      return value;
    },
    width: 200,
  },
  {
    field: 'role',
    type: 'Date',
    headerName: 'Role',
    valueFormatter: (params) => {
      if (params.value) return params.value['name'];
    },
    width: 200,
  },
];
const USERS_INCLUDES = {
  include: ['role'],
};

export const TABLE_CONFIGURATION = {
  [DISHES_TABLE]: {
    columns: DISHES_COLUMNS,
    name: DISHES_TABLE,
    pageSize: 5,
  },
  [ORDERS_TABLE]: {
    columns: ORDERS_COLUMNS,
    name: ORDERS_TABLE,
    pageSize: 5,
    includes: ORDERS_INCLUDES,
  },
  [USERS_TABLE]: {
    columns: USERS_COLUMNS,
    name: USERS_TABLE,
    pageSize: 5,
    includes: USERS_INCLUDES,
  },
  [CUSTOMERS_TABLE]: {
    columns: CUSTOMERS_COLUMNS,
    name: CUSTOMERS_TABLE,
    pageSize: 5,
  },
};
