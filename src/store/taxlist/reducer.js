import {
  GET_TAX_SUCCESS, GET_TAX_FAIL, ADD_TAXLIST_SUCCESS,
  ADD_TAXLIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  tax: [],
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
