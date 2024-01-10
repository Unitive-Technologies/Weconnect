import { call, put, takeEvery } from "redux-saga/effects";

import { GET_WAREHOUSELIST, UPDATE_WAREHOUSELIST, GET_WAREHOUSELIST_STATUS, GET_WAREHOUSELIST_OPERATOR, ADD_WAREHOUSELIST } from "./actionTypes";

import {
  getWarehouseListSuccess,
  getWarehouseListFail,
  updateWarehouseListSuccess,
  updateWarehouseListFail,
  getWarehouseListStatusSuccess,
  getWarehouseListStatusFail,
  getWarehouseListOperatorSuccess,
  getWarehouseListOperatorFail,
  addWareHouseListSuccess,
  addWareHouseListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getWarehouseList,
  getWarehouseListStatus,
  getWarehouseListOperator,
  addWareHouseList,
  updateWarehouseList,
} from "../../helpers/fakebackend_helper";

const convertWarehouseListObject = (warehouselist) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return warehouselist.map((warehouse) => {
    return {
      ...warehouse,
      id: warehouse.id,
      name: warehouse.name,
      code: warehouse.code,
      contact_person: warehouse.contact_person,
      operator_id: warehouse.operator_id,
      mobile_no: warehouse.mobile_no,
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
    // const warehouseList = convertWarehouseListObject(response);
    yield put(getWarehouseListSuccess(response.data));
  } catch (error) {
    yield put(getWarehouseListFail(error));
  }
}

function* onUpdateWarehouseList({ payload: warehouselist }) {
  console.log("WarehouseList in onUpdate:" + JSON.stringify(warehouselist));
  console.log("Updated Id" + warehouselist.id)
  try {
    const response = yield call(
      updateWarehouseList,
      warehouselist.id,
      warehouselist,

    );
    yield put(updateWarehouseListSuccess(response));
    console.log("update response:" + JSON.stringify(response));
  } catch (error) {
    yield put(updateWarehouseListFail(error));
  }
}

function* fetchWarehouseListStatus() {
  try {
    const response = yield call(getWarehouseListStatus);
    console.log("WarehouseList status response:" + JSON.stringify(response));
    yield put(getWarehouseListStatusSuccess(response.data));
  } catch (error) {
    yield put(getWarehouseListStatusFail(error));
  }
}

function* fetchWarehouseListOperator() {
  try {
    const response = yield call(getWarehouseListOperator);
    console.log("WarehouseList Operator response:" + JSON.stringify(response));
    yield put(getWarehouseListOperatorSuccess(response.data));
  } catch (error) {
    yield put(getWarehouseListOperatorFail(error));
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
  yield takeEvery(GET_WAREHOUSELIST_STATUS, fetchWarehouseListStatus);
  yield takeEvery(GET_WAREHOUSELIST_OPERATOR, fetchWarehouseListOperator);
  yield takeEvery(ADD_WAREHOUSELIST, onAddWareHouseList);
  yield takeEvery(UPDATE_WAREHOUSELIST, onUpdateWarehouseList);
}

export default warehouseListSaga;
