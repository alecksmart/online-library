import { combineReducers } from 'redux';

import shelfmanager from './shelves';
import bookmanager from './books';
import home from './home';
import usermanager from './users';
import app from './app';

const rootReducer = () => combineReducers({
  app,
  home,
  usermanager,
  shelfmanager,
  bookmanager,
});

export default rootReducer;
