import { createAction } from 'redux-actions';
import setActionNames from 'utils/setActionNames';

export const shelfLoading = setActionNames(['FETCHING_DATA']);

export const shelfActions = setActionNames([
  'SHELF_LIST',
  'SHELF_LIST_SUCCESS',
  'SHELF_LIST_FAIL',
  'SHELF_GET',
  'SHELF_GET_SUCCESS',
  'SHELF_GET_FAIL',
  'SHELF_PERSIST',
  'SHELF_PERSIST_SUCCESS',
  'SHELF_PERSIST_FAIL',
  'SHELF_DELETE',
  'SHELF_DELETE_SUCCESS',
  'SHELF_DELETE_FAIL',
  'SHELF_CLEAR',
]);

export const shelfList = createAction(shelfActions.SHELF_LIST);
export const shelfListSuccess = createAction(shelfActions.SHELF_LIST_SUCCESS);
export const shelfListFail = createAction(shelfActions.SHELF_LIST_FAIL);

export const shelfGet = createAction(shelfActions.SHELF_GET);
export const shelfGetSuccess = createAction(shelfActions.SHELF_GET_SUCCESS);
export const shelfGetFail = createAction(shelfActions.SHELF_GET_FAIL);

export const shelfPersist = createAction(shelfActions.SHELF_PERSIST);
export const shelfPersistSuccess = createAction(shelfActions.SHELF_PERSIST_SUCCESS);
export const shelfPersistFail = createAction(shelfActions.SHELF_PERSIST_FAIL);

export const shelfDelete = createAction(shelfActions.SHELF_DELETE);
export const shelfDeleteSuccess = createAction(shelfActions.SHELF_DELETE_SUCCESS);
export const shelfDeleteFail = createAction(shelfActions.SHELF_DELETE_FAIL);

export const shelfClear = createAction(shelfActions.SHELF_CLEAR);
