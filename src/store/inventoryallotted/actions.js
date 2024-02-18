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
  GET_INVENTORYALLOTTED_DISTRIBUTOR,
  GET_INVENTORYALLOTTED_DISTRIBUTOR_SUCCESS,
  GET_INVENTORYALLOTTED_DISTRIBUTOR_FAIL,
  GET_INVENTORYALLOTTED_LCO,
  GET_INVENTORYALLOTTED_LCO_SUCCESS,
  GET_INVENTORYALLOTTED_LCO_FAIL,
  GET_INVENTORYALLOTTED_STBLIST,
  GET_INVENTORYALLOTTED_STBLIST_SUCCESS,
  GET_INVENTORYALLOTTED_STBLIST_FAIL,
  ALLOT_STB,
  ALLOT_STB_SUCCESS,
  ALLOT_STB_FAIL,
  DEALLOT_STB,
  DEALLOT_STB_SUCCESS,
  DEALLOT_STB_FAIL,
  GET_INVENTORYALLOTTED_PAIRINGLIST,
  GET_INVENTORYALLOTTED_PAIRINGLIST_SUCCESS,
  GET_INVENTORYALLOTTED_PAIRINGLIST_FAIL,
  ALLOT_PAIRING,
  ALLOT_PAIRING_SUCCESS,
  ALLOT_PAIRING_FAIL,
  DEALLOT_PAIRING,
  DEALLOT_PAIRING_SUCCESS,
  DEALLOT_PAIRING_FAIL,
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

export const getInventoryAllottedStblist = () => ({
  type: GET_INVENTORYALLOTTED_STBLIST,
});

export const getInventoryAllottedStblistSuccess = (allottedstblist) => ({
  type: GET_INVENTORYALLOTTED_STBLIST_SUCCESS,
  payload: allottedstblist,
});

export const getInventoryAllottedStblistFail = (error) => ({
  type: GET_INVENTORYALLOTTED_STBLIST_FAIL,
  payload: error,
});

export const getInventoryAllottedDistributor = (brand_id) => ({
  type: GET_INVENTORYALLOTTED_DISTRIBUTOR,
  payload: brand_id,
});

export const getInventoryAllottedDistributorSuccess = (
  allotteddistributor
) => ({
  type: GET_INVENTORYALLOTTED_DISTRIBUTOR_SUCCESS,
  payload: allotteddistributor,
});

export const getInventoryAllottedDistributorFail = (error) => ({
  type: GET_INVENTORYALLOTTED_DISTRIBUTOR_FAIL,
  payload: error,
});

export const getInventoryAllottedLco = () => ({
  type: GET_INVENTORYALLOTTED_LCO,
});

export const getInventoryAllottedLcoSuccess = (allottedlco) => ({
  type: GET_INVENTORYALLOTTED_LCO_SUCCESS,
  payload: allottedlco,
});

export const getInventoryAllottedLcoFail = (error) => ({
  type: GET_INVENTORYALLOTTED_LCO_FAIL,
  payload: error,
});

export const allotStb = (allottedstb) => ({
  type: ALLOT_STB,
  payload: allottedstb,
});

export const allotStbSuccess = (allottedstb) => ({
  type: ALLOT_STB_SUCCESS,
  payload: allottedstb,
});

export const allotStbFail = (error) => ({
  type: ALLOT_STB_FAIL,
  payload: error,
});

export const deallotStb = (allottedstb) => ({
  type: DEALLOT_STB,
  payload: allottedstb,
});

export const deallotStbSuccess = (allottedstb) => ({
  type: DEALLOT_STB_SUCCESS,
  payload: allottedstb,
});

export const deallotStbFail = (error) => ({
  type: DEALLOT_STB_FAIL,
  payload: error,
});

export const getInventoryAllottedPairinglist = () => ({
  type: GET_INVENTORYALLOTTED_PAIRINGLIST,
});

export const getInventoryAllottedPairinglistSuccess = (
  allottedpairinglist
) => ({
  type: GET_INVENTORYALLOTTED_PAIRINGLIST_SUCCESS,
  payload: allottedpairinglist,
});

export const getInventoryAllottedPairinglistFail = (error) => ({
  type: GET_INVENTORYALLOTTED_PAIRINGLIST_FAIL,
  payload: error,
});

export const allotPairing = (allottedpairing) => ({
  type: ALLOT_PAIRING,
  payload: allottedpairing,
});

export const allotPairingSuccess = (allottedpairing) => ({
  type: ALLOT_PAIRING_SUCCESS,
  payload: allottedpairing,
});

export const allotPairingFail = (error) => ({
  type: ALLOT_PAIRING_FAIL,
  payload: error,
});

export const deallotPairing = (allottedpairing) => ({
  type: DEALLOT_PAIRING,
  payload: allottedpairing,
});

export const deallotPairingSuccess = (allottedpairing) => ({
  type: DEALLOT_PAIRING_SUCCESS,
  payload: allottedpairing,
});

export const deallotPairingFail = (error) => ({
  type: DEALLOT_PAIRING_FAIL,
  payload: error,
});
