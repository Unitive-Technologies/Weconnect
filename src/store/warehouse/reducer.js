import {
  GET_WAREHOUSELIST_SUCCESS,
  GET_WAREHOUSELIST_FAIL,
  ADD_WAREHOUSELIST_SUCCESS,
  ADD_WAREHOUSELIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  warehouselist: [],
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
