import { useEffect, useState } from 'react';

export type FormSelectProps = {
  options: [];
  field: any;
  defaultValue?: any;
};

export default function FormSelect(props: FormSelectProps) {
  const { options, field, defaultValue } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (options) {
      let found: any = options.find((i) => i['id'] == field.value);
      setValue(found?.id);
    }
  }, [options]);

  const onChange = (e: any) => {
    setValue(e.target.value);
    field.onChange(e.target.value);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      field.onChange(defaultValue);
    }
  }, []);

  return (
    <>
      {
        <select required value={value} onChange={onChange}>
          {options &&
            options.length > 0 &&
            options.map((value: any) => (
              <option value={value.id}>{value.name}</option>
            ))}
        </select>
      }
    </>
  );
}
