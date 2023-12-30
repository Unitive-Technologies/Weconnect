import {
  GET_INVENTORYSTOCK_SUCCESS,
  GET_INVENTORYSTOCK_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  inventorystock: [],
  error: {},
  loading: true,
};

const InventoryStock = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVENTORYSTOCK_SUCCESS:
      return {
        ...state,
        inventorystock: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default InventoryStock;
