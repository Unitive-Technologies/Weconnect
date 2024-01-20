import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_INVENTORYSTOCK_SMARTCARD_SUCCESS,
  GET_INVENTORYSTOCK_SMARTCARD_FAIL,
  GET_INVENTORYSTOCK_STB_SUCCESS,
  GET_INVENTORYSTOCK_STB_FAIL,
  GET_INVENTORYSTOCK_PAIRING,
  GET_INVENTORYSTOCK_PAIRING_SUCCESS,
  GET_INVENTORYSTOCK_PAIRING_FAIL,
  UPDATE_STOCKPAIRING_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  stocksmartcard: [],
  stockstb: [],
  stockpairing: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const InventoryStock = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_STOCKPAIRING_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;

    case GET_INVENTORYSTOCK_PAIRING:
      return {
        ...state,
        loading: true,
      };

    case GET_INVENTORYSTOCK_SMARTCARD_SUCCESS:
      return {
        ...state,
        inventorystock: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_STB_SUCCESS:
      return {
        ...state,
        stockstb: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_PAIRING_SUCCESS:
      return {
        ...state,
        stockpairing: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_INVENTORYSTOCK_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default InventoryStock;
