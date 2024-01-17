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
  GET_INVENTORYBLACKLISTED_SMARTCARD,
  GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS,
  GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL,
  GET_INVENTORYBLACKLISTED_STB,
  GET_INVENTORYBLACKLISTED_STB_SUCCESS,
  GET_INVENTORYBLACKLISTED_STB_FAIL,
  GET_INVENTORYBLACKLISTED_PAIRING,
  GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS,
  GET_INVENTORYBLACKLISTED_PAIRING_FAIL,
  GET_INVENTORYALLOTTED_SMARTCARD,
  GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARD_FAIL,
  GET_INVENTORYALLOTTED_STB,
  GET_INVENTORYALLOTTED_STB_SUCCESS,
  GET_INVENTORYALLOTTED_STB_FAIL,
  GET_INVENTORYALLOTTED_PAIRING,
  GET_INVENTORYALLOTTED_PAIRING_SUCCESS,
  GET_INVENTORYALLOTTED_PAIRING_FAIL,
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

export const getInventoryBlacklistedSmartcard = () => ({
  type: GET_INVENTORYBLACKLISTED_SMARTCARD,
});

export const getInventoryBlacklistedSmartcardSuccess = (
  blacklistedsmartcard
) => ({
  type: GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS,
  payload: blacklistedsmartcard,
});

export const getInventoryBlacklistedSmartcardFail = (error) => ({
  type: GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL,
  payload: error,
});

export const getInventoryBlacklistedStb = () => ({
  type: GET_INVENTORYBLACKLISTED_STB,
});

export const getInventoryBlacklistedStbSuccess = (blacklistedstb) => ({
  type: GET_INVENTORYBLACKLISTED_STB_SUCCESS,
  payload: blacklistedstb,
});

export const getInventoryBlacklistedStbFail = (error) => ({
  type: GET_INVENTORYBLACKLISTED_STB_FAIL,
  payload: error,
});

export const getInventoryBlacklistedPairing = () => ({
  type: GET_INVENTORYBLACKLISTED_PAIRING,
});

export const getInventoryBlacklistedPairingSuccess = (blacklistedpairing) => ({
  type: GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS,
  payload: blacklistedpairing,
});

export const getInventoryBlacklistedPairingFail = (error) => ({
  type: GET_INVENTORYBLACKLISTED_PAIRING_FAIL,
  payload: error,
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
