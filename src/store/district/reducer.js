import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_DISTRICT,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
  ADD_DISTRICT,
  ADD_DISTRICT_SUCCESS,
  ADD_DISTRICT_FAIL,
  GET_ADMINISTRATIVEDIVISION_STATUS_SUCCESS,
  GET_ADMINISTRATIVEDIVISION_STATUS_FAIL,
  GET_DISTRICT_STATELIST_SUCCESS,
  GET_DISTRICT_STATELIST_FAIL,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_FAIL,
  UPDATE_DISTRICT,
  UPDATE_DISTRICT_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  district: [],
  status: [],
  statelist: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const District = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_DISTRICT_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_DISTRICT:
      return {
        ...state,
        loading: true,
      };

    case GET_DISTRICT_SUCCESS:
      return {
        ...state,
        district: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };
    case GET_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_DISTRICT:
      return {
        ...state,
        loading: true,
      };
    case ADD_DISTRICT_SUCCESS:
      return {
        ...state,
        district: [...state.district, action.payload],
        loading: false,
      };
    case ADD_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_ADMINISTRATIVEDIVISION_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload,
        loading: false,
      };
    case GET_ADMINISTRATIVEDIVISION_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRICT_STATELIST_SUCCESS:
      return {
        ...state,
        statelist: action.payload,
        loading: false,
      };
    case GET_DISTRICT_STATELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_DISTRICT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DISTRICT_SUCCESS:
      return {
        ...state,
        loading: false,
        district: state.district.map((dist) =>
          dist.id === action.payload.id ? { ...dist, ...action.payload } : dist
        ),
      };
    case UPDATE_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default District;
