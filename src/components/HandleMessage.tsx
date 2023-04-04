import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import {
  UPDATE_FAILED,
  UPDATE_SUCCESSFUL,
  DELETE_FAILED,
  DELETE_SUCCESSFUL,
  ADD_SUCCESSFUL,
  ADD_FAILED,
} from '../constants/messages';

export default function HandleMessage(props: any) {
  const { tableName, message, open, handleClose } = props;

  const listFunctionMessage = [
    UPDATE_FAILED,
    UPDATE_SUCCESSFUL,
    DELETE_FAILED,
    DELETE_SUCCESSFUL,
    ADD_SUCCESSFUL,
    ADD_FAILED,
  ];

  let checkMessage = false;

  listFunctionMessage.filter((item) => {
    if (item(`${tableName}`) === message) {
      checkMessage = true;
    }
  });

  return (
    <>
      {checkMessage && message.includes('fail') && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
      {checkMessage && message.includes('success') && (
        <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}
