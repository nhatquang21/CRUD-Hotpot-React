const DELETE_SUCCESSFUL = (name: any) => {
  return `Delete ${name} successful`;
};

const DELETE_FAILED = (name: any) => {
  return `ERROR: Delete ${name} failed`;
};
const UPDATE_SUCCESSFUL = (name: any) => {
  return `Update ${name} successful`;
};

const UPDATE_FAILED = (name: any) => {
  return `ERROR: Update ${name} failed`;
};

const ADD_SUCCESSFUL = (name: any) => {
  return `Add ${name} successful`;
};

const ADD_FAILED = (name: any) => {
  return `ERROR: Add ${name} failed`;
};

const AUTHENTICATE_REQUIRED = (name: any) => {
  return `Info: Unauthorized`;
};
const ITEM_EXIST = (name: any) => {
  return `Info: item has already existed in ${name}`;
};

const OLD_PASSWORD_INCORRECT = (name: any) => {
  return `ERROR: Old password is incorrect`;
};

const MATCH_PASSWORD = (name: any) => {
  return `ERROR: Password does not match`;
};

const WRONG_INFO = (name: any) => {
  return `ERROR: Username or password is incorrect`;
};

export {
  DELETE_FAILED,
  DELETE_SUCCESSFUL,
  UPDATE_SUCCESSFUL,
  UPDATE_FAILED,
  ADD_SUCCESSFUL,
  ADD_FAILED,
  AUTHENTICATE_REQUIRED,
  ITEM_EXIST,
  MATCH_PASSWORD,
  OLD_PASSWORD_INCORRECT,
  WRONG_INFO,
};
