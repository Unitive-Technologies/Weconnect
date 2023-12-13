import {
  GET_WAREHOUSELIST,
  GET_WAREHOUSELIST_FAIL,
  GET_WAREHOUSELIST_SUCCESS,
  ADD_WAREHOUSELIST,
  ADD_WAREHOUSELIST_SUCCESS,
  ADD_WAREHOUSELIST_FAIL,
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

export const addWareHouseList = (warehouselist) => ({
  type: ADD_WAREHOUSELIST,
  payload: warehouselist,
});

export const addWareHouseListSuccess = (warehouselist) => ({
  type: ADD_WAREHOUSELIST_SUCCESS,
  payload: warehouselist,
});

export const addWareHouseListFail = (error) => ({
  type: ADD_WAREHOUSELIST_FAIL,
  payload: error,
});
