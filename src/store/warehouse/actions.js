import {
  GET_WAREHOUSELIST,
  GET_WAREHOUSELIST_FAIL,
  GET_WAREHOUSELIST_SUCCESS,
  GET_WAREHOUSELIST_STATUS,
  GET_WAREHOUSELIST_STATUS_FAIL,
  GET_WAREHOUSELIST_STATUS_SUCCESS,
  GET_WAREHOUSELIST_OPERATOR,
  GET_WAREHOUSELIST_OPERATOR_FAIL,
  GET_WAREHOUSELIST_OPERATOR_SUCCESS,
  ADD_WAREHOUSELIST,
  ADD_WAREHOUSELIST_SUCCESS,
  ADD_WAREHOUSELIST_FAIL,
  UPDATE_WAREHOUSELIST,
  UPDATE_WAREHOUSELIST_FAIL,
  UPDATE_WAREHOUSELIST_SUCCESS,
  UPDATE_WAREHOUSELIST_CURRENT_PAGE,

} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_WAREHOUSELIST_CURRENT_PAGE,
  payload: Number(toPage),
});

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

export const updateWarehouseList = (warehouselist) => ({
  type: UPDATE_WAREHOUSELIST,
  payload: warehouselist,
});

export const updateWarehouseListSuccess = (warehouselist) => ({
  type: UPDATE_WAREHOUSELIST_SUCCESS,
  payload: warehouselist,
});

export const updateWarehouseListFail = (error) => ({
  type: UPDATE_WAREHOUSELIST_FAIL,
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

export const getWarehouseListStatus = () => ({
  type: GET_WAREHOUSELIST_STATUS,
});

export const getWarehouseListStatusSuccess = (warehouselistStatus) => {
  return {
    type: GET_WAREHOUSELIST_STATUS_SUCCESS,
    payload: warehouselistStatus,
  };
};

export const getWarehouseListStatusFail = (error) => ({
  type: GET_WAREHOUSELIST_STATUS_FAIL,
  payload: error,
});

export const getWarehouseListOperator = () => ({
  type: GET_WAREHOUSELIST_OPERATOR,
});

export const getWarehouseListOperatorSuccess = (warehouselistOperator) => {
  return {
    type: GET_WAREHOUSELIST_OPERATOR_SUCCESS,
    payload: warehouselistOperator,
  };
};

export const getWarehouseListOperatorFail = (error) => ({
  type: GET_WAREHOUSELIST_OPERATOR_FAIL,
  payload: error,
});