import { call, put, takeEvery } from "redux-saga/effects";

import { GET_REGIONALOFFICE } from "./actionTypes";

import { getRegionalOfficeSuccess, getRegionalOfficeFail } from "./actions";

//Include Both Helper File with needed methods
import { getRegionalOffice } from "../../helpers/fakebackend_helper";

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
      created_by: regionaloffice.created_by,
      city_lbl: regionaloffice.city_lbl,
      gstno: regionaloffice.gstno,
      panno: regionaloffice.panno,
      username: regionaloffice.username,
      status:
        notificationTemplate.status === 1
          ? "ACTIVE"
          : notificationTemplate.status === 0
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

function* regionalOfficeSaga() {
  yield takeEvery(GET_REGIONALOFFICE, fetchRegionalOffice);
}

export default regionalOfficeSaga;
