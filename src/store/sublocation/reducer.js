import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_SUBLOCATION,
  GET_SUBLOCATION_SUCCESS,
  GET_SUBLOCATION_FAIL,
  ADD_SUBLOCATION,
  ADD_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION_FAIL,
  UPDATE_SUBLOCATION,
  UPDATE_SUBLOCATION_SUCCESS,
  UPDATE_SUBLOCATION_FAIL,
  GET_LOCATION_ONSUBLOCATION_SUCCESS,
  GET_LOCATION_ONSUBLOCATION_FAIL,
  GET_SINGLE_SUBLOCATION_SUCCESS,
  GET_SINGLE_SUBLOCATION_FAIL,
  UPDATE_SUBLOCATION_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  sublocation: [],
  locateonsublocate: [],
  singleSublocation: {},
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Sublocation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_SUBLOCATION_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_SUBLOCATION:
      return {
        ...state,
        loading: true,
      };

    case GET_SUBLOCATION_SUCCESS:
      return {
        ...state,
        sublocation: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case GET_SINGLE_SUBLOCATION_SUCCESS:
      console.log("single in reducer:" + action.payload);
      return {
        ...state,
        // singleSublocation: action.payload,
        singleSublocation: state.sublocation.map(
          (sublocate) => sublocate.id === action.payload.id && sublocate
        ),
        loading: false,
      };

    case GET_SINGLE_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_SUBLOCATION:
      return {
        ...state,
        loading: true,
      };

    case ADD_SUBLOCATION_SUCCESS:
      return {
        ...state,
        sublocation: [...state.sublocation, action.payload],
        loading: false,
      };

    case ADD_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_SUBLOCATION:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SUBLOCATION_SUCCESS:
      // console.log("Sublocation in reducer: ", action.payload);
      return {
        ...state,
        loading: false,
        sublocation: state.sublocation.map((sublocate) =>
          sublocate.id === action.payload.id
            ? { ...sublocate, ...action.payload }
            : sublocate
        ),
      };
    //   ...state,
    //   sublocation: state.sublocation.map((sublocate) =>
    //     sublocate.id.toString() === action.payload.id.toString()
    //       ? { sublocation: sublocate, ...action.payload }
    //       : sublocate
    //   ),
    // };

    case UPDATE_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_LOCATION_ONSUBLOCATION_SUCCESS:
      return {
        ...state,
        locateonsublocate: action.payload,
        loading: false,
      };

    case GET_LOCATION_ONSUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Sublocation;
