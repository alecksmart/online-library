import { connect } from 'react-redux';
import {
  register,
  showErrorNotification,
  showInfoNotification,
} from 'data/actions/app';

import UserRegister from './UserRegister';

const mapStateToProps = () => ({});

const mapDispatchTProps = {
  showErrorNotification,
  showInfoNotification,
  register,
};

export default connect(mapStateToProps, mapDispatchTProps)(UserRegister);
