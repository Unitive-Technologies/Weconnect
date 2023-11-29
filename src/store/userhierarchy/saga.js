import { call, put, takeEvery } from "redux-saga/effects";

import { GET_USERHIERARCHY } from "./actionTypes";

import { getUserHierarchySuccess, getUserHierarchyFail } from "./actions";

//Include Both Helper File with needed methods
import { getUserHierarchy } from "../../helpers/fakebackend_helper";

const convertUserHierarchyListObject = (userHierarchyList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return userHierarchyList.map((userHierarchy) => {
    return {
      ...userHierarchy,
      id: userHierarchy.id,
      name: userHierarchy.name,
      code: userHierarchy.code,
      email: userHierarchy.email,
      description: userHierarchy.description,
      parent: userHierarchy.parent,
      designation: userHierarchy.designation,
      created_at: userHierarchy.created_at,
      created_by: userHierarchy.created_by,
      operationcount: userHierarchy.operationcount,
      status:
        userHierarchy.status === 1
          ? "ACTIVE"
          : userHierarchy.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchUserHierarchy() {
  try {
    const response = yield call(getUserHierarchy);
    console.log("response:" + JSON.stringify(response));
    const userHierarchyList = convertUserHierarchyListObject(response);
    yield put(getUserHierarchySuccess(userHierarchyList));
  } catch (error) {
    yield put(getUserHierarchyFail(error));
  }
}

function* userHierarchySaga() {
  yield takeEvery(GET_USERHIERARCHY, fetchUserHierarchy);
}

export default userHierarchySaga;
