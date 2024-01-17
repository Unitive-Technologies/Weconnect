import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_INVENTORYSTOCK,
  GET_INVENTORYSTOCK_STB,
  GET_INVENTORYSTOCK_PAIRING,
  GET_INVENTORYFAULTY_SMARTCARD,
  GET_INVENTORYFAULTY_STB,
  GET_INVENTORYFAULTY_PAIRING,
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
} from "./actions";
import {
  getInventoryStock,
  getInventoryStockStb,
  getInventoryStockPairing,
  getInventoryFaultySmartcard,
  getInventoryFaultyStb,
  getInventoryFaultyPairing,
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

function* fetchInventoryStock() {
  try {
    const response = yield call(getInventoryStock);
    console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryStockSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockFail(error));
  }
}

function* fetchInventoryStockStb() {
  try {
    const response = yield call(getInventoryStockStb);
    console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryStockStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockStbFail(error));
  }
}

function* fetchInventoryStockPairing() {
  try {
    const response = yield call(getInventoryStockPairing);
    console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryStockPairingSuccess(response.data));
  } catch (error) {
    yield put(getInventoryStockPairingFail(error));
  }
}

function* fetchInventoryFaultySmartcard() {
  try {
    const response = yield call(getInventoryFaultySmartcard);
    console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryFaultySmartcardSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultySmartcardFail(error));
  }
}

function* fetchInventoryFaultyStb() {
  try {
    const response = yield call(getInventoryFaultyStb);
    console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryFaultyStbSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultyStbFail(error));
  }
}

function* fetchInventoryFaultyPairing() {
  try {
    const response = yield call(getInventoryFaultyPairing);
    console.log("response:" + JSON.stringify(response.data));
    yield put(getInventoryFaultyPairingSuccess(response.data));
  } catch (error) {
    yield put(getInventoryFaultyPairingFail(error));
  }
}

function* inventorystockSaga() {
  yield takeEvery(GET_INVENTORYSTOCK, fetchInventoryStock);
  yield takeEvery(GET_INVENTORYSTOCK_STB, fetchInventoryStockStb);
  yield takeEvery(GET_INVENTORYSTOCK_PAIRING, fetchInventoryStockPairing);
  yield takeEvery(GET_INVENTORYFAULTY_SMARTCARD, fetchInventoryFaultySmartcard);
  yield takeEvery(GET_INVENTORYFAULTY_STB, fetchInventoryFaultyStb);
  yield takeEvery(GET_INVENTORYFAULTY_PAIRING, fetchInventoryFaultyPairing);
}

export default inventorystockSaga;
