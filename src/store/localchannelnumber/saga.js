import { call, put, takeEvery } from "redux-saga/effects";

import { GET_LOCALCHANNELNUMBER } from "./actionTypes";

import {
  getLocalChannelNumberSuccess,
  getLocalChannelNumberFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getLocalChannelNumber } from "../../helpers/fakebackend_helper";

const convertLocalChannelNumberListObject = (localChannelNumberList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  // return localChannelNumberList.map((localChannelNumber) => {
  return localChannelNumberList.map((localChannelNumber) => {
    console.log("lcno. :" + JSON.stringify(localChannelNumber));
    return {
      ...localChannelNumber,
      id: localChannelNumber.id,
      channelname:
        localChannelNumber.channelname.name +
        " " +
        localChannelNumber.channelname.designation,
      genrename: localChannelNumber.genrename,
      localchannelnumber: localChannelNumber.localchannelnumber,
      rank: localChannelNumber.rank,
      createdat: localChannelNumber.createdat,
    };
  });
};

function* fetchLocalChannelNumber() {
  try {
    const response = yield call(getLocalChannelNumber);
    console.log("response:" + JSON.stringify(response));
    const localChannelNumberList =
      convertLocalChannelNumberListObject(response);
    yield put(getLocalChannelNumberSuccess(localChannelNumberList));
  } catch (error) {
    yield put(getLocalChannelNumberFail(error));
  }
}

function* localChannelNumberSaga() {
  yield takeEvery(GET_LOCALCHANNELNUMBER, fetchLocalChannelNumber);
}

export default localChannelNumberSaga;
