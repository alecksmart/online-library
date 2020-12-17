import { connect } from 'react-redux';
import { entryListSelector } from 'data/selectors/home';

import Book from './Book';

const mapStateToProps = (state) => ({ entryList: entryListSelector(state) });

export default connect(mapStateToProps)(Book);
