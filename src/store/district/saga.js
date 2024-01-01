import { call, put, takeEvery } from "redux-saga/effects";

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

const convertDistrictListObject = (districtList) => {
  // customer district list has more data than what we need, we need to convert each of the district object in the list with needed colums of the table
  return districtList.map((district) => {
    return {
      ...district,
      id: district.id,
      name: district.name,
      code: district.code,
      state_lbl: district.state_lbl,
      created_by_lbl: district.created_by_lbl,
      state_code_lbl: district.state_code_lbl,
      description: district.description,
      status: district.status,
      created_at: district.created_at,
      type: district.type,
      state_id: district.state_id,
    };
  });
};

function* fetchDistrict() {
  try {
    const response = yield call(getDistrict);
    // console.log("response:" + JSON.stringify(response.data));
    const districtList = convertDistrictListObject(response.data);
    yield put(getDistrictSuccess(response.data));
  } catch (error) {
    yield put(getDistrictFail(error));
  }
}

function* fetchAdministrativeDivisionStatus() {
  try {
    const response = yield call(getAdministrativeDivisionStatus);
    // console.log(
    //   "status list data in District saga: ",
    //   JSON.stringify(response.data)
    // );
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
    console.log(" New District in saga: ", response.data);
    yield put(addDistrictSuccess(response.data));
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
