import { connect } from 'react-redux';
import {
  showErrorNotification,
  showInfoNotification,
} from 'data/actions/app';
import { isEmpty } from 'lodash';
import {
  homeAddToMy,
  homeRemoveFromMy,
  myBooksList,
} from 'data/actions/home';
import {
  entryListSelector,
  entryPageSizeSelector,
  entryTotalSelector,
  spinListSelector,
} from 'data/selectors/home';

import MyBooks from './MyBooks';

const mapStateToProps = (state) => ({
  entryList: entryListSelector(state),
  pageSize: entryPageSizeSelector(state),
  total: entryTotalSelector(state),
  loading: !isEmpty(spinListSelector(state)),
});

const mapDispatchTProps = {
  showErrorNotification,
  showInfoNotification,
  myBooksList,
  homeAddToMy,
  homeRemoveFromMy,
};

export default connect(mapStateToProps, mapDispatchTProps)(MyBooks);
