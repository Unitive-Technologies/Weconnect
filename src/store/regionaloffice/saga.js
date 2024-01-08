import { call, put, select, take, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";

import {
  GET_REGIONALOFFICE,
  ADD_NEW_REGIONALOFFICE,
  UPDATE_REGIONALOFFICE,
  SET_CURRENT_PAGE,
} from "./actionTypes";

import {
  getRegionalOfficeSuccess,
  getRegionalOfficeFail,
  addRegionalOfficeFail,
  addRegionalOfficeSuccess,
  updateRegionalOfficeSuccess,
  updateRegionalOfficeFail,
  setCurrentPageAction
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

function* fetchRegionalOffice(action) {
  try {
    // const { perPage, currentPage } = yield select(state => state.regionaloffice);

    const { currentPage, perPage } = action.payload;

    console.log("In saga from selector - ", currentPage, perPage);
    const response = yield call(getRegionalOffice, currentPage, perPage);
    // const regionalofficeList = convertRegionalOfficeListObject(response);
    yield put(getRegionalOfficeSuccess(response));
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

function* onSetCurrentPage({payload: currentPage}) {
  yield put(setCurrentPageAction(currentPage));
  try {
    const { perPage, pageCount } = yield select(state => state.regionaloffice);

    if (!pageCount || pageCount < currentPage || currentPage < 1 ) {
      toast.error("Could not navigate further", {autoClose: 2000});
      return;
    }
    console.log("In current page update saga - ", currentPage, perPage);
    const response = yield call(getRegionalOffice, currentPage, perPage);
    // const regionalofficeList = convertRegionalOfficeListObject(response);
    yield put(getRegionalOfficeSuccess(response));
  } catch (error) {
    console.error("Error fetching Regional office list:", error);
    yield put(getRegionalOfficeFail(error));
  }
}

function* regionalOfficeSaga() {
  yield takeLeading(GET_REGIONALOFFICE, fetchRegionalOffice);
  yield takeEvery(ADD_NEW_REGIONALOFFICE, onAddNewRegionalOffice);
  yield takeEvery(UPDATE_REGIONALOFFICE, onUpdateRegionalOffice);
  yield takeEvery(SET_CURRENT_PAGE, onSetCurrentPage);
}

export default regionalOfficeSaga;
