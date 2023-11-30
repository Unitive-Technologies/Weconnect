import {
  GET_INVENTORYSTATELIST_SUCCESS,
  GET_INVENTORYSTATELIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  inventorystatelist: [],
  error: {},
  loading: true,
};

const InventoryStateList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVENTORYSTATELIST_SUCCESS:
      console.log("Inventory State List data in reducer:", action.payload);
      return {
        ...state,
        inventorystatelist: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTATELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default InventoryStateList;
