import { handleActions } from 'redux-actions';
import { get } from 'lodash';

import {
  shelfClear,
  shelfDelete,
  shelfDeleteFail,
  shelfDeleteSuccess,
  shelfGet,
  shelfGetFail,
  shelfGetSuccess,
  shelfList,
  shelfListFail,
  shelfListSuccess,
  shelfLoading,
  shelfPersist,
  shelfPersistFail,
  shelfPersistSuccess,
} from '../actions/shelves';

export const initialState = {
  entryList: [],
  entry: {},
  spinEntry: [],
  spinList: [],
};

export default handleActions({
  // list
  [shelfList](state) {
    return {
      ...state,
      spinList: [...state.spinList, shelfLoading.FETCHING_DATA],
    };
  },
  [shelfListSuccess](state, { payload }) {
    return {
      ...state,
      entryList: get(payload, 'shelves', []),
      spinList: state.spinList.filter((e) => e !== shelfLoading.FETCHING_DATA),
    };
  },
  [shelfListFail](state, { payload }) {
    return {
      ...state,
      spinList: state.spinList.filter((e) => e !== shelfLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // get
  [shelfGet](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, shelfLoading.FETCHING_DATA],
    };
  },
  [shelfGetSuccess](state, { payload }) {
    const { shelf: entry } = payload;

    return {
      ...state,
      entry,
      spinEntry: state.spinEntry.filter((e) => e !== shelfLoading.FETCHING_DATA),
    };
  },
  [shelfGetFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== shelfLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // persist
  [shelfPersist](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, shelfLoading.FETCHING_DATA],
    };
  },
  [shelfPersistSuccess](state) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== shelfLoading.FETCHING_DATA),
    };
  },
  [shelfPersistFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== shelfLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // delete
  [shelfDelete](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, shelfLoading.FETCHING_DATA],
    };
  },
  [shelfDeleteSuccess](state) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== shelfLoading.FETCHING_DATA),
    };
  },
  [shelfDeleteFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== shelfLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // clear
  [shelfClear](state) {
    return {
      ...state,
      entry: {},
    };
  },
},
initialState);
