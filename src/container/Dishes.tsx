import DataGridDemo from '../components/DataGrid';
import {
  DISHES_TABLE,
  TABLE_CONFIGURATION,
} from '../constants/table-configurations.constant';

const role_ACCESS = {
  id: [1, 2],
};

export default function Dishes() {
  const itemName = 'dish';
  const { columns, name, pageSize } = TABLE_CONFIGURATION[DISHES_TABLE];

  return (
    <DataGridDemo
      pageSize={pageSize}
      itemName={itemName}
      tableName={name}
      columns={columns}
    />
  );
}
