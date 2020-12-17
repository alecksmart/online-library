import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { shelfList } from 'data/actions/shelves';
import { entryListSelector as shelvesSelector } from 'data/selectors/shelves';

import { clearNotifications, setLanguage } from '../../data/actions/app';
import {
  configSelector,
  isAdminSelector,
  isLoggedInSelector,
  languageSelector,
} from '../../data/selectors/app';
import Application from './Application';

const mapStateToProps = (state) => {
  const {
    loading,
    error,
    notifications,
  } = state.app;

  return {
    loading: !isEmpty(loading),
    error,
    notifications,
    config: configSelector(state),
    isLoggedIn: isLoggedInSelector(state),
    isAdmin: isAdminSelector(state),
    lng: languageSelector(state),
    shelves: shelvesSelector(state),
  };
};

const mapDispatchTProps = {
  setLanguage, clearNotifications, shelfList,
};

export default connect(mapStateToProps, mapDispatchTProps)(Application);
