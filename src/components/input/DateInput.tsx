import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export type FormInputProps = {
  field: any;
};

export default function DateInput(props: FormInputProps) {
  const { field } = props;

  return (
    <input
      style={{ width: '200px' }}
      disabled={true}
      type="datetime-local"
      {...field}
    />
  );
}
