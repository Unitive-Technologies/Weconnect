import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_CUSTOMERUSERS,
  GET_CUSTOMERUSERS_SUCCESS,
  GET_CUSTOMERUSERS_FAIL,
  UPDATE_CUSTOMERUSER,
  UPDATE_CUSTOMERUSER_SUCCESS,
  UPDATE_CUSTOMERUSER_FAIL,
  GET_CUSTOMERUSERS_SETTINGS,
  GET_CUSTOMERUSERS_SETTINGS_SUCCESS,
  GET_CUSTOMERUSERS_SETTINGS_FAIL,
  UPDATE_CUSTOMERUSERS_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  customerUsers: [],
  customerUsersSettings: [],
  error: {},
  // loading: true,
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const CustomerUsers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMERUSERS_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_CUSTOMERUSERS:
      return {
        ...state,
        loading: true,
      };
    case GET_CUSTOMERUSERS_SUCCESS:
      console.log("CustomerUsers data in reducer:", action.payload);
      return {
        ...state,
        customerUsers: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_CUSTOMERUSERS_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    // case GET_CUSTOMERUSERS_SUCCESS:
    //   console.log("CustomerUsers data in reducer:", action.payload);
    //   return {
    //     ...state,
    //     customerUsers: action.payload,
    //     loading: false,
    //   };

    // case GET_CUSTOMERUSERS_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    case UPDATE_CUSTOMERUSER_SUCCESS:
      return {
        ...state,
        customerUsers: state.customerUsers.map((customerUser) =>
          customerUser.id.toString() === action.payload.id.toString()
            ? { customerUser, ...action.payload }
            : customerUser
        ),
      };

    case UPDATE_CUSTOMERUSER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CUSTOMERUSERS_SETTINGS_SUCCESS:
      console.log("CustomerUsersSettings data in reducer:", action.payload);
      return {
        ...state,
        customerUsersSettings: action.payload,
        loading: false,
      };

    case GET_CUSTOMERUSERS_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerUsers;
