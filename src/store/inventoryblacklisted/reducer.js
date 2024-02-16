import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS,
  GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL,
  GET_INVENTORYBLACKLISTED_STB_SUCCESS,
  GET_INVENTORYBLACKLISTED_STB_FAIL,
  GET_INVENTORYBLACKLISTED_PAIRING,
  GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS,
  GET_INVENTORYBLACKLISTED_PAIRING_FAIL,
  UPDATE_BLACKLISTEDPAIRING_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  blacklistedsmartcard: [],
  blacklistedstb: [],
  blacklistedpairing: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const InventoryBlacklisted = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_BLACKLISTEDPAIRING_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;

    case GET_INVENTORYBLACKLISTED_PAIRING:
      return {
        ...state,
        loading: true,
      };

    case GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS:
      return {
        ...state,
        blacklistedsmartcard: action.payload,
        loading: false,
      };

    case GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYBLACKLISTED_STB_SUCCESS:
      return {
        ...state,
        blacklistedstb: action.payload,
        loading: false,
      };

    case GET_INVENTORYBLACKLISTED_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS:
      return {
        ...state,
        blacklistedpairing: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: parseInt(action.payload.headers[RESPONSE_HEADER_PER_PAGE]),
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_INVENTORYBLACKLISTED_PAIRING_FAIL:
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

export default InventoryBlacklisted;
