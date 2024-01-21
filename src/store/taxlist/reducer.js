import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_TAX,
  GET_TAX_SUCCESS, GET_TAX_FAIL,
  UPDATE_TAX,
  UPDATE_TAX_SUCCESS,
  UPDATE_TAX_FAIL,
  ADD_TAXLIST,
  ADD_TAXLIST_SUCCESS,
  ADD_TAXLIST_FAIL,
  GET_TAX_STATUS_FAIL,
  GET_TAX_STATUS_SUCCESS,
  GET_TAX_VALUES_FAIL,
  GET_TAX_VALUES_SUCCESS,
  GET_TAX_APPLY_FAIL,
  GET_TAX_APPLY_SUCCESS,
  GET_TAX_TAXONTAX_FAIL,
  GET_TAX_TAXONTAX_SUCCESS,
  UPDATE_TAX_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  tax: [],
  taxStatus: [],
  taxValues: [],
  taxApply: [],
  taxTaxOnTax: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Tax = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_TAX_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_TAX:
      return {
        ...state,
        loading: true,
      };
    case GET_TAX_SUCCESS:
      console.log("Tax list data in reducer:", action.payload);
      return {
        ...state,
        tax: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_TAX_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_TAX:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TAX_SUCCESS:
      return {
        ...state,
        loading: false,
        tax: state.tax.map((tax) =>
          tax.id === action.payload.id ? { ...tax, ...action.payload } : tax
        ),
        // tax: state.tax.map((tax) =>
        //   tax.id.toString() === action.payload.id.toString()
        //     ? { tax, ...action.payload }
        //     : tax
        // ),
      };

    case UPDATE_TAX_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_TAX_STATUS_SUCCESS:
      console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        taxStatus: action.payload,
        loading: false,
      };

    case GET_TAX_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_TAX_VALUES_SUCCESS:
      console.log("Tax values data success in reducer:", action.payload);
      return {
        ...state,
        taxValues: action.payload,
        loading: false,
      };

    case GET_TAX_VALUES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_TAX_APPLY_SUCCESS:
      console.log("Tax Apply data success in reducer:", action.payload);
      return {
        ...state,
        taxApply: action.payload,
        loading: false,
      };

    case GET_TAX_APPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_TAX_TAXONTAX_SUCCESS:
      console.log("Tax TaxonTax data success in reducer:", action.payload);
      return {
        ...state,
        taxTaxOnTax: action.payload,
        loading: false,
      };

    case GET_TAX_TAXONTAX_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_TAXLIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_TAXLIST_SUCCESS:
      return {
        ...state,
        tax: [
          ...state.tax,
          action.payload,
        ],
        loading: false,
      };

    case ADD_TAXLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Tax;
