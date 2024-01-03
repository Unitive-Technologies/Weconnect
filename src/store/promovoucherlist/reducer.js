import {
  GET_PROMOVOUCHER_SUCCESS, GET_PROMOVOUCHER_FAIL, ADD_PROMOVOUCHER_SUCCESS,
  ADD_PROMOVOUCHER_FAIL,
  GET_PROMOVOUCHER_LCO_FAIL,
  GET_PROMOVOUCHER_LCO_SUCCESS,
  GET_PROMOVOUCHER_APPLY_FAIL,
  GET_PROMOVOUCHER_APPLY_SUCCESS,
  GET_PROMOVOUCHER_RECHARGE_FAIL,
  GET_PROMOVOUCHER_RECHARGE_SUCCESS,
  GET_PROMOVOUCHER_BOUQUET_FAIL,
  GET_PROMOVOUCHER_BOUQUET_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  promovoucher: [],
  promovoucherApply: [],
  promovoucherLCO: [],
  promovoucherRecharge: [],
  promovoucherBouquet: [],
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

    case GET_PROMOVOUCHER_LCO_SUCCESS:
      console.log("LCO data in reducer:", action.payload);
      return {
        ...state,
        promovoucherLCO: action.payload,
        loading: false,
      };

    case GET_PROMOVOUCHER_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PROMOVOUCHER_APPLY_SUCCESS:
      console.log("Apply data in reducer:", action.payload);
      return {
        ...state,
        promovoucherApply: action.payload,
        loading: false,
      };

    case GET_PROMOVOUCHER_APPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PROMOVOUCHER_RECHARGE_SUCCESS:
      console.log("LCO data in reducer:", action.payload);
      return {
        ...state,
        promovoucherRecharge: action.payload,
        loading: false,
      };

    case GET_PROMOVOUCHER_RECHARGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PROMOVOUCHER_BOUQUET_SUCCESS:
      console.log("Bouquet data in reducer:", action.payload);
      return {
        ...state,
        promovoucherBouquet: action.payload,
        loading: false,
      };

    case GET_PROMOVOUCHER_BOUQUET_FAIL:
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
