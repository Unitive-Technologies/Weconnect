import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_DEFINITION,
  GET_CHANNELLIST_BROADCASTER,
  GET_CHANNELLIST_CASCODE,
  GET_CHANNELLIST_GENRE,
  GET_CHANNELLIST_LANGUAGE,
  GET_CHANNELLIST_STATUS,
  GET_CHANNELLIST_TYPE,
  UPDATE_CHANNELLIST,
  ADD_NEW_CHANNELLIST,
  // GET_CAS_SOURCE,
} from "./actionTypes";

import {
  getChannelList as fetchchannellists,
  getChannelListSuccess,
  getChannelListFail,
  getChannelListBroadcasterSuccess,
  getChannelListBroadcasterFail,
  getChannelListStatusSuccess,
  getChannelListStatusFail,
  getChannelListTypeSuccess,
  getChannelListTypeFail,
  getChannelListGenreSuccess,
  getChannelListGenreFail,
  getChannelListLanguageSuccess,
  getChannelListLanguageFail,
  getChannelListDefinitionSuccess,
  getChannelListDefinitionFail,
  getChannelListCascodeSuccess,
  getChannelListCascodeFail,
  // getCASSource,
  // getCASSourceSuccess,
  // getCASSourceFail,
  addChannelListSuccess,
  addChannelListFail,
  updateChannelListSuccess,
  updateChannelListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getChannelList,
  getChannelListType,
  getChannelListStatus,
  getChannelListCascode,
  getChannelListGenre,
  getChannelListLanguage,
  getChannelListDefinition,
  getChannelListBroadcaster,
  updateChannelList,
  addNewChannelList,
  // getCASSourceList,
} from "../../helpers/fakebackend_helper";

export const getChannelListStore = (state) => state.channelList;

// function* fetchCASSource() {
//   try {
//     const response = yield call(getCASSourceList);
//     console.log("Response from CAS Source API -", response);
//     yield put(getCASSourceSuccess(response));
//   } catch (error) {
//     console.error("Error fetching CAS Source:", error);
//     yield put(getCASSourceFail(error));
//   }
// }

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
    // toast.success("ChannelList Added Successfully", { autoClose: 2000 });
    yield put(fetchchannellists());
  } catch (error) {
    yield put(addChannelListFail(error));
    // toast.error("Channel List Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateChannelList({ payload: channelList }) {
  console.log("Tax in onUpdate:" + JSON.stringify(channelList));
  try {
    const response = yield call(updateChannelList, channelList.id, tax);
    yield put(updateChannelListSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchchannellists());
  } catch (error) {
    yield put(updateChannelListFail(error));
  }
}

function* fetchChannelListBroadcaster() {
  try {
    const response = yield call(getChannelListBroadcaster);
    console.log(
      "Channel List Broadcaster response:" + JSON.stringify(response)
    );
    yield put(getChannelListBroadcasterSuccess(response.data));
  } catch (error) {
    yield put(getChannelListBroadcasterFail(error));
  }
}

function* fetchChannelListCascode() {
  try {
    const response = yield call(getChannelListCascode);
    console.log("Channel List Cascode response:" + JSON.stringify(response));
    yield put(getChannelListCascodeSuccess(response.data));
  } catch (error) {
    yield put(getChannelListCascodeFail(error));
  }
}

function* fetchChannelListDefinition() {
  try {
    const response = yield call(getChannelListDefinition);
    console.log("Channel List Definition response:" + JSON.stringify(response));
    yield put(getChannelListDefinitionSuccess(response.data));
  } catch (error) {
    yield put(getChannelListDefinitionFail(error));
  }
}

function* fetchChannelListGenre() {
  try {
    const response = yield call(getChannelListGenre);
    console.log("Channel List Genre response:" + JSON.stringify(response));
    yield put(getChannelListGenreSuccess(response.data));
  } catch (error) {
    yield put(getChannelListGenreFail(error));
  }
}

function* fetchChannelListLanguage() {
  try {
    const response = yield call(getChannelListLanguage);
    console.log("Channel List Genre response:" + JSON.stringify(response));
    yield put(getChannelListLanguageSuccess(response.data));
  } catch (error) {
    yield put(getChannelListLanguageFail(error));
  }
}

function* fetchChannelListStatus() {
  try {
    const response = yield call(getChannelListStatus);
    console.log("Channel List Genre response:" + JSON.stringify(response));
    yield put(getChannelListStatusSuccess(response.data));
  } catch (error) {
    yield put(getChannelListStatusFail(error));
  }
}

function* fetchChannelListType() {
  try {
    const response = yield call(getChannelListType);
    console.log("Channel List Type response:" + JSON.stringify(response));
    yield put(getChannelListTypeSuccess(response.data));
  } catch (error) {
    console.log("Fetching error in channel list type" + error);
    yield put(getChannelListTypeFail(error));
  }
}

function* channelListSaga() {
  yield takeEvery(GET_CHANNELLIST, fetchChannelList);
  yield takeEvery(ADD_NEW_CHANNELLIST, onAddNewChannelList);
  // yield takeEvery(GET_CAS_SOURCE, fetchCASSource);
  yield takeEvery(UPDATE_CHANNELLIST, onUpdateChannelList);
  yield takeEvery(GET_CHANNELLIST_BROADCASTER, fetchChannelListBroadcaster);
  yield takeEvery(GET_CHANNELLIST_DEFINITION, fetchChannelListDefinition);
  yield takeEvery(GET_CHANNELLIST_TYPE, fetchChannelListType);
  yield takeEvery(GET_CHANNELLIST_STATUS, fetchChannelListStatus);
  yield takeEvery(GET_CHANNELLIST_CASCODE, fetchChannelListCascode);
  yield takeEvery(GET_CHANNELLIST_GENRE, fetchChannelListGenre);
  yield takeEvery(GET_CHANNELLIST_LANGUAGE, fetchChannelListLanguage);
}

export default channelListSaga;
