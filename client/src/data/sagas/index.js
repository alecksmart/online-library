import { all, fork } from 'redux-saga/effects';

import app from './app';
import usermanager from './users';
import shelfmanager from './shelves';
import bookmanager from './books';
import home from './home';

const allSagas = [
  app,
  home,
  usermanager,
  shelfmanager,
  bookmanager,
];

export default function* rootSaga() {
  yield all(allSagas.map(fork));
}
