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
  UPDATE_INVENTORYSTOCK_STB,
  UPDATE_INVENTORYSTOCK_STB_SUCCESS,
  UPDATE_INVENTORYSTOCK_STB_FAIL,
  GET_INVENTORYSTOCK_SC_CASTYPE_SUCCESS,
  GET_INVENTORYSTOCK_SC_CASTYPE_FAIL,
  GET_INVENTORYSTOCK_SC_INVENTORYSTATE_SUCCESS,
  GET_INVENTORYSTOCK_SC_INVENTORYSTATE_FAIL,
  GET_INVENTORYSTOCK_SC_WAREHOUSE_SUCCESS,
  GET_INVENTORYSTOCK_SC_WAREHOUSE_FAIL,
  GET_INVENTORYSTOCK_SC_STATETYPE_SUCCESS,
  GET_INVENTORYSTOCK_SC_STATETYPE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  stocksmartcard: [],
  stockstb: [],
  stockpairing: [],
  stocksccastype: [],
  stockscwarehouse: [],
  stockscstatetype: [],
  stockscinventorystate: [],
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

    case UPDATE_INVENTORYSTOCK_STB:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_INVENTORYSTOCK_STB_SUCCESS:
      return {
        ...state,
        loading: false,
        stockstb: state.stockstb.map((stb) =>
          stb.id === action.payload.id ? { ...stb, ...action.payload } : stb
        ),
      };

    case UPDATE_INVENTORYSTOCK_STB_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_SC_INVENTORYSTATE_SUCCESS:
      return {
        ...state,
        stockscinventorystate: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_SC_INVENTORYSTATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_SC_WAREHOUSE_SUCCESS:
      return {
        ...state,
        stockscwarehouse: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_SC_WAREHOUSE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_SC_STATETYPE_SUCCESS:
      return {
        ...state,
        stockscstatetype: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_SC_STATETYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_SC_CASTYPE_SUCCESS:
      return {
        ...state,
        stocksccastype: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_SC_CASTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default InventoryStock;
