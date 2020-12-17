import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const bookManagerSelector = (state) => state.bookmanager || {};

export const spinEntrySelector = createSelector(
  bookManagerSelector,
  (manager) => !isEmpty(manager.spinEntry, false),
);

export const spinListSelector = createSelector(
  bookManagerSelector,
  (manager) => !isEmpty(manager.spinList, false),
);

export const entrySelector = createSelector(
  bookManagerSelector,
  (manager) => get(manager, 'entry', {}),
);

export const entryListSelector = createSelector(
  bookManagerSelector,
  (manager) => get(manager, 'entryList', []),
);
