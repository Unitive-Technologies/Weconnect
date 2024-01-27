import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_LOCATION,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAIL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  GET_LCO_ONLOCATION_SUCCESS,
  GET_LCO_ONLOCATION_FAIL,
  // GET_SINGLE_LOCATION_SUCCESS,
  // GET_SINGLE_LOCATION_FAIL,
  UPDATE_LOCATION_CURRENT_PAGE,
  UPDATE_LOCATION,
} from "./actionTypes";

const INIT_STATE = {
  location: [],
  lcoonlocation: [],
  singlelocation: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Location = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_LOCATION_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_LOCATION:
      return {
        ...state,
        loading: true,
      };

    case GET_LOCATION_SUCCESS:
      // console.log("Location data in reducer:", action.payload);
      return {
        ...state,
        location: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_LOCATION:
      return {
        ...state,
        loading: true,
      };
    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        location: [...state.location, action.payload],
        loading: false,
      };

    case ADD_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        location: state.location.map((locate) =>
          locate.id === action.payload.id
            ? { location: locate, ...action.payload }
            : locate
        ),
      };

    case UPDATE_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_LCO_ONLOCATION_SUCCESS:
      return {
        ...state,
        lcoonlocation: action.payload,
        loading: false,
      };

    case GET_LCO_ONLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    // case GET_SINGLE_LOCATION_SUCCESS:
    //   console.log("Single Location data in reducer:", action.payload);
    //   return {
    //     ...state,
    //     singlelocation: action.payload,
    //     loading: false,
    //   };

    // case GET_SINGLE_LOCATION_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

export default Location;
