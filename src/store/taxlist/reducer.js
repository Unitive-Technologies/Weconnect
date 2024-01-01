import {
  GET_TAX_SUCCESS, GET_TAX_FAIL, ADD_TAXLIST_SUCCESS,
  ADD_TAXLIST_FAIL,
  GET_TAX_STATUS_FAIL,
  GET_TAX_STATUS_SUCCESS,
  GET_TAX_VALUES_FAIL,
  GET_TAX_VALUES_SUCCESS,
  GET_TAX_APPLY_FAIL,
  GET_TAX_APPLY_SUCCESS,
  GET_TAX_TAXONTAX_FAIL,
  GET_TAX_TAXONTAX_SUCCESS,

} from "./actionTypes";

const INIT_STATE = {
  tax: [],
  taxStatus: [],
  taxValues: [],
  taxApply: [],
  taxTaxOnTax: [],
  error: {},
  loading: true,
};

const Tax = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TAX_SUCCESS:
      console.log("Tax list data in reducer:", action.payload);
      return {
        ...state,
        tax: action.payload,
        loading: false,
      };

    case GET_TAX_FAIL:
      return {
        ...state,
        error: action.payload,
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

    case ADD_TAXLIST_SUCCESS:
      return {
        ...state,
        tax: [
          ...state.tax,
          action.payload,
        ],
      };

    case ADD_TAXLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Tax;
