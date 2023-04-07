import moment from 'moment';
import { useEffect, useState } from 'react';
import Form from '../../components/Form';

const DEFAULT_FIELDS = [
  {
    label: 'ID',
    field: 'id',
    type: 'input',
  },
  {
    label: 'Total bill (VND)',
    field: 'totalBill',
    type: 'input',
  },
  {
    label: 'Order date',
    field: 'createdOn',
    type: 'Date',
  },
  {
    label: 'Employee ',
    field: 'employeeId',
    type: 'select',
  },
  {
    label: 'Customer ',
    field: 'customerId',
    type: 'select',
  },
  {
    label: 'Dishes',
    field: 'orderDishes',
    type: 'tableInput',
    display: 'none',
  },
];

const TABLE_HEADER = ['Name', 'Price', 'Quantity', 'Total', 'Action'];

const dataDishes = async () => {
  try {
    const response = await fetch(`http://localhost:3000/dishes`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('====', e);
  }
};

const dataCustomers = async () => {
  try {
    const response = await fetch(`http://localhost:3000/customers`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('====', e);
  }
};
const dataEmployees = async () => {
  try {
    const response = await fetch(`http://localhost:3000/employees`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('====', e);
  }
};

const transform = (data: any) => {
  data['totalBill'] = Number(data['totalBill']);
  data['employeeId'] = Number(data['employeeId']);
  data['customerId'] = Number(data['customerId']);
  data['createdOn'] = moment(data['createdOn']).toISOString();
  data['orderDishes'] = data['orderDishes'].map((row: any) => {
    row['quantity'] = Number(row['dishQuantity']);
    for (let key in row) {
      if (
        key === 'id' ||
        key === 'dishTotalPrice' ||
        key === 'orderId' ||
        key === 'dishQuantity'
      ) {
        delete row[key];
      }
    }
    return row;
  });

  data['dishList'] = data['orderDishes'];

  delete data['employee'];
  delete data['customer'];
  delete data['dishes'];
  delete data['totalBill'];
  delete data['createdOn'];
  delete data['orderDishes'];
  return data;
};

const transformDate = (data: any) => {
  data['createdOn'] = moment(data['createdOn']).format('YYYY-MM-DD HH:mm:ss');
  return data;
};

export default function OrderForm() {
  const [listCustomers, setListCustomers] = useState<any | null>(null);
  const [listEmployees, setListEmployees] = useState<any | null>(null);
  const [listDishes, setListDishes] = useState<any | null>(null);

  const [fields, setFields] = useState<Record<string, any>[]>(DEFAULT_FIELDS);

  useEffect(() => {
    dataCustomers().then((data) => {
      setListCustomers(data);
    });
    dataEmployees().then((data) => {
      setListEmployees(data);
    });
    dataDishes().then((data) => {
      setListDishes(data);
    });
  }, []);

  useEffect(() => {
    if (listCustomers && listEmployees && listDishes) {
      const newFields = [...fields];
      let fieldEmp = newFields.map((item: any) => {
        if (item.field === 'employeeId') {
          item.options = listEmployees;
          item.defaultValue = listEmployees[0].id;
        }
        return item;
      });
      let fieldCus = newFields.map((item: any) => {
        if (item.field === 'customerId') {
          item.options = listCustomers;
          item.defaultValue = listCustomers[0].id;
        }
        return item;
      });
      let fieldDish = newFields.map((item: any) => {
        if (item.field === 'orderDishes') {
          item.options = listDishes;
        }
        return item;
      });

      setFields(newFields);
    }
  }, [listCustomers, listEmployees]);

  return (
    <>
      <Form
        dataDishes={listDishes}
        tableHeader={TABLE_HEADER}
        transformDate={transformDate}
        fields={fields}
        transform={transform}
      />
    </>
  );
}
