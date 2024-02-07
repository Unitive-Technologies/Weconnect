import { call, put, takeEvery, select } from "redux-saga/effects";
import {
  GET_INVENTORYSTOCK_SMARTCARD,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_PAIRING,
  UPDATE_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_SC_CASTYPE,
  GET_INVENTORYSTOCK_SC_INVENTORYSTATE,
  GET_INVENTORYSTOCK_SC_STATETYPE,
  GET_INVENTORYSTOCK_SC_WAREHOUSE,
  ADD_INVENTORYSTOCK_SMARTCARD,
  GET_INVENTORYSTOCK_SC_BRAND1,
  GET_INVENTORYSTOCK_SC_BRAND2,
  ADD_INVENTORYSTOCK_STB,
  GET_PAIRING_SMARTCARDLIST,
  GET_PAIRING_STBLIST,
  ADD_INVENTORYSTOCK_PAIRING,
  UPDATE_STOCKSMARTCARD_MARKFAULTY,
  UPDATE_STOCKSMARTCARD_BLACKLIST,
  GET_STOCKACTION_INVENTORYSTATE,
  UPDATE_STOCKSMARTCARD_ACTIONUPDATION,
  UPDATE_STOCKSTB_MARKFAULTY,
  UPDATE_STOCKSTB_BLACKLIST,
  ADD_STOCKSTB_ACTIONUPDATION,
} from "./actionTypes";
import {
  getInventoryStockStb as onGetInventoryStockStb,
  getInventoryStockSmartcard as onGetInventoryStockSmartcard,
  getInventoryStockPairing as onGetInventoryStockPairing,
  getInventoryStockSmartcardSuccess,
  getInventoryStockSmartcardFail,
  getInventoryStockStbSuccess,
  getInventoryStockStbFail,
  getInventoryStockPairingSuccess,
  getInventoryStockPairingFail,
  updateInventoryStockStbSuccess,
  updateInventoryStockStbFail,
  getInventoryStockScCastypeSuccess,
  getInventoryStockScCastypeFail,
  getInventoryStockScInventorystateSuccess,
  getInventoryStockScInventorystateFail,
  getInventoryStockScStatetypeSuccess,
  getInventoryStockScStatetypeFail,
  getInventoryStockScWarehouseSuccess,
  getInventoryStockScWarehouseFail,
  addInventoryStockSmartcardSuccess,
  addInventoryStockSmartcardFail,
  getInventoryStockScBrand1Success,
  getInventoryStockScBrand1Fail,
  getInventoryStockScBrand2Success,
  getInventoryStockScBrand2Fail,
  addInventoryStockStbSuccess,
  addInventoryStockStbFail,
  getPairingSmartcardListSuccess,
  getPairingSmartcardListFail,
  getPairingStbListSuccess,
  getPairingStbListFail,
  addInventoryStockPairingSuccess,
  addInventoryStockPairingFail,
  updateStockSmartcardMarkfaultySuccess,
  updateStockSmartcardMarkfaultyFail,
  updateStockSmartcardBlacklistSuccess,
  updateStockSmartcardBlacklistFail,
  getStockActionInventorystateSuccess,
  getStockActionInventorystateFail,
  updateStockSmartcardActionupdationSuccess,
  updateStockSmartcardActionupdationFail,
  updateStockStbMarkfaultySuccess,
  updateStockStbMarkfaultyFail,
  updateStockStbBlacklistSuccess,
  updateStockStbBlacklistFail,
  addStockStbActionupdationSuccess,
  addStockStbActionupdationFail,
} from "./actions";
import {
  getInventoryStockSmartcard,
  getInventoryStockStb,
  getInventoryStockPairing,
  updateInventoryStockStb,
  getInventoryStockScCastype,
  getInventoryStockScInventorystate,
  getInventoryStockScStatetype,
  getInventoryStockScWarehouse,
  addInventoryStockSmartcard,
  getInventoryStockScBrand1,
  getInventoryStockScBrand2,
  addInventoryStockStb,
  getPairingSmartcardList,
  getPairingStbList,
  addInventoryStockPairing,
  updateStockSmartcardMarkfaulty,
  updateStockSmartcardBlacklist,
  getStockActionInventorystate,
  updateStockSmartcardActionupdation,
  updateStockStbMarkfaulty,
  updateStockStbBlacklist,
  addStockStbActionupdation,
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
    yield put(updateInventoryStockStbSuccess(response.data));
    yield put(onGetInventoryStockStb());
  } catch (error) {
    yield put(updateInventoryStockStbFail(error));
  }
}

