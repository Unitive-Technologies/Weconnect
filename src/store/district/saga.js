import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_DISTRICT,
  ADD_DISTRICT,
  GET_DISTRICT_STATUS,
  GET_DISTRICT_STATELIST,
} from "./actionTypes";

import {
  getDistrictSuccess,
  getDistrictFail,
  addDistrictSuccess,
  addDistrictFail,
  getDistrictStatusSuccess,
  getDistrictStatusFail,
  getDistrictStateListSuccess,
  getDistrictStateListFail,
} from "./actions";
import {
  getDistrict,
  addDistrict,
  getDistrictStateList,
  getDistrictStatus,
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
      status:
        district.status === 1
          ? "ACTIVE"
          : district.status === 2
          ? "INACTIVE"
          : "BLOCKED",
      created_at: district.created_at,
    };
  });
};

function* fetchDistrict() {
  try {
    const response = yield call(getDistrict);
    console.log("response:" + JSON.stringify(response.data));
    const districtList = convertDistrictListObject(response.data);
    yield put(getDistrictSuccess(districtList));
  } catch (error) {
    yield put(getDistrictFail(error));
  }
}

function* fetchDistrictStatus() {
  try {
    const response = yield call(getDistrictStatus);
    console.log(
      "status list data in District saga: ",
      JSON.stringify(response.data)
    );
    yield put(getDistrictStatusSuccess(response.data));
  } catch (error) {
    yield put(getDistrictStatusFail(error));
  }
}

function* fetchDistrictStateList() {
  try {
    const response = yield call(getDistrictStateList);
    console.log(
      "state list data in District saga: ",
      JSON.stringify(response.data)
    );
    yield put(getDistrictStateListSuccess(response.data));
  } catch (error) {
    yield put(getDistrictStateListFail(error));
  }
}

function* onAddDistrict({ payload: district }) {
  try {
    const response = yield call(addDistrict, district);
    console.log(" New District: ", response.data);
    yield put(addDistrictSuccess(response.data));
  } catch (error) {
    yield put(addDistrictFail(error));
  }
}

function* districtSaga() {
  yield takeEvery(GET_DISTRICT, fetchDistrict);
  yield takeEvery(ADD_DISTRICT, onAddDistrict);
  yield takeEvery(GET_DISTRICT_STATUS, fetchDistrictStatus);
  yield takeEvery(GET_DISTRICT_STATELIST, fetchDistrictStateList);
}

export default districtSaga;
