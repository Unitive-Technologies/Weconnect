import {
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
} from "./actionTypes";

const INIT_STATE = {
  warehouselist: [],
  warehouselistStatus: [],
  warehouselistOperator: [],
  error: {},
  loading: true,
};

const WarehouseList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WAREHOUSELIST_SUCCESS:
      console.log("Warehouselist data in reducer:", action.payload);
      return {
        ...state,
        warehouselist: action.payload,
        loading: false,
      };

    case GET_WAREHOUSELIST_FAIL:
      return {
        ...state,
        error: action.payload,
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