function* fetchInventoryStockCsCastype() {
  try {
    const response = yield call(getInventoryStockScCastype);
    yield put(getInventoryStockScCastypeSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockScCastypeFail(error));
  }
}

function* fetchInventoryStockCsStatetype() {
  try {
    const response = yield call(getInventoryStockScStatetype);
    yield put(getInventoryStockScStatetypeSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockScStatetypeFail(error));
  }
}

function* fetchInventoryStockCsInventorystate() {
  try {
    const response = yield call(getInventoryStockScInventorystate);
    yield put(getInventoryStockScInventorystateSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockScInventorystateFail(error));
  }
}

function* fetchInventoryStockCsWarehouse() {
  try {
    const response = yield call(getInventoryStockScWarehouse);
    yield put(getInventoryStockScWarehouseSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockScWarehouseFail(error));
  }
}

function* onAddInventoryStockSmartcard({ payload: stocksmartcard }) {
  try {
    const response = yield call(addInventoryStockSmartcard, stocksmartcard);
    console.log("Response data in add smartcard: ", response);
    yield put(addInventoryStockSmartcardSuccess(response));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    console.log("Error in add smartcard saga: ", error);
    yield put(addInventoryStockSmartcardFail(error));
  }
}

function* fetchInventoryStockCsBrand1() {
  try {
    const response = yield call(getInventoryStockScBrand1);
    yield put(getInventoryStockScBrand1Success(response.data));
  } catch (error) {
    yield put(getInventoryStockScBrand1Fail(error));
  }
}

function* fetchInventoryStockCsBrand2() {
  try {
    const response = yield call(getInventoryStockScBrand2);
    yield put(getInventoryStockScBrand2Success(response.data));
  } catch (error) {
    yield put(getInventoryStockScBrand2Fail(error));
  }
}

function* onAddInventoryStockStb({ payload: stockstb }) {
  try {
    const response = yield call(addInventoryStockStb, stockstb);
    console.log("Response data in add stb: ", response);
    yield put(addInventoryStockStbSuccess(response));
    yield put(onGetInventoryStockStb());
  } catch (error) {
    console.log("Error in add stb saga: ", error);
    yield put(addInventoryStockStbFail(error));
  }
}

function* fetchPairingSmartcardList() {
  try {
    const response = yield call(getPairingSmartcardList);
    yield put(getPairingSmartcardListSuccess(response.data));
  } catch (error) {
    yield put(getPairingSmartcardListFail(error));
  }
}

function* fetchPairingStbList() {
  try {
    const response = yield call(getPairingStbList);
    yield put(getPairingStbListSuccess(response.data));
  } catch (error) {
    yield put(getPairingStbListFail(error));
  }
}

function* onAddInventoryStockPairing({ payload: stockpairing }) {
  try {
    const response = yield call(addInventoryStockPairing, stockpairing);
    console.log("Response data in add pairing: ", response);
    yield put(addInventoryStockPairingSuccess(response));
    yield put(onGetInventoryStockPairing());
  } catch (error) {
    console.log("Error in add pairing saga: ", error);
    yield put(addInventoryStockPairingFail(error));
  }
}

function* onUpdateStockSmartcardMarkfaulty({ payload: stocksmartcard }) {
  try {
    const response = yield call(updateStockSmartcardMarkfaulty, stocksmartcard);
    yield put(updateStockSmartcardMarkfaultySuccess(response.data));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    yield put(updateStockSmartcardMarkfaultyFail(error));
  }
}

function* onUpdateStockSmartcardBlacklist({ payload: stocksmartcard }) {
  try {
    const response = yield call(updateStockSmartcardBlacklist, stocksmartcard);
    yield put(updateStockSmartcardBlacklistSuccess(response.data));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    yield put(updateStockSmartcardBlacklistFail(error));
  }
}

