import {
  GET_PROMOVOUCHER_SUCCESS, GET_PROMOVOUCHER_FAIL, ADD_PROMOVOUCHER_SUCCESS,
  ADD_PROMOVOUCHER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  promovoucher: [],
  error: {},
  loading: true,
};

const PromoVoucher = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROMOVOUCHER_SUCCESS:
      console.log("Promo Voucher list data in reducer:", action.payload);
      return {
        ...state,
        promovoucher: action.payload,
        loading: false,
      };

    case GET_PROMOVOUCHER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_PROMOVOUCHER_SUCCESS:
      return {
        ...state,
        promovoucher: [
          ...state.promovoucher,
          action.payload,
        ],
      };

    case ADD_PROMOVOUCHER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default PromoVoucher;
