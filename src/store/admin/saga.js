import { put, takeEvery } from "redux-saga/effects";

import { GET_ADMINDETAILS } from "./actionTypes";

import { getAdmindetailsSuccess, getAdmindetailsFail } from "./actions";

const convertAdmindetailsObject = (admindetails) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return admindetails.map((admin) => {
    return {
      ...admin,
      mobile: admin.mobile_no,
      type: admin.type_label,
      lastlogin: last_login_at,
    };
  });
};

function* fetchAdmindetails() {
  try {
    // Get value for the key 'authUser' from localstorage
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    console.log("authUser:" + JSON.stringify(authUser));

    const admindetails = convertAdmindetailsObject(authUser);
    yield put(getAdmindetailsSuccess(admindetails));
  } catch (error) {
    yield put(getAdmindetailsFail(error));
  }
}

function* admindetailsSaga() {
  yield takeEvery(GET_ADMINDETAILS, fetchAdmindetails);
}

export default admindetailsSaga;
