import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Customers from './container/Customers';
import Dashboard from './container/Dashboard';
import Dishes from './container/Dishes';
import ChangePasswordForm from './container/Form/ChangePasswordForm';
import DishesForm from './container/Form/DishesForm';
import OrderForm from './container/Form/OrderForm';
import UserForm from './container/Form/UserForm';
import Orders from './container/Orders';
import Users from './container/Users';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<SignIn />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="dishes/:id/edit" element={<DishesForm />} />
        <Route path="dishes/create" element={<DishesForm />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id/edit" element={<OrderForm />} />
        <Route path="orders/create" element={<OrderForm />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id/edit" element={<UserForm />} />
        <Route
          path="users/:id/edit/changePWD"
          element={<ChangePasswordForm />}
        />
        <Route path="users/create" element={<UserForm />} />
        <Route path="customers" element={<Customers />} />
      </Routes>
    </>
  );
}
