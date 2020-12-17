import { connect } from 'react-redux';
import {
  shelfClear,
  shelfDelete,
  shelfGet,
  shelfList,
  shelfPersist,
} from 'data/actions/shelves';
import {
  entryListSelector,
  entrySelector,
  spinEntrySelector,
  spinListSelector,
} from 'data/selectors/shelves';

import AdminShelfs from './AdminShelves';

const mapStateToProps = (state) => ({
  entry: entrySelector(state),
  entryList: entryListSelector(state),
  spinEntry: spinEntrySelector(state),
  spinList: spinListSelector(state),
});

const mapDispatchTProps = {
  shelfDelete,
  shelfGet,
  shelfList,
  shelfPersist,
  shelfClear,
};

export default connect(mapStateToProps, mapDispatchTProps)(AdminShelfs);
