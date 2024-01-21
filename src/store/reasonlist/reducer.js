import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_REASON,
  GET_REASON_SUCCESS,
  GET_REASON_FAIL,
  GET_REASON_STATUS_SUCCESS,
  GET_REASON_STATUS_FAIL,
  GET_REASON_REASONTYPE_SUCCESS,
  GET_REASON_REASONTYPE_FAIL,
  ADD_REASON,
  ADD_REASON_SUCCESS,
  ADD_REASON_FAIL,
  UPDATE_REASON,
  UPDATE_REASON_SUCCESS,
  UPDATE_REASON_FAIL,
  UPDATE_REASON_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  reason: [],
  reasonStatus: [],
  reasonReasonType: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Reason = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_REASON_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_REASON:
      return {
        ...state,
        loading: true,
      };

    case GET_REASON_SUCCESS:
      console.log("Reason list data in reducer:", action.payload);
      return {
        ...state,
        reason: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_REASON_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_REASON:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_REASON_SUCCESS:
      return {
        ...state,
        loading: false,
        reason: state.reason.map((reason) =>
          reason.id === action.payload.id ? { ...reason, ...action.payload } : reason
        ),
      };

    case UPDATE_REASON_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_REASON_STATUS_SUCCESS:
      console.log("Reason data in reducer:", action.payload);
      return {
        ...state,
        reasonStatus: action.payload,
        loading: false,
      };

    case GET_REASON_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_REASON_REASONTYPE_SUCCESS:
      console.log("ReasonType data in reducer:", action.payload);
      return {
        ...state,
        reasonReasonType: action.payload,
        loading: false,
      };

    case GET_REASON_REASONTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_REASON:
      return {
        ...state,
        loading: true,
      };

    case ADD_REASON_SUCCESS:
      return {
        ...state,
        reason: [...state.reason, action.payload],
        loading: false,
      };

    case ADD_REASON_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Reason;
