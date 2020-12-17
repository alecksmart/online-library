import { connect } from 'react-redux';
import {
  showErrorNotification,
  showInfoNotification,
  userSelfUpdate,
} from 'data/actions/app';
import { userProfileSelector } from 'data/selectors/app';

import MyAccount from './MyAccount';

const mapStateToProps = (state) => ({ userProfile: userProfileSelector(state) });

const mapDispatchTProps = {
  showErrorNotification,
  showInfoNotification,
  userSelfUpdate,
};

export default connect(mapStateToProps, mapDispatchTProps)(MyAccount);
