import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_STATEUSERS,
  GET_STATEUSERS_SUCCESS,
  GET_STATEUSERS_FAIL,
  UPDATE_STATEUSERS_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  stateUsers: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const StateUsers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_STATEUSERS_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;

    case GET_STATEUSERS:
      return {
        ...state,
        loading: true,
      };
    case GET_STATEUSERS_SUCCESS:
      console.log("State Users data in reducer:", action.payload);
      return {
        ...state,
        stateUsers: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_STATEUSERS_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default StateUsers;
