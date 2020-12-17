import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const userManagerSelector = (state) => state.usermanager || {};

export const spinEntrySelector = createSelector(
  userManagerSelector,
  (manager) => !isEmpty(manager.spinEntry, false),
);

export const spinListSelector = createSelector(
  userManagerSelector,
  (manager) => !isEmpty(manager.spinList, false),
);

export const entrySelector = createSelector(
  userManagerSelector,
  (manager) => get(manager, 'entry', {}),
);

export const entryListSelector = createSelector(
  userManagerSelector,
  (manager) => get(manager, 'entryList', []),
);
