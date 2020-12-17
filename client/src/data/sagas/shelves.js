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
  shelfActions,
  shelfDeleteFail,
  shelfDeleteSuccess,
  shelfGetFail,
  shelfGetSuccess,
  shelfListFail,
  shelfListSuccess,
  shelfPersistFail,
  shelfPersistSuccess,
} from 'data/actions/shelves';
import { commonHeadersSelector } from 'data/selectors/app';
import i18n from 'services/i18n';

function* shelfListSaga({ payload }) {
  const { callback } = payload || false;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      '/api/admin/shelf',
      {
        headers: { ...commonHeaders },
        cache: 'no-store',
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, response);
    }
    yield put(shelfListSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(shelfListFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* shelfDeleteSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback, id } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/admin/shelf/${id}`,
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
    yield put(shelfDeleteSuccess());
    if (callback) {
      yield call(callback);
    }
    yield put(showInfoNotification(i18n.t('Operation successful')));
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    yield put(shelfDeleteFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* shelfPersistSaga({ payload }) {
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
      '/api/admin/shelf',
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
    yield put(shelfPersistSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
    yield put(showInfoNotification(i18n.t('Operation successful')));
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(shelfPersistFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* shelfGetSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback, id } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/admin/shelf/${id}`,
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
    yield put(shelfGetSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(shelfGetFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(shelfActions.SHELF_LIST, shelfListSaga)]);
  yield all([takeLatest(shelfActions.SHELF_PERSIST, shelfPersistSaga)]);
  yield all([takeLatest(shelfActions.SHELF_DELETE, shelfDeleteSaga)]);
  yield all([takeLatest(shelfActions.SHELF_GET, shelfGetSaga)]);
}
