import React, { useEffect, useState } from 'react';

import { fetchItems } from '../../utilities/fetchAPI';
export default function SelectInput(props: any) {
  const { tableName, selectedValue } = props;
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchItems(`${tableName}`, setData);
  }, []);

  useEffect(() => {
    if (data && selectedValue) {
      console.log(data);
      console.log(selectedValue);
      setIndex(data.findIndex((item: any) => item.id === selectedValue));
    }
  }, [index, data]);

  return <select />;
}
