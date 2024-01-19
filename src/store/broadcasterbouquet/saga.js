import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_BROADCASTERBOUQUETLIST, ADD_NEW_BROADCASTERBOUQUETLIST } from "./actionTypes";

import {
  getBroadcasterBouquetListSuccess,
  getBroadcasterBouquetListFail,
  addBroadcasterBouquetListSuccess, addBroadcasterBouquetListFail
} from "./actions";

//Include Both Helper File with needed methods
import { getBroadcasterBouquetList, addNewBroadcasterBouquetList } from "../../helpers/fakebackend_helper";

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
    toast.success("GenreList Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addBroadcasterBouquetListFail(error));
    toast.error("BroadcasterBouquetList Added Failed", { autoClose: 2000 });
  }
}

function* broadcasterBouquetListSaga() {
  yield takeEvery(GET_BROADCASTERBOUQUETLIST, fetchBroadcasterBouquetList);
  yield takeEvery(ADD_NEW_BROADCASTERBOUQUETLIST, onAddNewBroadcasterBouquetList);

}

export default broadcasterBouquetListSaga;
