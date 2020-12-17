import { connect } from 'react-redux';
import {
  userClear,
  userDelete,
  userGet,
  userList,
  userPersist,
} from 'data/actions/users';
import {
  entryListSelector,
  entrySelector,
  spinEntrySelector,
  spinListSelector,
} from 'data/selectors/users';
import { ownIdSelector } from 'data/selectors/app';

import AdminUsers from './AdminUsers';

const mapStateToProps = (state) => ({
  entry: entrySelector(state),
  entryList: entryListSelector(state),
  spinEntry: spinEntrySelector(state),
  spinList: spinListSelector(state),
  ownId: ownIdSelector(state),
});

const mapDispatchTProps = {
  userDelete,
  userGet,
  userList,
  userPersist,
  userClear,
};

export default connect(mapStateToProps, mapDispatchTProps)(AdminUsers);
