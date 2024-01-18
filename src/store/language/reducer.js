import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_LANGUAGELIST, GET_LANGUAGELIST_SUCCESS, GET_LANGUAGELIST_FAIL,
  UPDATE_LANGUAGELIST_SUCCESS, UPDATE_LANGUAGELIST_FAIL,
  GET_LANGUAGELIST_STATUS_SUCCESS, GET_LANGUAGELIST_STATUS_FAIL, ADD_LANGUAGELIST_SUCCESS,
  ADD_LANGUAGELIST_FAIL,
  UPDATE_LANGUAGELIST_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  languageList: [],
  languageListStatus: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const LanguageList = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_LANGUAGELIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_LANGUAGELIST:
      return {
        ...state,
        loading: true,
      };

    case GET_LANGUAGELIST_SUCCESS:
      console.log("LanguageList data in reducer:", action.payload);
      return {
        ...state,
        languageList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_LANGUAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_LANGUAGELIST_SUCCESS:
      return {
        ...state,
        languageList: state.languageList.map((languageList) =>
          languageList.id.toString() === action.payload.id.toString()
            ? { languageList, ...action.payload }
            : languageList
        ),
      };

    case UPDATE_LANGUAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LANGUAGELIST_STATUS_SUCCESS:
      console.log("Language List data in reducer:", action.payload);
      return {
        ...state,
        languageListStatus: action.payload,
        loading: false,
      };

    case GET_LANGUAGELIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_LANGUAGELIST_SUCCESS:
      return {
        ...state,
        languageList: [
          ...state.languageList,
          action.payload,
        ],
      };

    case ADD_LANGUAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LanguageList;
