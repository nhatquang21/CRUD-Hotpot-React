import Alert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import {
  UPDATE_FAILED,
  UPDATE_SUCCESSFUL,
  DELETE_FAILED,
  DELETE_SUCCESSFUL,
  ADD_SUCCESSFUL,
  ADD_FAILED,
  AUTHENTICATE_REQUIRED,
  MATCH_PASSWORD,
  ITEM_EXIST,
  OLD_PASSWORD_INCORRECT,
  WRONG_INFO,
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
    AUTHENTICATE_REQUIRED,
    ITEM_EXIST,
    MATCH_PASSWORD,
    WRONG_INFO,
    OLD_PASSWORD_INCORRECT,
  ];

  let checkMessage = false;

  listFunctionMessage.filter((item) => {
    if (item(`${tableName}`) === message) {
      checkMessage = true;
    }
  });

  return (
    <>
      {checkMessage && message.includes('ERROR') && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
      {checkMessage && message.includes('success') && (
        <>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
      {checkMessage && message.includes('Info') && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            {message}
          </Alert>
        </Snackbar>
      )}
      {checkMessage && message.includes('exist') && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
