import { call, put, takeEvery } from "redux-saga/effects";

import { GET_ADMINDETAILS } from "./actionTypes";

import { getAdmindetailsSuccess, getAdmindetailsFail } from "./actions";

//Include Both Helper File with needed methods
import { getAdmindetails } from "../../helpers/fakebackend_helper";

const convertAdmindetailsObject = (admindetails) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return admindetails.map((admin) => {
    return {
      ...admin,
      id: admin.id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      mobile: admin.mobile_no,
      type: admin.type_label,
      lastlogin: last_login_at,
    };
  });
};

function* fetchAdmindetails() {
  try {
    const response = yield call(getAdmindetails);
    console.log("response:" + JSON.stringify(response));
    const admindetails = convertAdmindetailsObject(response);
    yield put(getAdmindetailsSuccess(admindetails));
  } catch (error) {
    yield put(getAdmindetailsFail(error));
  }
}

function* admindetailsSaga() {
  yield takeEvery(GET_ADMINDETAILS, fetchAdmindetails);
}

export default admindetailsSaga;
