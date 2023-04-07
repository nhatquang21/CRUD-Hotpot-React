import Form from '../../components/Form';
import { compareSync } from 'bcrypt-ts';

export type FieldKey = 'nowPWD' | 'newPWD' | 'confPWD';
export type Field = {
  label: string;
  field: FieldKey;
  type: string;
};

export default function ChangePasswordForm() {
  const fields: Field[] = [
    {
      label: 'Current password',
      field: 'nowPWD',
      type: 'input',
    },
    {
      label: 'New password',
      field: 'newPWD',
      type: 'input',
    },
    {
      label: 'Confirm password',
      field: 'confPWD',
      type: 'input',
    },
  ];

  const transform = (data: any) => {
    delete data['createdOn'];
    delete data['updatedOn'];
    delete data['username'];
    delete data['roleId'];
    delete data['price'];
    delete data['id'];
    return data;
  };

  const checkOLDPWD = async (data: any) => {
    try {
      let checkPWD = await compareSync(data['nowPWD'], data['pwd']);
      return checkPWD;
    } catch (e) {
      console.log('====', e);
    }
  };

  return (
    <>
      <Form fields={fields} transform={transform} checkOLDPWD={checkOLDPWD} />
    </>
  );
}
