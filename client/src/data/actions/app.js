import { createAction } from 'redux-actions';
import setActionNames from 'utils/setActionNames';

export const appLoading = setActionNames(['FETCHING_DATA']);

export const appActions = setActionNames([
  'SET_LANGUAGE',
  'START_SPINNER',
  'STOP_SPINNER',
  'SHOW_ERROR_NOTIFICATION',
  'SHOW_INFO_NOTIFICATION',
  'CLEAR_NOTIFICATIONS',
  'LOGIN',
  'LOGIN_SUCCESS',
  'LOGIN_FAIL',
  'LOGOUT',
  'LOGOUT_SUCCESS',
  'LOGOUT_FAIL',
  'REGISTER',
  'REGISTER_SUCCESS',
  'REGISTER_FAIL',
  'USER_SELF_UPDATE',
  'USER_SELF_UPDATE_SUCCESS',
  'USER_SELF_UPDATE_FAIL',
]);

export const setLanguage = createAction(appActions.SET_LANGUAGE);

export const showErrorNotification = createAction(appActions.SHOW_ERROR_NOTIFICATION);
export const showInfoNotification = createAction(appActions.SHOW_INFO_NOTIFICATION);
export const clearNotifications = createAction(appActions.CLEAR_NOTIFICATIONS);

export const startSpinner = createAction(appActions.START_SPINNER);
export const stopSpinner = createAction(appActions.STOP_SPINNER);

export const login = createAction(appActions.LOGIN);
export const loginSuccess = createAction(appActions.LOGIN_SUCCESS);
export const loginFail = createAction(appActions.LOGIN_FAIL);

export const logout = createAction(appActions.LOGOUT);
export const logoutSuccess = createAction(appActions.LOGOUT_SUCCESS);
export const logoutFail = createAction(appActions.LOGOUT_FAIL);

export const register = createAction(appActions.REGISTER);
export const registerSuccess = createAction(appActions.REGISTER_SUCCESS);
export const registerFail = createAction(appActions.REGISTER_FAIL);

export const userSelfUpdate = createAction(appActions.USER_SELF_UPDATE);
export const userSelfUpdateSuccess = createAction(appActions.USER_SELF_UPDATE_SUCCESS);
export const userSelfUpdateFail = createAction(appActions.USER_SELF_UPDATE_FAIL);
