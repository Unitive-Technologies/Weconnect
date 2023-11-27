import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BROADCASTER } from "./actionTypes";

import { getBroadCasterSuccess, getBroadCasterFail } from "./actions";

//Include Both Helper File with needed methods
import { getBroadCasters } from "../../helpers/fakebackend_helper";

const convertBroadCasterListObject = (broadCasterList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return broadCasterList.map((broadCaster) => {
    return {
      ...broadCaster,
      id: broadCaster.id,
      name: broadCaster.name,
      fullname: broadCaster.fullname,
      address: broadCaster.addr,
      contactperson: broadCaster.contact_person,
      mobile: broadCaster.mobile_no,
      status:
        broadCaster.status === 1
          ? "ACTIVE"
          : broadCaster.status === 0
          ? "INACTIVE"
          : "BLOCKED",
      description: broadCaster.description,
      created_at: broadCaster.created_at,
      created_by: broadCaster.created_at,
    };
  });
};

function* fetchBroadCasters() {
  try {
    const response = yield call(getBroadCasters);
    console.log("response:" + JSON.stringify(response));
    const broadCasterList = convertBroadCasterListObject(response);
    yield put(getBroadCasterSuccess(broadCasterList));
  } catch (error) {
    yield put(getBroadCasterFail(error));
  }
}

function* broadCasterSaga() {
  yield takeEvery(GET_BROADCASTER, fetchBroadCasters);
}

export default broadCasterSaga;
