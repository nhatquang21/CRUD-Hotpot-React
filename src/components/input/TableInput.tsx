import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

import TableRowCustom from '../TableRow';

export default function TableInput(props: any) {
  const { field, tableHeader, dataDishes, formState } = props;
  const [totalBill, setTotalBill] = useState(formState.defaultValues.totalBill);

  useEffect(() => {
    if (field.value) {
      formState.defaultValues.totalBill = 0;
      field.value.forEach((item: any) => {
        console.log(formState.defaultValues.totalBill);
        console.log(item.dishTotalPrice);
        formState.defaultValues.totalBill += item.dishTotalPrice;
      });
      setTotalBill(formState.defaultValues.totalBill);
    }
  }, [field]);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((header: any) => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataDishes &&
            dataDishes.map((row: any) => (
              <TableRowCustom
                formState={formState}
                dataDishes={dataDishes}
                field={field}
                data={row}
              />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{totalBill ? totalBill : 0}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
