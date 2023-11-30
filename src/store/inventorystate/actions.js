import {
  GET_INVENTORYSTATELIST,
  GET_INVENTORYSTATELIST_FAIL,
  GET_INVENTORYSTATELIST_SUCCESS,
} from "./actionTypes";

export const getInventoryStateList = () => ({
  type: GET_INVENTORYSTATELIST,
});

export const getInventoryStateListSuccess = (inventorystate) => {
  console.log("Received Inventory State List:", inventorystate);
  return {
    type: GET_INVENTORYSTATELIST_SUCCESS,
    payload: inventorystate,
  };
};

export const getInventoryStateListFail = (error) => ({
  type: GET_INVENTORYSTATELIST_FAIL,
  payload: error,
});
