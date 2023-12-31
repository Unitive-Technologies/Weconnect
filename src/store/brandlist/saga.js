import { call, put, takeEvery } from "redux-saga/effects";
import { GET_BRANDLIST, GET_BRANDLIST_BOXTYPE, GET_BRANDLIST_BRANDTYPE, GET_BRANDLIST_CASTYPE, GET_BRANDLIST_CHARACTERS, GET_BRANDLIST_STATUS, ADD_BRANDLIST } from "./actionTypes";
import {
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
} from "./actions";
import { getBrandList, getBrandListBoxType, getBrandListCasType, getBrandListBrandType, getBrandListCharacters, getBrandListStatus, addBrandList } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertBrandListObject = (brandlist) => {
  return brandlist.map((brand) => {
    return {
      ...brand,
      id: brand.id,
      name: brand.name,
      code: brand.code,
      box_type_lbl: brand.box_type_lbl,
      brand_type_lbl: brand.brand_type_lbl,
      length: brand.length,
      significant_length: brand.significant_length,
      char_allowed_lbl: brand.char_allowed_lbl,
      cas_lbl: brand.cas_lbl,
      status: brand.status_lbl,
      created_at: brand.created_at,
      created_by: brand.created_by_lbl,
    };
  });
};

function* fetchBrandList() {
  try {
    const response = yield call(getBrandList);
    console.log("response:" + JSON.stringify(response));
    // const brandList = convertBrandListObject(response);
    yield put(getBrandListSuccess(response.data));
  } catch (error) {
    yield put(getBrandListFail(error));
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
    // toast.success("Brand list Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addBrandListFail(error));
    // toast.error("Brand list Added Failed", { autoClose: 2000 });
  }
}

function* brandListSaga() {
  yield takeEvery(GET_BRANDLIST, fetchBrandList);
  yield takeEvery(GET_BRANDLIST_BOXTYPE, fetchBrandListBoxType);
  yield takeEvery(GET_BRANDLIST_BRANDTYPE, fetchBrandListBrandType);
  yield takeEvery(GET_BRANDLIST_CASTYPE, fetchBrandListCasType);
  yield takeEvery(GET_BRANDLIST_CHARACTERS, fetchBrandListCharacters);
  yield takeEvery(GET_BRANDLIST_STATUS, fetchBrandListStatus);
  yield takeEvery(ADD_BRANDLIST, onAddBrandList);
}

export default brandListSaga;
