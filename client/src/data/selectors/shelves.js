import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const shelfManagerSelector = (state) => state.shelfmanager || {};

export const spinEntrySelector = createSelector(
  shelfManagerSelector,
  (manager) => !isEmpty(manager.spinEntry, false),
);

export const spinListSelector = createSelector(
  shelfManagerSelector,
  (manager) => !isEmpty(manager.spinList, false),
);

export const entrySelector = createSelector(
  shelfManagerSelector,
  (manager) => get(manager, 'entry', {}),
);

export const entryListSelector = createSelector(
  shelfManagerSelector,
  (manager) => get(manager, 'entryList', []),
);

export const shelfNameByIdSelector = createSelector(
  entryListSelector,
  (shelves) => (id) => shelves.reduce((a, v) => {
    if (`${v.id}` === `${id}`) {
      a = v.name;
    }

    return a;
  }, ''),
);
