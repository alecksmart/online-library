import { handleActions } from 'redux-actions';
import { languageOptions } from 'config/i18n';
import { TOASTS } from 'config/constants';
import i18n from 'services/i18n';

import {
  appLoading,
  clearNotifications,
  login,
  loginFail,
  loginSuccess,
  logout,
  logoutFail,
  logoutSuccess,
  register,
  registerFail,
  registerSuccess,
  setLanguage,
  showErrorNotification,
  showInfoNotification,
  startSpinner,
  stopSpinner,
  userSelfUpdate,
  userSelfUpdateFail,
  userSelfUpdateSuccess,
} from '../actions/app';

export const initialState = {
  loading: [],
  notifications: [],
  counter: 0,
  user: {},
  error: null,
  config: { lng: localStorage.getItem('_localPrefLang') || languageOptions[0].value },
};

export default handleActions({
  // language
  [setLanguage](state, { payload }) {
    return {
      ...state,
      config: {
        ...state.config,
        lng: payload,
      },
    };
  },
  // spinner
  [startSpinner](state, { payload }) {
    return {
      ...state,
      loading: [...state.loading, payload],
    };
  },
  [stopSpinner](state, { payload }) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== payload),
    };
  },
  // notifications
  [showErrorNotification](state, { payload }) {
    return {
      ...state,
      notifications: [
        ...state.notifications,
        {
          message: i18n.t('Error!'),
          description: payload,
          type: TOASTS.ERROR,
        },
      ],
    };
  },
  [showInfoNotification](state, { payload }) {
    return {
      ...state,
      notifications: [
        ...state.notifications,
        {
          message: i18n.t('Info'),
          description: payload,
          type: TOASTS.INFO,
        },
      ],
    };
  },
  [clearNotifications](state) {
    return {
      ...state,
      notifications: [],
    };
  },
  // login
  [login](state) {
    return {
      ...state,
      loading: [...state.loading, appLoading.FETCHING_DATA],
    };
  },
  [loginSuccess](state, { payload }) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
      user: payload,
    };
  },
  [loginFail](state, { payload }) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // logout
  [logout](state) {
    return {
      ...state,
      loading: [...state.loading, appLoading.FETCHING_DATA],
    };
  },
  [logoutSuccess](state) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
      user: initialState.user,
    };
  },
  [logoutFail](state, { payload }) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // register
  [register](state) {
    return {
      ...state,
      loading: [...state.loading, appLoading.FETCHING_DATA],
    };
  },
  [registerFail](state) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
    };
  },
  [registerSuccess](state, { payload }) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // user update self
  [userSelfUpdate](state) {
    return {
      ...state,
      loading: [...state.loading, appLoading.FETCHING_DATA],
    };
  },
  [userSelfUpdateSuccess](state, { payload }) {
    return {
      ...state,
      user: payload,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
    };
  },
  [userSelfUpdateFail](state, { payload }) {
    return {
      ...state,
      loading: state.loading.filter((e) => e !== appLoading.FETCHING_DATA),
      error: payload,
    };
  },
},
initialState);
