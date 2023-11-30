import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BRANDLIST } from "./actionTypes";

import { getBrandListSuccess, getBrandListFail } from "./actions";

//Include Both Helper File with needed methods
import { getBrandList } from "../../helpers/fakebackend_helper";

const convertBrandListObject = (brandlist) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return brandlist.map((brand) => {
    return {
      ...brand,
      id: brand.id,
      name: brand.name,
      code: brand.code,
      boxtype: brand.box_type_lbl,
      brand: brand.brand_type_lbl,
      charlength: brand.length,
      significant: brand.significant_length,
      allowed: brand.char_allowed_lbl,
      cas: brand.cas_lbl,
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
    const brandList = convertBrandListObject(response);
    yield put(getBrandListSuccess(brandList));
  } catch (error) {
    yield put(getBrandListFail(error));
  }
}

function* brandListSaga() {
  yield takeEvery(GET_BRANDLIST, fetchBrandList);
}

export default brandListSaga;
