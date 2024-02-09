import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_PROMOVOUCHER,
  GET_PROMOVOUCHER_SUCCESS, GET_PROMOVOUCHER_FAIL,
  ADD_NEW_PROMOVOUCHER,
  ADD_PROMOVOUCHER_SUCCESS,
  ADD_PROMOVOUCHER_FAIL,
  GET_PROMOVOUCHER_LCO_FAIL,
  GET_PROMOVOUCHER_LCO_SUCCESS,
  GET_PROMOVOUCHER_APPLY_FAIL,
  GET_PROMOVOUCHER_APPLY_SUCCESS,
  GET_PROMOVOUCHER_RECHARGE_FAIL,
  GET_PROMOVOUCHER_RECHARGE_SUCCESS,
  GET_PROMOVOUCHER_BOUQUET_FAIL,
  GET_PROMOVOUCHER_BOUQUET_SUCCESS,
  UPDATE_PROMOVOUCHER_CURRENT_PAGE,
  // UPDATE_PROMOVOUCHER,
  // UPDATE_PROMOVOUCHER_SUCCESS,
  // UPDATE_PROMOVOUCHER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  promovoucher: [],
  promovoucherApply: [],
  promovoucherLCO: [],
  promovoucherRecharge: [],
  promovoucherBouquet: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const PromoVoucher = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROMOVOUCHER_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_PROMOVOUCHER:
      return {
        ...state,
        loading: true,
      };
    case GET_PROMOVOUCHER_SUCCESS:
      console.log("Promo Voucher list data in reducer:", action.payload);
      return {
        ...state,
        promovoucher: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_PROMOVOUCHER_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    // case UPDATE_PROMOVOUCHER:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case UPDATE_PROMOVOUCHER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     promovoucher: state.promovoucher.map((promovoucher) =>
    //       promovoucher.id === action.payload.id ? { ...promovoucher, ...action.payload } : tax
    //     ),
    //     // tax: state.tax.map((tax) =>
    //     //   tax.id.toString() === action.payload.id.toString()
    //     //     ? { tax, ...action.payload }
    //     //     : tax
    //     // ),
    //   };

    // case UPDATE_PROMOVOUCHER_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };

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

    case ADD_NEW_PROMOVOUCHER:
      return {
        ...state,
        loading: true,
      };

    case ADD_PROMOVOUCHER_SUCCESS:
      return {
        ...state,
        promovoucher: [
          ...state.promovoucher,
          action.payload,
        ],
        loading: false,
      };

    case ADD_PROMOVOUCHER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default PromoVoucher;
