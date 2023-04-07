import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export type FormInputProps = {
  field: any;
  formState: any;
};

export default function FormInput(props: FormInputProps) {
  const { field, formState } = props;
  const id = useParams().id;

  const { errors } = formState;
  const currentError = errors?.[field?.name];
  const errorMessage = currentError?.message || currentError?.type;
  const hasError = currentError ? true : false;

  return (
    <>
      {field.name === 'pwd' && (
        <input
          minLength={4}
          type={'password'}
          disabled={field.name === 'pwd' && id ? 1 : 0}
          {...field}
        />
      )}

      {field.name.includes('PWD') && (
        <input
          // onChange={onChange}
          // value={value}
          minLength={4}
          type={'password'}
          {...field}
        />
      )}
      {field.name != 'pwd' && !field.name.includes('PWD') && (
        <input
          type={'text'}
          disabled={
            field.name === 'id' || (field.name === 'username' && id) ? 1 : 0
          }
          {...field}
        />
      )}

      {hasError && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </>
  );
}
