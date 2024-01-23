import {
  GET_INVENTORYSTOCK_SMARTCARD,
  GET_INVENTORYSTOCK_SMARTCARD_SUCCESS,
  GET_INVENTORYSTOCK_SMARTCARD_FAIL,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_STB_SUCCESS,
  GET_INVENTORYSTOCK_STB_FAIL,
  GET_INVENTORYSTOCK_PAIRING,
  GET_INVENTORYSTOCK_PAIRING_SUCCESS,
  GET_INVENTORYSTOCK_PAIRING_FAIL,
  UPDATE_STOCKPAIRING_CURRENT_PAGE,
  UPDATE_INVENTORYSTOCK_STB,
  UPDATE_INVENTORYSTOCK_STB_SUCCESS,
  UPDATE_INVENTORYSTOCK_STB_FAIL,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_STOCKPAIRING_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getInventoryStockSmartcard = () => ({
  type: GET_INVENTORYSTOCK_SMARTCARD,
});

export const getInventoryStockSmartcardSuccess = (inventorystock) => ({
  type: GET_INVENTORYSTOCK_SMARTCARD_SUCCESS,
  payload: inventorystock,
});

export const getInventoryStockSmartcardFail = (error) => ({
  type: GET_INVENTORYSTOCK_SMARTCARD_FAIL,
  payload: error,
});

export const getInventoryStockStb = () => ({
  type: GET_INVENTORYSTOCK_STB,
});

export const getInventoryStockStbSuccess = (stockstb) => ({
  type: GET_INVENTORYSTOCK_STB_SUCCESS,
  payload: stockstb,
});

export const getInventoryStockStbFail = (error) => ({
  type: GET_INVENTORYSTOCK_STB_FAIL,
  payload: error,
});

export const getInventoryStockPairing = () => ({
  type: GET_INVENTORYSTOCK_PAIRING,
});

export const getInventoryStockPairingSuccess = (stockpairing) => ({
  type: GET_INVENTORYSTOCK_PAIRING_SUCCESS,
  payload: stockpairing,
});

export const getInventoryStockPairingFail = (error) => ({
  type: GET_INVENTORYSTOCK_PAIRING_FAIL,
  payload: error,
});

export const updateInventoryStockStb = (stockstb) => ({
  type: UPDATE_INVENTORYSTOCK_STB,
  payload: stockstb,
});

export const updateInventoryStockStbSuccess = (stockstb) => ({
  type: UPDATE_INVENTORYSTOCK_STB_SUCCESS,
  payload: stockstb,
});

export const updateInventoryStockStbFail = (error) => ({
  type: UPDATE_INVENTORYSTOCK_STB_FAIL,
  payload: error,
});
