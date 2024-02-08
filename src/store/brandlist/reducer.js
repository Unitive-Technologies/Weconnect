import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_BRANDLIST_SUCCESS,
  GET_BRANDLIST_FAIL,
  GET_BRANDLIST_BRANDTYPE_SUCCESS,
  GET_BRANDLIST_BRANDTYPE_FAIL,
  GET_BRANDLIST_BOXTYPE_SUCCESS,
  GET_BRANDLIST_BOXTYPE_FAIL,
  GET_BRANDLIST_CHARACTERS_SUCCESS,
  GET_BRANDLIST_CHARACTERS_FAIL,
  GET_BRANDLIST_STATUS_SUCCESS,
  GET_BRANDLIST_STATUS_FAIL,
  GET_BRANDLIST_CASTYPE_SUCCESS,
  GET_BRANDLIST_CASTYPE_FAIL,
  ADD_BRANDLIST_SUCCESS,
  ADD_BRANDLIST_FAIL,
  UPDATE_BRANDLIST,
  UPDATE_BRANDLIST_SUCCESS,
  UPDATE_BRANDLIST_FAIL,
  UPDATE_BRANDLIST_CURRENT_PAGE,
  GET_BRANDLIST,

} from "./actionTypes";

const INIT_STATE = {
  brandlist: [],
  brandlistBrandType: [],
  brandlistBoxType: [],
  brandlistCharacters: [],
  brandlistStatus: [],
  brandlistCasType: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const BrandList = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_BRANDLIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_BRANDLIST:
      return {
        ...state,
        loading: true,
      };

    case GET_BRANDLIST_SUCCESS:
      return {
        ...state,
        brandlist: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };


    case GET_BRANDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_BRANDLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BRANDLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        brandlist: state.brandlist.map((brandlist) =>
          brandlist.id === action.payload.id ? { ...brandlist, ...action.payload } : brandlist
        ),
        // brandlist: state.brandlist.map((brandlist) =>
        //   brandlist.id.toString() === action.payload.id.toString()
        //     ? { brandlist, ...action.payload }
        //     : brandlist
        // ),
      };

    case UPDATE_BRANDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_BRANDTYPE_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistBrandType: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_BRANDTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_BOXTYPE_SUCCESS:
      console.log("Box Type data in reducer:", action.payload);
      return {
        ...state,
        brandlistBoxType: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_BOXTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_CHARACTERS_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistCharacters: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_CHARACTERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_STATUS_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistStatus: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_CASTYPE_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistCasType: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_CASTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BRANDLIST_SUCCESS:
      return {
        ...state,
        brandlist: [...state.brandlist, action.payload],
      };

    case ADD_BRANDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BrandList;
