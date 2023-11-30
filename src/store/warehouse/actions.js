import {
  GET_WAREHOUSELIST,
  GET_WAREHOUSELIST_FAIL,
  GET_WAREHOUSELIST_SUCCESS,
} from "./actionTypes";

export const getWarehouseList = () => ({
  type: GET_WAREHOUSELIST,
});

export const getWarehouseListSuccess = (warehouselist) => {
  console.log("Received Warehouse List:", warehouselist);
  return {
    type: GET_WAREHOUSELIST_SUCCESS,
    payload: warehouselist,
  };
};

export const getWarehouseListFail = (error) => ({
  type: GET_WAREHOUSELIST_FAIL,
  payload: error,
});
