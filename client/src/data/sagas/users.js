import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { EDIT_MODE, ENVS } from 'config/constants';
import RequestError from 'errors/RequestError';
import isNil from 'lodash/isNil';
import { checkHeadersSaga } from 'data/sagas/app';
import {
  showErrorNotification,
  showInfoNotification,
} from 'data/actions/app';
import {
  userActions,
  userDeleteFail,
  userDeleteSuccess,
  userGetFail,
  userGetSuccess,
  userListFail,
  userListSuccess,
  userPersistFail,
  userPersistSuccess,
} from 'data/actions/users';
import { commonHeadersSelector } from 'data/selectors/app';
import i18n from 'services/i18n';

function* userListSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback } = payload || false;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      '/api/admin/user',
      {
        headers: {
          ...commonHeaders,
          ...headers,
        },
        cache: 'no-store',
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, response);
    }
    yield put(userListSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(userListFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* userDeleteSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback, id } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/admin/user/${id}`,
      {
        method: 'DELETE',
        headers: {
          ...commonHeaders,
          ...headers,
        },
        cache: 'no-store',
      },
    ));
    const { status } = response;
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, response);
    }
    yield put(userDeleteSuccess());
    if (callback) {
      yield call(callback);
    }
    yield put(showInfoNotification(i18n.t('Operation successful')));
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    yield put(userDeleteFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* userPersistSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const {
    callback, editMode, postData,
  } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      '/api/admin/user',
      {
        method: editMode === EDIT_MODE.CREATE ? 'POST' : 'PUT',
        headers: {
          ...commonHeaders,
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        cache: 'no-store',
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, response);
    }
    yield put(userPersistSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
    yield put(showInfoNotification(i18n.t('Operation successful')));
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(userPersistFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* userGetSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback, id } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/admin/user/${id}`,
      {
        headers: {
          ...commonHeaders,
          ...headers,
        },
        cache: 'no-store',
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, response);
    }
    yield put(userGetSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(userGetFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(userActions.USER_LIST, userListSaga)]);
  yield all([takeLatest(userActions.USER_PERSIST, userPersistSaga)]);
  yield all([takeLatest(userActions.USER_DELETE, userDeleteSaga)]);
  yield all([takeLatest(userActions.USER_GET, userGetSaga)]);
}
