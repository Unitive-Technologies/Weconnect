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

export const getInventoryAllottedSmartcardlist = () => ({
  type: GET_INVENTORYALLOTTED_SMARTCARDLIST,
});

export const getInventoryAllottedSmartcardlistSuccess = (
  allottedsmartcardlist
) => ({
  type: GET_INVENTORYALLOTTED_SMARTCARDLIST_SUCCESS,
  payload: allottedsmartcardlist,
});

export const getInventoryAllottedSmartcardlistFail = (error) => ({
  type: GET_INVENTORYALLOTTED_SMARTCARDLIST_FAIL,
  payload: error,
});

export const getInventoryAllottedUsertype = () => ({
  type: GET_INVENTORYALLOTTED_USERTYPE,
});

export const getInventoryAllottedUsertypeSuccess = (allottedusertype) => ({
  type: GET_INVENTORYALLOTTED_USERTYPE_SUCCESS,
  payload: allottedusertype,
});

export const getInventoryAllottedUsertypeFail = (error) => ({
  type: GET_INVENTORYALLOTTED_USERTYPE_FAIL,
  payload: error,
});

export const getInventoryAllottedOperatorlist = () => ({
  type: GET_INVENTORYALLOTTED_OPERATORLIST,
});

export const getInventoryAllottedOperatorlistSuccess = (
  allottedoperatorlist
) => ({
  type: GET_INVENTORYALLOTTED_OPERATORLIST_SUCCESS,
  payload: allottedoperatorlist,
});

export const getInventoryAllottedOperatorlistFail = (error) => ({
  type: GET_INVENTORYALLOTTED_OPERATORLIST_FAIL,
  payload: error,
});

export const allotSmartcard = (allottedsmartcard) => ({
  type: ALLOT_SMARTCARD,
  payload: allottedsmartcard,
});

export const allotSmartcardSuccess = (allottedsmartcard) => ({
  type: ALLOT_SMARTCARD_SUCCESS,
  payload: allottedsmartcard,
});

export const allotSmartcardFail = (error) => ({
  type: ALLOT_SMARTCARD_FAIL,
  payload: error,
});

export const deallotSmartcard = (allottedsmartcard) => ({
  type: DEALLOT_SMARTCARD,
  payload: allottedsmartcard,
});

export const deallotSmartcardSuccess = (allottedsmartcard) => ({
  type: DEALLOT_SMARTCARD_SUCCESS,
  payload: allottedsmartcard,
});

export const deallotSmartcardFail = (error) => ({
  type: DEALLOT_SMARTCARD_FAIL,
  payload: error,
});
