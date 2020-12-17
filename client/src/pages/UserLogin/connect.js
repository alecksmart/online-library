import { connect } from 'react-redux';
import {
  login,
  logout,
  showErrorNotification,
  showInfoNotification,
} from 'data/actions/app';

import UserLogin from './UserLogin';

const mapStateToProps = () => ({});

const mapDispatchTProps = {
  showErrorNotification,
  showInfoNotification,
  login,
  logout,
};

export default connect(mapStateToProps, mapDispatchTProps)(UserLogin);
