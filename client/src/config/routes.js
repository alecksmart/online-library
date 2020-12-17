import React, { lazy } from 'react';
// import PropTypes from "prop-types";
import { Redirect, Route } from 'react-router-dom';
import { getLocationPathName, getRootPrefix } from 'config/utils';

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ 'pages/Home'));
const Book = lazy(() => import(/* webpackChunkName: 'Home' */ 'pages/Book'));

const MyAccount = lazy(() => import(/* webpackChunkName: 'MyAccount' */ 'pages/MyAccount'));
const MyBooks = lazy(() => import(/* webpackChunkName: 'MyBooks' */ 'pages/MyBooks'));

const UserLogin = lazy(() => import(/* webpackChunkName: 'UserLogin' */ 'pages/UserLogin'));
const UserRegister = lazy(() => import(/* webpackChunkName: 'UserRegister' */ 'pages/UserRegister'));

const AdminBooks = lazy(() => import(/* webpackChunkName: 'AdminBooks' */ 'pages/AdminBooks'));
const AdminShelves = lazy(() => import(/* webpackChunkName: 'AdminShelves' */ 'pages/AdminShelves'));
const AdminUsers = lazy(() => import(/* webpackChunkName: 'AdminUsers' */ 'pages/AdminUsers'));

const NotFound = () => <div>Not found...</div>;

export const paths = {
  routes: {
    root: getLocationPathName(''),
    myaccount: {
      root: getLocationPathName('my-account'),
      title: 'My Account',
    },
    mybooks: {
      root: getLocationPathName('my-books'),
      title: 'My Books',
    },
    login: {
      root: getLocationPathName('login'),
      requiresLogin: false,
      requiresAdmin: false,
      title: 'Login',
    },
    logout: {
      root: getLocationPathName('logout'),
      requiresLogin: true,
      requiresAdmin: false,
      title: 'Log Out',
    },
    register: {
      root: getLocationPathName('register'),
      requiresLogin: false,
      requiresAdmin: false,
      title: 'Register',
    },
    adminBooks: {
      root: getLocationPathName('admin-books'),
      requiresLogin: true,
      requiresAdmin: true,
      title: 'Books',
    },
    adminShelves: {
      root: getLocationPathName('admin-shelves'),
      requiresLogin: true,
      requiresAdmin: true,
      title: 'Shelves',
    },
    adminUsers: {
      root: getLocationPathName('admin-users'),
      requiresLogin: true,
      requiresAdmin: true,
      title: 'Users',
    },
    shelf: {
      root: `${getLocationPathName('shelf/:shelfId')}`,
      title: 'Shelf',
    },
    book: {
      root: `${getLocationPathName('book/:bookId')}`,
      title: 'Book',
    },
    rootPrefix: getRootPrefix(),
  },
};

export const routes = [
  {
    path: paths.routes.root,
    component: Home,
    exact: true,
  },
  {
    path: paths.routes.shelf.root,
    component: Home,
  },
  {
    path: paths.routes.book.root,
    component: Book,
  },
  {
    path: paths.routes.myaccount.root,
    requiresLogin: true,
    component: MyAccount,
  },
  {
    path: paths.routes.mybooks.root,
    requiresLogin: true,
    component: MyBooks,
  },
  {
    path: paths.routes.login.root,
    component: UserLogin,
    requiresNotToBeLoggedIn: true,
  },
  {
    path: paths.routes.logout.root,
    requiresLogin: true,
    component: UserLogin,
  },
  {
    path: paths.routes.register.root,
    component: UserRegister,
    requiresNotToBeLoggedIn: true,
  },
  {
    path: paths.routes.adminBooks.root,
    requiresAdmin: true,
    component: AdminBooks,
  },
  {
    path: paths.routes.adminShelves.root,
    requiresAdmin: true,
    component: AdminShelves,
  },
  {
    path: paths.routes.adminUsers.root,
    requiresAdmin: true,
    component: AdminUsers,
    exact: true,
  },
  { component: NotFound },
];

export const RouteWithSubRoutes = (route) => {
  const {
    isLoggedIn, isAdmin,
    requiresLogin, requiresAdmin,
    requiresNotToBeLoggedIn,
    path, exact, params,
  } = route;
  if (!path) {
    return <Route path="*" component={route.component} />;
  }

  if ((requiresLogin && !isLoggedIn) || (requiresAdmin && !isAdmin)) {
    return (
      <Route
        exact={exact}
        path={path}
        params={params}
      >
        <Redirect to="/login" />
      </Route>
    );
  }

  if (requiresNotToBeLoggedIn && isLoggedIn) {
    return (
      <Route
        exact={exact}
        path={path}
        params={params}
      >
        <Redirect to="/" />
      </Route>
    );
  }

  return (
    <Route
      exact={exact}
      path={path}
      params={params}
      render={(routeProps) => <route.component {...routeProps} routes={route.routes} />}
    />
  );
};

RouteWithSubRoutes.propTypes = {};
