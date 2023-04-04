import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import HandleMessage from './HandleMessage';
import { Container } from '@mui/system';
import { fetchItemById, editItem, createItem } from '../utilities/fetchAPI';
import FormInput from './input/FormInput';
import BackButton from './buttons/BackButton';
import SubmitButton from './buttons/SubmitButton';
import FormSelect from './input/FormSelect';
import DateInput from './input/DateInput';
import TableInput from './input/TableInput';

export default function Form(props: any) {
  const { fields, transform, transformDate, tableHeader, dataDishes } = props;
  let { state } = useLocation();
  const { title, method, tableName, includes } = state;
  const id = useParams()['id'];
  const [item, setItem] = useState<any | null>(null);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, reset, control } = useForm({
    values: item ? item : {},
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getItem = async () => {
    let data = await fetchItemById(`${tableName}`, id, includes);
    if (transformDate) {
      data = transformDate(data);
    }
    setItem(data);
  };

  useEffect(() => {
    if (id) {
      getItem();
    }
  }, []);

  useEffect(() => {
    if (item) {
      let defaultValues = {};
      defaultValues = item;
      reset({ ...defaultValues });
    }
  }, [item]);

  const onSubmit = (data: any) => {
    if (transform) {
      data = transform(data);
    }
    console.log('data', data);
    for (let key in data) {
      if (key === 'id') {
        delete data[key];
      }
    }
    console.log(JSON.stringify(data));

    const requestOptions = (method: string) => {
      return {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
    };
    method === 'PUT'
      ? editItem(
          `${tableName}`,
          Number(id),
          setMessage,
          setOpen,
          requestOptions('PATCH')
        )
      : createItem(`${tableName}`, setMessage, setOpen, requestOptions('POST'));
  };

  return (
    <Container>
      <h1>{title}</h1>
      <BackButton />
      <HandleMessage
        tableName={tableName}
        message={message}
        open={open}
        handleClose={handleClose}
      />
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields &&
          fields.length > 0 &&
          fields.map((f: any) => {
            const { field, type, label, options } = f;

            if (!f) return;

            return (
              <div
                style={{
                  margin: '15px 0',
                  width: field === 'orderDishes' ? '800px' : '400px',
                }}
              >
                <label style={{ display: 'inline-block', width: '130px' }}>
                  {label}:
                </label>
                {type === 'select' && options && (
                  <Controller
                    control={control}
                    name={field}
                    render={({ field }) => {
                      return <FormSelect field={field} options={options} />;
                    }}
                  />
                )}
                {type === 'input' && (
                  <Controller
                    control={control}
                    name={field}
                    render={({ field }) => {
                      return <FormInput field={field} />;
                    }}
                  />
                )}

                {type === 'Date' && (
                  <Controller
                    control={control}
                    name={field}
                    render={({ field }) => {
                      return <DateInput field={field} />;
                    }}
                  />
                )}
                {type === 'tableInput' && (
                  <Controller
                    control={control}
                    name="orderDishes"
                    render={({ field, formState }) => {
                      return (
                        <TableInput
                          dataDishes={dataDishes}
                          tableHeader={tableHeader}
                          field={field}
                          formState={formState}
                        />
                      );
                    }}
                  />
                )}
              </div>
            );
          })}

        <div>
          <SubmitButton />
        </div>
      </form>
    </Container>
  );
}
