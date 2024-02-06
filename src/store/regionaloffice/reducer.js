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
  GET_REGIONAL_CREDIT_LIST,
  GET_REGIONAL_CREDIT_LIST_SUCCESS,
  GET_REGIONAL_CREDIT_LIST_FAIL,
  GET_REGIONAL_BANK_LIST,
  GET_REGIONAL_BANK_LIST_SUCCESS,
  GET_REGIONAL_BANK_LIST_FAIL,
  ADD_NEW_REGIONALOFFICE,
  ADD_REGIONALOFFICE_SUCCESS,
  ADD_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICE,
  UPDATE_REGIONALOFFICE_SUCCESS,
  UPDATE_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICES_CURRENT_PAGE,
  GET_REGIONAL_ALLOTTEDBOUQUET,
  GET_REGIONAL_ALLOTTEDBOUQUET_SUCCESS,
  GET_REGIONAL_ALLOTTEDBOUQUET_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  regionaloffice: [],
  regionalBouquet: [],
  regionalCreditList: [],
  regionalBankList: [],
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

    case GET_REGIONAL_ALLOTTEDBOUQUET:
      return {
        ...state,
        loading: true,
      };
    case GET_REGIONAL_ALLOTTEDBOUQUET_SUCCESS:
      // console.log("RegionalOffice data in reducer:", action.payload);
      return {
        ...state,
        // regionalBouquet: action.payload.data.data,
        regionalBouquet: state.regionaloffice.map((regoff) =>
          regoff.id === action.payload.id
            ? { regoff, ...action.payload }
            : regoff
        ),
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_REGIONAL_ALLOTTEDBOUQUET_FAIL:
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
    case GET_REGIONAL_CREDIT_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_REGIONAL_CREDIT_LIST_SUCCESS:
      // console.log("RegionalOffice data in reducer:", action.payload);
      return {
        ...state,
        regionalCreditList: action.payload,
        loading: false,
      };

    case GET_REGIONAL_CREDIT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_REGIONAL_BANK_LIST:
      return {
        ...state,
        loading: true,
      };
    case GET_REGIONAL_BANK_LIST_SUCCESS:
      // console.log("RegionalOffice data in reducer:", action.payload);
      return {
        ...state,
        regionalBankList: action.payload,
        loading: false,
      };

    case GET_REGIONAL_BANK_LIST_FAIL:
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
