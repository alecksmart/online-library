import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { ENVS } from 'config/constants';
import RequestError from 'errors/RequestError';
import { showErrorNotification } from 'data/actions/app';
import { checkHeadersSaga } from 'data/sagas/app';
import isNil from 'lodash/isNil';
import {
  homeActions,
  homeListFail,
  homeListSuccess,
  myBooksListFail,
  myBooksListSuccess,
} from 'data/actions/home';
import { commonHeadersSelector } from 'data/selectors/app';
import i18n from 'services/i18n';

function* homeListSaga({ payload }) {
  const { query } = payload;

  const { callback } = payload || false;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/library/latest${!query ? '' : `?${query}`}`,
      {
        headers: commonHeaders,
        cache: 'no-store',
      },
    ));
    const { status } = response;
    const dataJson = yield response.json();
    if (status !== 200) {
      throw new RequestError(i18n.t('Bad response'), status, response);
    }
    yield put(homeListSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(homeListFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* myBooksListSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }
  const { query } = payload;

  const { callback } = payload || false;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/user/myBooks${!query ? '' : `?${query}`}`,
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
    yield put(myBooksListSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(myBooksListFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* homeAddToMySaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }
  const { id, callback } = payload;

  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/user/addBook/${id}`,
      {
        method: 'PUT',
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
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(showErrorNotification(e.message));
  }
}

function* homeRemoveFromMySaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { id, callback } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/user/removeBook/${id}`,
      {
        method: 'PUT',
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
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(showErrorNotification(e.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(homeActions.HOME_LIST, homeListSaga)]);
  yield all([takeEvery(homeActions.HOME_ADD_TO_MY, homeAddToMySaga)]);
  yield all([takeEvery(homeActions.HOME_REMOVE_FROM_MY, homeRemoveFromMySaga)]);
  yield all([takeLatest(homeActions.MY_BOOKS_LIST, myBooksListSaga)]);
}
