import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_BANK,
  GET_BANK_SUCCESS,
  GET_BANK_FAIL,
  UPDATE_BANK,
  UPDATE_BANK_SUCCESS,
  UPDATE_BANK_FAIL,
  ADD_NEW_BANK,
  ADD_BANK_SUCCESS,
  ADD_BANK_FAIL,
  GET_BANK_STATUS_FAIL,
  GET_BANK_STATUS_SUCCESS,
  UPDATE_BANK_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  bank: [],
  bankStatus: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Bank = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_BANK_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_BANK:
      return {
        ...state,
        loading: true,
      };

    case GET_BANK_SUCCESS:
      console.log("Bank list data in reducer:", action.payload);
      return {
        ...state,
        bank: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };


    case GET_BANK_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_BANK:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        bank: state.bank.map((bank) =>
          bank.id === action.payload.id ? { ...bank, ...action.payload } : bank
        ),
        // bank: state.bank.map((bank) =>
        //   bank.id.toString() === action.payload.id.toString()
        //     ? { bank, ...action.payload }
        //     : bank
        // ),
      };

    case UPDATE_BANK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_BANK_STATUS_SUCCESS:
      console.log("Bank data in reducer:", action.payload);
      return {
        ...state,
        bankStatus: action.payload,
        loading: false,
      };

    case GET_BANK_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_BANK:
      return {
        ...state,
        loading: true,
      };

    case ADD_BANK_SUCCESS:
      return {
        ...state,
        bank: [
          ...state.bank,
          action.payload,
        ],
        loading: false,
      };

    case ADD_BANK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Bank;
