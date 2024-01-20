import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYFAULTY_SMARTCARD,
  GET_INVENTORYFAULTY_STB,
  GET_INVENTORYFAULTY_PAIRING,
} from "./actionTypes";
import {
  getInventoryFaultySmartcardSuccess,
  getInventoryFaultySmartcardFail,
  getInventoryFaultyStbSuccess,
  getInventoryFaultyStbFail,
  getInventoryFaultyPairingSuccess,
  getInventoryFaultyPairingFail,
} from "./actions";
import {
  getInventoryFaultySmartcard,
  getInventoryFaultyStb,
  getInventoryFaultyPairing,
} from "../../helpers/fakebackend_helper";

export const getFaultyPairingStore = (state) => state.faultypairing;

function* fetchInventoryFaultySmartcard() {
  try {
    const response = yield call(getInventoryFaultySmartcard);
    yield put(getInventoryFaultySmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultySmartcardFail(error));
  }
}

function* fetchInventoryFaultyStb() {
  try {
    const response = yield call(getInventoryFaultyStb);
    yield put(getInventoryFaultyStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultyStbFail(error));
  }
}

function* fetchInventoryFaultyPairing() {
  try {
    let faultypairingStore = yield select(getFaultyPairingStore);

    const pageSize = faultypairingStore.pageSize;
    const currentPage = faultypairingStore.currentPage;

    const response = yield call(
      getInventoryFaultyPairing,
      currentPage,
      pageSize
    );
    console.log("Response from API -", response);
    // debugger;
    yield put(getInventoryFaultyPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryFaultyPairingFail(error));
  }
}

function* inventoryfaultySaga() {
  yield takeEvery(GET_INVENTORYFAULTY_SMARTCARD, fetchInventoryFaultySmartcard);
  yield takeEvery(GET_INVENTORYFAULTY_STB, fetchInventoryFaultyStb);
  yield takeEvery(GET_INVENTORYFAULTY_PAIRING, fetchInventoryFaultyPairing);
}

export default inventoryfaultySaga;
