import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYSTOCK,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_PAIRING,
  GET_INVENTORYFAULTY_SMARTCARD,
  GET_INVENTORYFAULTY_STB,
  GET_INVENTORYFAULTY_PAIRING,
  GET_INVENTORYBLACKLISTED_SMARTCARD,
  GET_INVENTORYBLACKLISTED_STB,
  GET_INVENTORYBLACKLISTED_PAIRING,
  GET_INVENTORYALLOTTED_SMARTCARD,
  GET_INVENTORYALLOTTED_STB,
  GET_INVENTORYALLOTTED_PAIRING,
} from "./actionTypes";
import {
  getInventoryStockSuccess,
  getInventoryStockFail,
  getInventoryStockStbSuccess,
  getInventoryStockStbFail,
  getInventoryStockPairingSuccess,
  getInventoryStockPairingFail,
  getInventoryFaultySmartcardSuccess,
  getInventoryFaultySmartcardFail,
  getInventoryFaultyStbSuccess,
  getInventoryFaultyStbFail,
  getInventoryFaultyPairingSuccess,
  getInventoryFaultyPairingFail,
  getInventoryBlacklistedSmartcardSuccess,
  getInventoryBlacklistedSmartcardFail,
  getInventoryBlacklistedStbSuccess,
  getInventoryBlacklistedStbFail,
  getInventoryBlacklistedPairingSuccess,
  getInventoryBlacklistedPairingFail,
  getInventoryAllottedSmartcardSuccess,
  getInventoryAllottedSmartcardFail,
  getInventoryAllottedStbSuccess,
  getInventoryAllottedStbFail,
  getInventoryAllottedPairingSuccess,
  getInventoryAllottedPairingFail,
} from "./actions";
import {
  getInventoryStock,
  getInventoryStockStb,
  getInventoryStockPairing,
  getInventoryFaultySmartcard,
  getInventoryFaultyStb,
  getInventoryFaultyPairing,
  getInventoryBlacklistedSmartcard,
  getInventoryBlacklistedStb,
  getInventoryBlacklistedPairing,
  getInventoryAllottedSmartcard,
  getInventoryAllottedStb,
  getInventoryAllottedPairing,
} from "../../helpers/fakebackend_helper";

const convertInventoryStockListObject = (inventorystocklist) => {
  return inventorystocklist.map((inventorystock) => {
    return {
      ...inventorystock,
      id: inventorystock.id,
      smartcardno: inventorystock.smartcardno,
      is_embeded: inventorystock.is_embeded,
      brand_id: inventorystock.brand_id,
      cas_id: inventorystock.cas_id,
      po_id: inventorystock.po_id,
      meta_data: inventorystock.meta_data,
      status: inventorystock.status,
      created_at: inventorystock.created_at,
      stb_id: inventorystock.stb_id,
      warehouse_id: inventorystock.warehouse_id,
      state_lbl: inventorystock.state_lbl,
      brand_lbl: inventorystock.brand_lbl,
      cas_lbl: inventorystock.cas_lbl,
      inv_state_lbl: inventorystock.inv_state_lbl,
      warehouse_lbl: inventorystock.warehouse_lbl,
    };
  });
};

export const getStockPairingStore = (state) => state.stockpairing;
export const getFaultyPairingStore = (state) => state.faultypairing;
export const getAllottedPairingStore = (state) => state.allottedpairing;

function* fetchInventoryStock() {
  try {
    const response = yield call(getInventoryStock);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryStockSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockFail(error));
  }
}

function* fetchInventoryStockStb() {
  try {
    const response = yield call(getInventoryStockStb);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryStockStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockStbFail(error));
  }
}

function* fetchInventoryStockPairing() {
  try {
    // const response = yield call(getInventoryStockPairing);
    // console.log("response:" + JSON.stringify(response.data));
    // yield put(getInventoryStockPairingSuccess(response.data));
    let stockpairingStore = yield select(getStockPairingStore);

    const pageSize = stockpairingStore.pageSize;
    const currentPage = stockpairingStore.currentPage;

    const response = yield call(
      getInventoryStockPairing,
      currentPage,
      pageSize
    );
    console.log("Response from API -", response);
    debugger;
    yield put(getInventoryStockPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryStockPairingFail(error));
  }
}

