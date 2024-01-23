import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_CHANNELLIST,
  ADD_NEW_CHANNELLIST,
  GET_CAS_SOURCE,
} from "./actionTypes";

import {
  getCASSource,
  getCASSourceSuccess,
  getCASSourceFail,
  getChannelListSuccess,
  getChannelListFail,
  addChannelListSuccess,
  addChannelListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getChannelList,
  addNewChannelList,
  getCASSourceList,
} from "../../helpers/fakebackend_helper";

export const getChannelListStore = (state) => state.channelList;

function* fetchCASSource() {
  try {
    const response = yield call(getCASSourceList);
    console.log("Response from CAS Source API -", response);
    yield put(getCASSourceSuccess(response));
  } catch (error) {
    console.error("Error fetching CAS Source:", error);
    yield put(getCASSourceFail(error));
  }
}

function* fetchChannelList() {
  try {
    let ChannelListStore = yield select(getChannelListStore);

    const pageSize = ChannelListStore.pageSize;
    const currentPage = ChannelListStore.currentPage;

    const response = yield call(getChannelList, currentPage, pageSize);
    console.log("Response from API -", response);
    yield put(getChannelListSuccess(response));
  } catch (error) {
    console.error("Error fetching Channel list:", error);
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
  yield takeEvery(GET_CAS_SOURCE, fetchCASSource);
}

export default channelListSaga;
