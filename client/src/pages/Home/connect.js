import { connect } from 'react-redux';
import { ownIdSelector } from 'data/selectors/app';
import {
  showErrorNotification,
  showInfoNotification,
} from 'data/actions/app';
import { isEmpty } from 'lodash';
import { shelfNameByIdSelector } from 'data/selectors/shelves';

import {
  homeAddToMy,
  homeList,
  homeRemoveFromMy,
} from '../../data/actions/home';
import {
  entryListSelector,
  entryPageSizeSelector,
  entryTotalSelector,
  spinListSelector,
} from '../../data/selectors/home';
import Home from './Home';

const mapStateToProps = (state) => ({
  entryList: entryListSelector(state),
  pageSize: entryPageSizeSelector(state),
  total: entryTotalSelector(state),
  loading: !isEmpty(spinListSelector(state)),
  forId: ownIdSelector(state),
  getShelfNameById: shelfNameByIdSelector(state),
});

const mapDispatchTProps = {
  showErrorNotification,
  showInfoNotification,
  homeList,
  homeAddToMy,
  homeRemoveFromMy,
};

export default connect(mapStateToProps, mapDispatchTProps)(Home);
