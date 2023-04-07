import { useEffect, useState } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { Link, useLocation, useParams } from 'react-router-dom';
import HandleMessage from './HandleMessage';
import { Container } from '@mui/system';
import { fetchItemById, editItem, createItem } from '../utilities/fetchAPI';
import FormInput from './input/FormInput';
import BackButton from './buttons/BackButton';
import SubmitButton from './buttons/SubmitButton';
import FormSelect from './input/FormSelect';
import DateInput from './input/DateInput';
import TableInput from './input/TableInput';
import Button from '@mui/material/Button';
import { MATCH_PASSWORD, OLD_PASSWORD_INCORRECT } from '../constants/messages';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export default function Form(props: any) {
  const {
    fields,
    transform,
    transformDate,
    tableHeader,
    dataDishes,
    optionalFunc,
    checkOLDPWD,
  } = props;
  let { state } = useLocation();
  const { title, method, tableName, includes } = state;
  const id = useParams()['id'];
  const [item, setItem] = useState<any | null>(null);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { handleSubmit, reset, control, getValues, setError } = useForm({
    mode: 'all',
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
    if (item && method === 'PUT') {
      let defaultValues = {};
      defaultValues = item;
      reset({ ...defaultValues });
    }
  }, [item]);

  const onSubmit = async (data: any) => {
    if (transform) {
      data = transform(data);
    }
    if (checkOLDPWD) {
      const check = await checkOLDPWD(data);

      if (check) {
        if (data['newPWD'] === data['confPWD']) {
          delete data['nowPWD'];
          delete data['confPWD'];
          data['pwd'] = data['newPWD'];

          const salt = genSaltSync(10);
          const hash = hashSync(data['pwd'], salt);
          item['pwd'] = hash;
          reset({ ...item });
          delete data['newPWD'];

          data = JSON.stringify(data);
          editItem(`${tableName}`, Number(id), setMessage, setOpen, data);
        } else {
          setMessage(MATCH_PASSWORD(`${tableName}`));
          setOpen(true);
        }
      } else {
        setMessage(OLD_PASSWORD_INCORRECT(`${tableName}`));
        setOpen(true);
      }
    } else {
      for (let key in data) {
        if (key === 'id') {
          delete data[key];
        }
      }

      if (method === 'PUT') {
        if (data['pwd']) {
          delete data['pwd'];
        }
        data = JSON.stringify(data);
        console.log(data);
        editItem(`${tableName}`, Number(id), setMessage, setOpen, data);
      } else if (method === 'ChangePWD') {
      } else {
        data = JSON.stringify(data);
        console.log(data);
        createItem(`${tableName}`, setMessage, setOpen, data);
      }
    }
  };

  useEffect(() => {}, []);

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
            const { field, type, label, options, defaultValue } = f;
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
                      return (
                        <FormSelect
                          defaultValue={defaultValue}
                          field={field}
                          options={options}
                        />
                      );
                    }}
                  />
                )}
                {type === 'input' && (
                  <Controller
                    control={control}
                    name={field}
                    rules={{
                      validate: {
                        passwordDoesntMatch: (value) => {
                          if (field === 'confPWD') {
                            if (value !== getValues('newPWD')) {
                              return 'Password does not match';
                            }
                          }
                        },
                      },
                    }}
                    render={({ field, formState }) => {
                      return <FormInput formState={formState} field={field} />;
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
          {optionalFunc && id && (
            <Button variant="contained" size="medium">
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`changePWD`}
                state={{
                  title: 'Change password',
                  method: 'ChangePWD',
                  tableName: tableName,
                }}
              >
                {' '}
                Change password
              </Link>
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
}
