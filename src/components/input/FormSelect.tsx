import { useEffect, useState } from 'react';

export type FormSelectProps = {
  options: [];
  field: any;
};

export default function FormSelect(props: FormSelectProps) {
  const { options, field } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    let found: any = options.find((i) => i['id'] == field.value);
    setValue(found?.id);
  }, [field?.value]);

  const onChange = (e: any) => {
    setValue(e.target.value);
    field.onChange(e.target.value);
  };

  return (
    <select value={value} onChange={onChange}>
      {options &&
        options.length > 0 &&
        options.map((value: any) => (
          <option value={value.id}>{value.name}</option>
        ))}
    </select>
  );
}
