import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_DESIGNATION,
  ADD_NEW_DESIGNATION,
  GET_DESIGNATION_STATUS,
  GET_DESIGNATION_TYPE,
  GET_DESIGNATION_PARENT,
} from "./actionTypes";

import {
  getDesignationSuccess,
  getDesignationFail,
  addDesignationSuccess,
  addDesignationFail,
  getDesignationStatusFail,
  getDesignationStatusSuccess,
  getDesignationTypeFail,
  getDesignationTypeSuccess,
  getDesignationParentFail,
  getDesignationParentSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getDesignation,
  addNewDesignation,
  getDesignationStatus,
  getDesignationType,
  getDesignationParent,

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
          ? "Staff"
          : designation.type === 1
            ? "Management User"
            : designation.type === 2
              ? "Engineer"
              : designation.type === 3
                ? "customer care"
                : designation.type === 4
                  ? "Collection"
                  : "LCO",
      status:
        designation.status === 1
          ? "ACTIVE"
          : district.status === 2
            ? "INACTIVE"
            : "BLOCKED",
      type_lbl: designation.type_lbl,
      created_at: designation.created_at,
      created_by: designation.created_by,
    };
  });
};

function* fetchDesignation() {
  try {
    const response = yield call(getDesignation);
    console.log("Designation response:" + JSON.stringify(response));
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getDesignationSuccess(response.data));
  } catch (error) {
    yield put(getDesignationFail(error));
  }
}

function* fetchDesignationStatus() {
  try {
    const response = yield call(getDesignationStatus);
    console.log("designation status response:" + JSON.stringify(response));
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getDesignationStatusSuccess(response.data));
  } catch (error) {
    yield put(getDesignationStatusFail(error));
  }
}

function* fetchDesignationType() {
  try {
    const response = yield call(getDesignationType);
    console.log("response:" + JSON.stringify(response));
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getDesignationTypeSuccess(response.data));
  } catch (error) {
    yield put(getDesignationTypeFail(error));
  }
}

function* fetchDesignationParent() {
  try {
    const response = yield call(getDesignationParent);
    console.log("response:" + JSON.stringify(response));
    // const designation = convertDesigsnationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getDesignationParentSuccess(response.data));
  } catch (error) {
    yield put(getDesignationParentFail(error));
  }
}

function* onAddNewDesignation({ payload: designation }) {
  try {
    const response = yield call(addNewDesignation, designation);

    yield put(addDesignationSuccess(response.data));
    toast.success("Designation Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addDesignationFail(error));
    toast.error("Designation Added Failed", { autoClose: 2000 });
  }
}

function* designationSaga() {
  yield takeEvery(GET_DESIGNATION, fetchDesignation);
  yield takeEvery(ADD_NEW_DESIGNATION, onAddNewDesignation);
  yield takeEvery(GET_DESIGNATION_STATUS, fetchDesignationStatus);
  yield takeEvery(GET_DESIGNATION_TYPE, fetchDesignationType);
  yield takeEvery(GET_DESIGNATION_PARENT, fetchDesignationParent);
}

export default designationSaga;
