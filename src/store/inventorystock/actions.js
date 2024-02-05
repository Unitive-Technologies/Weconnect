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
  GET_INVENTORYSTOCK_SC_INVENTORYSTATE,
  GET_INVENTORYSTOCK_SC_INVENTORYSTATE_SUCCESS,
  GET_INVENTORYSTOCK_SC_INVENTORYSTATE_FAIL,
  GET_INVENTORYSTOCK_SC_CASTYPE,
  GET_INVENTORYSTOCK_SC_CASTYPE_SUCCESS,
  GET_INVENTORYSTOCK_SC_CASTYPE_FAIL,
  GET_INVENTORYSTOCK_SC_WAREHOUSE,
  GET_INVENTORYSTOCK_SC_WAREHOUSE_SUCCESS,
  GET_INVENTORYSTOCK_SC_WAREHOUSE_FAIL,
  GET_INVENTORYSTOCK_SC_STATETYPE,
  GET_INVENTORYSTOCK_SC_STATETYPE_SUCCESS,
  GET_INVENTORYSTOCK_SC_STATETYPE_FAIL,
  ADD_INVENTORYSTOCK_SMARTCARD,
  ADD_INVENTORYSTOCK_SMARTCARD_SUCCESS,
  ADD_INVENTORYSTOCK_SMARTCARD_FAIL,
  GET_INVENTORYSTOCK_SC_BRAND1,
  GET_INVENTORYSTOCK_SC_BRAND1_SUCCESS,
  GET_INVENTORYSTOCK_SC_BRAND1_FAIL,
  GET_INVENTORYSTOCK_SC_BRAND2,
  GET_INVENTORYSTOCK_SC_BRAND2_SUCCESS,
  GET_INVENTORYSTOCK_SC_BRAND2_FAIL,
  ADD_INVENTORYSTOCK_STB,
  ADD_INVENTORYSTOCK_STB_SUCCESS,
  ADD_INVENTORYSTOCK_STB_FAIL,
  GET_PAIRING_SMARTCARDLIST,
  GET_PAIRING_SMARTCARDLIST_SUCCESS,
  GET_PAIRING_SMARTCARDLIST_FAIL,
  GET_PAIRING_STBLIST,
  GET_PAIRING_STBLIST_SUCCESS,
  GET_PAIRING_STBLIST_FAIL,
  ADD_INVENTORYSTOCK_PAIRING,
  ADD_INVENTORYSTOCK_PAIRING_SUCCESS,
  ADD_INVENTORYSTOCK_PAIRING_FAIL,
  UPDATE_STOCKSMARTCARD_MARKFAULTY,
  UPDATE_STOCKSMARTCARD_MARKFAULTY_SUCCESS,
  UPDATE_STOCKSMARTCARD_MARKFAULTY_FAIL,
  UPDATE_STOCKSMARTCARD_BLACKLIST,
  UPDATE_STOCKSMARTCARD_BLACKLIST_SUCCESS,
  UPDATE_STOCKSMARTCARD_BLACKLIST_FAIL,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_STOCKPAIRING_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getInventoryStockSmartcard = () => ({
  type: GET_INVENTORYSTOCK_SMARTCARD,
});

