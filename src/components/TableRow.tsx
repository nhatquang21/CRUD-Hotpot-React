import { Button, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function TableRowCustom({ data, field, formState }: any) {
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const idDish = data.id;

  useEffect(() => {
    if (field.value && field.value.length > 0) {
      field.value.find((item: any) => {
        if (item.dishId === idDish) {
          setQuantity(item.dishQuantity);
        }
      });
    }
  }, [field.value]);

  console.log();

  useEffect(() => {
    setTotalPrice(data.price * quantity);
  }, [quantity]);

  return (
    <>
      {data && (
        <TableRow
          key={data.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {data.name}
          </TableCell>
          <TableCell>{data.price}</TableCell>
          <TableCell>{quantity}</TableCell>
          <TableCell>{totalPrice}</TableCell>
          <TableCell align="center">
            <Button
              onClick={() => {
                setQuantity(quantity + 1);
                if (field.value) {
                  let newField = [...field.value];
                  for (let item of newField) {
                    if (item.dishId === idDish) {
                      item.dishQuantity = quantity + 1;
                      item.dishTotalPrice = (quantity + 1) * data.price;
                    }
                  }

                  const found = newField.some((item: any) => {
                    if (item.dishId === idDish) {
                      return true;
                    }
                  });
                  if (!found) {
                    newField.push({
                      dishId: idDish,
                      dishQuantity: quantity + 1,
                      dishTotalPrice: (quantity + 1) * data.price,
                    });
                  }
                  field.onChange(newField);
                } else {
                  field.onChange([
                    {
                      dishId: idDish,
                      dishQuantity: quantity + 1,
                      dishTotalPrice: (quantity + 1) * data.price,
                    },
                  ]);
                }
              }}
              variant="outlined"
            >
              +
            </Button>
            <Button
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                  if (field.value) {
                    let newField = [...field.value];
                    for (let item of newField) {
                      if (item.dishId === idDish) {
                        item.dishQuantity = quantity - 1;
                        item.dishTotalPrice = (quantity - 1) * data.price;
                      }
                    }

                    const found = newField.some((item: any) => {
                      if (item.dishId === idDish) {
                        return true;
                      }
                    });
                    if (!found) {
                      newField.push({
                        dishId: idDish,
                        dishQuantity: quantity - 1,
                        dishTotalPrice: (quantity - 1) * data.price,
                      });
                    }

                    field.onChange(newField);
                    console.log(formState);
                  } else {
                    field.onChange([
                      {
                        dishId: idDish,
                        dishQuantity: quantity - 1,
                        dishTotalPrice: (quantity - 1) * data.price,
                      },
                    ]);
                  }

                  console.log(field.value);
                }
              }}
              variant="outlined"
            >
              -
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
