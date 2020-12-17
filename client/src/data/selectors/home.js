import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const homeSelector = (state) => state.home || {};

export const spinListSelector = createSelector(
  homeSelector,
  (home) => !isEmpty(home.spinList, false),
);

export const entryListSelector = createSelector(
  homeSelector,
  (home) => {
    const myBooksIds = get(home, 'myBooksIds', []);

    return get(home, 'entryList', []).map((v) => ({ ...v, isMy: myBooksIds.includes(v.id) }));
  },
);

export const entryTotalSelector = createSelector(
  homeSelector,
  (home) => get(home, 'total', 0),
);

export const entryCountPagesSelector = createSelector(
  homeSelector,
  (home) => get(home, 'countPages', 0),
);

export const entryPageSizeSelector = createSelector(
  homeSelector,
  (home) => get(home, 'pageSize', 0),
);
