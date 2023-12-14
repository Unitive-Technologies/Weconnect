import {
  GET_INVENTORYSTATELIST,
  GET_INVENTORYSTATELIST_FAIL,
  GET_INVENTORYSTATELIST_SUCCESS,
  ADD_INVENTORYSTATELIST,
  ADD_INVENTORYSTATELIST_SUCCESS,
  ADD_INVENTORYSTATELIST_FAIL,
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

export const addInventoryStateList = (inventorystate) => ({
  type: ADD_INVENTORYSTATELIST,
  payload: inventorystate,
});

export const addInventoryStateListSuccess = (inventorystate) => ({
  type: ADD_INVENTORYSTATELIST_SUCCESS,
  payload: inventorystate,
});

export const addInventoryStateListFail = (error) => ({
  type: ADD_INVENTORYSTATELIST_FAIL,
  payload: error,
});
