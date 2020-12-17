import { createAction } from 'redux-actions';
import setActionNames from 'utils/setActionNames';

export const homeLoading = setActionNames(['FETCHING_DATA']);

export const homeActions = setActionNames([
  'HOME_LIST',
  'HOME_LIST_SUCCESS',
  'HOME_LIST_FAIL',
  'HOME_ADD_TO_MY',
  'HOME_REMOVE_FROM_MY',
  'MY_BOOKS_LIST',
  'MY_BOOKS_LIST_SUCCESS',
  'MY_BOOKS_LIST_FAIL',
]);

export const homeList = createAction(homeActions.HOME_LIST);
export const homeListSuccess = createAction(homeActions.HOME_LIST_SUCCESS);
export const homeListFail = createAction(homeActions.HOME_LIST_FAIL);

export const homeAddToMy = createAction(homeActions.HOME_ADD_TO_MY);
export const homeRemoveFromMy = createAction(homeActions.HOME_REMOVE_FROM_MY);

export const myBooksList = createAction(homeActions.MY_BOOKS_LIST);
export const myBooksListSuccess = createAction(homeActions.MY_BOOKS_LIST_SUCCESS);
export const myBooksListFail = createAction(homeActions.MY_BOOKS_LIST_FAIL);
