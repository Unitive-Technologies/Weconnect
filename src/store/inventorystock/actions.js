import {
  GET_INVENTORYSTOCK,
  GET_INVENTORYSTOCK_SUCCESS,
  GET_INVENTORYSTOCK_FAIL,
} from "./actionTypes";

export const getInventoryStock = () => ({
  type: GET_INVENTORYSTOCK,
});

export const getInventoryStockSuccess = (inventorystock) => ({
  type: GET_INVENTORYSTOCK_SUCCESS,
  payload: inventorystock,
});

export const getInventoryStockFail = (error) => ({
  type: GET_INVENTORYSTOCK_FAIL,
  payload: error,
});
