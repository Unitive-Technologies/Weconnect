import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CHANNELLIST, ADD_NEW_CHANNELLIST } from "./actionTypes";

import {
  getChannelListSuccess,
  getChannelListFail,
  addChannelListSuccess,
  addChannelListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getChannelList,
  addNewChannelList,
} from "../../helpers/fakebackend_helper";

const convertChannelListObject = (channelList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return channelList.map((channel) => {
    return {
      ...channel,
      id: channel.id,
      name: channel.name,
      code: channel.code,
      broadcaster: channel.broadcaster_lbl,
      genre: channel.genre_lbl,
      language: channel.language_lbl,
      type: channel.channel_type_lbl,
      alacarte: channel.isAlacarte_lbl,
      FTA: channel.isFta_lbl,
      NCF: channel.isNCF_lbl,
      cascode: channel.casCodes.length > 0 ? channel.casCodes[0].cas_lbl : "",

      status:
        channel.status === 1
          ? "ACTIVE"
          : channel.status === 0
          ? "INACTIVE"
          : "BLOCKED",
      rate: channel.broadcasterRate,
      created_at: channel.created_at,
      created_by: channel.created_by_lbl,
    };
  });
};

function* fetchChannelList() {
  try {
    const response = yield call(getChannelList);
    console.log("response:" + JSON.stringify(response));
    // const channelList = convertChannelListObject(response);
    yield put(getChannelListSuccess(response.data));
  } catch (error) {
    yield put(getChannelListFail(error));
  }
}

function* onAddNewChannelList({ payload: channelList }) {
  try {
    const response = yield call(addNewChannelList, channelList);
    yield put(addChannelListSuccess(response));
    toast.success("ChannelList Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addChannelListFail(error));
    toast.error("Channel List Added Failed", { autoClose: 2000 });
  }
}

function* channelListSaga() {
  yield takeEvery(GET_CHANNELLIST, fetchChannelList);
  yield takeEvery(ADD_NEW_CHANNELLIST, onAddNewChannelList);
}

export default channelListSaga;
