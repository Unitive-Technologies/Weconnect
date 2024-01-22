import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_INVENTORYTRACK,
  GET_INVENTORYTRACK_SUCCESS,
  GET_INVENTORYTRACK_FAIL,
  UPDATE_INVENTORYTRACK_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  inventorytrack: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const InventoryTrack = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_INVENTORYTRACK_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_INVENTORYTRACK:
      return {
        ...state,
        loading: true,
      };
    case GET_INVENTORYTRACK_SUCCESS:
      console.log("Inventory track data in reducer:", action.payload);
      return {
        ...state,
        inventorytrack: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_INVENTORYTRACK_FAIL:
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

export default InventoryTrack;
