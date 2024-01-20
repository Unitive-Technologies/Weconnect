import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYSTOCK_SMARTCARD,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_PAIRING,
} from "./actionTypes";
import {
  getInventoryStockSmartcardSuccess,
  getInventoryStockSmartcardFail,
  getInventoryStockStbSuccess,
  getInventoryStockStbFail,
  getInventoryStockPairingSuccess,
  getInventoryStockPairingFail,
} from "./actions";
import {
  getInventoryStockSmartcard,
  getInventoryStockStb,
  getInventoryStockPairing,
} from "../../helpers/fakebackend_helper";

export const getStockPairingStore = (state) => state.stockpairing;

function* fetchInventoryStockSmartcard() {
  try {
    const response = yield call(getInventoryStockSmartcard);
    yield put(getInventoryStockSmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockSmartcardFail(error));
  }
}

function* fetchInventoryStockStb() {
  try {
    const response = yield call(getInventoryStockStb);
    yield put(getInventoryStockStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockStbFail(error));
  }
}

function* fetchInventoryStockPairing() {
  try {
    let stockpairingStore = yield select(getStockPairingStore);
    console.log("Stock pairing store in saga: ", stockpairingStore);

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

function* inventorystockSaga() {
  yield takeEvery(GET_INVENTORYSTOCK_SMARTCARD, fetchInventoryStockSmartcard);
  yield takeEvery(GET_INVENTORYSTOCK_STB, fetchInventoryStockStb);
  yield takeEvery(GET_INVENTORYSTOCK_PAIRING, fetchInventoryStockPairing);
}

export default inventorystockSaga;
