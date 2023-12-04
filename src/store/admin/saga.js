import { call, put, takeEvery } from "redux-saga/effects";

import { GET_ADMINDETAILS } from "./actionTypes";

import { getAdmindetailsSuccess, getAdmindetailsFail } from "./actions";

//Include Both Helper File with needed methods
import { getAdmindetails } from "../../helpers/fakebackend_helper";

const convertAdmindetailsObject = (admindetails) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return admindetails.map((admin) => {
    return {
      ...admin,
      id: admin.id,
      name: admin.name,
      code: admin.code,
      broadcaster: admin.broadcaster_lbl,
      genre: admin.genre_lbl,
      language: admin.language_lbl,
      type: admin.channel_type_lbl,
      alacarte: admin.isAlacarte_lbl,
      FTA: admin.isFta_lbl,
      NCF: admin.isNCF_lbl,
      cascode: admin.casCodes.length > 0 ? admin.casCodes[0].cas_lbl : "",

      status:
        admin.status === 1
          ? "ACTIVE"
          : admin.status === 0
          ? "INACTIVE"
          : "BLOCKED",
      rate: admin.broadcasterRate,
      created_at: admin.created_at,
      created_by: admin.created_by_lbl,
    };
  });
};

function* fetchChannelList() {
  try {
    const response = yield call(getChannelList);
    console.log("response:" + JSON.stringify(response));
    const channelList = convertAdmindetailsObject(response);
    yield put(getChannelListSuccess(channelList));
  } catch (error) {
    yield put(getChannelListFail(error));
  }
}

function* channelListSaga() {
  yield takeEvery(GET_ADMINDETAILS, fetchChannelList);
}

export default channelListSaga;
