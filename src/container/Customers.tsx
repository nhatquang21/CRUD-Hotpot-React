import DataGridDemo from '../components/DataGrid';
import {
  CUSTOMERS_TABLE,
  TABLE_CONFIGURATION,
} from '../constants/table-configurations.constant';

export default function Customers() {
  const itemName = 'customer';
  const { columns, name, pageSize } = TABLE_CONFIGURATION[CUSTOMERS_TABLE];

  return (
    <DataGridDemo
      pageSize={pageSize}
      itemName={itemName}
      tableName={name}
      columns={columns}
    />
  );
}