function* fetchStockActionInventorystate() {
  try {
    const response = yield call(getStockActionInventorystate);
    yield put(getStockActionInventorystateSuccess(response.data));
  } catch (error) {
    yield put(getStockActionInventorystateFail(error));
  }
}

function* onUpdateStockSmartcardActionupdation({ payload: stocksmartcard }) {
  try {
    const response = yield call(
      updateStockSmartcardActionupdation,
      stocksmartcard
    );
    yield put(updateStockSmartcardActionupdationSuccess(response.data));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    yield put(updateStockSmartcardActionupdationFail(error));
  }
}

function* onUpdateStockStbMarkfaulty({ payload: stockstb }) {
  try {
    const response = yield call(updateStockStbMarkfaulty, stockstb);
    yield put(updateStockStbMarkfaultySuccess(response.data));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    yield put(updateStockStbMarkfaultyFail(error));
  }
}

function* onUpdateStockStbBlacklist({ payload: stockstb }) {
  try {
    const response = yield call(updateStockStbBlacklist, stockstb);
    yield put(updateStockStbBlacklistSuccess(response.data));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    yield put(updateStockStbBlacklistFail(error));
  }
}

function* onAddStockStbActionupdation({ payload: stockstb }) {
  try {
    const response = yield call(addStockStbActionupdation, stockstb);
    yield put(addStockStbActionupdationSuccess(response.data));
    yield put(onGetInventoryStockSmartcard());
  } catch (error) {
    yield put(addStockStbActionupdationFail(error));
  }
}

function* inventorystockSaga() {
  yield takeEvery(GET_INVENTORYSTOCK_SMARTCARD, fetchInventoryStockSmartcard);
  yield takeEvery(GET_INVENTORYSTOCK_STB, fetchInventoryStockStb);
  yield takeEvery(GET_INVENTORYSTOCK_PAIRING, fetchInventoryStockPairing);
  yield takeEvery(UPDATE_INVENTORYSTOCK_STB, onUpdateInventoryStockStb);
  yield takeEvery(GET_INVENTORYSTOCK_SC_CASTYPE, fetchInventoryStockCsCastype);
  yield takeEvery(
    GET_INVENTORYSTOCK_SC_INVENTORYSTATE,
    fetchInventoryStockCsInventorystate
  );
  yield takeEvery(
    GET_INVENTORYSTOCK_SC_STATETYPE,
    fetchInventoryStockCsStatetype
  );
  yield takeEvery(
    GET_INVENTORYSTOCK_SC_WAREHOUSE,
    fetchInventoryStockCsWarehouse
  );
  yield takeEvery(ADD_INVENTORYSTOCK_SMARTCARD, onAddInventoryStockSmartcard);
  yield takeEvery(GET_INVENTORYSTOCK_SC_BRAND1, fetchInventoryStockCsBrand1);
  yield takeEvery(GET_INVENTORYSTOCK_SC_BRAND2, fetchInventoryStockCsBrand2);
  yield takeEvery(ADD_INVENTORYSTOCK_STB, onAddInventoryStockStb);
  yield takeEvery(GET_PAIRING_SMARTCARDLIST, fetchPairingSmartcardList);
  yield takeEvery(GET_PAIRING_STBLIST, fetchPairingStbList);
  yield takeEvery(ADD_INVENTORYSTOCK_PAIRING, onAddInventoryStockPairing);
  yield takeEvery(
    UPDATE_STOCKSMARTCARD_MARKFAULTY,
    onUpdateStockSmartcardMarkfaulty
  );
  yield takeEvery(
    UPDATE_STOCKSMARTCARD_BLACKLIST,
    onUpdateStockSmartcardBlacklist
  );
  yield takeEvery(
    GET_STOCKACTION_INVENTORYSTATE,
    fetchStockActionInventorystate
  );
  yield takeEvery(
    UPDATE_STOCKSMARTCARD_ACTIONUPDATION,
    onUpdateStockSmartcardActionupdation
  );
  yield takeEvery(UPDATE_STOCKSTB_MARKFAULTY, onUpdateStockStbMarkfaulty);
  yield takeEvery(UPDATE_STOCKSTB_BLACKLIST, onUpdateStockStbBlacklist);
  yield takeEvery(ADD_STOCKSTB_ACTIONUPDATION, onAddStockStbActionupdation);
}

export default inventorystockSaga;
