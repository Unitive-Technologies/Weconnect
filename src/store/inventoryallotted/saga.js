import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYALLOTTED_SMARTCARD,
  GET_INVENTORYALLOTTED_STB,
  GET_INVENTORYALLOTTED_PAIRING,
  GET_INVENTORYALLOTTED_USERTYPE,
  GET_INVENTORYALLOTTED_SMARTCARDLIST,
  GET_INVENTORYALLOTTED_OPERATORLIST,
  ALLOT_SMARTCARD,
  DEALLOT_SMARTCARD,
} from "./actionTypes";
import {
  getInventoryAllottedSmartcardSuccess,
  getInventoryAllottedSmartcardFail,
  getInventoryAllottedStbSuccess,
  getInventoryAllottedStbFail,
  getInventoryAllottedPairingSuccess,
  getInventoryAllottedPairingFail,
  getInventoryAllottedSmartcardlistSuccess,
  getInventoryAllottedSmartcardlistFail,
  getInventoryAllottedUsertypeSuccess,
  getInventoryAllottedUsertypeFail,
  getInventoryAllottedOperatorlistSuccess,
  getInventoryAllottedOperatorlistFail,
  allotSmartcardSuccess,
  allotSmartcardFail,
  deallotSmartcardSuccess,
  deallotSmartcardFail,
} from "./actions";
import {
  getInventoryAllottedSmartcard,
  getInventoryAllottedStb,
  getInventoryAllottedPairing,
  getInventoryAllottedUsertype,
  getInventoryAllottedSmartcardlist,
  getInventoryAllottedOperatorlist,
  allotSmartcard,
  deallotSmartcard,
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
    // console.log("Allotted pairing store: ", allottedpairingStore);
    const pageSize = allottedpairingStore.pageSize;
    const currentPage = allottedpairingStore.currentPage;

    const response = yield call(
      getInventoryAllottedPairing,
      currentPage,
      pageSize
    );
    // console.log("Response from API -", response);
    // debugger;
    yield put(getInventoryAllottedPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryAllottedPairingFail(error));
  }
}

function* fetchInventoryAllottedSmartcardlist() {
  try {
    const response = yield call(getInventoryAllottedSmartcardlist);
    yield put(getInventoryAllottedSmartcardlistSuccess(response.data));
  } catch (error) {
    yield put(getInventoryAllottedSmartcardlistFail(error));
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
