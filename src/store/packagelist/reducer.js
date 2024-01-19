import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_PACKAGELIST, GET_PACKAGELIST_SUCCESS, GET_PACKAGELIST_FAIL, ADD_PACKAGELIST_SUCCESS,
  ADD_PACKAGELIST_FAIL, UPDATE_PACKAGELIST_CURRENT_PAGE
} from "./actionTypes";

const INIT_STATE = {
  packageList: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const PackageList = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_PACKAGELIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_PACKAGELIST:
      return {
        ...state,
        loading: true,
      };
    case GET_PACKAGELIST_SUCCESS:
      console.log("PackageList data in reducer:", action.payload);
      return {
        ...state,
        packageList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_PACKAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_PACKAGELIST_SUCCESS:
      return {
        ...state,
        packageList: [
          ...state.packageList,
          action.payload,
        ],
      };

    case ADD_PACKAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default PackageList;
