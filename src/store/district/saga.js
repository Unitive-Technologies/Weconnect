import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_DISTRICT,
  ADD_DISTRICT,
  GET_ADMINISTRATIVEDIVISION_STATUS,
  GET_DISTRICT_STATELIST,
  UPDATE_DISTRICT,
} from "./actionTypes";

import {
  getDistrictSuccess,
  getDistrictFail,
  getDistrict as fetchDistricts,
  addDistrictSuccess,
  addDistrictFail,
  getAdministrativeDivisionStatusSuccess,
  getAdministrativeDivisionStatusFail,
  getDistrictStateListSuccess,
  getDistrictStateListFail,
  updateDistrictSuccess,
  updateDistrictFail,
} from "./actions";
import {
  getDistrict,
  addDistrict,
  getDistrictStateList,
  getAdministrativeDivisionStatus,
  updateDistrict,
} from "../../helpers/fakebackend_helper";

export const getDistrictStore = (state) => state.district;

function* fetchDistrict() {
  try {
    let DistrictStore = yield select(getDistrictStore);

    const pageSize = DistrictStore.pageSize;
    const currentPage = DistrictStore.currentPage;

    const response = yield call(getDistrict, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getDistrictSuccess(response));
  } catch (error) {
    console.error("Error fetching District list:", error);
    yield put(getDistrictFail(error));
  }
}

// function* fetchDistrict() {
//   try {
//     const response = yield call(getDistrict);
//     // console.log("response:" + JSON.stringify(response.data));
//     const districtList = convertDistrictListObject(response.data);
//     yield put(getDistrictSuccess(response.data));
//   } catch (error) {
//     yield put(getDistrictFail(error));
//   }
// }

function* fetchAdministrativeDivisionStatus() {
  try {
    const response = yield call(getAdministrativeDivisionStatus);
    yield put(getAdministrativeDivisionStatusSuccess(response.data));
  } catch (error) {
    yield put(getAdministrativeDivisionStatusFail(error));
  }
}

function* fetchDistrictStateList() {
  try {
    const response = yield call(getDistrictStateList);
    // console.log(
    //   "state list data in District saga: ",
    //   JSON.stringify(response.data)
    // );
    yield put(getDistrictStateListSuccess(response.data));
  } catch (error) {
    yield put(getDistrictStateListFail(error));
  }
}

function* onAddDistrict({ payload: district }) {
  try {
    const response = yield call(addDistrict, district);
    console.log(" New District in saga: ", response);
    yield put(addDistrictSuccess(response));

    yield put(fetchDistricts());
  } catch (error) {
    console.log("Error in add new district: ", error);
    yield put(addDistrictFail(error));
  }
}

function* onUpdateDistrict({ payload: district }) {
  // console.
  try {
    const response = yield call(updateDistrict, district.id, district);
    console.log("Response data in saga: ", response);
    yield put(updateDistrictSuccess(response.data));

    yield put(fetchDistricts());
  } catch (error) {
    console.log("Error in update district: ", error);
    yield put(updateDistrictFail(error));
  }
}

function* districtSaga() {
  yield takeEvery(GET_DISTRICT, fetchDistrict);
  yield takeEvery(ADD_DISTRICT, onAddDistrict);
  yield takeEvery(
    GET_ADMINISTRATIVEDIVISION_STATUS,
    fetchAdministrativeDivisionStatus
  );
  yield takeEvery(GET_DISTRICT_STATELIST, fetchDistrictStateList);
  yield takeEvery(UPDATE_DISTRICT, onUpdateDistrict);
}

export default districtSaga;
