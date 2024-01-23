import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_SUCCESS,
  GET_CHANNELLIST_FAIL,
  ADD_CHANNELLIST_SUCCESS,
  ADD_CHANNELLIST_FAIL,
  UPDATE_CHANNELLIST_CURRENT_PAGE,
  GET_CAS_SOURCE,
  GET_CAS_SOURCE_SUCCESS,
  GET_CAS_SOURCE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  channelList: [],
  pagination: {},
  casSource: [],
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const ChannelList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CHANNELLIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_CHANNELLIST:
      return {
        ...state,
        loading: true,
      };

    case GET_CAS_SOURCE:
      return {
        ...state,
        loading: true,
      };
    case GET_CAS_SOURCE_SUCCESS:
      return {
        ...state,
        casSource: action.payload.data.data,
        loading: false,
      };
    case GET_CAS_SOURCE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_CHANNELLIST_SUCCESS:
      console.log("ChannelList data in reducer:", action.payload);
      return {
        ...state,
        channelList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_CHANNELLIST_SUCCESS:
      return {
        ...state,
        channelList: [...state.channelList, action.payload],
      };

    case ADD_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ChannelList;
