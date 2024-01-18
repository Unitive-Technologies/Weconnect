import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_BROADCASTER,
  GET_BROADCASTER_SUCCESS,
  GET_BROADCASTER_FAIL,
  UPDATE_BROADCASTER_SUCCESS,
  UPDATE_BROADCASTER_FAIL,
  GET_BROADCASTER_STATUS_SUCCESS,
  GET_BROADCASTER_STATUS_FAIL,
  ADD_BROADCASTER_SUCCESS,
  ADD_BROADCASTER_FAIL,
  UPDATE_BROADCASTER_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  broadCasters: [],
  broadCastersStatus: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const BroadCaster = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_BROADCASTER_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_BROADCASTER:
      return {
        ...state,
        loading: true,
      };

    case GET_BROADCASTER_SUCCESS:
      console.log("BroadCasters data in reducer:", action.payload);
      return {
        ...state,
        broadCasters: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case GET_BROADCASTER_STATUS_SUCCESS:
      console.log("Broadcaster status data in reducer:", action.payload);
      return {
        ...state,
        broadCastersStatus: action.payload,
        loading: false,
      };

    case GET_BROADCASTER_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BROADCASTER_SUCCESS:
      return {
        ...state,
        broadCasters: [
          ...state.broadCasters,
          action.payload,
        ],
      };

    case ADD_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_BROADCASTER_SUCCESS:
      return {
        ...state,
        broadCasters: state.broadCasters.map((broadCasters) =>
          broadCasters.id.toString() === action.payload.id.toString()
            ? { broadCasters, ...action.payload }
            : broadCasters
        ),
      };

    case UPDATE_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BroadCaster;
