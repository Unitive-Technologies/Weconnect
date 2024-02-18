import { call, put, takeEvery, select } from "redux-saga/effects";

import {
  GET_CUSTOMERUSERS,
  UPDATE_CUSTOMERUSER,
  GET_CUSTOMERUSERS_SETTINGS,
} from "./actionTypes";

import {
  getCustomerUsers as fetchCusUsers,
  getCustomerUsersSuccess,
  getCustomerUsersFail,
  updateCustomerUserFail,
  updateCustomerUserSuccess,
  getCustomerUsersSettingsSuccess,
  getCustomerUsersSettingsFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCustomerUsers,
  updateCustomerUser,
  getCustomerUsersSettings,
} from "../../helpers/backend_helper";

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

export const getCustomerUsersStore = (state) => state.customerUsers;

function* fetchCustomerUsers() {
  try {
    let customerUsersStore = yield select(getCustomerUsersStore);

    const pageSize = customerUsersStore.pageSize;
    const currentPage = customerUsersStore.currentPage;

    const response = yield call(getCustomerUsers, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getCustomerUsersSuccess(response));
  } catch (error) {
    console.error("Error fetching CustomerUsers list:", error);
    yield put(getCustomerUsersFail(error));
  }
}

// function* fetchCustomerUsers() {
//   try {
//     const response = yield call(getCustomerUsers);
//     console.log("response:" + JSON.stringify(response));
//     // const customerUserList = convertCustomerUsersListObject(response.data);
//     yield put(getCustomerUsersSuccess(response.data));
//   } catch (error) {
//     yield put(getCustomerUsersFail(error));
//   }
// }

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
    yield put(fetchCusUsers());
    // toast.success("CustomerUser Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateCustomerUserFail(error));
    // toast.error("CustomerUser Updated Failed", { autoClose: 2000 });
  }
}

function* fetchCustomerUsersSettings() {
  try {
    const response = yield call(getCustomerUsersSettings);
    console.log("CusUser Setting response:" + JSON.stringify(response));
    // const customerUserList = convertCustomerUsersListObject(response.data);
    yield put(getCustomerUsersSettingsSuccess(response.data));
  } catch (error) {
    yield put(getCustomerUsersSettingsFail(error));
  }
}

function* customerUsersSaga() {
  yield takeEvery(GET_CUSTOMERUSERS, fetchCustomerUsers);
  yield takeEvery(UPDATE_CUSTOMERUSER, onUpdateCustomerUser);
  yield takeEvery(GET_CUSTOMERUSERS_SETTINGS, fetchCustomerUsersSettings);
}

export default customerUsersSaga;
