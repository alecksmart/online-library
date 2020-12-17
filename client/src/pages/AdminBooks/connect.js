import { connect } from 'react-redux';
import {
  bookClear,
  bookDelete,
  bookGet,
  bookList,
  bookPersist,
} from 'data/actions/books';
import { shelfList } from 'data/actions/shelves';
import {
  entryListSelector,
  entrySelector,
  spinEntrySelector,
  spinListSelector,
} from 'data/selectors/books';
import { entryListSelector as shelfListSelector } from 'data/selectors/shelves';
import { authHeadersSelector } from 'data/selectors/app';

import AdminBooks from './AdminBooks';

const mapStateToProps = (state) => ({
  entry: entrySelector(state),
  entryList: entryListSelector(state),
  entryShelfList: entryListSelector(state),
  spinEntry: spinEntrySelector(state),
  shelfOptions: shelfListSelector(state),
  spinList: spinListSelector(state),
  headers: authHeadersSelector(state),
});

const mapDispatchTProps = {
  bookDelete,
  bookGet,
  bookList,
  shelfList,
  bookPersist,
  bookClear,
};

export default connect(mapStateToProps, mapDispatchTProps)(AdminBooks);
