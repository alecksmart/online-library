import { handleActions } from 'redux-actions';
import { get } from 'lodash';

import {
  userClear,
  userDelete,
  userDeleteFail,
  userDeleteSuccess,
  userGet,
  userGetFail,
  userGetSuccess,
  userList,
  userListFail,
  userListSuccess,
  userLoading,
  userPersist,
  userPersistFail,
  userPersistSuccess,
} from '../actions/users';

export const initialState = {
  entryList: [],
  entry: {},
  spinEntry: [],
  spinList: [],
};

export default handleActions({
  // list
  [userList](state) {
    return {
      ...state,
      spinList: [...state.spinList, userLoading.FETCHING_DATA],
    };
  },
  [userListSuccess](state, { payload }) {
    return {
      ...state,
      entryList: get(payload, 'users', []),
      spinList: state.spinList.filter((e) => e !== userLoading.FETCHING_DATA),
    };
  },
  [userListFail](state, { payload }) {
    return {
      ...state,
      spinList: state.spinList.filter((e) => e !== userLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // get
  [userGet](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, userLoading.FETCHING_DATA],
    };
  },
  [userGetSuccess](state, { payload }) {
    const { user: entry } = payload;

    return {
      ...state,
      entry,
      spinEntry: state.spinEntry.filter((e) => e !== userLoading.FETCHING_DATA),
    };
  },
  [userGetFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== userLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // persist
  [userPersist](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, userLoading.FETCHING_DATA],
    };
  },
  [userPersistSuccess](state) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== userLoading.FETCHING_DATA),
    };
  },
  [userPersistFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== userLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // delete
  [userDelete](state) {
    return {
      ...state,
      spinEntry: [...state.spinEntry, userLoading.FETCHING_DATA],
    };
  },
  [userDeleteSuccess](state) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== userLoading.FETCHING_DATA),
    };
  },
  [userDeleteFail](state, { payload }) {
    return {
      ...state,
      spinEntry: state.spinEntry.filter((e) => e !== userLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // clear
  [userClear](state) {
    return {
      ...state,
      entry: {},
    };
  },
},
initialState);
