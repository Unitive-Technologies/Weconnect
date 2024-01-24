import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARD_FAIL,
  GET_INVENTORYALLOTTED_STB_SUCCESS,
  GET_INVENTORYALLOTTED_STB_FAIL,
  GET_INVENTORYALLOTTED_PAIRING,
  GET_INVENTORYALLOTTED_PAIRING_SUCCESS,
  GET_INVENTORYALLOTTED_PAIRING_FAIL,
  UPDATE_ALLOTTEDPAIRING_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  allottedsmartcard: [],
  allottedstb: [],
  allottedpairing: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const InventoryAllotted = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_ALLOTTEDPAIRING_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;

    case GET_INVENTORYALLOTTED_PAIRING:
      return {
        ...state,
        loading: true,
      };

    case GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS:
      return {
        ...state,
        allottedsmartcard: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYALLOTTED_STB_SUCCESS:
      return {
        ...state,
        allottedstb: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYALLOTTED_PAIRING_SUCCESS:
      // console.log("Allotted pairing in reducer: ", action.payload);
      return {
        ...state,
        allottedpairing: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_INVENTORYALLOTTED_PAIRING_FAIL:
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

export default InventoryAllotted;
