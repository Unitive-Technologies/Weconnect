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
} from "./actionTypes";
import {
  getInventoryStockStb as onGetInventoryStockStb,
  getInventoryStockSmartcard as onGetIventoryStockSmartcard,
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
    yield put(onGetIventoryStockSmartcard());
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
}

export default inventorystockSaga;
