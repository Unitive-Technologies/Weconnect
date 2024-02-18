import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_BRANDLIST,
  UPDATE_BRANDLIST,
  GET_BRANDLIST_BOXTYPE,
  GET_BRANDLIST_BRANDTYPE,
  GET_BRANDLIST_CASTYPE,
  GET_BRANDLIST_CHARACTERS,
  GET_BRANDLIST_STATUS,
  ADD_BRANDLIST,
} from "./actionTypes";
import {
  getBrandList as fetchbrandlists,
  getBrandListSuccess,
  getBrandListFail,
  getBrandListBoxTypeSuccess,
  getBrandListBoxTypeFail,
  getBrandListBrandTypeSuccess,
  getBrandListBrandTypeFail,
  getBrandListCasTypeSuccess,
  getBrandListCasTypeFail,
  getBrandListCharactersSuccess,
  getBrandListCharactersFail,
  getBrandListStatusSuccess,
  getBrandListStatusFail,
  addBrandListSuccess,
  addBrandListFail,
  updateBrandListSuccess,
  updateBrandListFail,
} from "./actions";
import {
  getBrandList,
  updateBrandList,
  getBrandListBoxType,
  getBrandListCasType,
  getBrandListBrandType,
  getBrandListCharacters,
  getBrandListStatus,
  addBrandList,
} from "../../helpers/backend_helper";

export const getBrandListStore = (state) => state.brandlist;

function* fetchBrandListSaga() {
  try {
    let brandListStore = yield select(getBrandListStore);
    const pageSize = brandListStore.pageSize;
    const currentPage = brandListStore.currentPage;

    const response = yield call(getBrandList, currentPage, pageSize);
    console.log("Response from API:", response);

    yield put(getBrandListSuccess(response));
  } catch (error) {
    console.error("Error fetching brand list:", error);
    yield put(getBrandListFail(error));
  }
}

function* onUpdateBrandList({ payload: brandlist }) {
  console.log("Brand List in onUpdate:" + JSON.stringify(brandlist));
  console.log("Updated Id" + brandlist.id);
  try {
    const response = yield call(updateBrandList, brandlist.id, brandlist);
    yield put(updateBrandListSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchbrandlists());
  } catch (error) {
    yield put(updateBrandListFail(error));
  }
}

function* fetchBrandListBrandType() {
  try {
    const response = yield call(getBrandListBrandType);
    console.log("Brand List Brand Type  response:" + JSON.stringify(response));
    yield put(getBrandListBrandTypeSuccess(response.data));
  } catch (error) {
    yield put(getBrandListBrandTypeFail(error));
  }
}

function* fetchBrandListBoxType() {
  try {
    const response = yield call(getBrandListBoxType);
    console.log("Brand List Box Type  response:" + JSON.stringify(response));
    yield put(getBrandListBoxTypeSuccess(response.data));
  } catch (error) {
    yield put(getBrandListBoxTypeFail(error));
  }
}

function* fetchBrandListCasType() {
  try {
    const response = yield call(getBrandListCasType);
    console.log("Brand List Cas Type  response:" + JSON.stringify(response));
    yield put(getBrandListCasTypeSuccess(response.data));
  } catch (error) {
    yield put(getBrandListCasTypeFail(error));
  }
}

function* fetchBrandListStatus() {
  try {
    const response = yield call(getBrandListStatus);
    console.log("Brand List Status  response:" + JSON.stringify(response));
    yield put(getBrandListStatusSuccess(response.data));
  } catch (error) {
    yield put(getBrandListStatusFail(error));
  }
}

function* fetchBrandListCharacters() {
  try {
    const response = yield call(getBrandListCharacters);
    console.log("Brand List Characters  response:" + JSON.stringify(response));
    yield put(getBrandListCharactersSuccess(response.data));
  } catch (error) {
    yield put(getBrandListCharactersFail(error));
  }
}

function* onAddBrandList({ payload: brandlist }) {
  try {
    const response = yield call(addBrandList, brandlist);
    yield put(addBrandListSuccess(response));
    yield put(fetchbrandlists());
    // toast.success("Brand list Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addBrandListFail(error));
    // toast.error("Brand list Added Failed", { autoClose: 2000 });
  }
}

function* brandListSaga() {
  yield takeEvery(GET_BRANDLIST, fetchBrandListSaga);
  yield takeEvery(GET_BRANDLIST_BOXTYPE, fetchBrandListBoxType);
  yield takeEvery(GET_BRANDLIST_BRANDTYPE, fetchBrandListBrandType);
  yield takeEvery(GET_BRANDLIST_CASTYPE, fetchBrandListCasType);
  yield takeEvery(GET_BRANDLIST_CHARACTERS, fetchBrandListCharacters);
  yield takeEvery(GET_BRANDLIST_STATUS, fetchBrandListStatus);
  yield takeEvery(ADD_BRANDLIST, onAddBrandList);
  yield takeEvery(UPDATE_BRANDLIST, onUpdateBrandList);
}

export default brandListSaga;
