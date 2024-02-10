import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_GENRELIST,
  GET_GENRELIST_SUCCESS,
  GET_GENRELIST_FAIL,
  UPDATE_GENRELIST,
  UPDATE_GENRELIST_SUCCESS,
  UPDATE_GENRELIST_FAIL,
  GET_GENRELIST_STATUS_SUCCESS,
  GET_GENRELIST_STATUS_FAIL,
  ADD_NEW_GENRELIST,
  ADD_GENRELIST_SUCCESS,
  ADD_GENRELIST_FAIL,
  UPDATE_GENRELIST_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  genreList: [],
  genreListStatus: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const GenreList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_GENRELIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_GENRELIST:
      return {
        ...state,
        loading: true,
      };

    case GET_GENRELIST_SUCCESS:
      console.log("GenreList data in reducer:", action.payload);
      return {
        ...state,
        genreList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_GENRELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_GENRELIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_GENRELIST_SUCCESS:
      return {
        ...state,
        loading: false,
        genreList: state.genreList.map((genreList) =>
          genreList.id === action.payload.id ? { ...genreList, ...action.payload } : genreList
        ),

      };

    case UPDATE_GENRELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_GENRELIST_STATUS_SUCCESS:
      console.log("Genre List data in reducer:", action.payload);
      return {
        ...state,
        genreListStatus: action.payload,
        loading: false,
      };

    case GET_GENRELIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_GENRELIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_GENRELIST_SUCCESS:
      return {
        ...state,
        genreList: [...state.genreList, action.payload],
        loading: false,
      };

    case ADD_GENRELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default GenreList;
