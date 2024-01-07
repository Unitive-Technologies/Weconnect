import {
  GET_REGIONALOFFICE_SUCCESS,
  GET_REGIONALOFFICE_FAIL,
  ADD_REGIONALOFFICE_SUCCESS,
  ADD_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICE_SUCCESS,
  UPDATE_REGIONALOFFICE_FAIL,
  SET_PER_PAGE,
  SET_CURRENT_PAGE
} from "./actionTypes";

import { RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_PER_PAGE,
  RESPONSE_HEADER_TOTAL_COUNT }
   from "../../constants/strings";

const INIT_STATE = {
  regionaloffice: [],
  error: {},
  loading: true,
  currentPage: 1,
  pageCount: 0,
  perPage: 50,
  totalCount: 0
};

const RegionalOffice = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REGIONALOFFICE_SUCCESS:
      console.log("Regional office data in reducer:", action.payload);
      const currentPage = action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE];
      const pageCount = action.payload.headers[RESPONSE_HEADER_PAGE_COUNT];
      const perPage = action.payload.headers[RESPONSE_HEADER_PER_PAGE];
      const totalCount = action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT];
      return {
        ...state,
        regionaloffice: action.payload.data.data,
        loading: false,
        currentPage: currentPage,
        pageCount: pageCount,
        perPage: perPage,
        totalCount: totalCount
      };

    case GET_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        regionaloffice: [...state.regionaloffice, action.payload],
      };

    case ADD_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        regionaloffice: state.regionaloffice.map((regoff) =>
          regoff.id.toString() === action.payload.id.toString()
            ? { regoff, ...action.payload }
            : regoff
        ),
      };

    case UPDATE_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default RegionalOffice;