function* fetchInventoryFaultySmartcard() {
  try {
    const response = yield call(getInventoryFaultySmartcard);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryFaultySmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultySmartcardFail(error));
  }
}

function* fetchInventoryFaultyStb() {
  try {
    const response = yield call(getInventoryFaultyStb);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryFaultyStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultyStbFail(error));
  }
}

function* fetchInventoryFaultyPairing() {
  try {
    // const response = yield call(getInventoryFaultyPairing);
    // // console.log("response:" + JSON.stringify(response.data));
    // yield put(getInventoryFaultyPairingSuccess(response.data));
    let FaultypairingStore = yield select(getFaultyPairingStore);

    const pageSize = FaultypairingStore.pageSize;
    const currentPage = FaultypairingStore.currentPage;

    const response = yield call(
      getInventoryFaultyPairing,
      currentPage,
      pageSize
    );
    console.log("Response from API -", response);
    debugger;
    yield put(getInventoryFaultyPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryFaultyPairingFail(error));
  }
}

function* fetchInventoryBlacklistedSmartcard() {
  try {
    const response = yield call(getInventoryBlacklistedSmartcard);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryBlacklistedSmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryBlacklistedSmartcardFail(error));
  }
}

function* fetchInventoryBlacklistedStb() {
  try {
    const response = yield call(getInventoryBlacklistedStb);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryBlacklistedStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryBlacklistedStbFail(error));
  }
}

function* fetchInventoryBlacklistedPairing() {
  try {
    const response = yield call(getInventoryBlacklistedPairing);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryBlacklistedPairingSuccess(response.data));
  } catch (error) {
    yield put(getInventoryBlacklistedPairingFail(error));
  }
}

function* fetchInventoryAllottedSmartcard() {
  try {
    const response = yield call(getInventoryAllottedSmartcard);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryAllottedSmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryAllottedSmartcardFail(error));
  }
}

function* fetchInventoryAllottedStb() {
  try {
    const response = yield call(getInventoryAllottedStb);
    // console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryAllottedStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryAllottedStbFail(error));
  }
}

function* fetchInventoryAllottedPairing() {
  try {
    // const response = yield call(getInventoryAllottedPairing);
    // // console.log("response:" + JSON.stringify(response.data));
    // yield put(getInventoryAllottedPairingSuccess(response.data));
    let allottedpairingStore = yield select(getAllottedPairingStore);

    const pageSize = allottedpairingStore.pageSize;
    const currentPage = allottedpairingStore.currentPage;

    const response = yield call(
      getInventoryAllottedPairing,
      currentPage,
      pageSize
    );
    console.log("Response from API -", response);
    debugger;
    yield put(getInventoryAllottedPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryAllottedPairingFail(error));
  }
}

function* inventorystockSaga() {
  yield takeEvery(GET_INVENTORYSTOCK, fetchInventoryStock);
  yield takeEvery(GET_INVENTORYSTOCK_STB, fetchInventoryStockStb);
  yield takeEvery(GET_INVENTORYSTOCK_PAIRING, fetchInventoryStockPairing);
  yield takeEvery(GET_INVENTORYFAULTY_SMARTCARD, fetchInventoryFaultySmartcard);
  yield takeEvery(GET_INVENTORYFAULTY_STB, fetchInventoryFaultyStb);
  yield takeEvery(GET_INVENTORYFAULTY_PAIRING, fetchInventoryFaultyPairing);
  yield takeEvery(
    GET_INVENTORYBLACKLISTED_SMARTCARD,
    fetchInventoryBlacklistedSmartcard
  );
  yield takeEvery(GET_INVENTORYBLACKLISTED_STB, fetchInventoryBlacklistedStb);
  yield takeEvery(
    GET_INVENTORYBLACKLISTED_PAIRING,
    fetchInventoryBlacklistedPairing
  );
  yield takeEvery(
    GET_INVENTORYALLOTTED_SMARTCARD,
    fetchInventoryAllottedSmartcard
  );
  yield takeEvery(GET_INVENTORYALLOTTED_STB, fetchInventoryAllottedStb);
  yield takeEvery(GET_INVENTORYALLOTTED_PAIRING, fetchInventoryAllottedPairing);
}

export default inventorystockSaga;
