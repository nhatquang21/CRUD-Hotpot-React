import DataGridDemo from '../components/DataGrid';
import {
  ORDERS_TABLE,
  TABLE_CONFIGURATION,
} from '../constants/table-configurations.constant';

export default function Orders() {
  const itemName = 'order';
  const { columns, name, pageSize, includes } =
    TABLE_CONFIGURATION[ORDERS_TABLE];

  return (
    <DataGridDemo
      pageSize={pageSize}
      itemName={itemName}
      tableName={name}
      columns={columns}
      includes={includes}
    />
  );
}
