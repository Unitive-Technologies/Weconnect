import { call, put, takeEvery } from "redux-saga/effects";
import { GET_INVENTORYSTOCK } from "./actionTypes";
import { getInventoryStockSuccess, getInventoryStockFail } from "./actions";
import { getInventoryStock } from "../../helpers/fakebackend_helper";

const convertInventoryStockListObject = (inventorystocklist) => {
  return inventorystocklist.map((inventorystock) => {
    return {
      ...inventorystock,
      id: inventorystock.id,
      name: inventorystock.name,
      code: inventorystock.code,
      state_lbl: inventorystock.state_lbl,
      created_by_lbl: inventorystock.created_by_lbl,
      state_code_lbl: inventorystock.state_code_lbl,
      description: inventorystock.description,
      status: inventorystock.status,
      created_at: inventorystock.created_at,
      type: inventorystock.type,
      state_id: inventorystock.state_id,
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

function* inventorystockSaga() {
  yield takeEvery(GET_INVENTORYSTOCK, fetchInventoryStock);
}

export default inventorystockSaga;
