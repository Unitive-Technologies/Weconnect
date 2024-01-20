import {
  GET_INVENTORYBLACKLISTED_SMARTCARD,
  GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS,
  GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL,
  GET_INVENTORYBLACKLISTED_STB,
  GET_INVENTORYBLACKLISTED_STB_SUCCESS,
  GET_INVENTORYBLACKLISTED_STB_FAIL,
  GET_INVENTORYBLACKLISTED_PAIRING,
  GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS,
  GET_INVENTORYBLACKLISTED_PAIRING_FAIL,
} from "./actionTypes";

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
