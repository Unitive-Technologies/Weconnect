import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DISTRICT, ADD_DISTRICT } from "./actionTypes";

import {
  getDistrictSuccess,
  getDistrictFail,
  addDistrictSuccess,
  addDistrictFail,
} from "./actions";
import { getDistrict, addDistrict } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

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
        district.status === 11
          ? "ACTIVE"
          : district.status === 12
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
    // const districtList = convertDistrictListObject(response);
    yield put(getDistrictSuccess(response.data));
  } catch (error) {
    yield put(getDistrictFail(error));
  }
}

function* onAddDistrict({ payload: district }) {
  try {
    const response = yield call(addDistrict, district);
    yield put(addDistrictSuccess(response));
    toast.success("District list Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addDistrictFail(error));
    toast.error("District list Added Failed", { autoClose: 2000 });
  }
}

function* districtSaga() {
  yield takeEvery(GET_DISTRICT, fetchDistrict);
  yield takeEvery(ADD_DISTRICT, onAddDistrict);
}

export default districtSaga;
