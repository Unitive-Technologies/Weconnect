import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_CUSTOMERUSERS,
} from "./actionTypes";

import {
  getCustomerUsersSuccess,
  getCustomerUsersFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCustomerUsers,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetchCustomerUsers() {
  try {
    const response = yield call(getCustomerUsers);
    console.log("response:" + JSON.stringify(response));
    yield put(getCustomerUsersSuccess(response.data));
  } catch (error) {
    yield put(getCustomerUsersFail(error));
  }
}

function* customerUsersSaga() {
  yield takeEvery(GET_CUSTOMERUSERS, fetchCustomerUsers);
}

export default customerUsersSaga;
