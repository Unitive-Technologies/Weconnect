import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USER_TYPE,
  GET_USER_STATUS,
  GET_USER_ROLE,
  GET_USER_DESIGNATION,
  GET_USER_MSO_POLICY,
  GET_USER_REGIONALOFFICE,
  GET_USER_MSO_DETAILS,
  GET_USER_DISTRIBUTOR,
  GET_USER_LCO,
} from "./actionTypes";

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  getUserTypeFail,
  getUserTypeSuccess,
  getUserStatusFail,
  getUserStatusSuccess,
  getUserRoleFail,
  getUserRoleSuccess,
  getUserDesignationFail,
  getUserDesignationSuccess,
  getUserMsoPolicyFail,
  getUserMsoPolicySuccess,
  getUserRegionalOfficeFail,
  getUserRegionalOfficeSuccess,
  getUserMsoDetailsFail,
  getUserMsoDetailsSuccess,
  getUserDistributorFail,
  getUserDistributorSuccess,
  getUserLcoFail,
  getUserLcoSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser,
  getUserType,
  getUserStatus,
  getUserRole,
  getUserDesignation,
  getUserMsoPolicy,
  getUserRegionalOffice,
  getUserMsoDetails,
  getUserDistributor,
  getUserLco,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

function* fetchUsers() {
  try {
    const response = yield call(getUsers);
    console.log("response:" + JSON.stringify(response));
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* fetchUserType() {
  try {
    const response = yield call(getUserType);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserTypeSuccess(response.data));
  } catch (error) {
    yield put(getUserTypeFail(error));
  }
}

function* fetchUserStatus() {
  try {
    const response = yield call(getUserStatus);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserStatusSuccess(response.data));
  } catch (error) {
    yield put(getUserStatusFail(error));
  }
}

function* fetchUserRole() {
  try {
    const response = yield call(getUserRole);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserRoleSuccess(response.data));
  } catch (error) {
    yield put(getUserRoleFail(error));
  }
}

function* fetchUserDesignation() {
  try {
    const response = yield call(getUserDesignation);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserDesignationSuccess(response.data));
  } catch (error) {
    yield put(getUserDesignationFail(error));
  }
}

function* fetchUserMsoPolicy() {
  try {
    const response = yield call(getUserMsoPolicy);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserMsoPolicySuccess(response.data));
  } catch (error) {
    yield put(getUserMsoPolicyFail(error));
  }
}

function* fetchUserMsoDetails() {
  try {
    const response = yield call(getUserMsoDetails);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserMsoDetailsSuccess(response.data));
  } catch (error) {
    yield put(getUserMsoDetailsFail(error));
  }
}

function* fetchUserRegionalOffice() {
  try {
    const response = yield call(getUserRegionalOffice);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserRegionalOfficeSuccess(response.data));
  } catch (error) {
    yield put(getUserRegionalOfficeFail(error));
  }
}

function* fetchUserDistributor() {
  try {
    const response = yield call(getUserDistributor);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserDistributorSuccess(response.data));
  } catch (error) {
    yield put(getUserDistributorFail(error));
  }
}

function* fetchUserLco() {
  try {
    const response = yield call(getUserLco);
    // console.log("response:" + JSON.stringify(response));
    yield put(getUserLcoSuccess(response.data));
  } catch (error) {
    yield put(getUserLcoFail(error));
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile);
    yield put(getUserProfileSuccess(response));
  } catch (error) {
    yield put(getUserProfileFail(error));
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user);
    yield put(updateUserSuccess(response));
    toast.success("Contact Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateUserFail(error));
    toast.error("Contact Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user);
    yield put(deleteUserSuccess(response));
    toast.success("Contact Deleted Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteUserFail(error));
    toast.error("Contact Deleted Failed", { autoClose: 2000 });
  }
}

function* onAddNewUser({ payload: user }) {
  try {
    console.log("&&&&&&&user in payload:" + JSON.stringify(user));
    const response = yield call(addNewUser, user);

    yield put(addUserSuccess(response));
    toast.success("Contact Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addUserFail(error));
    toast.error("Contact Added Failed", { autoClose: 2000 });
  }
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
  yield takeEvery(GET_USER_TYPE, fetchUserType);
  yield takeEvery(GET_USER_STATUS, fetchUserStatus);
  yield takeEvery(GET_USER_ROLE, fetchUserRole);
  yield takeEvery(GET_USER_DESIGNATION, fetchUserDesignation);
  yield takeEvery(GET_USER_MSO_POLICY, fetchUserMsoPolicy);
  yield takeEvery(GET_USER_REGIONALOFFICE, fetchUserRegionalOffice);
  yield takeEvery(GET_USER_MSO_DETAILS, fetchUserMsoDetails);
  yield takeEvery(GET_USER_DISTRIBUTOR, fetchUserDistributor);
  yield takeEvery(GET_USER_LCO, fetchUserLco);
}

export default usersSaga;
