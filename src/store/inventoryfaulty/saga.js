import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYFAULTY_SMARTCARD,
  GET_INVENTORYFAULTY_STB,
  GET_INVENTORYFAULTY_PAIRING,
  UPDATE_FAULTYSMARTCARD_SENDSC,
  UPDATE_FAULTYSMARTCARD_BLACKLIST,
  UPDATE_FAULTYSTB_SENDSTB,
  UPDATE_FAULTYSTB_BLACKLIST,
  UPDATE_FAULTYPAIRING_SENDPAIR,
  UPDATE_FAULTYPAIRING_BLACKLIST,
} from "./actionTypes";
import {
  getInventoryFaultySmartcard as onGetInventoryFaultySmartcard,
  getInventoryFaultyStb as onGetInventoryFaultyStb,
  getInventoryFaultyPairing as onGetInventoryFaultyPairing,
  getInventoryFaultySmartcardSuccess,
  getInventoryFaultySmartcardFail,
  getInventoryFaultyStbSuccess,
  getInventoryFaultyStbFail,
  getInventoryFaultyPairingSuccess,
  getInventoryFaultyPairingFail,
  updateFaultySmartcardSendscSuccess,
  updateFaultySmartcardSendscFail,
  updateFaultySmartcardBlacklistSuccess,
  updateFaultySmartcardBlacklistFail,
  updateFaultyStbSendstbSuccess,
  updateFaultyStbSendstbFail,
  updateFaultyStbBlacklistSuccess,
  updateFaultyStbBlacklistFail,
  updateFaultyPairingSendpairSuccess,
  updateFaultyPairingSendpairFail,
  updateFaultyPairingBlacklistSuccess,
  updateFaultyPairingBlacklistFail,
} from "./actions";
import {
  getInventoryFaultySmartcard,
  getInventoryFaultyStb,
  getInventoryFaultyPairing,
  updateFaultySmartcardSendsc,
  updateFaultySmartcardBlacklist,
  updateFaultyStbSendstb,
  updateFaultyStbBlacklist,
  updateFaultyPairingSendpair,
  updateFaultyPairingBlacklist,
} from "../../helpers/backend_helper";

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
    // console.log("Response from API -", response);
    // debugger;
    yield put(getInventoryFaultyPairingSuccess(response));
  } catch (error) {
    yield put(getInventoryFaultyPairingFail(error));
  }
}

function* onUpdateFaultySmartcardSendsc({ payload: faultysmartcard }) {
  try {
    const response = yield call(updateFaultySmartcardSendsc, faultysmartcard);
    yield put(updateFaultySmartcardSendscSuccess(response.data));
    yield put(onGetInventoryFaultySmartcard());
  } catch (error) {
    yield put(updateFaultySmartcardSendscFail(error));
  }
}

function* onUpdateFaultySmartcardBlacklist({ payload: faultysmartcard }) {
  try {
    const response = yield call(
      updateFaultySmartcardBlacklist,
      faultysmartcard
    );
    yield put(updateFaultySmartcardBlacklistSuccess(response.data));
    yield put(onGetInventoryFaultySmartcard());
  } catch (error) {
    yield put(updateFaultySmartcardBlacklistFail(error));
  }
}

function* onUpdateFaultyStbSendstb({ payload: faultystb }) {
  try {
    const response = yield call(updateFaultyStbSendstb, faultystb);
    yield put(updateFaultyStbSendstbSuccess(response.data));
    yield put(onGetInventoryFaultyStb());
  } catch (error) {
    yield put(updateFaultyStbSendstbFail(error));
  }
}

function* onUpdateFaultyStbBlacklist({ payload: faultystb }) {
  try {
    const response = yield call(updateFaultyStbBlacklist, faultystb);
    yield put(updateFaultyStbBlacklistSuccess(response.data));
    yield put(onGetInventoryFaultyStb());
  } catch (error) {
    yield put(updateFaultyStbBlacklistFail(error));
  }
}

function* onUpdateFaultyPairingSendpair({ payload: faultypairing }) {
  try {
    const response = yield call(updateFaultyPairingSendpair, faultypairing);
    yield put(updateFaultyPairingSendpairSuccess(response.data));
    yield put(onGetInventoryFaultyPairing());
  } catch (error) {
    yield put(updateFaultyPairingSendpairFail(error));
  }
}

function* onUpdateFaultyPairingBlacklist({ payload: faultypairing }) {
  try {
    const response = yield call(updateFaultyPairingBlacklist, faultypairing);
    yield put(updateFaultyPairingBlacklistSuccess(response.data));
    yield put(onGetInventoryFaultyPairing());
  } catch (error) {
    yield put(updateFaultyPairingBlacklistFail(error));
  }
}

function* inventoryfaultySaga() {
  yield takeEvery(GET_INVENTORYFAULTY_SMARTCARD, fetchInventoryFaultySmartcard);
  yield takeEvery(GET_INVENTORYFAULTY_STB, fetchInventoryFaultyStb);
  yield takeEvery(GET_INVENTORYFAULTY_PAIRING, fetchInventoryFaultyPairing);
  yield takeEvery(UPDATE_FAULTYSMARTCARD_SENDSC, onUpdateFaultySmartcardSendsc);
  yield takeEvery(
    UPDATE_FAULTYSMARTCARD_BLACKLIST,
    onUpdateFaultySmartcardBlacklist
  );
  yield takeEvery(UPDATE_FAULTYSTB_SENDSTB, onUpdateFaultyStbSendstb);
  yield takeEvery(UPDATE_FAULTYSTB_BLACKLIST, onUpdateFaultyStbBlacklist);
  yield takeEvery(UPDATE_FAULTYPAIRING_SENDPAIR, onUpdateFaultyPairingSendpair);
  yield takeEvery(
    UPDATE_FAULTYPAIRING_BLACKLIST,
    onUpdateFaultyPairingBlacklist
  );
}

export default inventoryfaultySaga;
