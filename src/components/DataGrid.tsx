import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container } from '@mui/material';
import { deleteItem, fetchItems } from '../utilities/fetchAPI';
import { Link, Navigate, redirect } from 'react-router-dom';
import HandleMessage from './HandleMessage';

export default function DataGridDemo(props: any) {
  const { tableName, itemName, pageSize, includes } = props;
  let { columns = [] } = props;
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems(`${tableName}`, includes);
      setData(data);
    };
    getItems();
  }, []);

  columns = [
    ...columns,
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {
            deleteItem(
              params.id,
              tableName,
              data,
              setData,
              setMessage,
              setOpen
            );
          }}
          label="Delete"
        />,

        <Link
          to={`${params.id}/edit`}
          state={{
            title: `Edit ${itemName}`,
            method: 'PUT',
            tableName: tableName,
            includes: includes,
          }}
        >
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
          ></GridActionsCellItem>
        </Link>,
      ],
    },
  ];

  return (
    <>
      <Container>
        <h1>{tableName.toUpperCase()}</h1>
        <HandleMessage
          tableName={`${tableName}`}
          message={message}
          open={open}
          handleClose={handleClose}
        />
        <Button
          style={{ marginBottom: '20px' }}
          variant="contained"
          color="primary"
        >
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            to={`create`}
            state={{
              method: 'POST',
              title: `Create ${itemName}`,
              tableName: tableName,
            }}
          >
            Add new
          </Link>
        </Button>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageSize,
                },
              },
            }}
            pageSizeOptions={[pageSize]}
            disableRowSelectionOnClick
          />
        </Box>
      </Container>
      <Button style={{ display: 'block' }}>
        <Link to="/">Back</Link>
      </Button>
    </>
  );
}
