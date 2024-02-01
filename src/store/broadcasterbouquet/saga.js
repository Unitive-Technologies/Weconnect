import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_BROADCASTERBOUQUETLIST, GET_BROADCASTERBOUQUETLIST_STATUS, GET_BROADCASTERBOUQUETLIST_TYPE, GET_BROADCASTERBOUQUETLIST_BROADCASTER, GET_BROADCASTERBOUQUETLIST_ADDCHANNELS,
  GET_BROADCASTERBOUQUETLIST_DEFINITION,
  UPDATE_BROADCASTERBOUQUETLIST,
  ADD_NEW_BROADCASTERBOUQUETLIST,
} from "./actionTypes";

import {
  getBroadcasterBouquetList as fetchbroadcasterbouquetLists,
  getBroadcasterBouquetListSuccess,
  getBroadcasterBouquetStatusSuccess,
  getBroadcasterBouquetStatusFail,
  getBroadcasterBouquetTypeSuccess,
  getBroadcasterBouquetTypeFail,
  getBroadcasterBouquetBroadcasterSuccess,
  getBroadcasterBouquetBroadcasterFail,
  getBroadcasterBouquetAddchannelSuccess,
  getBroadcasterBouquetAddchannelFail,
  getBroadcasterBouquetDefinitionSuccess,
  getBroadcasterBouquetDefinitionFail,
  getBroadcasterBouquetListFail,
  addBroadcasterBouquetListSuccess,
  addBroadcasterBouquetListFail,
  updateBroadcasterBouquetFail,
  updateBroadcasterBouquetSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getBroadcasterBouquetList, getBroadcasterBouquetStatus, getBroadcasterBouquetType, getBroadcasterBouquetBroadcaster, getBroadcasterBouquetAddchannels, getBroadcasterBouquetDefinition,
  updateBroadcasterBouquet,
  addNewBroadcasterBouquetList
} from "../../helpers/fakebackend_helper";

export const getBroadcasterBouquetListStore = (state) => state.broadcasterBouquetList;

function* fetchBroadcasterBouquetList() {
  try {
    let BroadcasterBouquetListStore = yield select(getBroadcasterBouquetListStore);

    const pageSize = BroadcasterBouquetListStore.pageSize;
    const currentPage = BroadcasterBouquetListStore.currentPage;

    const response = yield call(getBroadcasterBouquetList, currentPage, pageSize);
    console.log("Response from API -", response);
    debugger;
    yield put(getBroadcasterBouquetListSuccess(response));
  } catch (error) {
    console.error("Error fetching Broadcaster Bouquet List :", error);
    yield put(getBroadcasterBouquetListFail(error));
  }
}

function* onAddNewBroadcasterBouquetList({ payload: broadcasterBouquetList }) {
  try {
    const response = yield call(addNewBroadcasterBouquetList, broadcasterBouquetList);
    yield put(addBroadcasterBouquetListSuccess(response));
    yield put(fetchbroadcasterbouquetLists());
  } catch (error) {
    yield put(addBroadcasterBouquetListFail(error));
  }
}

function* onUpdateBroadcasterBouquet({ payload: broadcasterBouquetList }) {
  try {
    const response = yield call(updateBroadcasterBouquet, broadcasterBouquetList);
    yield put(updateBroadcasterBouquetSuccess(response));
    yield put(fetchbroadcasterbouquetLists());
  } catch (error) {
    yield put(updateBroadcasterBouquetFail(error));
  }
}

function* fetchBroadcasterBouquetBroadcaster() {
  try {
    const response = yield call(getBroadcasterBouquetBroadcaster);
    yield put(getBroadcasterBouquetBroadcasterSuccess(response.data));
  } catch (error) {
    yield put(getBroadcasterBouquetBroadcasterFail(error));
  }
}

function* fetchBroadcasterBouquetType() {
  try {
    const response = yield call(getBroadcasterBouquetType);
    yield put(getBroadcasterBouquetTypeSuccess(response.data));
  } catch (error) {
    yield put(getBroadcasterBouquetTypeFail(error));
  }
}

function* fetchBroadcasterBouquetDefinition() {
  try {
    const response = yield call(getBroadcasterBouquetDefinition);
    yield put(getBroadcasterBouquetDefinitionSuccess(response.data));
  } catch (error) {
    yield put(getBroadcasterBouquetDefinitionFail(error));
  }
}

function* fetchBroadcasterBouquetAddchannel() {
  try {
    const response = yield call(getBroadcasterBouquetAddchannelFail);
    yield put(getBroadcasterBouquetAddchannelSuccess(response.data));
  } catch (error) {
    yield put(getBroadcasterBouquetAddchannelFail(error));
  }
}

function* fetchBroadcasterBouquetStatus() {
  try {
    const response = yield call(getBroadcasterBouquetStatus);
    yield put(getBroadcasterBouquetStatusSuccess(response.data));
  } catch (error) {
    yield put(getBroadcasterBouquetStatusFail(error));
  }
}


function* broadcasterBouquetListSaga() {
  yield takeEvery(GET_BROADCASTERBOUQUETLIST, fetchBroadcasterBouquetList);
  yield takeEvery(ADD_NEW_BROADCASTERBOUQUETLIST, onAddNewBroadcasterBouquetList);
  yield takeEvery(UPDATE_BROADCASTERBOUQUETLIST, onUpdateBroadcasterBouquet);
  yield takeEvery(GET_BROADCASTERBOUQUETLIST_ADDCHANNELS, fetchBroadcasterBouquetAddchannel);
  yield takeEvery(GET_BROADCASTERBOUQUETLIST_BROADCASTER, fetchBroadcasterBouquetBroadcaster);
  yield takeEvery(GET_BROADCASTERBOUQUETLIST_DEFINITION, fetchBroadcasterBouquetDefinition);
  yield takeEvery(GET_BROADCASTERBOUQUETLIST_STATUS, fetchBroadcasterBouquetStatus);
  yield takeEvery(GET_BROADCASTERBOUQUETLIST_TYPE, fetchBroadcasterBouquetType);

}

export default broadcasterBouquetListSaga;
