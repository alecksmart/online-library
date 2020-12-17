import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { ENVS } from 'config/constants';
import RequestError from 'errors/RequestError';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import {
  appActions,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerSuccess,
  showErrorNotification,
  showInfoNotification,
  userSelfUpdateFail,
  userSelfUpdateSuccess,
} from 'data/actions/app';
import { commonHeadersSelector } from 'data/selectors/app';
import i18n from 'services/i18n';

export function* checkHeadersSaga() {
  const accessToken = yield select((state) => get(state, 'app.user.accessToken', null));
  if (isNil(accessToken)) {
    yield logoutSuccess();
    yield showInfoNotification(i18n.t('You were logged out for security purposes!'));

    return null;
  }

  return { 'X-Access-Token': accessToken };
}

function* loginSaga({ payload }) {
  const { callback } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const { postData } = payload;
    const response = yield call(() => fetch(
      '/api/auth/login',
      {
        method: 'POST',
        headers: { ...commonHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError('Bad response', status, response);
    }
    yield put(loginSuccess(dataJson));
    yield put(showInfoNotification(i18n.t('Welcome back to the online library!')));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(loginFail(i18n.t('Bad credentials')));
    yield put(showErrorNotification(i18n.t('Bad credentials')));
  }
}

function* logOutSaga({ payload }) {
  const { callback } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      '/api/auth/logout',
      { headers: commonHeaders },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, { ...response, dataJson });
    }
    yield put(logoutSuccess());
    yield put(showInfoNotification(i18n.t('See you back soon!')));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(logoutFail(i18n.t('Bad credentials')));
    yield put(showErrorNotification(i18n.t('Bad credentials')));
  }
}

function* registerSaga({ payload }) {
  const { callback, postData } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      '/api/auth/register',
      {
        method: 'POST',
        headers: {
          ...commonHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, { ...response, dataJson });
    }
    yield put(registerSuccess());
    yield put(showInfoNotification(i18n.t('Welcome to the online library! Please login with your email and password!')));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(registerFail(i18n.t('Bad post data')));
    yield put(showErrorNotification(i18n.t('Error validating login name and/or password!')));
  }
}

function* updateSelfSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const { callback, postData } = payload;
    const response = yield call(() => fetch(
      '/api/user/update',
      {
        method: 'PUT',
        headers: {
          ...commonHeaders,
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, { ...response, dataJson });
    }
    yield put(userSelfUpdateSuccess(dataJson));
    yield put(showInfoNotification(i18n.t('You were logged out for security purposes! Please login again with your email and password!')));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(userSelfUpdateFail(i18n.t('Bad post data')));
    yield put(showErrorNotification(i18n.t('Error validating login name and/or password!')));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(appActions.LOGIN, loginSaga),
    takeLatest(appActions.LOGOUT, logOutSaga),
    takeLatest(appActions.REGISTER, registerSaga),
    takeLatest(appActions.USER_SELF_UPDATE, updateSelfSaga),
  ]);
}
