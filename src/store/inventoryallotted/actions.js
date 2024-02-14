import {
  GET_INVENTORYALLOTTED_SMARTCARD,
  GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARD_FAIL,
  GET_INVENTORYALLOTTED_STB,
  GET_INVENTORYALLOTTED_STB_SUCCESS,
  GET_INVENTORYALLOTTED_STB_FAIL,
  GET_INVENTORYALLOTTED_PAIRING,
  GET_INVENTORYALLOTTED_PAIRING_SUCCESS,
  GET_INVENTORYALLOTTED_PAIRING_FAIL,
  UPDATE_ALLOTTEDPAIRING_CURRENT_PAGE,
  GET_INVENTORYALLOTTED_SMARTCARDLIST,
  GET_INVENTORYALLOTTED_SMARTCARDLIST_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARDLIST_FAIL,
  GET_INVENTORYALLOTTED_USERTYPE,
  GET_INVENTORYALLOTTED_USERTYPE_SUCCESS,
  GET_INVENTORYALLOTTED_USERTYPE_FAIL,
  GET_INVENTORYALLOTTED_OPERATORLIST,
  GET_INVENTORYALLOTTED_OPERATORLIST_SUCCESS,
  GET_INVENTORYALLOTTED_OPERATORLIST_FAIL,
  ALLOT_SMARTCARD,
  ALLOT_SMARTCARD_SUCCESS,
  ALLOT_SMARTCARD_FAIL,
  DEALLOT_SMARTCARD,
  DEALLOT_SMARTCARD_SUCCESS,
  DEALLOT_SMARTCARD_FAIL,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_ALLOTTEDPAIRING_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getInventoryAllottedSmartcard = () => ({
  type: GET_INVENTORYALLOTTED_SMARTCARD,
});

export const getInventoryAllottedSmartcardSuccess = (allottedsmartcard) => ({
  type: GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS,
  payload: allottedsmartcard,
});

export const getInventoryAllottedSmartcardFail = (error) => ({
  type: GET_INVENTORYALLOTTED_SMARTCARD_FAIL,
  payload: error,
});

export const getInventoryAllottedStb = () => ({
  type: GET_INVENTORYALLOTTED_STB,
});

export const getInventoryAllottedStbSuccess = (allottedstb) => ({
  type: GET_INVENTORYALLOTTED_STB_SUCCESS,
  payload: allottedstb,
});

export const getInventoryAllottedStbFail = (error) => ({
  type: GET_INVENTORYALLOTTED_STB_FAIL,
  payload: error,
});

export const getInventoryAllottedPairing = () => ({
  type: GET_INVENTORYALLOTTED_PAIRING,
});

export const getInventoryAllottedPairingSuccess = (allottedpairing) => ({
  type: GET_INVENTORYALLOTTED_PAIRING_SUCCESS,
  payload: allottedpairing,
});

export const getInventoryAllottedPairingFail = (error) => ({
  type: GET_INVENTORYALLOTTED_PAIRING_FAIL,
  payload: error,
});
