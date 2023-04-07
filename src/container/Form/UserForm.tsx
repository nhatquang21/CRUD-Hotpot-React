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
    label: 'Username',
    field: 'username',
    type: 'input',
  },
  {
    label: 'Password',
    field: 'pwd',
    type: 'input',
  },
  {
    label: 'CreatedOn ',
    field: 'createdOn',
    type: 'Date',
  },
  {
    label: 'UpdatedOn ',
    field: 'updatedOn',
    type: 'Date',
  },
  {
    label: 'Role',
    field: 'roleId',
    type: 'select',
  },
];

const OPTIONAL_FUNC = ['changePwd'];

const dataRoles = async () => {
  try {
    const response = await fetch(`http://localhost:3000/roles`);
    const json = await response.json();
    return json;
  } catch (e) {
    console.log('====', e);
  }
};

const transform = (data: any) => {
  data['roleId'] = Number(data['roleId']);
  data['createdOn'] = moment(data['createdOn']).toISOString();
  data['updatedOn'] = moment().toISOString();

  delete data['role'];
  return data;
};

const transformDate = (data: any) => {
  data['createdOn'] = moment(data['createdOn']).format('YYYY-MM-DD HH:mm:ss');

  if (data['updatedOn']) {
    data['updatedOn'] = moment(data['updatedOn']).format('YYYY-MM-DD HH:mm:ss');
  }

  return data;
};

export default function UserForm() {
  const [listRole, setListRole] = useState<any | null>(null);

  const [fields, setFields] = useState<Record<string, any>[]>(DEFAULT_FIELDS);

  useEffect(() => {
    dataRoles().then((data) => {
      setListRole(data);
    });
  }, []);

  useEffect(() => {
    if (listRole) {
      const newFields = [...fields];
      let itemRoleId = newFields.find((item: any) => {
        return item.field === 'roleId';
      });
      if (itemRoleId) {
        itemRoleId.options = listRole;
        itemRoleId.defaultValue = listRole[1].id;
      }

      setFields(newFields);
    }
  }, [listRole]);

  return (
    <>
      <Form
        optionalFunc={OPTIONAL_FUNC}
        transformDate={transformDate}
        fields={fields}
        transform={transform}
      />
    </>
  );
}
