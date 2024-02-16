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
  UPDATE_FAULTYSMARTCARD_SENDSC,
  UPDATE_FAULTYSMARTCARD_SENDSC_SUCCESS,
  UPDATE_FAULTYSMARTCARD_SENDSC_FAIL,
  UPDATE_FAULTYSMARTCARD_BLACKLIST,
  UPDATE_FAULTYSMARTCARD_BLACKLIST_SUCCESS,
  UPDATE_FAULTYSMARTCARD_BLACKLIST_FAIL,
  UPDATE_FAULTYSTB_SENDSTB,
  UPDATE_FAULTYSTB_SENDSTB_SUCCESS,
  UPDATE_FAULTYSTB_SENDSTB_FAIL,
  UPDATE_FAULTYSTB_BLACKLIST,
  UPDATE_FAULTYSTB_BLACKLIST_SUCCESS,
  UPDATE_FAULTYSTB_BLACKLIST_FAIL,
  UPDATE_FAULTYPAIRING_SENDPAIR,
  UPDATE_FAULTYPAIRING_SENDPAIR_SUCCESS,
  UPDATE_FAULTYPAIRING_SENDPAIR_FAIL,
  UPDATE_FAULTYPAIRING_BLACKLIST,
  UPDATE_FAULTYPAIRING_BLACKLIST_SUCCESS,
  UPDATE_FAULTYPAIRING_BLACKLIST_FAIL,
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

export const updateFaultySmartcardSendsc = (faultysmartcard) => ({
  type: UPDATE_FAULTYSMARTCARD_SENDSC,
  payload: faultysmartcard,
});

export const updateFaultySmartcardSendscSuccess = (faultysmartcard) => ({
  type: UPDATE_FAULTYSMARTCARD_SENDSC_SUCCESS,
  payload: faultysmartcard,
});

export const updateFaultySmartcardSendscFail = (error) => ({
  type: UPDATE_FAULTYSMARTCARD_SENDSC_FAIL,
  payload: error,
});

export const updateFaultySmartcardBlacklist = (faultysmartcard) => ({
  type: UPDATE_FAULTYSMARTCARD_BLACKLIST,
  payload: faultysmartcard,
});

export const updateFaultySmartcardBlacklistSuccess = (faultysmartcard) => ({
  type: UPDATE_FAULTYSMARTCARD_BLACKLIST_SUCCESS,
  payload: faultysmartcard,
});

export const updateFaultySmartcardBlacklistFail = (error) => ({
  type: UPDATE_FAULTYSMARTCARD_BLACKLIST_FAIL,
  payload: error,
});

export const updateFaultyStbSendstb = (faultystb) => ({
  type: UPDATE_FAULTYSTB_SENDSTB,
  payload: faultystb,
});

export const updateFaultyStbSendstbSuccess = (faultystb) => ({
  type: UPDATE_FAULTYSTB_SENDSTB_SUCCESS,
  payload: faultystb,
});

export const updateFaultyStbSendstbFail = (error) => ({
  type: UPDATE_FAULTYSTB_SENDSTB_FAIL,
  payload: error,
});

export const updateFaultyStbBlacklist = (faultystb) => ({
  type: UPDATE_FAULTYSTB_BLACKLIST,
  payload: faultystb,
});

export const updateFaultyStbBlacklistSuccess = (faultystb) => ({
  type: UPDATE_FAULTYSTB_BLACKLIST_SUCCESS,
  payload: faultystb,
});

export const updateFaultyStbBlacklistFail = (error) => ({
  type: UPDATE_FAULTYSTB_BLACKLIST_FAIL,
  payload: error,
});

export const updateFaultyPairingSendpair = (faultypairing) => ({
  type: UPDATE_FAULTYPAIRING_SENDPAIR,
  payload: faultypairing,
});

export const updateFaultyPairingSendpairSuccess = (faultypairing) => ({
  type: UPDATE_FAULTYPAIRING_SENDPAIR_SUCCESS,
  payload: faultypairing,
});

export const updateFaultyPairingSendpairFail = (error) => ({
  type: UPDATE_FAULTYPAIRING_SENDPAIR_FAIL,
  payload: error,
});

export const updateFaultyPairingBlacklist = (faultypairing) => ({
  type: UPDATE_FAULTYPAIRING_BLACKLIST,
  payload: faultypairing,
});

export const updateFaultyPairingBlacklistSuccess = (faultypairing) => ({
  type: UPDATE_FAULTYPAIRING_BLACKLIST_SUCCESS,
  payload: faultypairing,
});

export const updateFaultyPairingBlacklistFail = (error) => ({
  type: UPDATE_FAULTYPAIRING_BLACKLIST_FAIL,
  payload: error,
});
