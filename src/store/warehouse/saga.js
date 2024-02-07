import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_WAREHOUSELIST,
  UPDATE_WAREHOUSELIST,
  GET_WAREHOUSELIST_STATUS,
  GET_WAREHOUSELIST_OPERATOR,
  ADD_WAREHOUSELIST,
} from "./actionTypes";

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

export const getWarehouseListStore = (state) => state.warehouselist;

function* fetchWarehouseList() {
  try {
    let WarehouseListStore = yield select(getWarehouseListStore);

    const pageSize = WarehouseListStore.pageSize;
    const currentPage = WarehouseListStore.currentPage;

    const response = yield call(getWarehouseList, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getWarehouseListSuccess(response));
  } catch (error) {
    console.error("Error fetching Users list:", error);
    yield put(getWarehouseListFail(error));
  }
}

function* onUpdateWarehouseList({ payload: warehouselist }) {
  console.log("WarehouseList in onUpdate:" + JSON.stringify(warehouselist));
  console.log("Updated Id" + warehouselist.id);
  try {
    const response = yield call(
      updateWarehouseList,
      warehouselist.id,
      warehouselist
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
