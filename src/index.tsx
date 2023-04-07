import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

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
import UserForm from './container/Form/UserForm';
import ChangePasswordForm from './container/Form/ChangePasswordForm';
import App from './App';
import Provider from './store/Provider';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Dashboard />,
//   },
//   {
//     path: 'login',
//     element: <SignIn />,
//   },
//   {
//     path: 'dishes',
//     element: <Dishes />,
//   },
//   {
//     path: 'dishes/:id/edit',
//     element: <DishesForm />,
//   },
//   {
//     path: 'dishes/create',
//     element: <DishesForm />,
//   },
//   {
//     path: 'orders',
//     element: <Orders />,
//   },
//   {
//     path: 'orders/:id/edit',
//     element: <OrderForm />,
//   },
//   {
//     path: 'orders/create',
//     element: <OrderForm />,
//   },
//   {
//     path: 'users',
//     element: <Users />,
//   },
//   {
//     path: 'users/:id/edit',
//     element: <UserForm />,
//   },
//   {
//     path: 'users/:id/edit/changePWD',
//     element: <ChangePasswordForm />,
//   },
//   {
//     path: 'users/create',
//     element: <UserForm />,
//   },
//   {
//     path: 'customers',
//     element: <Customers />,
//   },
//   {
//     path: 'customers/:id/edit',
//     element: <Form />,
//   },
//   {
//     path: 'customers/create',
//     element: <Form />,
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(<RouterProvider router={router} />);

root.render(
  <Provider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
