import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYBLACKLISTED_SMARTCARD,
  GET_INVENTORYBLACKLISTED_STB,
  GET_INVENTORYBLACKLISTED_PAIRING,
} from "./actionTypes";
import {
  getInventoryBlacklistedSmartcardSuccess,
  getInventoryBlacklistedSmartcardFail,
  getInventoryBlacklistedStbSuccess,
  getInventoryBlacklistedStbFail,
  getInventoryBlacklistedPairingSuccess,
  getInventoryBlacklistedPairingFail,
} from "./actions";
import {
  getInventoryBlacklistedSmartcard,
  getInventoryBlacklistedStb,
  getInventoryBlacklistedPairing,
} from "../../helpers/backend_helper";

export const getBlacklistedPairingStore = (state) => state.blacklistedpairing;

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
    let blacklistedpairingStore = yield select(getBlacklistedPairingStore);

    const pageSize = blacklistedpairingStore.pageSize;
    const currentPage = blacklistedpairingStore.currentPage;

    const response = yield call(
      getInventoryBlacklistedPairing,
      currentPage,
      pageSize
    );
    yield put(getInventoryBlacklistedPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryBlacklistedPairingFail(error));
  }
}

function* inventoryblackistedSaga() {
  yield takeEvery(
    GET_INVENTORYBLACKLISTED_SMARTCARD,
    fetchInventoryBlacklistedSmartcard
  );
  yield takeEvery(GET_INVENTORYBLACKLISTED_STB, fetchInventoryBlacklistedStb);
  yield takeEvery(
    GET_INVENTORYBLACKLISTED_PAIRING,
    fetchInventoryBlacklistedPairing
  );
}

export default inventoryblackistedSaga;
