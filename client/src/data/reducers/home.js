import { handleActions } from 'redux-actions';
import { get } from 'lodash';

import {
  homeList,
  homeListFail,
  homeListSuccess,
  homeLoading,
  myBooksList,
  myBooksListFail,
  myBooksListSuccess,
} from '../actions/home';

export const initialState = {
  total: 0,
  pageSize: 0,
  countPages: 0,
  entryList: [],
  spinList: [],
};

export default handleActions({
  // list
  [homeList](state) {
    return {
      ...state,
      spinList: [...state.spinList, homeLoading.FETCHING_DATA],
    };
  },
  [homeListSuccess](state, { payload }) {
    return {
      ...state,
      total: get(payload, 'count', 0),
      pageSize: get(payload, 'pageSize', 0),
      countPages: get(payload, 'countPages', 0),
      entryList: get(payload, 'rows', []),
      myBooksIds: get(payload, 'myBooksIds', []),
      spinList: state.spinList.filter((e) => e !== homeLoading.FETCHING_DATA),
    };
  },
  [homeListFail](state, { payload }) {
    return {
      ...state,
      spinList: state.spinList.filter((e) => e !== homeLoading.FETCHING_DATA),
      error: payload,
    };
  },
  // my books
  [myBooksList](state) {
    return {
      ...state,
      spinList: [...state.spinList, homeLoading.FETCHING_DATA],
    };
  },
  [myBooksListSuccess](state, { payload }) {
    return {
      ...state,
      total: get(payload, 'count', 0),
      pageSize: get(payload, 'pageSize', 0),
      countPages: get(payload, 'countPages', 0),
      entryList: get(payload, 'rows', []),
      spinList: state.spinList.filter((e) => e !== homeLoading.FETCHING_DATA),
    };
  },
  [myBooksListFail](state, { payload }) {
    return {
      ...state,
      spinList: state.spinList.filter((e) => e !== homeLoading.FETCHING_DATA),
      error: payload,
    };
  },
},
initialState);
