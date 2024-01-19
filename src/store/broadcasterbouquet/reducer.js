import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_BROADCASTERBOUQUETLIST,
  GET_BROADCASTERBOUQUETLIST_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_FAIL,
  ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  ADD_BROADCASTERBOUQUETLIST_FAIL,
  UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  broadcasterBouquetList: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const BroadcasterBouquetList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_BROADCASTERBOUQUETLIST:
      return {
        ...state,
        loading: true,
      };

    case GET_BROADCASTERBOUQUETLIST_SUCCESS:
      console.log("BroadcasterBouquetList data in reducer:", action.payload);
      return {
        ...state,
        broadcasterBouquetList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_BROADCASTERBOUQUETLIST_SUCCESS:
      return {
        ...state,
        broadcasterBouquetList: [
          ...state.broadcasterBouquetList,
          action.payload,
        ],
      };

    case ADD_BROADCASTERBOUQUETLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BroadcasterBouquetList;
