import Form from '../../components/Form';

export default function DishesForm() {
  const fields = [
    {
      label: 'ID',
      field: 'id',
      type: 'input',
    },
    {
      label: 'Name',
      field: 'name',
      type: 'input',
    },
    {
      label: 'Price',
      field: 'price',
      type: 'input',
    },
  ];

  const transform = (data: any) => {
    data['price'] = Number(data['price']);
    return data;
  };

  return (
    <>
      <Form fields={fields} transform={transform} />
    </>
  );
}
