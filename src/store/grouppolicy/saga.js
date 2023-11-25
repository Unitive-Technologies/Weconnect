import { call, put, takeEvery } from "redux-saga/effects";

import { GET_GROUPPOLICY } from "./actionTypes";

import { getGroupPolicySuccess, getGroupPolicyFail } from "./actions";

//Include Both Helper File with needed methods
import { getCustomerUsers as getGroupPolicy } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertGroupPolicyListObject = (groupPolicyList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return groupPolicyList.map((groupPolicy) => {
    console.log("groupPolicy:" + JSON.stringify(groupPolicy));
    return {
      ...groupPolicy,
      id: groupPolicy.id,
      name: groupPolicy.user_id,
      type: groupPolicy.type,
      role: groupPolicy.role,
      description: groupPolicy.description,
      count: groupPolicy.user_count,
      created_at: groupPolicy.created_at,
      created_by: groupPolicy.created_by,
    };
  });
};

function* fetchGroupPolicy() {
  try {
    const response = yield call(getGroupPolicy);
    console.log("response:" + JSON.stringify(response));
    const groupPolicyList = convertGroupPolicyListObject(response.data);
    yield put(getGroupPolicySuccess(groupPolicyList));
  } catch (error) {
    yield put(getGroupPolicyFail(error));
  }
}

function* groupPolicySaga() {
  yield takeEvery(GET_GROUPPOLICY, fetchGroupPolicy);
}

export default groupPolicySaga;
