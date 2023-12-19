import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BROADCASTER, ADD_NEW_BROADCASTER } from "./actionTypes";

import {
  getBroadCasterSuccess,
  getBroadCasterFail,
  addBroadCasterSuccess,
  addBroadCasterFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getBroadCasters,
  addNewBroadCaster,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertBroadCasterListObject = (broadCasterList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return broadCasterList.map((broadCaster) => {
    return {
      ...broadCaster,
      id: broadCaster.id,
      name: broadCaster.name,
      fullname: broadCaster.fullname,
      address: broadCaster.address,
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
      created_by: broadCaster.created_by,
    };
  });
};

function* fetchBroadCasters() {
  try {
    const response = yield call(getBroadCasters);
    console.log("response:" + JSON.stringify(response));
    const broadCasterList = convertBroadCasterListObject(response.data);
    yield put(getBroadCasterSuccess(broadCasterList));
  } catch (error) {
    yield put(getBroadCasterFail(error));
  }
}

function* onAddNewBroadCaster({ payload: broadCaster }) {
  try {
    const response = yield call(addNewBroadCaster, broadCaster);

    yield put(addBroadCasterSuccess(response));
    toast.success("BroadCaster Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addBroadCasterFail(error));
    toast.error("BroadCaster Added Failed", { autoClose: 2000 });
  }
}

function* broadCasterSaga() {
  yield takeEvery(GET_BROADCASTER, fetchBroadCasters);
  yield takeEvery(ADD_NEW_BROADCASTER, onAddNewBroadCaster);
}

export default broadCasterSaga;
