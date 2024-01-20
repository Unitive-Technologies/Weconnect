import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_STATEUSERS } from "./actionTypes";

import { getStateUsersSuccess, getStateUsersFail } from "./actions";

//Include Both Helper File with needed methods
import { getStateUsers } from "../../helpers/fakebackend_helper";

export const getStateUsersStore = (state) => state.stateUsers;

function* fetchStateUsers() {
  try {
    let StateUsersStore = yield select(getStateUsersStore);

    const pageSize = StateUsersStore.pageSize;
    const currentPage = StateUsersStore.currentPage;

    const response = yield call(getStateUsers, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getStateUsersSuccess(response));
  } catch (error) {
    console.error("Error fetching State Users:", error);
    yield put(getStateUsersFail(error));
  }
}

// function* fetchStateUsers() {
//   try {
//     const response = yield call(getStateUsers);
//     console.log("response:" + JSON.stringify(response));
//     // const stateUserList = convertStateUsersListObject(response);
//     yield put(getStateUsersSuccess(response.data));
//   } catch (error) {
//     yield put(getStateUsersFail(error));
//   }
// }

function* stateUsersSaga() {
  yield takeEvery(GET_STATEUSERS, fetchStateUsers);
}

export default stateUsersSaga;
