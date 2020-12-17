import { createAction } from 'redux-actions';
import setActionNames from 'utils/setActionNames';

export const userLoading = setActionNames(['FETCHING_DATA']);

export const userActions = setActionNames([
  'USER_LIST',
  'USER_LIST_SUCCESS',
  'USER_LIST_FAIL',
  'USER_GET',
  'USER_GET_SUCCESS',
  'USER_GET_FAIL',
  'USER_PERSIST',
  'USER_PERSIST_SUCCESS',
  'USER_PERSIST_FAIL',
  'USER_DELETE',
  'USER_DELETE_SUCCESS',
  'USER_DELETE_FAIL',
  'USER_CLEAR',
]);

export const userList = createAction(userActions.USER_LIST);
export const userListSuccess = createAction(userActions.USER_LIST_SUCCESS);
export const userListFail = createAction(userActions.USER_LIST_FAIL);

export const userGet = createAction(userActions.USER_GET);
export const userGetSuccess = createAction(userActions.USER_GET_SUCCESS);
export const userGetFail = createAction(userActions.USER_GET_FAIL);

export const userPersist = createAction(userActions.USER_PERSIST);
export const userPersistSuccess = createAction(userActions.USER_PERSIST_SUCCESS);
export const userPersistFail = createAction(userActions.USER_PERSIST_FAIL);

export const userDelete = createAction(userActions.USER_DELETE);
export const userDeleteSuccess = createAction(userActions.USER_DELETE_SUCCESS);
export const userDeleteFail = createAction(userActions.USER_DELETE_FAIL);

export const userClear = createAction(userActions.USER_CLEAR);