export const getInventoryStockSmartcardSuccess = (stocksmartcard) => ({
  type: GET_INVENTORYSTOCK_SMARTCARD_SUCCESS,
  payload: stocksmartcard,
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

export const getInventoryStockScCastype = () => ({
  type: GET_INVENTORYSTOCK_SC_CASTYPE,
});

export const getInventoryStockScCastypeSuccess = (stocksccastype) => ({
  type: GET_INVENTORYSTOCK_SC_CASTYPE_SUCCESS,
  payload: stocksccastype,
});

export const getInventoryStockScCastypeFail = (error) => ({
  type: GET_INVENTORYSTOCK_SC_CASTYPE_FAIL,
  payload: error,
});

export const getInventoryStockScWarehouse = () => ({
  type: GET_INVENTORYSTOCK_SC_WAREHOUSE,
});

export const getInventoryStockScWarehouseSuccess = (stockscwarehouse) => ({
  type: GET_INVENTORYSTOCK_SC_WAREHOUSE_SUCCESS,
  payload: stockscwarehouse,
});

export const getInventoryStockScWarehouseFail = (error) => ({
  type: GET_INVENTORYSTOCK_SC_WAREHOUSE_FAIL,
  payload: error,
});

export const getInventoryStockScStatetype = () => ({
  type: GET_INVENTORYSTOCK_SC_STATETYPE,
});

export const getInventoryStockScStatetypeSuccess = (stockscstatetype) => ({
  type: GET_INVENTORYSTOCK_SC_STATETYPE_SUCCESS,
  payload: stockscstatetype,
});

export const getInventoryStockScStatetypeFail = (error) => ({
  type: GET_INVENTORYSTOCK_SC_STATETYPE_FAIL,
  payload: error,
});

export const getInventoryStockScInventorystate = () => ({
  type: GET_INVENTORYSTOCK_SC_INVENTORYSTATE,
});

export const getInventoryStockScInventorystateSuccess = (
  stockscinventorystate
) => ({
  type: GET_INVENTORYSTOCK_SC_INVENTORYSTATE_SUCCESS,
  payload: stockscinventorystate,
});

export const getInventoryStockScInventorystateFail = (error) => ({
  type: GET_INVENTORYSTOCK_SC_INVENTORYSTATE_FAIL,
  payload: error,
});

export const addInventoryStockSmartcard = (stocksmartcard) => ({
  type: ADD_INVENTORYSTOCK_SMARTCARD,
  payload: stocksmartcard,
});

export const addInventoryStockSmartcardSuccess = (stocksmartcard) => ({
  type: ADD_INVENTORYSTOCK_SMARTCARD_SUCCESS,
  payload: stocksmartcard,
});

export const addInventoryStockSmartcardFail = (error) => ({
  type: ADD_INVENTORYSTOCK_SMARTCARD_FAIL,
  payload: error,
});

export const getInventoryStockScBrand1 = () => ({
  type: GET_INVENTORYSTOCK_SC_BRAND1,
});

export const getInventoryStockScBrand1Success = (brand1) => ({
  type: GET_INVENTORYSTOCK_SC_BRAND1_SUCCESS,
  payload: brand1,
});

export const getInventoryStockScBrand1Fail = (error) => ({
  type: GET_INVENTORYSTOCK_SC_BRAND1_FAIL,
  payload: error,
});

export const getInventoryStockScBrand2 = () => ({
  type: GET_INVENTORYSTOCK_SC_BRAND2,
});

export const getInventoryStockScBrand2Success = (brand2) => ({
  type: GET_INVENTORYSTOCK_SC_BRAND2_SUCCESS,
  payload: brand2,
});

export const getInventoryStockScBrand2Fail = (error) => ({
  type: GET_INVENTORYSTOCK_SC_BRAND2_FAIL,
  payload: error,
});

export const addInventoryStockStb = (stockstb) => ({
  type: ADD_INVENTORYSTOCK_STB,
  payload: stockstb,
});

export const addInventoryStockStbSuccess = (stockstb) => ({
  type: ADD_INVENTORYSTOCK_STB_SUCCESS,
  payload: stockstb,
});

export const addInventoryStockStbFail = (error) => ({
  type: ADD_INVENTORYSTOCK_STB_FAIL,
  payload: error,
});

export const getPairingSmartcardList = () => ({
  type: GET_PAIRING_SMARTCARDLIST,
});

export const getPairingSmartcardListSuccess = (smartcardlist) => ({
  type: GET_PAIRING_SMARTCARDLIST_SUCCESS,
  payload: smartcardlist,
});

export const getPairingSmartcardListFail = (error) => ({
  type: GET_PAIRING_SMARTCARDLIST_FAIL,
  payload: error,
});

export const getPairingStbList = () => ({
  type: GET_PAIRING_STBLIST,
});

export const getPairingStbListSuccess = (stblist) => ({
  type: GET_PAIRING_STBLIST_SUCCESS,
  payload: stblist,
});

export const getPairingStbListFail = (error) => ({
  type: GET_PAIRING_STBLIST_FAIL,
  payload: error,
});

export const addInventoryStockPairing = (stockpairing) => ({
  type: ADD_INVENTORYSTOCK_PAIRING,
  payload: stockpairing,
});

export const addInventoryStockPairingSuccess = (stockpairing) => ({
  type: ADD_INVENTORYSTOCK_PAIRING_SUCCESS,
  payload: stockpairing,
});

export const addInventoryStockPairingFail = (error) => ({
  type: ADD_INVENTORYSTOCK_PAIRING_FAIL,
  payload: error,
});

export const updateStockSmartcardMarkfaulty = (stocksmartcard) => ({
  type: UPDATE_STOCKSMARTCARD_MARKFAULTY,
  payload: stocksmartcard,
});

export const updateStockSmartcardMarkfaultySuccess = (stocksmartcard) => ({
  type: UPDATE_STOCKSMARTCARD_MARKFAULTY_SUCCESS,
  payload: stocksmartcard,
});

export const updateStockSmartcardMarkfaultyFail = (error) => ({
  type: UPDATE_STOCKSMARTCARD_MARKFAULTY_FAIL,
  payload: error,
});

export const updateStockSmartcardBlacklist = (stocksmartcard) => ({
  type: UPDATE_STOCKSMARTCARD_BLACKLIST,
  payload: stocksmartcard,
});

export const updateStockSmartcardBlacklistSuccess = (stocksmartcard) => ({
  type: UPDATE_STOCKSMARTCARD_BLACKLIST_SUCCESS,
  payload: stocksmartcard,
});

export const updateStockSmartcardBlacklistFail = (error) => ({
  type: UPDATE_STOCKSMARTCARD_BLACKLIST_FAIL,
  payload: error,
});
