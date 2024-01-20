import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_FAIL,
  ADD_CITY,
  ADD_CITY_SUCCESS,
  ADD_CITY_FAIL,
  GET_DISTRICT_BYSTATEID_SUCCESS,
  GET_DISTRICT_BYSTATEID_FAIL,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_FAIL,
  UPDATE_CITY,
  UPDATE_CITY_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  city: [],
  districtlist: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const City = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_CITY_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_CITY:
      return {
        ...state,
        loading: true,
      };

    case GET_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_CITY:
      return {
        ...state,
        loading: true,
      };

    case ADD_CITY_SUCCESS:
      return {
        ...state,
        city: [...state.city, action.payload],
        loading: false,
      };

    case ADD_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_DISTRICT_BYSTATEID_SUCCESS:
      return {
        ...state,
        districtlist: action.payload,
        loading: false,
      };

    case GET_DISTRICT_BYSTATEID_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CITY:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CITY_SUCCESS:
      return {
        ...state,

        loading: false,
        city: state.city.map((cite) =>
          cite.id === action.payload.id ? { ...cite, ...action.payload } : cite
        ),
        // city: state.city.map((cite) =>
        //   cite.id.toString() === action.payload.id.toString()
        //     ? { city: cite, ...action.payload }
        //     : cite
        // ),
      };

    case UPDATE_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default City;
