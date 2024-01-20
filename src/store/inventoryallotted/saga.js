import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYALLOTTED_SMARTCARD,
  GET_INVENTORYALLOTTED_STB,
  GET_INVENTORYALLOTTED_PAIRING,
} from "./actionTypes";
import {
  getInventoryAllottedSmartcardSuccess,
  getInventoryAllottedSmartcardFail,
  getInventoryAllottedStbSuccess,
  getInventoryAllottedStbFail,
  getInventoryAllottedPairingSuccess,
  getInventoryAllottedPairingFail,
} from "./actions";
import {
  getInventoryAllottedSmartcard,
  getInventoryAllottedStb,
  getInventoryAllottedPairing,
} from "../../helpers/fakebackend_helper";

export const getAllottedPairingStore = (state) => state.allottedpairing;

function* fetchInventoryAllottedSmartcard() {
  try {
    const response = yield call(getInventoryAllottedSmartcard);
    yield put(getInventoryAllottedSmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryAllottedSmartcardFail(error));
  }
}

function* fetchInventoryAllottedStb() {
  try {
    const response = yield call(getInventoryAllottedStb);
    yield put(getInventoryAllottedStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryAllottedStbFail(error));
  }
}

function* fetchInventoryAllottedPairing() {
  try {
    let allottedpairingStore = yield select(getAllottedPairingStore);
    console.log("Allotted pairing store: ", allottedpairingStore);
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

function* inventoryallottedSaga() {
  yield takeEvery(
    GET_INVENTORYALLOTTED_SMARTCARD,
    fetchInventoryAllottedSmartcard
  );
  yield takeEvery(GET_INVENTORYALLOTTED_STB, fetchInventoryAllottedStb);
  yield takeEvery(GET_INVENTORYALLOTTED_PAIRING, fetchInventoryAllottedPairing);
}

export default inventoryallottedSaga;
