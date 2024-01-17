import {
  GET_INVENTORYSTOCK,
  GET_INVENTORYSTOCK_SUCCESS,
  GET_INVENTORYSTOCK_FAIL,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_STB_SUCCESS,
  GET_INVENTORYSTOCK_STB_FAIL,
  GET_INVENTORYSTOCK_PAIRING,
  GET_INVENTORYSTOCK_PAIRING_SUCCESS,
  GET_INVENTORYSTOCK_PAIRING_FAIL,
  GET_INVENTORYFAULTY_SMARTCARD,
  GET_INVENTORYFAULTY_SMARTCARD_SUCCESS,
  GET_INVENTORYFAULTY_SMARTCARD_FAIL,
  GET_INVENTORYFAULTY_STB,
  GET_INVENTORYFAULTY_STB_SUCCESS,
  GET_INVENTORYFAULTY_STB_FAIL,
  GET_INVENTORYFAULTY_PAIRING,
  GET_INVENTORYFAULTY_PAIRING_SUCCESS,
  GET_INVENTORYFAULTY_PAIRING_FAIL,
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

export const getInventoryFaultySmartcard = () => ({
  type: GET_INVENTORYFAULTY_SMARTCARD,
});

export const getInventoryFaultySmartcardSuccess = (faultysmartcard) => ({
  type: GET_INVENTORYFAULTY_SMARTCARD_SUCCESS,
  payload: faultysmartcard,
});

export const getInventoryFaultySmartcardFail = (error) => ({
  type: GET_INVENTORYFAULTY_SMARTCARD_FAIL,
  payload: error,
});

export const getInventoryFaultyStb = () => ({
  type: GET_INVENTORYFAULTY_STB,
});

export const getInventoryFaultyStbSuccess = (faultystb) => ({
  type: GET_INVENTORYFAULTY_STB_SUCCESS,
  payload: faultystb,
});

export const getInventoryFaultyStbFail = (error) => ({
  type: GET_INVENTORYFAULTY_STB_FAIL,
  payload: error,
});

export const getInventoryFaultyPairing = () => ({
  type: GET_INVENTORYFAULTY_PAIRING,
});

export const getInventoryFaultyPairingSuccess = (faultypairing) => ({
  type: GET_INVENTORYFAULTY_PAIRING_SUCCESS,
  payload: faultypairing,
});

export const getInventoryFaultyPairingFail = (error) => ({
  type: GET_INVENTORYFAULTY_PAIRING_FAIL,
  payload: error,
});
