import DataGridDemo from '../components/DataGrid';
import {
  USERS_TABLE,
  TABLE_CONFIGURATION,
} from '../constants/table-configurations.constant';

export default function Users() {
  const itemName = 'user';
  const { columns, name, pageSize, includes } =
    TABLE_CONFIGURATION[USERS_TABLE];

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
