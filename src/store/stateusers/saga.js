import { call, put, takeEvery } from "redux-saga/effects";

import { GET_STATEUSERS } from "./actionTypes";

import { getStateUsersSuccess, getStateUsersFail } from "./actions";

//Include Both Helper File with needed methods
import { getStateUsers } from "../../helpers/fakebackend_helper";

const convertStateUsersListObject = (stateUserList) => {
  // state list has more data than what we need, we need to convert each of the state user object in the list with needed colums of the table
  return stateUserList.map((stateUser) => {
    return {
      ...stateUser,
      id: stateUser.id,
      name: stateUser.name,
      code: stateUser.code,
      status:
        stateUser.status === 1
          ? "ACTIVE"
          : stateUser.status === 0
          ? "INACTIVE"
          : "BLOCKED",

      created_at: stateUser.created_at,
    };
  });
};

function* fetchStateUsers() {
  try {
    const response = yield call(getStateUsers);
    console.log("response:" + JSON.stringify(response));
    // const stateUserList = convertStateUsersListObject(response);
    yield put(getStateUsersSuccess(response.data));
  } catch (error) {
    yield put(getStateUsersFail(error));
  }
}

function* stateUsersSaga() {
  yield takeEvery(GET_STATEUSERS, fetchStateUsers);
}

export default stateUsersSaga;
