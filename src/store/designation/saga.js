import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DESIGNATION, ADD_NEW_DESIGNATION } from "./actionTypes";

import {
  getDesignationSuccess,
  getDesignationFail,
  addDesignationSuccess,
  addDesignationFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getDesignation,
  addNewDesignation,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

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
    const designation = convertDesignationListObject(response);
    yield put(getDesignationSuccess(designation));
  } catch (error) {
    yield put(getDesignationFail(error));
  }
}

function* onAddNewDesignation({ payload: designation }) {
  try {
    const response = yield call(addNewDesignation, designation);

    yield put(addDesignationSuccess(response));
    toast.success("Designation Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addDesignationFail(error));
    toast.error("Designation Added Failed", { autoClose: 2000 });
  }
}

function* designationSaga() {
  yield takeEvery(GET_DESIGNATION, fetchDesignation);
  yield takeEvery(ADD_NEW_DESIGNATION, onAddNewDesignation);
}

export default designationSaga;
