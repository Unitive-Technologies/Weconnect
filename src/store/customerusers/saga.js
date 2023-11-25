import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CUSTOMERUSERS } from "./actionTypes";

import { getCustomerUsersSuccess, getCustomerUsersFail } from "./actions";

//Include Both Helper File with needed methods
import { getCustomerUsers } from "../../helpers/fakebackend_helper";

const convertCustomerUsersListObject = (customerUserList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return customerUserList.map((customerUser) => {
    return {
      ...customerUser,
      id: customerUser.id,
      name: customerUser.name,
      login_id: customerUser.username,
      mobile_no: customerUser.mobile_no,
      email: customerUser.email,
      status:
        customerUser.status === 1
          ? "ACTIVE"
          : customerUser.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      lco: customerUser.operator_lbl,
      lco_code: customerUser.operator.code,
      last_login_at: customerUser.last_login_ats
        ? customerUser.last_login_at
        : "NEVER LOGGED IN",

      created_at: customerUser.created_at,
    };
  });
};

function* fetchCustomerUsers() {
  try {
    const response = yield call(getCustomerUsers);
    console.log("response:" + JSON.stringify(response));
    const customerUserList = convertCustomerUsersListObject(response.data);
    yield put(getCustomerUsersSuccess(customerUserList));
  } catch (error) {
    yield put(getCustomerUsersFail(error));
  }
}

function* customerUsersSaga() {
  yield takeEvery(GET_CUSTOMERUSERS, fetchCustomerUsers);
}

export default customerUsersSaga;
