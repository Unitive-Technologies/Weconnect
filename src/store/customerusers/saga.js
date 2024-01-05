import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CUSTOMERUSERS, UPDATE_CUSTOMERUSER } from "./actionTypes";

import {
  getCustomerUsersSuccess,
  getCustomerUsersFail,
  updateCustomerUserFail,
  updateCustomerUserSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCustomerUsers,
  updateCustomerUser,
} from "../../helpers/fakebackend_helper";

const convertCustomerUsersListObject = (customerUserList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  // const customerUserData = customerUserList.data || [];
  // console.log("CustomerData: " + JSON.stringify(customerUserData));
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
    // const customerUserList = convertCustomerUsersListObject(response.data);
    yield put(getCustomerUsersSuccess(response.data));
  } catch (error) {
    yield put(getCustomerUsersFail(error));
  }
}

function* onUpdateCustomerUser({ payload: customerUser }) {
  console.log("customerUser in onUpdate:" + JSON.stringify(customerUser));
  try {
    const response = yield call(
      updateCustomerUser,
      customerUser,
      customerUser.id
    );
    yield put(updateCustomerUserSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    // toast.success("CustomerUser Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateCustomerUserFail(error));
    toast.error("CustomerUser Updated Failed", { autoClose: 2000 });
  }
}

function* customerUsersSaga() {
  yield takeEvery(GET_CUSTOMERUSERS, fetchCustomerUsers);
  yield takeEvery(UPDATE_CUSTOMERUSER, onUpdateCustomerUser);
}

export default customerUsersSaga;
