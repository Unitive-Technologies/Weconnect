import {
  GET_INVENTORYFAULTY_SMARTCARD,
  GET_INVENTORYFAULTY_SMARTCARD_SUCCESS,
  GET_INVENTORYFAULTY_SMARTCARD_FAIL,
  GET_INVENTORYFAULTY_STB,
  GET_INVENTORYFAULTY_STB_SUCCESS,
  GET_INVENTORYFAULTY_STB_FAIL,
  GET_INVENTORYFAULTY_PAIRING,
  GET_INVENTORYFAULTY_PAIRING_SUCCESS,
  GET_INVENTORYFAULTY_PAIRING_FAIL,
  UPDATE_FAULTYPAIRING_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_FAULTYPAIRING_CURRENT_PAGE,
  payload: Number(toPage),
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
