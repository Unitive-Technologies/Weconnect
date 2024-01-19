import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_WAREHOUSELIST,
  GET_WAREHOUSELIST_SUCCESS,
  GET_WAREHOUSELIST_FAIL,
  GET_WAREHOUSELIST_STATUS_SUCCESS,
  GET_WAREHOUSELIST_STATUS_FAIL,
  GET_WAREHOUSELIST_OPERATOR_SUCCESS,
  GET_WAREHOUSELIST_OPERATOR_FAIL,
  ADD_WAREHOUSELIST_SUCCESS,
  ADD_WAREHOUSELIST_FAIL,
  UPDATE_WAREHOUSELIST_SUCCESS,
  UPDATE_WAREHOUSELIST_FAIL,
  UPDATE_WAREHOUSELIST_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  warehouselist: [],
  warehouselistStatus: [],
  warehouselistOperator: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const WarehouseList = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_WAREHOUSELIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_WAREHOUSELIST:
      return {
        ...state,
        loading: true,
      };

    case GET_WAREHOUSELIST_SUCCESS:
      console.log("Warehouselist data in reducer:", action.payload);
      return {
        ...state,
        warehouselist: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_WAREHOUSELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_WAREHOUSELIST_SUCCESS:
      return {
        ...state,
        warehouselist: state.warehouselist.map((warehouselist) =>
          warehouselist.id.toString() === action.payload.id.toString()
            ? { warehouselist, ...action.payload }
            : warehouselist
        ),
      };

    case UPDATE_WAREHOUSELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_WAREHOUSELIST_STATUS_SUCCESS:
      console.log("Warehouselist status data in reducer:", action.payload);
      return {
        ...state,
        warehouselistStatus: action.payload,
        loading: false,
      };

    case GET_WAREHOUSELIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_WAREHOUSELIST_OPERATOR_SUCCESS:
      console.log("Warehouselist operator data in reducer:", action.payload);
      return {
        ...state,
        warehouselistOperator: action.payload,
        loading: false,
      };

    case GET_WAREHOUSELIST_OPERATOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_WAREHOUSELIST_SUCCESS:
      return {
        ...state,
        warehouselist: [...state.warehouselist, action.payload],
      };

    case ADD_WAREHOUSELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default WarehouseList;
