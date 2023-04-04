import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import DataGridDemo from './components/DataGrid';
import Form from './components/Form';
import Dishes from './container/Dishes';
import Orders from './container/Orders';
import SignIn from './components/SignIn';
import Dashboard from './container/Dashboard';
import Customers from './container/Customers';
import DishesForm from './container/Form/DishesForm';
import OrderForm from './container/Form/OrderForm';
import Users from './container/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: 'login',
    element: <SignIn />,
  },
  {
    path: 'dishes',
    element: <Dishes />,
  },
  {
    path: 'dishes/:id/edit',
    element: <DishesForm />,
  },
  {
    path: 'dishes/create',
    element: <DishesForm />,
  },
  {
    path: 'orders',
    element: <Orders />,
  },
  {
    path: 'orders/:id/edit',
    element: <OrderForm />,
  },
  {
    path: 'orders/create',
    element: <OrderForm />,
  },
  {
    path: 'users',
    element: <Users />,
  },
  {
    path: 'orders/:id/edit',
    element: <OrderForm />,
  },
  {
    path: 'orders/create',
    element: <OrderForm />,
  },
  {
    path: 'customers',
    element: <Customers />,
  },
  {
    path: 'customers/:id/edit',
    element: <Form />,
  },
  {
    path: 'customers/create',
    element: <Form />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
