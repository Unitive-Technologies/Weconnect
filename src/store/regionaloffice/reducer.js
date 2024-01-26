import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_REGIONALOFFICE,
  GET_REGIONALOFFICE_SUCCESS,
  GET_REGIONALOFFICE_FAIL,
  ADD_NEW_REGIONALOFFICE,
  ADD_REGIONALOFFICE_SUCCESS,
  ADD_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICE,
  UPDATE_REGIONALOFFICE_SUCCESS,
  UPDATE_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICES_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  regionaloffice: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const RegionalOffice = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_REGIONALOFFICES_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_REGIONALOFFICE:
      return {
        ...state,
        loading: true,
      };
    case GET_REGIONALOFFICE_SUCCESS:
      // console.log("RegionalOffice data in reducer:", action.payload);
      return {
        ...state,
        regionaloffice: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };
    case ADD_NEW_REGIONALOFFICE:
      return {
        ...state,
        loading: true,
      };

    case ADD_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        regionaloffice: [...state.regionaloffice, action.payload],
        loading: false,
      };

    case ADD_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_REGIONALOFFICE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
        regionaloffice: state.regionaloffice.map((regoff) =>
          regoff.id === action.payload.id
            ? { regoff, ...action.payload }
            : regoff
        ),
      };

    case UPDATE_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default RegionalOffice;
