import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_GROUPPOLICY,
  ADD_NEW_GROUPPOLICY,
  GET_POLICY_TYPE,
  GET_POLICY_ROLE,
} from "./actionTypes";

import {
  getGroupPolicySuccess,
  getGroupPolicyFail,
  addGroupPolicyFail,
  addGroupPolicySuccess,
  getPolicyTypeFail,
  getPolicyTypeSuccess,
  getPolicyRoleFail,
  getPolicyRoleSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getGroupPolicy,
  addNewGroupPolicy,
  getPolicyType,
  getPolicyRole,
} from "../../helpers/backend_helper";

const convertGroupPolicyListObject = (groupPolicyList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return groupPolicyList.map((groupPolicy) => {
    console.log("groupPolicy:" + JSON.stringify(groupPolicy));
    return {
      ...groupPolicy,
      id: groupPolicy.id,
      name: groupPolicy.user_id,
      type:
        groupPolicy.user_type === 0
          ? "MSO"
          : groupPolicy.user_type === 1
          ? "RO"
          : groupPolicy.user_type === 2
          ? "DISTRIBUTOR"
          : "LCO",
      role:
        groupPolicy.role === 1
          ? "Administrator"
          : groupPolicy.role === 2
          ? "Staff"
          : "User",
      description: groupPolicy.description,
      count: groupPolicy.user_count,
      created_at: groupPolicy.insert_timestamp,
      created_by: groupPolicy.inserted_by,
    };
  });
};

function* fetchGroupPolicy() {
  try {
    const response = yield call(getGroupPolicy);
    console.log("response:" + JSON.stringify(response));
    // const groupPolicyList = convertGroupPolicyListObject(response);
    // yield put(getGroupPolicySuccess(groupPolicyList));
    yield put(getGroupPolicySuccess(response.data));
  } catch (error) {
    yield put(getGroupPolicyFail(error));
  }
}

function* fetchPolicyType() {
  try {
    const response = yield call(getPolicyType);
    // console.log("response:" + JSON.stringify(response));
    yield put(getPolicyTypeSuccess(response.data));
  } catch (error) {
    yield put(getPolicyTypeFail(error));
  }
}

function* fetchPolicyRole() {
  try {
    const response = yield call(getPolicyRole);
    // console.log("response:" + JSON.stringify(response));
    yield put(getPolicyRoleSuccess(response.data));
  } catch (error) {
    yield put(getPolicyRoleFail(error));
  }
}

function* onAddNewGroupPolicy({ payload: groupPolicy }) {
  try {
    const response = yield call(addNewGroupPolicy, groupPolicy);

    yield put(addGroupPolicySuccess(response));
    toast.success("Group Policy Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addGroupPolicyFail(error));
    toast.error("Group Policy Added Failed", { autoClose: 2000 });
  }
}

function* groupPolicySaga() {
  yield takeEvery(GET_GROUPPOLICY, fetchGroupPolicy);
  yield takeEvery(ADD_NEW_GROUPPOLICY, onAddNewGroupPolicy);
  yield takeEvery(GET_POLICY_TYPE, fetchPolicyType);
  yield takeEvery(GET_POLICY_ROLE, fetchPolicyRole);
}

export default groupPolicySaga;
