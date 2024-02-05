import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_REGIONALOFFICE,
  GET_REGIONAL_ALLOTTEDBOUQUET,
  ADD_NEW_REGIONALOFFICE,
  UPDATE_REGIONALOFFICE,
} from "./actionTypes";

import {
  getRegionalOffice as fetchregionaloffices,
  getRegionalOfficeSuccess,
  getRegionalOfficeFail,
  getRegionalAllottedBouquetSuccess,
  getRegionalAllottedBouquetFail,
  addRegionalOfficeFail,
  addRegionalOfficeSuccess,
  updateRegionalOfficeSuccess,
  updateRegionalOfficeFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getRegionalOffices,
  updateRegionalOffice,
  addNewRegionalOffice,
  getRegionalAllottedBouquet,
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

export const getRegionalOfficeStore = (state) => state.regionaloffice;
export const getRegionalBouquetStore = (state) => state.regionalBouquet;

function* fetchRegionalOffice() {
  try {
    let regionalOfficeStore = yield select(getRegionalOfficeStore);

    const pageSize = regionalOfficeStore.pageSize;
    const currentPage = regionalOfficeStore.currentPage;

    const response = yield call(getRegionalOffices, currentPage, pageSize);
    // console.log("Response from API -", response);
    // debugger;
    yield put(getRegionalOfficeSuccess(response));
  } catch (error) {
    console.error("Error fetching Users list:", error);
    yield put(getRegionalOfficeFail(error));
  }
}

function* fetchRegionalAllottedBouquets() {
  try {
    const response = yield call(getRegionalAllottedBouquet);
    console.log("response:" + JSON.stringify(response));
    // const scheduleCustomerNotificationList = convertScheduleCustomerNotificationListObject(response);
    // yield put(getScheduleCustomerNotificationSuccess(scheduleCustomerNotificationList));
    yield put(getRegionalAllottedBouquetSuccess(response.data));
  } catch (error) {
    console.error("Error fetching Bouquets list:", error);
    yield put(getRegionalAllottedBouquetFail(error));
  }
}
function* onAddNewRegionalOffice({ payload: regionalofficeList }) {
  try {
    const response = yield call(addNewRegionalOffice, regionalofficeList);

    yield put(addRegionalOfficeSuccess(response));
    yield put(fetchregionaloffices());
    // toast.success("Regional Office Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addRegionalOfficeFail(error));
    // toast.error("Regional Office Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateRegionalOffice({ payload: regionaloffice }) {
  try {
    const response = yield call(
      updateRegionalOffice,
      regionaloffice,
      regionaloffice.id
    );
    yield put(updateRegionalOfficeSuccess(response));
    yield put(fetchregionaloffices());
  } catch (error) {
    yield put(updateRegionalOfficeFail(error));
    toast.error("Regional Office Updated Failed", { autoClose: 2000 });
  }
}

function* regionalOfficeSaga() {
  yield takeEvery(GET_REGIONALOFFICE, fetchRegionalOffice);
  yield takeEvery(ADD_NEW_REGIONALOFFICE, onAddNewRegionalOffice);
  yield takeEvery(UPDATE_REGIONALOFFICE, onUpdateRegionalOffice);
  yield takeEvery(GET_REGIONAL_ALLOTTEDBOUQUET, fetchRegionalAllottedBouquets);
}

export default regionalOfficeSaga;
