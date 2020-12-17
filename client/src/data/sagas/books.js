import {
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { EDIT_MODE, ENVS } from 'config/constants';
import RequestError from 'errors/RequestError';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { checkHeadersSaga } from 'data/sagas/app';
import {
  showErrorNotification,
  showInfoNotification,
} from 'data/actions/app';
import {
  bookActions,
  bookDeleteFail,
  bookDeleteSuccess,
  bookGetFail,
  bookGetSuccess,
  bookListFail,
  bookListSuccess,
  bookPersistFail,
  bookPersistSuccess,
} from 'data/actions/books';
import { commonHeadersSelector } from 'data/selectors/app';
import i18n from 'services/i18n';

function* bookListSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback } = payload || false;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      '/api/admin/book',
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
    yield put(bookListSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(bookListFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* bookDeleteSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback, id } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/admin/book/${id}`,
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
    yield put(bookDeleteSuccess());
    if (callback) {
      yield call(callback);
    }
    yield put(showInfoNotification(i18n.t('Operation successful')));
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    yield put(bookDeleteFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* bookPersistSaga({ payload }) {
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
      '/api/admin/book',
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
    yield put(bookPersistSuccess(dataJson));
    if (callback) {
      if (editMode === EDIT_MODE.CREATE) {
        const bookId = get(dataJson, 'book.id');
        yield call(callback, bookId);
      } else {
        yield call(callback);
      }
    }
    yield put(showInfoNotification(i18n.t('Operation successful')));
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(bookPersistFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

function* bookGetSaga({ payload }) {
  const headers = yield checkHeadersSaga();
  if (isNil(headers)) {
    return;
  }

  const { callback, id } = payload;
  try {
    const commonHeaders = yield select(commonHeadersSelector);
    const response = yield call(() => fetch(
      `/api/admin/book/${id}`,
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
    yield put(bookGetSuccess(dataJson));
    if (callback) {
      yield call(callback);
    }
  } catch (e) {
    if (process.env.NODE_ENV !== ENVS.PRODUCTION) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    yield put(bookGetFail(i18n.t('Data error')));
    yield put(showErrorNotification(e.message));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(bookActions.BOOK_LIST, bookListSaga)]);
  yield all([takeLatest(bookActions.BOOK_PERSIST, bookPersistSaga)]);
  yield all([takeLatest(bookActions.BOOK_DELETE, bookDeleteSaga)]);
  yield all([takeLatest(bookActions.BOOK_GET, bookGetSaga)]);
}
