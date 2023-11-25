import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DESIGNATION } from "./actionTypes";

import { getDesignationSuccess, getDesignationFail } from "./actions";

//Include Both Helper File with needed methods
import { getDesignation } from "../../helpers/fakebackend_helper";

const convertDesignationListObject = (designationList) => {
  return designationList.map((designation) => {
    return {
      ...designation,
      id: designation.id,
      name: designation.name,
      code: designation.code,
      parent: designation.parent_id,
      description: designation.description,
      type:
        designation.type === 0
          ? "MSO"
          : designation.type === 1
            ? "RO"
            : designation.type === 2
              ? "DISTRIBUTOR"
              : "LCO",
      status:
        designation.status === 1
          ? "ACTIVE"
          : designation.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      created_at: designation.created_at,
      created_by: designation.created_by,
    };
  });
};

function* fetchDesignation() {
  try {
    const response = yield call(getDesignation);
    console.log("response:" + JSON.stringify(response));
    const designation = convertDesignationListObject(response.data);
    yield put(getDesignationSuccess(designation));
  } catch (error) {
    yield put(getDesignationFail(error));
  }
}

function* designationSaga() {
  yield takeEvery(GET_DESIGNATION, fetchDesignation);
}

export default designationSaga;
