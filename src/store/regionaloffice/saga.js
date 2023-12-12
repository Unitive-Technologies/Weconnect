import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_REGIONALOFFICE,
  ADD_NEW_REGIONALOFFICE,
  UPDATE_REGIONALOFFICE,
} from "./actionTypes";

import {
  getRegionalOfficeSuccess,
  getRegionalOfficeFail,
  addRegionalOfficeFail,
  addRegionalOfficeSuccess,
  updateRegionalOfficeSuccess,
  updateRegionalOfficeFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getRegionalOffice,
  addNewLco,
  updateRegionalOffice,
} from "../../helpers/fakebackend_helper";

const convertRegionalOfficeListObject = (regionalofficeList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return regionalofficeList.map((regionaloffice) => {
    return {
      ...regionaloffice,
      id: regionaloffice.id,
      name: regionaloffice.name,
      code: regionaloffice.code,
      contact_person: regionaloffice.contact_person,
      addr: regionaloffice.addr,
      mobile_no: regionaloffice.mobile_no,
      state_lbl: regionaloffice.state_lbl,
      district_lbl: regionaloffice.district_lbl,
      created_at: regionaloffice.created_at,
      created_by: regionaloffice.created_by_lbl,
      city_lbl: regionaloffice.city_lbl,
      gstno: regionaloffice.gstno,
      panno: regionaloffice.panno,
      username: regionaloffice.username,
      status:
        regionaloffice.status === 1
          ? "ACTIVE"
          : regionaloffice.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchRegionalOffice() {
  try {
    const response = yield call(getRegionalOffice);
    const regionalofficeList = convertRegionalOfficeListObject(response);
    yield put(getRegionalOfficeSuccess(regionalofficeList));
  } catch (error) {
    console.error("Error fetching Regional office list:", error);
    yield put(getRegionalOfficeFail(error));
  }
}

function* onAddNewRegionalOffice({ payload: regionalofficeList }) {
  try {
    const response = yield call(addNewLco, regionalofficeList);

    yield put(addRegionalOfficeSuccess(response));
    toast.success("Regional Office Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addRegionalOfficeFail(error));
    toast.error("Regional Office Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateRegionalOffice({ payload: regionaloffice }) {
  try {
    const response = yield call(updateRegionalOffice, regionaloffices);
    yield put(updateRegionalOfficeSuccess(response));
    toast.success("Regiional Office Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateRegionalOfficeFail(error));
    toast.error("Regional Office Updated Failed", { autoClose: 2000 });
  }
}

function* regionalOfficeSaga() {
  yield takeEvery(GET_REGIONALOFFICE, fetchRegionalOffice);
  yield takeEvery(ADD_NEW_REGIONALOFFICE, onAddNewRegionalOffice);
  yield takeEvery(UPDATE_REGIONALOFFICE, onUpdateRegionalOffice);
}

export default regionalOfficeSaga;
