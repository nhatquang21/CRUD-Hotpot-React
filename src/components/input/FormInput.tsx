import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import SelectInput from './SelectInput';

export type FormInputProps = {
  field: any;
};

export default function FormInput(props: FormInputProps) {
  const { field } = props;

  return (
    <>
      <input disabled={field.name === 'id' ? 1 : 0} {...field} />
    </>
  );
}
