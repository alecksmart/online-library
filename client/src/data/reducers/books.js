import { handleActions } from 'redux-actions';
import { get } from 'lodash';

import {
  bookClear,
  bookDelete,
  bookDeleteFail,
  bookDeleteSuccess,
  bookGet,
  bookGetFail,
  bookGetSuccess,
  bookList,
  bookListFail,
  bookListSuccess,
  bookLoading,
  bookPersist,
  bookPersistFail,
  bookPersistSuccess,
} from '../actions/books';

export const initialState = {
  entryList: [],
  entry: {},
  spinEntry: [],
  spinList: [],
};

export default handleActions({
  // list
  [bookList](state) {
    return {
      ...state,
      spinList: [...state.spinList, bookLoading.FETCHING_DATA],
    };
  },
  [bookListSuccess](state, { payload }) {
    return {
      ...state,
      entryList: get(payload, 'books', []),
      spinList: state.spinList.filter((e) => e !== bookLoading.FETCHING_DATA),
    };
  },
  [bookListFail](state, { payload }) {
    return {
      ...state,
      spinList: state.spinList.filter((e) => e !== bookLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // get
  [bookGet](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, bookLoading.FETCHING_DATA],
    };
  },
  [bookGetSuccess](state, { payload }) {
    const { book: entry } = payload;

    return {
      ...state,
      entry,
      spinEntry: state.spinEntry.filter((e) => e !== bookLoading.FETCHING_DATA),
    };
  },
  [bookGetFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== bookLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // persist
  [bookPersist](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, bookLoading.FETCHING_DATA],
    };
  },
  [bookPersistSuccess](state) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== bookLoading.FETCHING_DATA),
    };
  },
  [bookPersistFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== bookLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // delete
  [bookDelete](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, bookLoading.FETCHING_DATA],
    };
  },
  [bookDeleteSuccess](state) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== bookLoading.FETCHING_DATA),
    };
  },
  [bookDeleteFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== bookLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // clear
  [bookClear](state) {
    return {
      ...state,
      entry: {},
    };
  },
},
initialState);
