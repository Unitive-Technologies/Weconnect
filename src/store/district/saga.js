import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DISTRICT } from "./actionTypes";

import { getDistrictSuccess, getDistrictFail } from "./actions";

//Include Both Helper File with needed methods
import { getDistrict } from "../../helpers/fakebackend_helper";

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
          : district.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      created_at: district.created_at,

    };
  });
};

function* fetchDistrict() {
  try {
    const response = yield call(getDistrict);
    console.log("response:" + JSON.stringify(response));
    const districtList = convertDistrictListObject(response);
    yield put(getDistrictSuccess(districtList));
  } catch (error) {
    yield put(getDistrictFail(error));
  }
}

function* districtSaga() {
  yield takeEvery(GET_DISTRICT, fetchDistrict);
}

export default districtSaga;