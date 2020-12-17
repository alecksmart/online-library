import React, {
  Suspense, useEffect, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Switch,
  useHistory,
} from 'react-router-dom';
import MainLayout from 'components/MainLayout';
import Spinner from 'components/Spinner';
import { routes, RouteWithSubRoutes } from 'config/routes';
import { notification as toast } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

export const Application = ({
  loading,
  isLoggedIn,
  isAdmin,
  setLanguage,
  lng,
  notifications,
  clearNotifications,
  shelfList,
  shelves,
}) => {
  const history = useHistory();
  const { i18n, t } = useTranslation();

  useLayoutEffect(() => {
    // quick fix for hashRouter bug, history is not availble yet
    const { PUBLIC_URL } = process.env;
    if (PUBLIC_URL && window.location.pathname === PUBLIC_URL) {
      window.location.href = `${PUBLIC_URL}/`;
    }
  });

  useEffect(() => {
    shelfList();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng, i18n]);

  useEffect(() => {
    if (!isEmpty(notifications)) {
      const toasts = [...notifications];
      clearNotifications();
      toasts.forEach((v) => toast[v.type]({
        message: v.message,
        description: v.description,
      }));
    }
  }, [notifications, clearNotifications]);

  return (
    <Router history={history}>
      <Helmet>
        <title>{t('Online Library')}</title>
      </Helmet>
      <MainLayout
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        setLanguage={setLanguage}
        shelves={shelves}
        lng={lng}
        t={t}
      >
        {loading ? (
          <Spinner isVisible t={t} />
        ) : (
          <Suspense fallback={<Spinner isVisible t={t} />}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes
                  isLoggedIn={isLoggedIn}
                  isAdmin={isAdmin}
                  key={i}
                  {...route}
                />
              ))}
            </Switch>
          </Suspense>
        )}
      </MainLayout>
    </Router>
  );
};

Application.defaultProps = {
  error: null,
  loading: true,
  notifications: [],
  config: null,
  isAdmin: false,
  isLoggedIn: false,
};

Application.propTypes = {
  error: PropTypes.any,
  loading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  notifications: PropTypes.array,
  config: PropTypes.object,
  setLanguage: PropTypes.func.isRequired,
  shelfList: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired,
};

export default Application;
