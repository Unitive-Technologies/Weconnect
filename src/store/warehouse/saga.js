import { call, put, takeEvery } from "redux-saga/effects";

import { GET_WAREHOUSELIST, ADD_WAREHOUSELIST } from "./actionTypes";

import {
  getWarehouseListSuccess,
  getWarehouseListFail,
  addWareHouseListSuccess,
  addWareHouseListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getWarehouseList,
  addWareHouseList,
} from "../../helpers/fakebackend_helper";

const convertWarehouseListObject = (warehouselist) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return warehouselist.map((warehouse) => {
    return {
      ...warehouse,
      id: warehouse.id,
      name: warehouse.name,
      code: warehouse.code,
      contactperson: warehouse.contact_person,
      mobileno: warehouse.mobile_no,
      address: warehouse.address,
      description: warehouse.description,
      status: warehouse.status_lbl,
      regionaloffice: warehouse.city_lbl,
      lco: warehouse.operator_lbl,
      lcocode: warehouse.operator_code_lbl,
      created_at: warehouse.created_at,
      created_by: warehouse.created_by_lbl,
    };
  });
};

function* fetchWarehouseList() {
  try {
    const response = yield call(getWarehouseList);
    console.log("response:" + JSON.stringify(response));
    const warehouseList = convertWarehouseListObject(response);
    yield put(getWarehouseListSuccess(warehouseList));
  } catch (error) {
    yield put(getWarehouseListFail(error));
  }
}

function* onAddWareHouseList({ payload: warehouselist }) {
  try {
    const response = yield call(addWareHouseList, warehouselist);
    yield put(addWareHouseListSuccess(response));
  } catch (error) {
    yield put(addWareHouseListFail(error));
  }
}

function* warehouseListSaga() {
  yield takeEvery(GET_WAREHOUSELIST, fetchWarehouseList);
  yield takeEvery(ADD_WAREHOUSELIST, onAddWareHouseList);
}

export default warehouseListSaga;
