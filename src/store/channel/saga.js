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
  addChannelListSuccess,
  addChannelListFail,
  updateChannelListSuccess,
  updateChannelListFail,
} from "./actions";
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
} from "../../helpers/backend_helper";

export const getChannelListStore = (state) => state.channelList;

function* fetchChannelList() {
  try {
    let ChannelListStore = yield select(getChannelListStore);

    const pageSize = ChannelListStore.pageSize;
    const currentPage = ChannelListStore.currentPage;

    const response = yield call(getChannelList, currentPage, pageSize);
    yield put(getChannelListSuccess(response));
  } catch (error) {
    yield put(getChannelListFail(error));
  }
}

function* onAddNewChannelList({ payload: channelList }) {
  try {
    const response = yield call(addNewChannelList, channelList);
    yield put(addChannelListSuccess(response));
    toast.success("ChannelList Added Successfully", { autoClose: 2000 });
    yield put(fetchchannellists());
  } catch (error) {
    yield put(addChannelListFail(error));
  }
}

function* onUpdateChannelList({ payload: channelList }) {
  try {
    const response = yield call(updateChannelList, channelList.id, channelList);
    yield put(updateChannelListSuccess(response));
    yield put(fetchchannellists());
  } catch (error) {
    yield put(updateChannelListFail(error));
  }
}

function* fetchChannelListBroadcaster() {
  try {
    const response = yield call(getChannelListBroadcaster);
    yield put(getChannelListBroadcasterSuccess(response.data));
  } catch (error) {
    yield put(getChannelListBroadcasterFail(error));
  }
}

function* fetchChannelListCascode() {
  try {
    const response = yield call(getChannelListCascode);
    yield put(getChannelListCascodeSuccess(response.data));
  } catch (error) {
    yield put(getChannelListCascodeFail(error));
  }
}

function* fetchChannelListDefinition() {
  try {
    const response = yield call(getChannelListDefinition);
    yield put(getChannelListDefinitionSuccess(response.data));
  } catch (error) {
    yield put(getChannelListDefinitionFail(error));
  }
}

function* fetchChannelListGenre() {
  try {
    const response = yield call(getChannelListGenre);
    yield put(getChannelListGenreSuccess(response.data));
  } catch (error) {
    yield put(getChannelListGenreFail(error));
  }
}

function* fetchChannelListLanguage() {
  try {
    const response = yield call(getChannelListLanguage);
    yield put(getChannelListLanguageSuccess(response.data));
  } catch (error) {
    yield put(getChannelListLanguageFail(error));
  }
}

function* fetchChannelListStatus() {
  try {
    const response = yield call(getChannelListStatus);
    yield put(getChannelListStatusSuccess(response.data));
  } catch (error) {
    yield put(getChannelListStatusFail(error));
  }
}

function* fetchChannelListType() {
  try {
    const response = yield call(getChannelListType);
    yield put(getChannelListTypeSuccess(response.data));
  } catch (error) {
    yield put(getChannelListTypeFail(error));
  }
}

function* channelListSaga() {
  yield takeEvery(GET_CHANNELLIST, fetchChannelList);
  yield takeEvery(ADD_NEW_CHANNELLIST, onAddNewChannelList);
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
