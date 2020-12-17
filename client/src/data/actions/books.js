import { createAction } from 'redux-actions';
import setActionNames from 'utils/setActionNames';

export const bookLoading = setActionNames(['FETCHING_DATA']);

export const bookActions = setActionNames([
  'BOOK_LIST',
  'BOOK_LIST_SUCCESS',
  'BOOK_LIST_FAIL',
  'BOOK_GET',
  'BOOK_GET_SUCCESS',
  'BOOK_GET_FAIL',
  'BOOK_PERSIST',
  'BOOK_PERSIST_SUCCESS',
  'BOOK_PERSIST_FAIL',
  'BOOK_DELETE',
  'BOOK_DELETE_SUCCESS',
  'BOOK_DELETE_FAIL',
  'BOOK_CLEAR',
]);

export const bookList = createAction(bookActions.BOOK_LIST);
export const bookListSuccess = createAction(bookActions.BOOK_LIST_SUCCESS);
export const bookListFail = createAction(bookActions.BOOK_LIST_FAIL);

export const bookGet = createAction(bookActions.BOOK_GET);
export const bookGetSuccess = createAction(bookActions.BOOK_GET_SUCCESS);
export const bookGetFail = createAction(bookActions.BOOK_GET_FAIL);

export const bookPersist = createAction(bookActions.BOOK_PERSIST);
export const bookPersistSuccess = createAction(bookActions.BOOK_PERSIST_SUCCESS);
export const bookPersistFail = createAction(bookActions.BOOK_PERSIST_FAIL);

export const bookDelete = createAction(bookActions.BOOK_DELETE);
export const bookDeleteSuccess = createAction(bookActions.BOOK_DELETE_SUCCESS);
export const bookDeleteFail = createAction(bookActions.BOOK_DELETE_FAIL);

export const bookClear = createAction(bookActions.BOOK_CLEAR);
