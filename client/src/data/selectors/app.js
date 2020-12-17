import { createSelector } from 'reselect';
import get from 'lodash/get';

const appSelector = (state) => state.app || {};

export const configSelector = createSelector(appSelector, (app) => get(app, 'config', {}));

export const isLoggedInSelector = createSelector(
  appSelector,
  (app) => get(app, 'user.id', false) > 0 && get(app, 'user.accessToken', '').length > 0,
);

export const userProfileSelector = createSelector(
  appSelector,
  (app) => get(app, 'user', {}),
);

export const ownIdSelector = createSelector(
  userProfileSelector,
  (user) => get(user, 'id', 0),
);

export const isAdminSelector = createSelector(
  appSelector,
  isLoggedInSelector,
  (app, isLoggedIn) => isLoggedIn && get(app, 'user.isAdmin', false) === true,
);

export const languageSelector = createSelector(
  configSelector,
  (config) => get(config, 'lng'),
);

export const authHeadersSelector = createSelector(
  appSelector,
  (app) => ({ 'X-Access-Token': get(app, 'user.accessToken', '') }),
);

export const commonHeadersSelector = createSelector(
  languageSelector,
  (language) => ({ 'Accept-Language': language }),
);
