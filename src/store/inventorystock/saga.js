import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYSTOCK_SMARTCARD,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_PAIRING,
  UPDATE_INVENTORYSTOCK_STB,
} from "./actionTypes";
import {
  getInventoryStockSmartcardSuccess,
  getInventoryStockSmartcardFail,
  getInventoryStockStbSuccess,
  getInventoryStockStbFail,
  getInventoryStockPairingSuccess,
  getInventoryStockPairingFail,
  updateInventoryStockStbSuccess,
  updateInventoryStockStbFail,
} from "./actions";
import {
  getInventoryStockSmartcard,
  getInventoryStockStb,
  getInventoryStockPairing,
  updateInventoryStockStb,
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
    const pageSize = stockpairingStore.pageSize;
    const currentPage = stockpairingStore.currentPage;
    const response = yield call(
      getInventoryStockPairing,
      currentPage,
      pageSize
    );
    yield put(getInventoryStockPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryStockPairingFail(error));
  }
}

function* onUpdateInventoryStockStb({ payload: stockstb }) {
  try {
    const response = yield call(updateInventoryStockStb, stockstb.id, stockstb);
    // console.log("Response data in saga: ", response);
    yield put(updateInventoryStockStbSuccess(response.data));
  } catch (error) {
    // console.log("Error in update district: ", error);
    yield put(updateInventoryStockStbFail(error));
  }
}

function* inventorystockSaga() {
  yield takeEvery(GET_INVENTORYSTOCK_SMARTCARD, fetchInventoryStockSmartcard);
  yield takeEvery(GET_INVENTORYSTOCK_STB, fetchInventoryStockStb);
  yield takeEvery(GET_INVENTORYSTOCK_PAIRING, fetchInventoryStockPairing);
  yield takeEvery(UPDATE_INVENTORYSTOCK_STB, onUpdateInventoryStockStb);
}

export default inventorystockSaga;
